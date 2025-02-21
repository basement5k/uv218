import React, { useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { predefinedMarkers } from '../data/predefinedMarkers'
import { MapMarker } from '../types/map'

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ''

const Map: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)

  useEffect(() => {
    if (map.current) return // initialize map only once

    map.current = new mapboxgl.Map({
      container: mapContainer.current!,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-74.5, 40], // Default center (you can adjust this)
      zoom: 2 // Default zoom level (you can adjust this)
    })

    map.current.on('load', () => {
      const markerGroups: { [key: string]: MapMarker[] } = {}

      // Group markers by their coordinates
      predefinedMarkers.forEach((marker) => {
        if (marker.lat !== null && marker.long !== null) {
          const key = `${marker.lat},${marker.long}`
          if (!markerGroups[key]) {
            markerGroups[key] = []
          }
          markerGroups[key].push(marker)
        }
      })

      // Add markers with offset for overlapping coordinates
      Object.values(markerGroups).forEach((group) => {
        group.forEach((marker, index) => {
          const offset = index * 20 // 20 pixels offset for each overlapping marker
          const markerElement = document.createElement('div')
          markerElement.className = 'custom-marker'
          markerElement.style.backgroundImage = `url(${marker.avatar})`
          markerElement.style.width = '30px'
          markerElement.style.height = '30px'
          markerElement.style.backgroundSize = 'cover'
          markerElement.style.borderRadius = '50%'
          markerElement.style.border = '2px solid white'

          new mapboxgl.Marker({
            element: markerElement,
            offset: [offset, offset]
          })
            .setLngLat([marker.long!, marker.lat!])
            .setPopup(
              new mapboxgl.Popup({ offset: 25 }).setHTML(
                `<h3>${marker.name}</h3><p>${marker.castText}</p>`
              )
            )
            .addTo(map.current!)
        })
      })

      // Fit the map to the markers
      const bounds = new mapboxgl.LngLatBounds()
      predefinedMarkers.forEach((marker) => {
        if (marker.lat !== null && marker.long !== null) {
          bounds.extend([marker.long, marker.lat])
        }
      })
      map.current!.fitBounds(bounds, { padding: 50 })
    })
  }, [])

  return <div ref={mapContainer} style={{ width: '100%', height: '400px' }} />
}

export default Map

