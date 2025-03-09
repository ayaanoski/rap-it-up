"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Music, Play, Star, Disc, Home, Volume2 } from "lucide-react";
import Link from "next/link";
import axios from "axios";

export default function SongSelection() {
  const router = useRouter();
  const [songs, setSongs] = useState<any[]>([]);
  const [selectedSong, setSelectedSong] = useState<string | null>(null);
  const [hoveredSong, setHoveredSong] = useState<string | null>(null);
  const [animateItems, setAnimateItems] = useState(false);

  const fetchSongs = async () => {
    try {
      const { data } = await axios.get("/api/songs");
      setSongs(data.data);
      // Trigger animation after data loads
      setTimeout(() => setAnimateItems(true), 100);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchSongs();
  }, []);

  const handleSelectSong = (id: string) => {
    setSelectedSong(id);
  };

  const handleStartGame = () => {
    if (selectedSong) {
      router.push(`/play/${selectedSong}`);
    }
  };

  const getAnimationDelay = (index: number) => {
    return `${index * 100}ms`;
  };

  const getDifficultyColor = (difficulty: string) => {
    const baseColors = {
      Easy: "bg-green-400",
      Medium: "bg-yellow-400",
      Hard: "bg-orange-500",
      Expert: "bg-red-500"
    };
    return baseColors[difficulty as keyof typeof baseColors] || "bg-yellow-400";
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 h-full w-full">
          {Array.from({ length: 12 }).map((_, index) => (
            <div
              key={index}
              className="relative w-full h-full rounded-lg overflow-hidden transform transition-transform duration-3000 hover:scale-110"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <img
                src={`/Pixelart/pixel${(index % 9) + 1}.png`}
                alt={`Pixel Art ${index + 1}`}
                className="w-full h-full object-cover opacity-70 hover:opacity-100 transition-opacity duration-500"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Gradient overlay with animated pulse */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/70 via-yellow-900/50 to-orange-900/70 z-10 animate-gradient-slow"></div>
      
      {/* Floating particles */}
      <div className="absolute inset-0 z-15 pointer-events-none overflow-hidden">
        {Array.from({ length: 15 }).map((_, i) => (
          <div 
            key={i}
            className="absolute w-1 h-1 bg-yellow-400/60 rounded-full animate-float-slow"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${5 + Math.random() * 10}s`,
              animationDelay: `${Math.random() * 5}s`
            }}
          ></div>
        ))}
      </div>

      <div className="relative z-20 w-full max-w-4xl">
        <header className="flex justify-between items-center mb-8 mt-4">
          <div className="relative group">
            <h1 className="text-3xl font-pixel text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-400 to-orange-300 animate-text-shimmer">
              Select a Track
            </h1>
            <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-yellow-400 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
          </div>
          <div className="flex gap-2">
            <Link href="/leaderboard">
              <Button
                variant="outline"
                className="pixel-borders bg-yellow-900/30 text-yellow-400 border-yellow-400/40 hover:bg-yellow-400/30 h-10 px-3 transition-all duration-300 hover:scale-105"
              >
                <Trophy className="w-4 h-4 mr-2 animate-pulse animation-delay-2000" />
                <span className="font-pixel text-xs">Ranks</span>
              </Button>
            </Link>
            <Link href="/">
              <Button
                variant="outline"
                className="pixel-borders bg-yellow-900/30 text-yellow-400 border-yellow-400/40 hover:bg-yellow-400/30 h-10 px-3 transition-all duration-300 hover:scale-105"
              >
                <Home className="w-4 h-4 mr-2" />
                <span className="font-pixel text-xs">Exit</span>
              </Button>
            </Link>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {songs.map((song, index) => (
            <Card
              key={song._id}
              className={`pixel-container bg-black/80 backdrop-blur-sm border-2 
                ${selectedSong === song._id 
                  ? "border-yellow-400 shadow-lg shadow-yellow-400/30" 
                  : hoveredSong === song._id 
                    ? "border-yellow-400/60" 
                    : "border-yellow-400/20"} 
                cursor-pointer transition-all duration-300 transform 
                ${selectedSong === song._id ? "scale-102" : "hover:scale-102"} 
                ${animateItems ? 'animate-slide-in' : 'opacity-0 translate-y-4'} overflow-hidden`}
              onClick={() => handleSelectSong(song._id)}
              onMouseEnter={() => setHoveredSong(song._id)}
              onMouseLeave={() => setHoveredSong(null)}
              style={{ animationDelay: getAnimationDelay(index) }}
            >
              {/* Pulsing border overlay for selected song */}
              {selectedSong === song._id && (
                <div className="absolute inset-0 border-2 border-yellow-400/60 animate-border-pulse rounded-lg"></div>
              )}
              
              <CardHeader className="pb-2 relative">
                <CardTitle className="text-lg font-pixel pixel-text flex justify-between items-center">
                  <span className={`text-yellow-400 truncate ${hoveredSong === song._id || selectedSong === song._id ? 'animate-text-shimmer text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-400 to-orange-300' : ''}`}>
                    {song.songName}
                  </span>
                  <div className={`px-2 py-1 text-xs ${song.color || getDifficultyColor(song.difficulty)} text-black rounded font-bold shadow-sm transform transition-transform duration-300 ${hoveredSong === song._id ? 'scale-110' : ''}`}>
                    {song.difficulty}
                  </div>
                </CardTitle>
                {/* Progress track accent line */}
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-yellow-400/40 to-transparent"></div>
              </CardHeader>
              
              <CardContent className="flex gap-4 items-center pb-2">
                <div className={`w-16 h-16 ${song.color || getDifficultyColor(song.difficulty)} pixel-borders flex items-center justify-center overflow-hidden relative group shadow-md transform transition-transform duration-300 ${hoveredSong === song._id ? 'scale-110 rotate-3' : ''}`}>
                  {song.image ? (
                    <img 
                      src={song.image} 
                      alt={`${song.songName} cover`} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="relative">
                      <Disc className={`w-8 h-8 text-black ${hoveredSong === song._id ? 'animate-spin-slow' : ''}`} />
                      <Music className="w-4 h-4 text-black absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                    </div>
                  )}
                  
                  {/* Vinyl record effect */}
                  <div className="absolute inset-0 rounded-full bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="w-4 h-4 rounded-full border-2 border-black/60 group-hover:animate-spin-slow"></div>
                  </div>
                </div>
                
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 transition-all duration-300 
                          ${hoveredSong === song._id && i < { Easy: 2, Medium: 3, Hard: 4, Expert: 5 }[song.difficulty] 
                            ? 'scale-125 text-yellow-300 animate-pulse-fast' 
                            : ''} 
                          ${i < { Easy: 2, Medium: 3, Hard: 4, Expert: 5 }[song.difficulty]
                            ? "text-yellow-400"
                            : "text-yellow-400/20"}`}
                      />
                    ))}
                  </div>
                  <p className="font-pixel text-xs text-yellow-400/80 group-hover:text-yellow-400">{song.artist}</p>
                  {/* Audio visualization bars (decorative) */}
                  {(hoveredSong === song._id || selectedSong === song._id) && (
                    <div className="flex items-end h-3 gap-0.5 mt-1">
                      {Array.from({ length: 12 }).map((_, i) => (
                        <div 
                          key={i}
                          className={`w-1 ${song.color || getDifficultyColor(song.difficulty)}/60 animate-eq-bar rounded-sm`}
                          style={{ 
                            height: `${Math.random() * 100}%`,
                            animationDuration: `${0.5 + Math.random() * 1}s`
                          }}
                        ></div>
                      ))}
                    </div>
                  )}
                </div>
                
                {/* Volume indicator on hover */}
                {hoveredSong === song._id && (
                  <Volume2 className="w-4 h-4 text-yellow-400/70 animate-pulse mr-1" />
                )}
              </CardContent>
              
              <CardFooter className="pt-1">
                <Button
                  className={`w-full ${song.color || getDifficultyColor(song.difficulty)} text-black font-pixel text-xs h-8 pixel-borders hover:brightness-110 transition-all duration-300 group relative overflow-hidden`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectSong(song._id);
                  }}
                >
                  <div className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                  <Play className={`w-4 h-4 mr-2 ${hoveredSong === song._id ? 'animate-bounce-small' : ''}`} />
                  <span className="relative z-10">Select Track</span>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-10 w-full flex justify-center">
          <Button
            className={`bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400 hover:from-yellow-500 hover:via-orange-500 hover:to-yellow-500 
              text-black font-pixel text-base uppercase tracking-wider h-12 pixel-borders transition-all duration-300 
              disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-yellow-400 disabled:hover:via-orange-400 disabled:hover:to-yellow-400
              shadow-lg shadow-orange-500/20 hover:shadow-yellow-400/30 px-8 py-2 
              ${selectedSong ? 'animate-pulse-subtle transform hover:scale-105' : ''}`}
            onClick={handleStartGame}
            disabled={!selectedSong}
          >
            {selectedSong ? (
              <>
                <Play className="w-5 h-5 mr-2 animate-bounce-small" />
                Start Game
              </>
            ) : (
              "Select a Track"
            )}
          </Button>
        </div>
      </div>
    </main>
  );
}