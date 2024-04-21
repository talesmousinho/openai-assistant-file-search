'use client'

import { useCallback, useEffect, useState } from 'react'
import { readStreamableValue } from 'ai/rsc'
import { Message } from '@/types/message'
import { createMessage, listMessages, runThread } from '@/lib/actions'
import { Chat } from '@/components/chat'

interface PageProps {
  params: { assistantId: string; threadId: string }
}

export default function Page({ params }: PageProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const fetchMessages = useCallback(async () => setMessages(await listMessages(params.threadId)), [params.threadId])

  useEffect(() => {
    fetchMessages()
  }, [fetchMessages])

  async function handleSubmit(input: string) {
    const message: Message = {
      content: input,
      role: 'user',
    }
    setMessages(prevMessages => [...prevMessages, message])

    setIsLoading(true)
    await createMessage(params.threadId, message)
    const stream = await runThread(params.threadId, params.assistantId)
    setMessages(prevMessages => [...prevMessages, { role: 'assistant', content: '' }])
    for await (const v of readStreamableValue(stream)) {
      if (v && v.text !== '') {
        setMessages(prevMessages => [
          ...prevMessages.slice(0, -1),
          {
            content: v.text,
            role: 'assistant',
          },
        ])
      }
    }
    setIsLoading(false)
  }

  return <Chat messages={messages} handleSubmit={handleSubmit} isLoading={isLoading} />
}
