import { RefObject, useCallback, useRef } from 'react'

export function useEnterSubmit(disabled: boolean): {
  formRef: RefObject<HTMLFormElement>
  onKeyDown: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void
} {
  const formRef = useRef<HTMLFormElement>(null)

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLTextAreaElement>): void => {
      if (disabled) return
      if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing) {
        formRef.current?.requestSubmit()
        event.preventDefault()
      }
    },
    [disabled],
  )

  return { formRef, onKeyDown: handleKeyDown }
}
