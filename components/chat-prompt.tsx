'use client'

import { useCallback, useState } from 'react'
import { CornerDownLeft, LoaderCircle } from 'lucide-react'
import Textarea from 'react-textarea-autosize'
import { useEnterSubmit } from '@/lib/hooks/use-enter-submit'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

export function ChatPrompt({ isLoading, onSubmit }: { isLoading: boolean; onSubmit: (input: string) => void }) {
  const [input, setInput] = useState('')
  const { formRef, onKeyDown } = useEnterSubmit(isLoading)

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input?.trim()) return

    onSubmit(input)
    setInput('')
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <div className="relative flex max-h-60 w-full grow flex-col overflow-hidden border sm:rounded-2xl">
        <Textarea
          tabIndex={0}
          onKeyDown={onKeyDown}
          placeholder="Send a message."
          className="min-h-[54px] w-full resize-none bg-transparent p-4 pr-[40px] focus-within:outline-none"
          autoFocus
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          name="message"
          rows={1}
          value={input}
          onChange={handleInputChange}
        />
        <div className="absolute right-4 top-3">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button type="submit" size="icon" className="size-8 rounded-lg" disabled={isLoading || input?.trim() === ''}>
                {isLoading ? <LoaderCircle className="size-6 animate-spin" /> : <CornerDownLeft className="size-4 " />}
                <span className="sr-only">Send message</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Send message</TooltipContent>
          </Tooltip>
        </div>
      </div>
    </form>
  )
}
