import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { IconGitHub, IconNextChat, IconSeparator } from '@/components/ui/icons'
import { Toaster } from '@/components/ui/toaster'
import { Providers } from '@/components/providers'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'OpenAI Assistant File Search',
    template: `%s - OpenAI Assistant File Search`,
  },
  description: 'An OpenAI Assistant File Search chatbot built with Next.js.',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn('antialiased', inter.className)}>
        <Providers>
          <div className="flex min-h-screen flex-col">
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
                  href="https://github.com/talesmousinho/openai-assistant-file-search"
                  rel="noopener noreferrer"
                  className={cn('dark:bg-transparent', buttonVariants({ variant: 'outline' }))}
                >
                  <IconGitHub />
                  <span className="ml-2 hidden md:flex">GitHub</span>
                </a>
              </div>
            </header>

            <main className="flex flex-1 flex-col dark:bg-muted/50">{children}</main>
          </div>
        </Providers>
        <Toaster />
      </body>
    </html>
  )
}
