interface ChatLayoutProps {
  children: React.ReactNode
}

export default async function ChatLayout({ children }: ChatLayoutProps) {
  return <div className="relative flex h-[calc(100vh-theme(spacing.16))] overflow-hidden bg-background dark:bg-transparent">{children}</div>
}
