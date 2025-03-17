'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import Header from '../components/header'
const InteractiveMap = dynamic(() => import('../components/interactive-map'), { ssr: false });
import PhotoGallery from '../components/photo-gallery'
import FeaturedImage from '../components/featured-image'
import Footer from '../components/footer'
import { Marker } from '../components/marker-popup'
import { predefinedMarkers } from '../data/predefinedMarkers'
export default function Page() {
  const [markers, setMarkers] = useState<Marker[]>([])

  useEffect(() => {
    setMarkers(predefinedMarkers)
  }, [])

  return (
    <main className="min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/Asset 5.svg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <Header />
      <section className="container mx-auto py-16 px-4">
        <div className="mb-8 space-y-4">
          <div className="flex justify-center">
            <h2 className="text-4xl font-black inline-block">
              THE UNIQUE VEHICLE GLOBAL COMMUNITY
            </h2>
          </div>
        </div>
        <div className="rounded-xl overflow-hidden border-4 border-black/10 shadow-[0_0_60px_-15px_rgba(0,0,0,0.3)] backdrop-blur">
          <InteractiveMap markers={markers} />
        </div>
      </section>

      <section className="container mx-auto py-12 px-4">
        <PhotoGallery />
      </section>

      <section className="container mx-auto py-12 px-4">
        <FeaturedImage />
      </section>

      <Footer />
    </main>
  )
}

