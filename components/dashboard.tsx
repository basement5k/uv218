"use client"

import { useState, useEffect } from "react"
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  ChevronDown,
  Download,
  Search,
  SlidersHorizontal,
  Star,
  ThumbsUp,
  Repeat,
  MessageSquare,
  Users,
  BarChart2,
  Activity,
  ExternalLink,
} from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Define the type for our cast data
interface CastData {
  id: string
  lat: number | null
  long: number | null
  markerImage: string
  name: string
  fid: number
  followerCount: number
  castText: string
  likesCount: number
  recastsCount: number
  repliesCount: number
  avatar: string
  embeddedImage: string | null
  neynarScore: number
  powerBadge: boolean
  castLink: string
  timestamp?: string // Adding timestamp for time-based visualizations
}

// Mock data for development - in production this would be loaded from the JSON file
const mockData: CastData[] = [
  {
    id: "fattybuthappy1",
    lat: null,
    long: null,
    markerImage: "https://imagedelivery.net/example1",
    name: "fattybuthappy",
    fid: 263648,
    followerCount: 2120,
    castText: "What a nice mountain view from here! The air is so fresh and the scenery is breathtaking.",
    likesCount: 45,
    recastsCount: 12,
    repliesCount: 8,
    avatar: "https://imagedelivery.net/example-avatar1",
    embeddedImage: "https://imagedelivery.net/example-image1",
    neynarScore: 0.97,
    powerBadge: true,
    castLink: "https://warpcast.com/example1",
    timestamp: "2023-05-15T14:30:00Z",
  },
  {
    id: "fattybuthappy2",
    lat: null,
    long: null,
    markerImage: "https://imagedelivery.net/example2",
    name: "fattybuthappy",
    fid: 263648,
    followerCount: 2120,
    castText: "Just finished reading an amazing book about blockchain technology. Highly recommend!",
    likesCount: 32,
    recastsCount: 5,
    repliesCount: 15,
    avatar: "https://imagedelivery.net/example-avatar1",
    embeddedImage: null,
    neynarScore: 0.97,
    powerBadge: true,
    castLink: "https://warpcast.com/example2",
    timestamp: "2023-05-16T10:15:00Z",
  },
  {
    id: "cryptoenthusiast",
    lat: null,
    long: null,
    markerImage: "https://imagedelivery.net/example3",
    name: "cryptoenthusiast",
    fid: 187432,
    followerCount: 1850,
    castText: "The future of social media is decentralized. Farcaster is leading the way!",
    likesCount: 78,
    recastsCount: 23,
    repliesCount: 12,
    avatar: "https://imagedelivery.net/example-avatar2",
    embeddedImage: "https://imagedelivery.net/example-image2",
    neynarScore: 0.89,
    powerBadge: true,
    castLink: "https://warpcast.com/example3",
    timestamp: "2023-05-17T09:45:00Z",
  },
  {
    id: "fattybuthappy3",
    lat: null,
    long: null,
    markerImage: "https://imagedelivery.net/example4",
    name: "fattybuthappy",
    fid: 263648,
    followerCount: 2120,
    castText: "Exploring new hiking trails today. Nature is the best therapy!",
    likesCount: 56,
    recastsCount: 8,
    repliesCount: 4,
    avatar: "https://imagedelivery.net/example-avatar1",
    embeddedImage: "https://imagedelivery.net/example-image3",
    neynarScore: 0.97,
    powerBadge: true,
    castLink: "https://warpcast.com/example4",
    timestamp: "2023-05-18T16:20:00Z",
  },
  {
    id: "techguru",
    lat: null,
    long: null,
    markerImage: "https://imagedelivery.net/example5",
    name: "techguru",
    fid: 129876,
    followerCount: 3450,
    castText: "Just launched my new project on Ethereum. Check it out and let me know what you think!",
    likesCount: 112,
    recastsCount: 45,
    repliesCount: 28,
    avatar: "https://imagedelivery.net/example-avatar3",
    embeddedImage: "https://imagedelivery.net/example-image4",
    neynarScore: 0.95,
    powerBadge: true,
    castLink: "https://warpcast.com/example5",
    timestamp: "2023-05-19T11:30:00Z",
  },
  {
    id: "fattybuthappy4",
    lat: null,
    long: null,
    markerImage: "https://imagedelivery.net/example6",
    name: "fattybuthappy",
    fid: 263648,
    followerCount: 2120,
    castText: "Coffee and coding, perfect morning combination!",
    likesCount: 28,
    recastsCount: 3,
    repliesCount: 7,
    avatar: "https://imagedelivery.net/example-avatar1",
    embeddedImage: null,
    neynarScore: 0.97,
    powerBadge: true,
    castLink: "https://warpcast.com/example6",
    timestamp: "2023-05-20T08:10:00Z",
  },
  {
    id: "cryptoenthusiast2",
    lat: null,
    long: null,
    markerImage: "https://imagedelivery.net/example7",
    name: "cryptoenthusiast",
    fid: 187432,
    followerCount: 1850,
    castText: "Attended an amazing Web3 conference today. The future is bright!",
    likesCount: 65,
    recastsCount: 18,
    repliesCount: 9,
    avatar: "https://imagedelivery.net/example-avatar2",
    embeddedImage: "https://imagedelivery.net/example-image5",
    neynarScore: 0.89,
    powerBadge: true,
    castLink: "https://warpcast.com/example7",
    timestamp: "2023-05-21T19:45:00Z",
  },
  {
    id: "defiexplorer",
    lat: null,
    long: null,
    markerImage: "https://imagedelivery.net/example8",
    name: "defiexplorer",
    fid: 205431,
    followerCount: 1240,
    castText: "DeFi yields are looking promising this week. What projects are you bullish on?",
    likesCount: 42,
    recastsCount: 14,
    repliesCount: 31,
    avatar: "https://imagedelivery.net/example-avatar4",
    embeddedImage: null,
    neynarScore: 0.82,
    powerBadge: false,
    castLink: "https://warpcast.com/example8",
    timestamp: "2023-05-22T12:15:00Z",
  },
]

export default function FarcasterDashboard() {
  const [castsData, setCastsData] = useState<CastData[]>([])
  const [filteredData, setFilteredData] = useState<CastData[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [sortConfig, setSortConfig] = useState<{
    key: keyof CastData | "totalEngagement"
    direction: "ascending" | "descending"
  }>({
    key: "timestamp",
    direction: "descending",
  })
  const [selectedUser, setSelectedUser] = useState<string | null>(null)
  const [dateRange, setDateRange] = useState<{
    start: string | null
    end: string | null
  }>({
    start: null,
    end: null,
  })
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(5)
  const [expandedCasts, setExpandedCasts] = useState<Record<string, boolean>>({})
  const [selectedCast, setSelectedCast] = useState<CastData | null>(null)

  // Load data on component mount
  useEffect(() => {
    // In a real application, you would fetch the JSON data here
    // For now, we'll use the mock data
    setCastsData(mockData)
    setFilteredData(mockData)
  }, [])

  // Calculate summary metrics
  const totalCasts = filteredData.length
  const totalEngagement = filteredData.reduce(
    (sum, cast) => sum + cast.likesCount + cast.recastsCount + cast.repliesCount,
    0,
  )
  const avgEngagementPerCast = totalCasts > 0 ? totalEngagement / totalCasts : 0

  // Get unique users from the data
  const uniqueUsers = Array.from(new Set(filteredData.map((cast) => cast.name)))

  // Calculate top performing casts
  const topCasts = [...filteredData]
    .sort((a, b) => b.likesCount + b.recastsCount + b.repliesCount - (a.likesCount + a.recastsCount + a.repliesCount))
    .slice(0, 3)

  // Prepare data for charts
  const engagementByTypeData = filteredData.map((cast) => ({
    id: cast.id.substring(0, 10) + "...",
    likes: cast.likesCount,
    recasts: cast.recastsCount,
    replies: cast.repliesCount,
    total: cast.likesCount + cast.recastsCount + cast.repliesCount,
  }))

  // Prepare data for line chart (activity over time)
  // In a real application, you would use actual timestamps
  const activityOverTimeData = filteredData
    .sort((a, b) => {
      if (!a.timestamp || !b.timestamp) return 0
      return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    })
    .map((cast, index) => ({
      date: cast.timestamp ? new Date(cast.timestamp).toLocaleDateString() : `Day ${index + 1}`,
      engagement: cast.likesCount + cast.recastsCount + cast.repliesCount,
      likes: cast.likesCount,
      recasts: cast.recastsCount,
      replies: cast.repliesCount,
    }))

  // Prepare user leaderboard data
  const userLeaderboard = uniqueUsers
    .map((userName) => {
      const userCasts = filteredData.filter((cast) => cast.name === userName)
      const totalUserEngagement = userCasts.reduce(
        (sum, cast) => sum + cast.likesCount + cast.recastsCount + cast.repliesCount,
        0,
      )
      const userInfo = userCasts[0] // Get user info from first cast

      return {
        name: userName,
        fid: userInfo.fid,
        followerCount: userInfo.followerCount,
        totalEngagement,
        avgEngagement: userCasts.length > 0 ? totalUserEngagement / userCasts.length : 0,
        castCount: userCasts.length,
        avatar: userInfo.avatar,
        neynarScore: userInfo.neynarScore,
        powerBadge: userInfo.powerBadge,
      }
    })
    .sort((a, b) => b.totalEngagement - a.totalEngagement)

  // Handle search
  useEffect(() => {
    let result = castsData

    // Apply search filter
    if (searchQuery) {
      result = result.filter((cast) => cast.castText.toLowerCase().includes(searchQuery.toLowerCase()))
    }

    // Apply user filter
    if (selectedUser) {
      result = result.filter((cast) => cast.name === selectedUser)
    }

    // Apply date range filter
    if (dateRange.start && dateRange.end) {
      result = result.filter((cast) => {
        if (!cast.timestamp) return true
        const castDate = new Date(cast.timestamp)
        const startDate = new Date(dateRange.start)
        const endDate = new Date(dateRange.end)
        return castDate >= startDate && castDate <= endDate
      })
    }

    // Apply sorting
    result = [...result].sort((a, b) => {
      if (sortConfig.key === "totalEngagement") {
        const aValue = a.likesCount + a.recastsCount + a.repliesCount
        const bValue = b.likesCount + b.recastsCount + b.repliesCount
        return sortConfig.direction === "ascending" ? aValue - bValue : bValue - aValue
      }

      const aValue = a[sortConfig.key]
      const bValue = b[sortConfig.key]

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortConfig.direction === "ascending" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
      }

      if (aValue === null) return sortConfig.direction === "ascending" ? -1 : 1
      if (bValue === null) return sortConfig.direction === "ascending" ? 1 : -1

      return sortConfig.direction === "ascending"
        ? (aValue as number) - (bValue as number)
        : (bValue as number) - (aValue as number)
    })

    setFilteredData(result)
    setCurrentPage(1)
  }, [castsData, searchQuery, selectedUser, dateRange, sortConfig])

  // Handle sort
  const handleSort = (key: keyof CastData | "totalEngagement") => {
    setSortConfig({
      key,
      direction: sortConfig.key === key && sortConfig.direction === "ascending" ? "descending" : "ascending",
    })
  }

  // Handle pagination
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredData.length / itemsPerPage)

  // Toggle cast text expansion
  const toggleCastExpansion = (castId: string) => {
    setExpandedCasts((prev) => ({
      ...prev,
      [castId]: !prev[castId],
    }))
  }

  // Export data as CSV
  const exportToCSV = () => {
    const headers = [
      "ID",
      "Name",
      "FID",
      "Follower Count",
      "Cast Text",
      "Likes",
      "Recasts",
      "Replies",
      "Neynar Score",
      "Power Badge",
      "Cast Link",
    ].join(",")

    const rows = filteredData.map((cast) =>
      [
        cast.id,
        cast.name,
        cast.fid,
        cast.followerCount,
        `"${cast.castText.replace(/"/g, '""')}"`, // Escape quotes in text
        cast.likesCount,
        cast.recastsCount,
        cast.repliesCount,
        cast.neynarScore,
        cast.powerBadge,
        cast.castLink,
      ].join(","),
    )

    const csv = [headers, ...rows].join("\n")
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", "farcaster_analytics.csv")
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Farcaster Analytics Dashboard</h1>
            <p className="text-muted-foreground">Analyze your Farcaster channel performance and engagement</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={exportToCSV}>
              <Download className="mr-2 h-4 w-4" />
              Export Data
            </Button>
          </div>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search casts..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <Select
                value={selectedUser || "all"}
                onValueChange={(value) => setSelectedUser(value === "all" ? null : value)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by user" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Users</SelectItem>
                  {uniqueUsers.map((user) => (
                    <SelectItem key={user} value={user}>
                      {user}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <SlidersHorizontal className="mr-2 h-4 w-4" />
                    Engagement Filter
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Filter by Engagement</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => handleSort("likesCount")}>Most Likes</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleSort("recastsCount")}>Most Recasts</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleSort("repliesCount")}>Most Replies</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleSort("totalEngagement")}>
                    Highest Total Engagement
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardContent>
        </Card>

        {/* Summary Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Casts</CardTitle>
              <BarChart2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalCasts}</div>
              <p className="text-xs text-muted-foreground">
                {selectedUser ? `From ${selectedUser}` : "From all users"}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Engagement</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalEngagement}</div>
              <p className="text-xs text-muted-foreground">Likes, recasts, and replies combined</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Engagement</CardTitle>
              <ThumbsUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{avgEngagementPerCast.toFixed(1)}</div>
              <p className="text-xs text-muted-foreground">Per cast</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Followers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {selectedUser
                  ? filteredData.find((cast) => cast.name === selectedUser)?.followerCount || 0
                  : userLeaderboard[0]?.followerCount || 0}
              </div>
              <p className="text-xs text-muted-foreground">{selectedUser ? selectedUser : "Top user"}</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs for different views */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="engagement">Engagement Analysis</TabsTrigger>
            <TabsTrigger value="users">User Profiles</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Activity Over Time</CardTitle>
                  <CardDescription>Engagement metrics across your casts</CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <ChartContainer
                    config={{
                      engagement: {
                        label: "Total Engagement",
                        color: "hsl(var(--chart-1))",
                      },
                      likes: {
                        label: "Likes",
                        color: "hsl(var(--chart-2))",
                      },
                      recasts: {
                        label: "Recasts",
                        color: "hsl(var(--chart-3))",
                      },
                      replies: {
                        label: "Replies",
                        color: "hsl(var(--chart-4))",
                      },
                    }}
                    className="h-full"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={activityOverTimeData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="engagement"
                          stroke="var(--color-engagement)"
                          strokeWidth={2}
                          dot={{ r: 4 }}
                          activeDot={{ r: 6 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="likes"
                          stroke="var(--color-likes)"
                          strokeWidth={1.5}
                          dot={{ r: 3 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="recasts"
                          stroke="var(--color-recasts)"
                          strokeWidth={1.5}
                          dot={{ r: 3 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="replies"
                          stroke="var(--color-replies)"
                          strokeWidth={1.5}
                          dot={{ r: 3 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Performing Casts</CardTitle>
                  <CardDescription>Ranked by total engagement</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topCasts.map((cast, index) => (
                      <div key={cast.id} className="flex items-start space-x-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                          <span className="text-sm font-bold">{index + 1}</span>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-medium leading-none">
                            {cast.castText.length > 60 ? `${cast.castText.substring(0, 60)}...` : cast.castText}
                          </p>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <ThumbsUp className="mr-1 h-3 w-3" />
                            {cast.likesCount}
                            <Repeat className="ml-2 mr-1 h-3 w-3" />
                            {cast.recastsCount}
                            <MessageSquare className="ml-2 mr-1 h-3 w-3" />
                            {cast.repliesCount}
                          </div>
                          <div className="flex items-center text-xs">
                            <Button
                              variant="link"
                              size="sm"
                              className="h-auto p-0 text-xs"
                              onClick={() => setSelectedCast(cast)}
                            >
                              View Details
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Data Table */}
            <Card>
              <CardHeader>
                <CardTitle>Cast Data</CardTitle>
                <CardDescription>Browse and analyze all your casts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[250px]">
                          <Button
                            variant="ghost"
                            onClick={() => handleSort("castText")}
                            className="flex items-center gap-1"
                          >
                            Cast
                            {sortConfig.key === "castText" && (
                              <ChevronDown
                                className={`h-4 w-4 ${sortConfig.direction === "ascending" ? "rotate-180" : ""}`}
                              />
                            )}
                          </Button>
                        </TableHead>
                        <TableHead>
                          <Button
                            variant="ghost"
                            onClick={() => handleSort("name")}
                            className="flex items-center gap-1"
                          >
                            Author
                            {sortConfig.key === "name" && (
                              <ChevronDown
                                className={`h-4 w-4 ${sortConfig.direction === "ascending" ? "rotate-180" : ""}`}
                              />
                            )}
                          </Button>
                        </TableHead>
                        <TableHead>
                          <Button
                            variant="ghost"
                            onClick={() => handleSort("totalEngagement")}
                            className="flex items-center gap-1"
                          >
                            Engagement
                            {sortConfig.key === "totalEngagement" && (
                              <ChevronDown
                                className={`h-4 w-4 ${sortConfig.direction === "ascending" ? "rotate-180" : ""}`}
                              />
                            )}
                          </Button>
                        </TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {currentItems.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={4} className="text-center">
                            No casts found
                          </TableCell>
                        </TableRow>
                      ) : (
                        currentItems.map((cast) => (
                          <TableRow key={cast.id}>
                            <TableCell className="font-medium">
                              <div className="space-y-2">
                                <p>
                                  {expandedCasts[cast.id] || cast.castText.length <= 100
                                    ? cast.castText
                                    : `${cast.castText.substring(0, 100)}...`}
                                </p>
                                {cast.castText.length > 100 && (
                                  <Button
                                    variant="link"
                                    size="sm"
                                    className="h-auto p-0"
                                    onClick={() => toggleCastExpansion(cast.id)}
                                  >
                                    {expandedCasts[cast.id] ? "Show less" : "Show more"}
                                  </Button>
                                )}
                                {cast.embeddedImage && (
                                  <div className="mt-2">
                                    <img
                                      src={cast.embeddedImage || "/placeholder.svg"}
                                      alt="Cast image"
                                      className="rounded-md max-h-32 object-cover"
                                    />
                                  </div>
                                )}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src={cast.avatar} alt={cast.name} />
                                  <AvatarFallback>{cast.name.substring(0, 2)}</AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col">
                                  <span className="text-sm font-medium">{cast.name}</span>
                                  <div className="flex items-center">
                                    {cast.powerBadge && (
                                      <Badge variant="outline" className="mr-1 text-xs">
                                        <Star className="h-3 w-3 mr-1 text-yellow-500" />
                                        Power
                                      </Badge>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <div className="flex items-center text-sm">
                                  <ThumbsUp className="mr-1 h-4 w-4 text-blue-500" />
                                  {cast.likesCount}
                                </div>
                                <div className="flex items-center text-sm">
                                  <Repeat className="mr-1 h-4 w-4 text-green-500" />
                                  {cast.recastsCount}
                                </div>
                                <div className="flex items-center text-sm">
                                  <MessageSquare className="mr-1 h-4 w-4 text-purple-500" />
                                  {cast.repliesCount}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <a href={cast.castLink} target="_blank" rel="noopener noreferrer">
                                  <Button variant="ghost" size="icon">
                                    <ExternalLink className="h-4 w-4" />
                                    <span className="sr-only">View on Warpcast</span>
                                  </Button>
                                </a>
                                <Button variant="ghost" size="icon" onClick={() => setSelectedCast(cast)}>
                                  <Search className="h-4 w-4" />
                                  <span className="sr-only">View Details</span>
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between mt-4">
                  <div className="text-sm text-muted-foreground">
                    Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredData.length)} of{" "}
                    {filteredData.length} entries
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </Button>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                        let pageNumber = i + 1
                        if (totalPages > 5 && currentPage > 3) {
                          pageNumber = currentPage - 3 + i
                          if (pageNumber > totalPages) {
                            pageNumber = totalPages - (4 - i)
                          }
                        }
                        return (
                          <Button
                            key={i}
                            variant={currentPage === pageNumber ? "default" : "outline"}
                            size="sm"
                            onClick={() => setCurrentPage(pageNumber)}
                            className="w-8 h-8"
                          >
                            {pageNumber}
                          </Button>
                        )
                      })}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Engagement Analysis Tab */}
          <TabsContent value="engagement" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Engagement by Cast</CardTitle>
                  <CardDescription>Comparison of likes, recasts, and replies</CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <ChartContainer
                    config={{
                      likes: {
                        label: "Likes",
                        color: "hsl(var(--chart-1))",
                      },
                      recasts: {
                        label: "Recasts",
                        color: "hsl(var(--chart-2))",
                      },
                      replies: {
                        label: "Replies",
                        color: "hsl(var(--chart-3))",
                      },
                    }}
                    className="h-full"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={engagementByTypeData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="id" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Legend />
                        <Bar dataKey="likes" fill="var(--color-likes)" />
                        <Bar dataKey="recasts" fill="var(--color-recasts)" />
                        <Bar dataKey="replies" fill="var(--color-replies)" />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Total Engagement Distribution</CardTitle>
                  <CardDescription>Breakdown of engagement types</CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <ChartContainer
                    config={{
                      likes: {
                        label: "Likes",
                        color: "hsl(var(--chart-1))",
                      },
                      recasts: {
                        label: "Recasts",
                        color: "hsl(var(--chart-2))",
                      },
                      replies: {
                        label: "Replies",
                        color: "hsl(var(--chart-3))",
                      },
                    }}
                    className="h-full"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={[
                          {
                            name: "Engagement Distribution",
                            likes: filteredData.reduce((sum, cast) => sum + cast.likesCount, 0),
                            recasts: filteredData.reduce((sum, cast) => sum + cast.recastsCount, 0),
                            replies: filteredData.reduce((sum, cast) => sum + cast.repliesCount, 0),
                          },
                        ]}
                        layout="vertical"
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis dataKey="name" type="category" hide />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Legend />
                        <Bar dataKey="likes" fill="var(--color-likes)" />
                        <Bar dataKey="recasts" fill="var(--color-recasts)" />
                        <Bar dataKey="replies" fill="var(--color-replies)" />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Engagement Metrics</CardTitle>
                <CardDescription>Detailed breakdown of engagement performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">Likes</p>
                        <p className="text-sm text-muted-foreground">
                          {filteredData.reduce((sum, cast) => sum + cast.likesCount, 0)} total
                        </p>
                      </div>
                      <div className="font-bold">
                        {(
                          (filteredData.reduce((sum, cast) => sum + cast.likesCount, 0) / totalEngagement) *
                          100
                        ).toFixed(1)}
                        %
                      </div>
                    </div>
                    <Progress
                      value={(filteredData.reduce((sum, cast) => sum + cast.likesCount, 0) / totalEngagement) * 100}
                      className="h-2 mt-2"
                    />
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">Recasts</p>
                        <p className="text-sm text-muted-foreground">
                          {filteredData.reduce((sum, cast) => sum + cast.recastsCount, 0)} total
                        </p>
                      </div>
                      <div className="font-bold">
                        {(
                          (filteredData.reduce((sum, cast) => sum + cast.recastsCount, 0) / totalEngagement) *
                          100
                        ).toFixed(1)}
                        %
                      </div>
                    </div>
                    <Progress
                      value={(filteredData.reduce((sum, cast) => sum + cast.recastsCount, 0) / totalEngagement) * 100}
                      className="h-2 mt-2"
                    />
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">Replies</p>
                        <p className="text-sm text-muted-foreground">
                          {filteredData.reduce((sum, cast) => sum + cast.repliesCount, 0)} total
                        </p>
                      </div>
                      <div className="font-bold">
                        {(
                          (filteredData.reduce((sum, cast) => sum + cast.repliesCount, 0) / totalEngagement) *
                          100
                        ).toFixed(1)}
                        %
                      </div>
                    </div>
                    <Progress
                      value={(filteredData.reduce((sum, cast) => sum + cast.repliesCount, 0) / totalEngagement) * 100}
                      className="h-2 mt-2"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* User Profiles Tab */}
          <TabsContent value="users" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {userLeaderboard.map((user) => (
                <Card key={user.name}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-base">{user.name}</CardTitle>
                        <CardDescription>FID: {user.fid}</CardDescription>
                      </div>
                      {user.powerBadge && (
                        <Badge variant="outline" className="ml-auto">
                          <Star className="h-3 w-3 mr-1 text-yellow-500" />
                          Power
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="space-y-1">
                        <p className="text-muted-foreground">Followers</p>
                        <p className="font-medium">{user.followerCount.toLocaleString()}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-muted-foreground">Casts</p>
                        <p className="font-medium">{user.castCount}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-muted-foreground">Total Engagement</p>
                        <p className="font-medium">{user.totalEngagement}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-muted-foreground">Avg. Engagement</p>
                        <p className="font-medium">{user.avgEngagement.toFixed(1)}</p>
                      </div>
                    </div>
                    <div className="mt-4 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">Neynar Score</p>
                        <p className="text-sm font-medium">{user.neynarScore.toFixed(2)}</p>
                      </div>
                      <Progress value={user.neynarScore * 100} className="h-2" />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full" onClick={() => setSelectedUser(user.name)}>
                      View Casts
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Cast Detail Dialog */}
      <Dialog open={!!selectedCast} onOpenChange={(open) => !open && setSelectedCast(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Cast Details</DialogTitle>
            <DialogDescription>Detailed information about this cast</DialogDescription>
          </DialogHeader>
          {selectedCast && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={selectedCast.avatar} alt={selectedCast.name} />
                  <AvatarFallback>{selectedCast.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{selectedCast.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {selectedCast.followerCount.toLocaleString()} followers
                  </p>
                </div>
                {selectedCast.powerBadge && (
                  <Badge variant="outline" className="ml-auto">
                    <Star className="h-3 w-3 mr-1 text-yellow-500" />
                    Power
                  </Badge>
                )}
              </div>
              <Separator />
              <div>
                <p className="whitespace-pre-wrap">{selectedCast.castText}</p>
                {selectedCast.embeddedImage && (
                  <div className="mt-4">
                    <img
                      src={selectedCast.embeddedImage || "/placeholder.svg"}
                      alt="Cast image"
                      className="rounded-md max-h-64 object-contain"
                    />
                  </div>
                )}
              </div>
              <Separator />
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="flex items-center justify-center">
                    <ThumbsUp className="h-5 w-5 text-blue-500 mr-2" />
                    <span className="text-xl font-bold">{selectedCast.likesCount}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Likes</p>
                </div>
                <div>
                  <div className="flex items-center justify-center">
                    <Repeat className="h-5 w-5 text-green-500 mr-2" />
                    <span className="text-xl font-bold">{selectedCast.recastsCount}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Recasts</p>
                </div>
                <div>
                  <div className="flex items-center justify-center">
                    <MessageSquare className="h-5 w-5 text-purple-500 mr-2" />
                    <span className="text-xl font-bold">{selectedCast.repliesCount}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Replies</p>
                </div>
              </div>
              <div className="flex justify-end">
                <a href={selectedCast.castLink} target="_blank" rel="noopener noreferrer">
                  <Button>
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View on Warpcast
                  </Button>
                </a>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

