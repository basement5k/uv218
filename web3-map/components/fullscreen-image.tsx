'use client'

import { Dialog, DialogContent } from "@/components/ui/dialog"
import Image from "next/image"
import { X } from 'lucide-react'

interface FullscreenImageProps {
  isOpen: boolean
  onClose: () => void
  src: string
  alt: string
  description: string
}

export default function FullscreenImage({
  isOpen,
  onClose,
  src,
  alt,
  description
}: FullscreenImageProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] p-0 bg-transparent border-none">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-50 rounded-full bg-black/50 p-2 text-white hover:bg-black/75 transition-colors"
          aria-label="Close fullscreen view"
        >
          <X className="h-6 w-6" />
        </button>
        <div className="relative">
          <div className="relative h-[90vh] w-[95vw]">
            <Image
              src={src}
              alt={alt}
              fill
              className="object-contain"
              sizes="95vw"
              priority
            />
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-black/75 p-4 text-white">
            <p className="text-lg font-medium text-center">{description}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

