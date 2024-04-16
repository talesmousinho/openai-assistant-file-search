'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { LoaderCircle } from 'lucide-react'
import { useToast } from '@/lib/hooks/use-toast'
import Dropzone from '@/components/dropzone'
import { createAssistant, createFile, createThread } from './actions'

export default function Page() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  async function handleFilesLoaded(files: FileList) {
    setIsLoading(true)

    try {
      const fileList = await Promise.all(
        Array.from(files).map(file => {
          const formData = new FormData()
          formData.append('file', file)
          return createFile(formData)
        }),
      )
      const fileIds = fileList.map(file => file.id)
      const assistant = await createAssistant(fileIds)
      const thread = await createThread()

      router.push(`/assistant/${assistant.id}/thread/${thread.id}`)
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem creating your assistant.',
      })
    }

    setIsLoading(false)
  }

  return (
    <div className="flex h-[calc(100vh-theme(spacing.16))] items-center justify-center py-10">
      <div className="p-6 text-gray-700 dark:text-white">
        {isLoading ? (
          <LoaderCircle className="size-24 animate-spin" />
        ) : (
          <>
            <p className="mb-4">Get started by uploading your documents here.</p>
            <Dropzone onLoad={handleFilesLoaded} />
          </>
        )}
      </div>
    </div>
  )
}
