import { Marker } from './marker-popup'
import { Card, CardContent, CardHeader } from "@/components/ui/card"

interface DashboardProps {
  markers: Marker[]
}

export default function Dashboard({ markers }: DashboardProps) {
  // Calculate statistics
  const totalMarkers = markers.length
  const totalLikes = markers.reduce((sum, marker) => sum + marker.likesCount, 0)
  const totalRecasts = markers.reduce((sum, marker) => sum + marker.recastsCount, 0)
  const totalReplies = markers.reduce((sum, marker) => sum + marker.repliesCount, 0)
  const totalFollowers = markers.reduce((sum, marker) => sum + marker.followerCount, 0)
  const powerBadgeHolders = markers.filter(marker => marker.powerBadge).length
  const averageNeynarScore = markers.reduce((sum, marker) => sum + marker.neynarScore, 0) / totalMarkers

  const stats = [
    { label: "Total Vehicles", value: totalMarkers },
    { label: "Total Likes", value: totalLikes },
    { label: "Total Recasts", value: totalRecasts },
    { label: "Total Replies", value: totalReplies },
    { label: "Total Followers", value: totalFollowers.toLocaleString() },
    { label: "Power Badge Holders", value: powerBadgeHolders },
    { label: "Avg Neynar Score", value: averageNeynarScore.toFixed(2) }
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="bg-white/75 backdrop-blur-sm border-none">
          <CardHeader className="pb-2">
            <h3 className="text-sm font-medium text-muted-foreground">{stat.label}</h3>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
} 