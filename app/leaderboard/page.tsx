"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Trophy, Medal, Star } from "lucide-react"

// Mock leaderboard data
const leaderboardData = {
  daily: [
    { rank: 1, name: "pixel_master", score: 950, level: 42 },
    { rank: 2, name: "rap_god_8bit", score: 920, level: 38 },
    { rank: 3, name: "retro_rhymer", score: 890, level: 35 },
    { rank: 4, name: "flow_pixel", score: 850, level: 30 },
    { rank: 5, name: "bit_spitter", score: 820, level: 28 },
    { rank: 6, name: "digital_mc", score: 790, level: 25 },
    { rank: 7, name: "arcade_flow", score: 760, level: 23 },
    { rank: 8, name: "8bit_bars", score: 730, level: 20 },
    { rank: 9, name: "pixel_poet", score: 700, level: 18 },
    { rank: 10, name: "retro_rapper", score: 670, level: 15 },
  ],
  weekly: [
    { rank: 1, name: "pixel_legend", score: 9800, level: 50 },
    { rank: 2, name: "rap_master", score: 9500, level: 48 },
    { rank: 3, name: "flow_king", score: 9200, level: 45 },
    { rank: 4, name: "bit_crusher", score: 8900, level: 43 },
    { rank: 5, name: "pixel_master", score: 8600, level: 42 },
    { rank: 6, name: "rap_god_8bit", score: 8300, level: 38 },
    { rank: 7, name: "retro_rhymer", score: 8000, level: 35 },
    { rank: 8, name: "flow_pixel", score: 7700, level: 30 },
    { rank: 9, name: "bit_spitter", score: 7400, level: 28 },
    { rank: 10, name: "digital_mc", score: 7100, level: 25 },
  ],
  allTime: [
    { rank: 1, name: "pixel_legend", score: 52000, level: 50 },
    { rank: 2, name: "rap_master", score: 48000, level: 48 },
    { rank: 3, name: "flow_king", score: 45000, level: 45 },
    { rank: 4, name: "bit_crusher", score: 42000, level: 43 },
    { rank: 5, name: "pixel_master", score: 39000, level: 42 },
    { rank: 6, name: "rap_god_8bit", score: 36000, level: 38 },
    { rank: 7, name: "retro_rhymer", score: 33000, level: 35 },
    { rank: 8, name: "flow_pixel", score: 30000, level: 30 },
    { rank: 9, name: "bit_spitter", score: 27000, level: 28 },
    { rank: 10, name: "digital_mc", score: 24000, level: 25 },
  ],
}

export default function Leaderboard() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("daily")

  const getRankColor = (rank: number) => {
    if (rank === 1) return "text-yellow-400"
    if (rank === 2) return "text-gray-300"
    if (rank === 3) return "text-amber-600"
    return "text-white"
  }

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="w-5 h-5 text-yellow-400" />
    if (rank === 2) return <Medal className="w-5 h-5 text-gray-300" />
    if (rank === 3) return <Medal className="w-5 h-5 text-amber-600" />
    return <span className="font-pixel text-sm">{rank}</span>
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-4 bg-black">
      <header className="w-full max-w-4xl flex justify-between items-center mb-8 mt-4">
        <Button variant="ghost" onClick={() => router.back()}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          <span className="font-pixel text-xs">Back</span>
        </Button>
        <h1 className="text-2xl font-pixel text-primary pixel-text">Leaderboard</h1>
        <div className="w-10"></div> {/* Spacer for centering */}
      </header>

      <Card className="w-full max-w-4xl pixel-container bg-black">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-pixel text-center pixel-text">Top Rappers</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="daily" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="daily" className="font-pixel text-xs">
                Daily
              </TabsTrigger>
              <TabsTrigger value="weekly" className="font-pixel text-xs">
                Weekly
              </TabsTrigger>
              <TabsTrigger value="allTime" className="font-pixel text-xs">
                All Time
              </TabsTrigger>
            </TabsList>

            {["daily", "weekly", "allTime"].map((period) => (
              <TabsContent key={period} value={period} className="space-y-4">
                <div className="grid grid-cols-12 gap-2 font-pixel text-xs text-muted-foreground mb-2 px-2">
                  <div className="col-span-1">Rank</div>
                  <div className="col-span-5">Name</div>
                  <div className="col-span-3 text-right">Score</div>
                  <div className="col-span-3 text-right">Level</div>
                </div>

                {leaderboardData[period as keyof typeof leaderboardData].map((entry) => (
                  <div
                    key={entry.rank}
                    className={`grid grid-cols-12 gap-2 items-center p-2 pixel-container bg-black ${
                      entry.rank <= 3 ? "border-accent" : ""
                    }`}
                  >
                    <div className="col-span-1 flex justify-center">{getRankIcon(entry.rank)}</div>
                    <div className={`col-span-5 font-pixel text-sm ${getRankColor(entry.rank)}`}>{entry.name}</div>
                    <div className="col-span-3 font-pixel text-sm text-right">{entry.score.toLocaleString()}</div>
                    <div className="col-span-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <span className="font-pixel text-sm">{entry.level}</span>
                        <Star className="w-3 h-3 text-accent" />
                      </div>
                    </div>
                  </div>
                ))}
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      <div className="w-full max-w-4xl mt-8">
        <Button className="w-full pixel-button" onClick={() => router.push("/songs")}>
          Start Rapping
        </Button>
      </div>
    </main>
  )
}

