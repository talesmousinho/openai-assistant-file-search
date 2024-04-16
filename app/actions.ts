'use server'

import OpenAI from 'openai'
import { Message } from '@/types/message'

const openai = new OpenAI()

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

export async function createAssistant(fileIds: string[]) {
  const assistant = await openai.beta.assistants.create({
    model: 'gpt-4-turbo-preview',
    tools: [{ type: 'retrieval' }],
    file_ids: fileIds,
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

  const messages = response.data.map((message: OpenAI.Beta.Threads.Messages.Message) => {
    return {
      content: (message.content[0] as OpenAI.Beta.Threads.Messages.TextContentBlock).text.value,
      role: message.role,
    } as Message
  })
  messages.reverse()

  return messages
}

export async function runThread(threadId: string, assistantId: string) {
  const run = await openai.beta.threads.runs.createAndPoll(threadId, {
    assistant_id: assistantId,
  })

  return run
}
