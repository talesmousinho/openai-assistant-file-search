'use server'

import { createStreamableValue } from 'ai/rsc'
import OpenAI from 'openai'
import { Message } from '@/lib/types'

const openai = new OpenAI()

export async function createVectorStore() {
  const vectorStore = await openai.beta.vectorStores.create({
    name: `rag-store-${new Date().toISOString()}`,
  })

  return vectorStore
}

export async function createFile(formData: FormData) {
  const fileObj = formData.get('file') as File | null
  if (!fileObj) {
    throw new Error('No file provided')
  }

  const file = await openai.files.create({
    file: fileObj,
    purpose: 'assistants',
  })

  return file
}

export async function attachFiles(vectorStoreId: string, file_ids: string[]) {
  const fileBatch = await openai.beta.vectorStores.fileBatches.createAndPoll(vectorStoreId, { file_ids })
  return fileBatch
}

export async function createAssistant(vectorStoreId: string) {
  const assistant = await openai.beta.assistants.create({
    model: process.env.OPENAI_MODEL as string,
    tools: [{ type: 'file_search' }],
    tool_resources: {
      file_search: {
        vector_store_ids: [vectorStoreId],
      },
    },
  })

  return assistant
}

export async function createThread() {
  const thread = await openai.beta.threads.create()
  return thread
}

export async function createMessage(threadId: string, message: Message) {
  const _message = await openai.beta.threads.messages.create(threadId, message)

  return _message
}

export async function listMessages(threadId: string): Promise<Message[]> {
  const response = await openai.beta.threads.messages.list(threadId)

  const messages = response.data.map(message => {
    const { text } = message.content[0] as OpenAI.Beta.Threads.Messages.TextContentBlock
    return {
      content: text.value,
      role: message.role,
    } as Message
  })
  messages.reverse()

  return messages
}

export async function runThread(threadId: string, assistantId: string) {
  const stream = createStreamableValue({ text: '' })

  openai.beta.threads.runs
    .stream(threadId, {
      assistant_id: assistantId,
    })
    .on('textDelta', (_, snapshopt) => stream.update({ text: snapshopt.value }))
    .on('textDone', (content, _) => stream.done({ text: content.value }))

  return stream.value
}
