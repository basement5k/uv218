import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

export default function FeaturedImage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-center">
        <h2 className="text-4xl font-black text-center inline-block">
          The Story of Brooklyn Coachworks Inc.
        </h2>
      </div>
      <Card className="overflow-hidden">
        <a href="https://foundation.app/gallery/unique-vehicles-garage/exhibition/1444" 
           target="_blank" 
           rel="noopener noreferrer"
           className="block transition-transform hover:scale-[1.02]">
          <CardContent className="p-0">
            <div className="relative aspect-[4/3]">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bm5kfoundationcw-PUcsQRVZP5mGGpSeSoRxsDiNnNbTg6.png"
                alt="Brooklyn Coachworks storefront with neon sign and vintage Land Rover"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6 bg-black text-white">
              <h3 className="text-2xl font-bold text-center">Brooklyn Coachworks Inc.</h3>
              <p className="text-gray-400 text-center">By @basement5k</p>
            </div>
          </CardContent>
        </a>
      </Card>
    </div>
  )
}

