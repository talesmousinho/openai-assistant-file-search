'use client'

import { Message } from '@/lib/types'
import { cn } from '@/lib/utils'
import { Separator } from '@/components/ui/separator'
import { ChatMessage } from '@/components/chat-message'
import { ChatPrompt } from '@/components/chat-prompt'

interface ChatProps {
  messages: Message[]
  handleSubmit: (input: string) => void
  isLoading: boolean
  className?: string
}

export function Chat({ messages, handleSubmit, isLoading, className }: ChatProps) {
  return (
    <div className="flex w-full flex-col">
      <div className="w-full grow overflow-auto">
        <div className={cn('pt-4 md:pt-10', className)}>
          {messages.length > 0 && (
            <div className="relative mx-auto max-w-3xl px-8">
              {messages.map((message, index) => (
                <div key={`msg-${index}-${message.content.length}`}>
                  <ChatMessage message={message} />
                  {index < messages.length - 1 && <Separator className="my-4 md:my-8" />}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="inset-x-0 bottom-0 w-full">
        <div className="mx-auto max-w-3xl sm:px-4">
          <ChatPrompt isLoading={isLoading} onSubmit={handleSubmit} />
          <p className="hidden px-2 py-1 text-center text-xs leading-normal text-muted-foreground sm:block">
            OpenAI&apos;s GPT can make mistakes. Consider checking important information.
          </p>
        </div>
      </div>
    </div>
  )
}
