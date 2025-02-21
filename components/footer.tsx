import Image from "next/image"

export default function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="container mx-auto py-12 px-4">
        <div className="flex justify-center items-center gap-8">
          <a
            href="https://warpcast.com/~/channel/unique-vehicles"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-all duration-300 ease-in-out hover:scale-125"
          >
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/UV%20FC%20icon-CLy9dtp7wtaBd3DBoRe1vpHHWiQeFY.jpeg"
              alt="Unique Vehicles on Farcaster"
              width={48}
              height={48}
              className="rounded-xl"
            />
          </a>
          <a
            href="https://x.com/basement5k"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-all duration-300 ease-in-out hover:scale-125"
          >
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/UV%20X%20icon-3KiERnh9mVNI4tLJ1fc9hAr7OT9Mlc.jpeg"
              alt="Unique Vehicles on X"
              width={48}
              height={48}
              className="rounded-xl"
            />
          </a>
          <a
            href="https://www.instagram.com/uniquevehiclesnyc/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-all duration-300 ease-in-out hover:scale-125"
          >
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/instagram-w02IzktKpuUVcaBphGZRbBj2FDz0ka.png"
              alt="Unique Vehicles on Instagram"
              width={48}
              height={48}
              className="rounded-xl"
            />
          </a>
        </div>
      </div>
    </footer>
  )
}

