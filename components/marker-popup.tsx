import { MapPin } from 'lucide-react';
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

export interface Marker {
  id: string;
  lat: number | null;
  long: number;
  markerImage: string;
  name: string;
  fid: number;
  followerCount: number;
  castText: string;
  likesCount: number;
  recastsCount: number;
  repliesCount: number;
  avatar: string;
  embeddedImage: string;
  embeddedImages?: string[];
  neynarScore: number;
  powerBadge: boolean;
  castLink: string;
}

interface MarkerPopupProps {
  marker: Marker;
}

export default function MarkerPopup({ marker }: MarkerPopupProps) {
  const farcasterProfileUrl = `https://warpcast.com/${marker.id}`
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const embeddedImages = marker.embeddedImage ? [marker.embeddedImage] : []

  if (marker.embeddedImages && Array.isArray(marker.embeddedImages)) {
    embeddedImages.push(...marker.embeddedImages)
  }

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % embeddedImages.length)
  }

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + embeddedImages.length) % embeddedImages.length)
  }

  return (
    <Card className="w-72 border-none bg-white/75 backdrop-blur-sm p-0">
      <CardHeader className="flex flex-row items-center gap-2 px-2 pt-2 pb-0">
        <Link href={farcasterProfileUrl} target="_blank" rel="noopener noreferrer">
          <Image
            src={marker.avatar || "/placeholder.svg"}
            alt={marker.name}
            width={24}
            height={24}
            className="rounded-full cursor-pointer"
          />
        </Link>
        <div className="flex-1">
          <h3 className="font-medium text-sm leading-none">{marker.name}</h3>
          {marker.fid && (
            <Badge variant="secondary" className="text-xs ml-1">
              FID: {marker.fid}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="text-xs space-y-1 p-2 relative">
        <div className="relative w-full h-[100px]">
          {embeddedImages.length > 0 ? (
            embeddedImages.map((src, index) => (
              <div
                key={index}
                className={`w-full h-full absolute transition-opacity duration-300 ${
                  index === currentImageIndex ? "opacity-100" : "opacity-0"
                }`}
              >
                <Image
                  src={src || "/placeholder.svg"}
                  alt={`Embedded image ${index + 1}`}
                  fill
                  className="object-cover rounded-sm"
                  sizes="100%"
                />
              </div>
            ))
          ) : (
            <Image
              src="/placeholder.svg"
              alt="No embedded image"
              width={200}
              height={100}
              className="object-cover rounded-sm"
            />
          )}
          {embeddedImages.length > 1 && (
            <>
              <button
                onClick={handlePrevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 p-1 rounded-full bg-black/50 text-white"
                aria-label="Previous Image"
              >
                <ChevronLeft className="w-3 h-3" />
              </button>
              <button
                onClick={handleNextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full bg-black/50 text-white"
                aria-label="Next Image"
              >
                <ChevronRight className="w-3 h-3" />
              </button>
            </>
          )}
        </div>

        <p className="font-medium">Followers: {marker.followerCount}</p>
        <p className="text-muted-foreground line-clamp-3">{marker.castText}</p>
        <div className="flex justify-between">
          <p>Neynar Score: {marker.neynarScore}</p>
          <p>Power Badge: {marker.powerBadge ? "✅" : "❌"}</p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between text-xs text-muted-foreground px-2 pb-2">
        <span>Likes: {marker.likesCount}</span>
        <span>Recasts: {marker.recastsCount}</span>
        <span>Replies: {marker.repliesCount}</span>
      </CardFooter>
    </Card>
  )
}

