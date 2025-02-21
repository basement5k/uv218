import { MapMarker } from '../types/map'

export function parseMarkers(jsonData: any): MapMarker[] {
  if (!Array.isArray(jsonData)) {
    throw new Error('Invalid JSON structure. Expected an array of markers.')
  }

  return jsonData.map((item, index) => {
    if (typeof item !== 'object' || item === null) {
      throw new Error(`Invalid marker data at index ${index}. Expected an object.`)
    }

    const lat = Number(item.lat)
    const long = Number(item.long)

    if (isNaN(lat) || isNaN(long)) {
      throw new Error(`Invalid coordinates for marker at index ${index}. Lat and long must be numbers.`)
    }

    return {
      id: String(item.id ?? `user-${index}`),
      lat,
      long,
      markerImage: String(item.markerImage ?? ''),
      name: String(item.name ?? `User ${index + 1}`),
      fid: Number(item.fid ?? 0),
      followerCount: Number(item.followerCount ?? 0),
      castText: String(item.castText ?? ''),
      likesCount: Number(item.likesCount ?? 0),
      recastsCount: Number(item.recastsCount ?? 0),
      repliesCount: Number(item.repliesCount ?? 0),
      avatar: String(item.avatar ?? ''),
      embeddedImage: String(item.embeddedImage ?? '')
    }
  })
}

