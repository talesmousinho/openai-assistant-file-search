'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { LoaderCircle } from 'lucide-react'
import { attachFiles, createAssistant, createFile, createThread, createVectorStore } from '@/lib/actions'
import { useToast } from '@/lib/hooks/use-toast'
import Dropzone from '@/components/dropzone'

export default function Page() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  async function handleFilesLoaded(files: FileList) {
    setIsLoading(true)

    try {
      const fileList = await uploadFiles(files)
      const vectorStore = await createVectorStore()
      await attachFiles(
        vectorStore.id,
        fileList.map(file => file.id),
      )

      const assistant = await createAssistant(vectorStore.id)
      const thread = await createThread()

      router.push(`/assistant/${assistant.id}/thread/${thread.id}`)
    } catch (error) {
      setIsLoading(false)
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem creating your assistant.',
      })
    }
  }

  async function uploadFiles(files: FileList) {
    return await Promise.all(
      Array.from(files).map(file => {
        const formData = new FormData()
        formData.append('file', file)
        return createFile(formData)
      }),
    )
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
