import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { cn } from '@/lib/utils'
import { Toaster } from '@/components/ui/toaster'
import { Header } from '@/components/layout/header'
import { Providers } from '@/components/providers'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL(`https://${process.env.VERCEL_URL}`),
  title: {
    default: 'OpenAI Assistant Retrieval',
    template: `%s - OpenAI Assistant Retrieval`,
  },
  description: 'An OpenAI Assistant Retrieval chatbot built with Next.js.',
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
            <Header />
            <main className="flex flex-1 flex-col bg-muted/50">{children}</main>
          </div>
        </Providers>
        <Toaster />
      </body>
    </html>
  )
}
