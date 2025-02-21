import { MapMarker } from '../types/map'

export function generateMarkers(count: number): MapMarker[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `user-${i}`,
    // Generate random coordinates roughly within USA bounds
    lat: 35 + Math.random() * 10,
    lng: -100 + Math.random() * 30,
    name: `User ${i + 1}`,
    avatar: `/placeholder.svg?height=40&width=40`,
    info: {
      joined: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      transactions: Math.floor(Math.random() * 100),
      status: Math.random() > 0.2 ? 'active' : 'inactive'
    }
  }))
}

