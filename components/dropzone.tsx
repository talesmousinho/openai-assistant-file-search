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

  function handleDrop(e: any) {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    handleFileLoad(e)
  }

  function handleDragLeave(e: any) {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
  }

  function handleDragOver(e: any) {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(true)
  }

  function handleDragEnter(e: any) {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(true)
  }

  return (
    <div className="flex items-center justify-center">
      <label
        htmlFor="fileInput"
        className={`${
          dragActive
            ? 'border-2 border-gray-300 bg-gray-200 dark:border-zinc-700 dark:bg-zinc-800'
            : 'border-2 border-dashed border-gray-300 dark:border-zinc-700'
        } mx-auto mt-2 flex w-full max-w-lg cursor-pointer flex-col items-center rounded-xl p-5 text-center`}
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
