"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Play, Trophy, Star, Music } from "lucide-react"
import Link from "next/link"

// Mock song data
const songs = [
  {
    id: 1,
    title: "Pixel Flow",
    difficulty: "Easy",
    duration: "1:45",
    image: "/placeholder.svg?height=100&width=100",
    color: "bg-primary",
  },
  {
    id: 2,
    title: "8-Bit Bars",
    difficulty: "Medium",
    duration: "2:10",
    image: "/placeholder.svg?height=100&width=100",
    color: "bg-secondary",
  },
  {
    id: 3,
    title: "Retro Rhymes",
    difficulty: "Hard",
    duration: "2:30",
    image: "/placeholder.svg?height=100&width=100",
    color: "bg-accent",
  },
  {
    id: 4,
    title: "Digital Drops",
    difficulty: "Expert",
    duration: "3:00",
    image: "/placeholder.svg?height=100&width=100",
    color: "bg-destructive",
  },
]

export default function SongSelection() {
  const router = useRouter()
  const [selectedSong, setSelectedSong] = useState<number | null>(null)

  const handleSelectSong = (id: number) => {
    setSelectedSong(id)
  }

  const handleStartGame = () => {
    if (selectedSong) {
      router.push(`/play/${selectedSong}`)
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-4 bg-black">
      <header className="w-full max-w-4xl flex justify-between items-center mb-8 mt-4">
        <h1 className="text-2xl font-pixel text-primary pixel-text">Select a Track</h1>
        <div className="flex gap-2">
          <Link href="/leaderboard">
            <Button variant="outline" className="pixel-borders bg-secondary h-10 px-3">
              <Trophy className="w-4 h-4 mr-2" />
              <span className="font-pixel text-xs">Ranks</span>
            </Button>
          </Link>
          <Link href="/">
            <Button variant="outline" className="pixel-borders h-10 px-3">
              <span className="font-pixel text-xs">Exit</span>
            </Button>
          </Link>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        {songs.map((song) => (
          <Card
            key={song.id}
            className={`pixel-container bg-black cursor-pointer transition-all duration-200 ${
              selectedSong === song.id ? "ring-4 ring-primary" : ""
            }`}
            onClick={() => handleSelectSong(song.id)}
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-pixel pixel-text flex justify-between">
                <span>{song.title}</span>
                <div className={`px-2 py-1 text-xs ${song.color} text-black rounded`}>{song.difficulty}</div>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex gap-4 items-center pb-2">
              <div className={`w-16 h-16 ${song.color} pixel-borders flex items-center justify-center`}>
                <Music className="w-8 h-8 text-black" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-accent" />
                  <Star className="w-4 h-4 text-accent" />
                  <Star className="w-4 h-4 text-accent" />
                  {song.difficulty === "Hard" || song.difficulty === "Expert" ? (
                    <Star className="w-4 h-4 text-accent" />
                  ) : (
                    <Star className="w-4 h-4 text-accent opacity-30" />
                  )}
                  {song.difficulty === "Expert" ? (
                    <Star className="w-4 h-4 text-accent" />
                  ) : (
                    <Star className="w-4 h-4 text-accent opacity-30" />
                  )}
                </div>
                <p className="font-pixel text-xs">Duration: {song.duration}</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className={`w-full ${song.color} text-black font-pixel text-xs h-8 pixel-borders`}
                onClick={() => handleSelectSong(song.id)}
              >
                <Play className="w-4 h-4 mr-2" />
                Select Track
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-8 w-full max-w-4xl">
        <Button className="w-full pixel-button text-lg py-4 h-auto" disabled={!selectedSong} onClick={handleStartGame}>
          Start Rap Battle
        </Button>
      </div>
    </main>
  )
}

