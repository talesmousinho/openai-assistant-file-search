'use client'

import { useState } from 'react'
import { Upload } from 'lucide-react'

interface DropzoneProps {
  onLoad: (files: FileList) => void
}

export default function Dropzone({ onLoad }: DropzoneProps) {
  const [dragActive, setDragActive] = useState<boolean>(false)

  function handleFileLoad(e: any) {
    e.preventDefault()
    const files = e.target.files || e.dataTransfer.files
    onLoad(files)
  }
  function preventDefaultAndStopPropagation(e: React.DragEvent) {
    e.preventDefault()
    e.stopPropagation()
  }

  function handleDragEnter(e: React.DragEvent) {
    preventDefaultAndStopPropagation(e)
    setDragActive(true)
  }

  function handleDrop(e: React.DragEvent) {
    preventDefaultAndStopPropagation(e)
    setDragActive(false)
  }

  function handleDragLeave(e: React.DragEvent) {
    preventDefaultAndStopPropagation(e)
    setDragActive(false)
  }

  function handleDragOver(e: React.DragEvent) {
    preventDefaultAndStopPropagation(e)
    setDragActive(true)
  }

  return (
    <div className="flex items-center justify-center">
      <label
        htmlFor="fileInput"
        className={`mx-auto mt-2 flex w-full max-w-lg cursor-pointer flex-col items-center rounded-xl border-2 p-5 text-center ${
          dragActive
            ? 'border-gray-300 bg-gray-200 dark:border-zinc-700 dark:bg-zinc-800'
            : 'border-dashed border-gray-300 dark:border-zinc-700'
        }`}
        onDragEnter={handleDragEnter}
        onDrop={handleDrop}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
      >
        <Upload className="mb-4 size-8 text-gray-500 dark:text-gray-400" />
        <h2 className="mt-1 font-medium tracking-wide">Click to upload or drag and drop</h2>
        <input id="fileInput" placeholder="fileInput" className="hidden" type="file" multiple={true} onChange={handleFileLoad} />
      </label>
    </div>
  )
}
