'use client'

import { useEffect, useRef, useState } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet.markercluster'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'

// Need to use require since MarkerClusterGroup is not a named export
const MarkerClusterGroup = (L as any).MarkerClusterGroup

import { Marker } from './marker-popup'
import { createRoot } from 'react-dom/client'
import MarkerPopup from './marker-popup'
import { Button } from "@/components/ui/button"
import { Globe2 } from 'lucide-react'


interface MapProps {
  markers: Marker[]
}

const InteractiveMap = ({ markers }: MapProps) => {
const mapRef = useRef<L.Map | null>(null)
const [currentTileLayer, setCurrentTileLayer] = useState<'Default' | 'Satellite'>('Default')

useEffect(() => {
 if (typeof window !== 'undefined' && !mapRef.current) {
   const defaultTiles = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png', {
     maxZoom: 19,
     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
   })

   const satelliteTiles = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
     maxZoom: 19,
     attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
   })

   const map = L.map('map', {
     layers: currentTileLayer === 'Default' ? [defaultTiles] : [satelliteTiles],
   }).setView([0, 0], 1)

   L.control.layers({
     'Default': defaultTiles,
     'Satellite': satelliteTiles
   }).addTo(map)

   mapRef.current = map;
 }
}, [currentTileLayer])

useEffect(() => {
 if (mapRef.current) {
   const map = mapRef.current

   // Correct MarkerClusterGroup instantiation
   const markersCluster = new MarkerClusterGroup({
     showCoverageOnHover: false,
     spiderfyOnMaxZoom: true,
     maxClusterRadius: 20,
   });

   markers.forEach((marker) => {
     if (marker.lat && typeof marker.long === 'number') {
       const customIcon = L.divIcon({
         className: 'custom-icon',
         html: `<img src="${marker.avatar}" alt="${marker.name}" style="width: 30px; height: 30px; border-radius: 50%; border: 2px solid white;" />`,
         iconSize: [30, 30],
         iconAnchor: [15, 15],
         popupAnchor: [0, -30]
       })

       const markerInstance = L.marker([marker.lat, marker.long], { icon: customIcon })
       const popupContent = document.createElement('div')
       const root = createRoot(popupContent)
       root.render(<MarkerPopup marker={marker} />)
       markerInstance.bindPopup(popupContent)
       markersCluster.addLayer(markerInstance);
     }
   })

   map.addLayer(markersCluster);

   if (markers.length > 0) {
     map.fitBounds(markersCluster.getBounds().pad(0.1))
   }
 }
}, [markers])

const handleToggleView = () => {
 setCurrentTileLayer(currentTileLayer === 'Default' ? 'Satellite' : 'Default')
}

return (
 <div className="relative">
   <div id="map" className="h-[800px] w-full z-0 border-8 border-[#a7b6a0]" />
   <div className="absolute top-4 right-4 space-x-4">
     <Button variant="outline" size="icon" onClick={handleToggleView}>
       <Globe2 className="w-4 h-4" />
     </Button>
   </div>
 </div>
)
}

export default InteractiveMap

