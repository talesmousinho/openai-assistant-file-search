import Link from 'next/link'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { IconGitHub, IconNextChat, IconSeparator } from '@/components/ui/icons'

export function Header() {
  return (
    <header className="sticky top-0 z-50 flex h-16 w-full shrink-0 items-center justify-between px-4 dark:bg-muted/50">
      <div className="flex items-center">
        <Link href="/" rel="nofollow">
          <IconNextChat className="mr-2 size-6 dark:hidden" inverted />
          <IconNextChat className="mr-2 hidden size-6 dark:block" />
        </Link>
        <div className="flex items-center">
          <IconSeparator className="size-6 text-muted-foreground/50" />
          OpenAI Assistant File Search
        </div>
      </div>
      <div className="flex items-center justify-end space-x-2">
        <a
          target="_blank"
          href="https://github.com/talesmousinho/openai-assistant-retrieval"
          rel="noopener noreferrer"
          className={cn('dark:bg-transparent', buttonVariants({ variant: 'outline' }))}
        >
          <IconGitHub />
          <span className="ml-2 hidden md:flex">GitHub</span>
        </a>
      </div>
    </header>
  )
}
