"use client"

import { Card } from "@/components/ui/card"
import Image from "next/image"
import { useState } from "react"
import FullscreenImage from "./fullscreen-image"
import { Button } from "@/components/ui/button"

const photos = [
  {
    id: 1,
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Violet%201-1.jpg-IM0tPnNuUIAmtlOaneF6TnmQOSFrxc.jpeg",
    alt: "Gold vintage convertible parked in front of classic brick building",
    description: "Classic Elegance in Gold",
    aspectRatio: "aspect-[4/3]",
    mintLink: "/mint/1",
  },
  {
    id: 2,
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/_DSC3377.jpg-Bj3AJqrYUqYIODnPxrFTXIoCv3hdtK.jpeg",
    alt: "Mercedes-Benz coupe with Yakima roof box against floral mural",
    description: "Urban Explorer",
    aspectRatio: "aspect-[4/3]",
    mintLink: "/mint/2",
  },
  {
    id: 3,
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/_DSC3442-4.jpg-kAZFk3dBmf9LpZ3gmBIZYWF5Vxto7a.jpeg",
    alt: "Mitsubishi Pajero Wagon against graffiti wall",
    description: "Street Art Companion",
    aspectRatio: "aspect-[4/3]",
    mintLink: "/mint/3",
  },
  {
    id: 4,
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/_DSC2469.jpg-iPY94FbCkuM6tYB90a4ouGQUdk8LkL.jpeg",
    alt: "Classic silver Subaru Sambar micro van",
    description: "JDM Classic",
    aspectRatio: "aspect-[4/3]",
    mintLink: "/mint/4",
  },
  {
    id: 5,
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/_DSC2704.jpg-KFwLbS9NKsFLoh6f95JJEHGBgxkq2u.jpeg",
    alt: "Classic red MG coupe with wire wheels parked against brick building",
    description: "British Racing Heritage",
    aspectRatio: "aspect-[4/3]",
    mintLink: "/mint/5",
  },
  {
    id: 6,
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/_DSC3685-2.jpg-PtDPJgZmiW95RzOYFU2hPbAGwLjScf.jpeg",
    alt: "Modified white Land Rover Defender 90 with black wheels",
    description: "Urban Explorer",
    aspectRatio: "aspect-[4/3]",
    mintLink: "/mint/6",
  },
  {
    id: 7,
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/_DSC2847.jpg-2hodoTIM9uVknMS1zIGk7nBF9Sz2FV.jpeg",
    alt: "Vintage Ford F-series pickup in two-tone white and green",
    description: "Classic American Pickup",
    aspectRatio: "aspect-[4/3]",
    mintLink: "/mint/7",
  },
  {
    id: 8,
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/_DSC2669-2.jpg-uL0det3K7MmAwi17sg7btJ0bc360l2.jpeg",
    alt: "Vintage blue Ford Econoline van with The New Motor branding",
    description: "Brooklyn's Finest",
    aspectRatio: "aspect-[4/3]",
    mintLink: "/mint/8",
  },
  {
    id: 9,
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/_DSC2295.jpg-O8UJSQHt2Zp6FsgDqH60WqkJnb5qM8.jpeg",
    alt: "Red Alfa Romeo Spider convertible parked in front of Crazy Good Burgers",
    description: "Italian Elegance",
    aspectRatio: "aspect-[4/3]",
    mintLink: "/mint/9",
  },
  {
    id: 10,
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/_DSC2881.jpg-m0sO0netuAuLGmQ9UBGGVAatsK33vT.jpeg",
    alt: "Classic Mercedes-Benz W123 sedan in silver against sunset",
    description: "Stuttgart's Finest",
    aspectRatio: "aspect-[4/3]",
    mintLink: "/mint/10",
  },
]

export default function PhotoGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState<(typeof photos)[0] | null>(null)

  return (
    <div className="space-y-8">
      <div className="flex flex-col items-center space-y-4">
        <h2 className="text-4xl font-black text-center">Basement5k's Lot</h2>
        <p className="text-center text-muted-foreground font-bold">
          All photos displayed are original and owned by @basement5k
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {photos.map((photo, index) => (
          <Card
            key={photo.id}
            className={`overflow-hidden bg-white/50 backdrop-blur-sm relative group ${
              index === 0 ? "md:col-span-2 lg:col-span-3" : ""
            }`}
          >
            <div
              className={`relative ${photo.aspectRatio} w-full overflow-hidden border-8 border-[#B8C2B3] transition-transform duration-300 group-hover:scale-105`}
              onClick={() => setSelectedPhoto(photo)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault()
                  setSelectedPhoto(photo)
                }
              }}
            >
              <Image
                src={photo.src || "/placeholder.svg"}
                alt={photo.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <Button asChild className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <a href={photo.mintLink} target="_blank" rel="noopener noreferrer">
                  <span className="sr-only">Mint {photo.description}</span>
                </a>
              </Button>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Button className="border-2 border-black text-black font-bold">Mint</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {selectedPhoto && (
        <FullscreenImage
          isOpen={!!selectedPhoto}
          onClose={() => setSelectedPhoto(null)}
          src={selectedPhoto.src}
          alt={selectedPhoto.alt}
          description={selectedPhoto.description}
        />
      )}
    </div>
  )
}

