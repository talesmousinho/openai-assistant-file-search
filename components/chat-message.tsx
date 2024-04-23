import { FC, memo } from 'react'
import { Message } from '@/lib/types'
import { cn } from '@/lib/utils'
import { IconOpenAI, IconUser } from '@/components/ui/icons'
import { MemoizedReactMarkdown } from '@/components/markdown'

export interface ChatMessageProps {
  message: Message
}

export const ChatMessage: FC<ChatMessageProps> = memo(({ message: { role, content } }) => {
  const getRoleStylesAndIcon = () => {
    if (role === 'user') {
      return {
        iconClassName: 'bg-background',
        Icon: IconUser,
      }
    }
    return {
      iconClassName: 'bg-primary text-primary-foreground',
      Icon: IconOpenAI,
    }
  }

  const { iconClassName, Icon } = getRoleStylesAndIcon()

  return (
    <div className="relative mb-4 flex items-start">
      <div className={cn('flex size-8 shrink-0 select-none items-center justify-center rounded-2xl border', iconClassName)}>
        <Icon />
      </div>
      <div className="ml-4 flex-1 space-y-2 overflow-hidden px-1">
        <MemoizedReactMarkdown
          className="prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0"
          components={{
            p({ children }) {
              return <p className="mb-2 last:mb-0">{children}</p>
            },
          }}
        >
          {content}
        </MemoizedReactMarkdown>
      </div>
    </div>
  )
})

ChatMessage.displayName = 'ChatMessage'
