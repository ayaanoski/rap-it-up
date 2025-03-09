"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Trophy, Medal, Star, Crown, Sparkles } from "lucide-react";

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
};

export default function Leaderboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("daily");
  const [animateItems, setAnimateItems] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    setAnimateItems(true);
    
    // Reset animation when tab changes to trigger it again
    const resetAnimation = () => {
      setAnimateItems(false);
      setTimeout(() => setAnimateItems(true), 50);
    };
    
    resetAnimation();
  }, [activeTab]);

  const getRankColor = (rank: number) => {
    if (rank === 1) return "text-yellow-400";
    if (rank === 2) return "text-orange-300";
    if (rank === 3) return "text-amber-600";
    return "text-white";
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="w-6 h-6 text-yellow-400" />;
    if (rank === 2) return <Trophy className="w-5 h-5 text-orange-300" />;
    if (rank === 3) return <Medal className="w-5 h-5 text-amber-600" />;
    return <span className="font-pixel text-sm opacity-70">{rank}</span>;
  };

  const getAnimationDelay = (index: number) => {
    return `${index * 50}ms`;
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-4 bg-gradient-to-br from-purple-900 via-yellow-900/50 to-orange-900/50 bg-fixed">
      {/* Particle effect overlay */}
      <div className="fixed inset-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute w-2 h-2 bg-yellow-400 rounded-full top-1/4 left-1/4 animate-pulse-slow"></div>
        <div className="absolute w-2 h-2 bg-orange-400 rounded-full top-3/4 left-1/3 animate-pulse-slow animation-delay-500"></div>
        <div className="absolute w-1 h-1 bg-yellow-300 rounded-full top-1/2 left-1/2 animate-pulse-slow animation-delay-1000"></div>
        <div className="absolute w-2 h-2 bg-amber-400 rounded-full top-1/3 right-1/4 animate-pulse-slow animation-delay-1500"></div>
        <div className="absolute w-1 h-1 bg-orange-300 rounded-full bottom-1/4 right-1/3 animate-pulse-slow animation-delay-2000"></div>
      </div>

      <header className="w-full max-w-4xl flex justify-between items-center mb-8 mt-4 z-10">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="font-pixel text-xs text-yellow-400 hover:bg-yellow-400/20 transition-all duration-300"
        >
          <ArrowLeft className="w-4 h-4 mr-2 text-yellow-400" />
          <span className="font-pixel text-xs">Back</span>
        </Button>
        <div className="relative">
          <h1 className="text-3xl font-pixel text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-400 to-amber-300 animate-text-shimmer">
            LEADERBOARD
          </h1>
          <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>
        </div>
        <div className="w-10"></div> {/* Spacer for centering */}
      </header>

      <Card className="w-full max-w-4xl pixel-container bg-black/70 backdrop-blur-md border-2 border-yellow-400/40 shadow-lg shadow-yellow-600/20 z-10 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400"></div>
        
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl font-pixel text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-400 to-amber-300 p-1">
            <Sparkles className="w-6 h-6 inline-block mr-2 text-yellow-400 animate-pulse" />
            Top Rappers
            <Sparkles className="w-6 h-6 inline-block ml-2 text-yellow-400 animate-pulse animation-delay-500" />
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          <Tabs defaultValue="daily" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 mb-6 bg-gradient-to-r from-yellow-900/70 via-orange-900/70 to-yellow-900/70 border border-yellow-400/30 p-1 rounded-lg">
              {["daily", "weekly", "allTime"].map((tab, index) => (
                <TabsTrigger
                  key={tab}
                  value={tab}
                  className="font-pixel text-xs text-yellow-400 uppercase tracking-wide transition-all duration-300 
                    data-[state=active]:bg-gradient-to-br data-[state=active]:from-yellow-500/20 data-[state=active]:to-orange-500/20 
                    data-[state=active]:text-yellow-300 data-[state=active]:shadow-inner data-[state=active]:shadow-yellow-400/30
                    data-[state=active]:border data-[state=active]:border-yellow-400/30 rounded-md"
                >
                  {tab === "allTime" ? "All Time" : tab}
                </TabsTrigger>
              ))}
            </TabsList>

            {["daily", "weekly", "allTime"].map((period) => (
              <TabsContent key={period} value={period} className="space-y-4">
                <div className="grid grid-cols-12 gap-2 font-pixel text-xs text-yellow-400/80 mb-3 px-3 border-b border-yellow-400/20 pb-2">
                  <div className="col-span-1">Rank</div>
                  <div className="col-span-5">Name</div>
                  <div className="col-span-3 text-right">Score</div>
                  <div className="col-span-3 text-right">Level</div>
                </div>

                <div className="space-y-3">
                  {leaderboardData[period as keyof typeof leaderboardData].map((entry, index) => (
                    <div
                      key={entry.rank}
                      className={`grid grid-cols-12 gap-2 items-center p-3 pixel-container 
                        ${entry.rank <= 3 
                          ? `bg-gradient-to-r ${entry.rank === 1 ? 'from-yellow-900/40 to-amber-900/40' : 
                             entry.rank === 2 ? 'from-orange-900/30 to-amber-900/30' : 
                             'from-amber-900/20 to-yellow-900/20'}`
                          : 'bg-black/60'} 
                        border-2 ${
                          entry.rank === 1 ? "border-yellow-400/70" : 
                          entry.rank === 2 ? "border-orange-300/60" : 
                          entry.rank === 3 ? "border-amber-600/50" : 
                          "border-yellow-400/10"
                        } rounded-lg transform transition-all duration-300 hover:translate-x-1 hover:shadow-md hover:shadow-yellow-400/20
                        ${animateItems ? 'animate-slide-in-right opacity-100' : 'opacity-0'}`}
                      style={{animationDelay: getAnimationDelay(index)}}
                    >
                      <div className="col-span-1 flex justify-center">{getRankIcon(entry.rank)}</div>
                      <div className={`col-span-5 font-pixel text-base ${getRankColor(entry.rank)}`}>
                        {entry.name}
                      </div>
                      <div className="col-span-3 font-pixel text-sm text-right">
                        <span className={`${getRankColor(entry.rank)} font-bold`}>
                          {entry.score.toLocaleString()}
                        </span>
                      </div>
                      <div className="col-span-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <span className="font-pixel text-sm text-yellow-400/90">{entry.level}</span>
                          <Star className={`w-4 h-4 ${
                            entry.rank <= 3 ? 'text-yellow-400 animate-pulse' : 'text-yellow-400/70'
                          }`} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      <div className="w-full max-w-4xl mt-8 z-10">
        <Button
          className="w-full pixel-button bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400 hover:from-yellow-500 hover:via-orange-600 hover:to-yellow-500 
            text-black font-pixel text-lg uppercase tracking-wider font-bold py-6 shadow-lg shadow-orange-600/30 hover:shadow-xl hover:shadow-orange-500/40
            transition-all duration-300 transform hover:translate-y-1 animate-text-shimmer border border-yellow-300/50"
          onClick={() => router.push("/songs")}
        >
          <span className="relative">
            Start Rapping
            <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-black/30"></span>
          </span>
        </Button>
      </div>
    </main>
  );
}