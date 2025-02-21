import { MapPin } from 'lucide-react';
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export interface Marker {
  id: string;
  lat: number | null;
  long: number | null;
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
  onClose?: () => void;
}

export default function MarkerPopup({ marker, onClose }: MarkerPopupProps) {
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
    <div className="h-full flex flex-col">
      <Card className="border-none bg-transparent flex-1">
        <CardHeader className="flex flex-row items-center gap-4 pb-6">
          <Link href={farcasterProfileUrl} target="_blank" rel="noopener noreferrer">
            <Image
              src={marker.avatar || "/placeholder.svg"}
              alt={marker.name}
              width={60}
              height={60}
              className="rounded-full cursor-pointer"
            />
          </Link>
          <div className="flex-1">
            <h3 className="font-semibold text-xl">{marker.name}</h3>
            <div className="flex items-center gap-2 mt-1">
              {marker.fid && (
                <Badge variant="secondary">
                  FID: {marker.fid}
                </Badge>
              )}
              <Badge variant="outline">
                {marker.followerCount} followers
              </Badge>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="relative w-full h-[300px]">
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
                    className="object-cover rounded-lg"
                    sizes="100%"
                  />
                </div>
              ))
            ) : (
              <Image
                src="/placeholder.svg"
                alt="No embedded image"
                fill
                className="object-cover rounded-lg"
              />
            )}
            {embeddedImages.length > 1 && (
              <>
                <button
                  onClick={handlePrevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                  aria-label="Previous Image"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                  aria-label="Next Image"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
          </div>

          <div className="space-y-4">
            <p className="text-base leading-relaxed">{marker.castText}</p>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">Neynar Score</p>
                <p className="text-xl font-semibold">{marker.neynarScore}</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">Power Badge</p>
                <p className="text-xl">{marker.powerBadge ? "✅" : "❌"}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 bg-slate-50 p-4 rounded-lg">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Likes</p>
                <p className="text-lg font-medium">{marker.likesCount}</p>
              </div>
              <div className="text-center border-x">
                <p className="text-sm text-muted-foreground">Recasts</p>
                <p className="text-lg font-medium">{marker.recastsCount}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Replies</p>
                <p className="text-lg font-medium">{marker.repliesCount}</p>
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="mt-6">
          <Link 
            href={marker.castLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full"
          >
            <Button className="w-full" variant="outline">
              View Cast on Warpcast
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
