import Link from 'next/link'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { IconGitHub, IconNextChat, IconSeparator } from '@/components/ui/icons'

export function Header() {
  return (
    <header className="sticky top-0 z-50 flex h-16 w-full shrink-0 items-center justify-between border-b bg-gradient-to-b from-background/10 via-background/50 to-background/80 px-4 backdrop-blur-xl">
      <div className="flex items-center">
        <Link href="/" rel="nofollow">
          <IconNextChat className="mr-2 size-6 dark:hidden" inverted />
          <IconNextChat className="mr-2 hidden size-6 dark:block" />
        </Link>
        <div className="flex items-center">
          <IconSeparator className="size-6 text-muted-foreground/50" />
          OpenAI Assistant Retrieval
        </div>
      </div>
      <div className="flex items-center justify-end space-x-2">
        <a
          target="_blank"
          href="https://github.com/talesmousinho/openai-assistant-retrieval"
          rel="noopener noreferrer"
          className={cn(buttonVariants({ variant: 'outline' }))}
        >
          <IconGitHub />
          <span className="ml-2 hidden md:flex">GitHub</span>
        </a>
      </div>
    </header>
  )
}
