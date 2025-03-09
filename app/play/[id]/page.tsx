"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Mic, MicOff, Volume2, VolumeX, ArrowLeft, Play, Pause, SkipBack, SkipForward, Music } from 'lucide-react'
import Image from "next/image"

// Define types for song data
interface SongData {
  songName: string
  artist: string
  cloudinaryUrl: string
  image?: string
  genre?: string
}

interface LyricsData {
  lyrics: string[]
}

// Fetch song data from MongoDB
const fetchSongData = async (id: string): Promise<SongData | null> => {
  try {
    const response = await fetch(`/api/songs/${id}`);
    if (!response.ok) throw new Error('Failed to fetch song data');
    return await response.json();
  } catch (error) {
    console.error('Error fetching song data:', error);
    return null;
  }
}

// Fetch lyrics data
const fetchLyrics = async (songName: string): Promise<LyricsData> => {
  try {
    const response = await fetch(`/api/lyrics?song=${encodeURIComponent(songName)}`);
    if (!response.ok) throw new Error('Failed to fetch lyrics');
    return await response.json();
  } catch (error) {
    console.error('Error fetching lyrics:', error);
    // Return placeholder lyrics if fetch fails
    return {
      lyrics: [
        "This is a placeholder for lyrics",
        "Loading lyrics failed",
        "Please try again later"
      ]
    };
  }
}

export default function PlaySong({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { id } = params
  
  // State variables
  const [song, setSong] = useState<SongData | null>(null)
  const [lyrics, setLyrics] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string>("")
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [currentLyricIndex, setCurrentLyricIndex] = useState(0)
  const [isMuted, setIsMuted] = useState(false)
  const [micEnabled, setMicEnabled] = useState(false)
  const [volume, setVolume] = useState(1)
  
  // References
  const videoRef = useRef<HTMLVideoElement>(null)
  const progressBarRef = useRef<HTMLDivElement>(null)
  const micStreamRef = useRef<MediaStream | null>(null)
  const audioVisualizerRef = useRef<number[]>([])
  
  // Generate random audio visualizer bars
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        audioVisualizerRef.current = Array(20).fill(0).map(() => Math.random() * 100);
        // Force re-render
        setCurrentTime(prev => {
          if (videoRef.current) {
            return videoRef.current.currentTime;
          }
          return prev;
        });
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isPlaying]);
  
  // Fetch song data on component mount
  useEffect(() => {
    const loadSongData = async () => {
      setIsLoading(true)
      try {
        const songData = await fetchSongData(id)
        if (songData) {
          setSong(songData)
          
          // Fetch lyrics after getting song data
          const lyricsData = await fetchLyrics(songData.songName)
          if (lyricsData && lyricsData.lyrics) {
            setLyrics(lyricsData.lyrics)
          }
        }
      } catch (err) {
        console.error("Error loading song data:", err)
        setError("Failed to load song. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }
    
    loadSongData()
  }, [id])
  
  // Initialize video element once data is loaded
  useEffect(() => {
    if (!song || !videoRef.current) return
    
    // Set up video element
    if (song.cloudinaryUrl) {
      videoRef.current.src = song.cloudinaryUrl
      
      videoRef.current.addEventListener('loadedmetadata', () => {
        if (videoRef.current) {
          setDuration(videoRef.current.duration)
        }
      })
      
      videoRef.current.addEventListener('timeupdate', updateProgress)
    }
    
    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener('timeupdate', updateProgress)
      }
    }
  }, [song])
  
  // Update time progress and current lyric
  const updateProgress = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime)
      
      // Update current lyric based on time
      if (lyrics.length > 0 && videoRef.current.duration > 0) {
        const lyricIndex = Math.floor((videoRef.current.currentTime / videoRef.current.duration) * lyrics.length)
        setCurrentLyricIndex(Math.min(lyricIndex, lyrics.length - 1))
      }
    }
  }
  
  // Handle play/pause
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
          .catch(e => {
            console.error("Error playing video:", e)
            setError("Couldn't play the song. Please try again.")
          })
      }
      setIsPlaying(!isPlaying)
    }
  }
  
  // Handle seek when user clicks on progress bar
  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current || !progressBarRef.current) return
    
    const progressBar = progressBarRef.current
    const rect = progressBar.getBoundingClientRect()
    const seekPosition = (e.clientX - rect.left) / rect.width
    
    videoRef.current.currentTime = seekPosition * duration
    setCurrentTime(videoRef.current.currentTime)
  }
  
  // Handle volume change
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    if (videoRef.current) {
      videoRef.current.volume = newVolume
    }
    
    // Unmute if volume is changed and was previously muted
    if (isMuted && newVolume > 0) {
      setIsMuted(false)
      if (videoRef.current) {
        videoRef.current.muted = false
      }
    }
  }
  
  // Handle mute toggle
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
    }
    setIsMuted(!isMuted)
  }
  
  // Skip forward/backward
  const skip = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.min(
        Math.max(videoRef.current.currentTime + seconds, 0),
        duration
      )
    }
  }
  
  // Toggle microphone for karaoke
  const toggleMic = async () => {
    if (micEnabled) {
      if (micStreamRef.current) {
        micStreamRef.current.getTracks().forEach((track) => track.stop())
        micStreamRef.current = null
      }
      setMicEnabled(false)
      return
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      micStreamRef.current = stream
      setMicEnabled(true)
    } catch (err) {
      console.error("Error accessing microphone:", err)
      setError("Could not access microphone. Please check permissions.")
    }
  }
  
  // Format time in MM:SS format
  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60)
    const seconds = Math.floor(timeInSeconds % 60)
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  }
  
  // Get primary color based on genre
  const getPrimaryColor = () => {
    if (!song || !song.genre) return "from-purple-600 to-blue-600";
    
    switch (song.genre.toLowerCase()) {
      case "hip hop":
      case "rap":
        return "from-yellow-500 to-red-600";
      case "pop":
        return "from-pink-500 to-purple-600";
      case "rock":
        return "from-red-600 to-orange-600";
      case "jazz":
        return "from-indigo-600 to-blue-600";
      case "electronic":
        return "from-blue-400 to-teal-500";
      default:
        return "from-purple-600 to-blue-600";
    }
  }
  
  // Loading state
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-black to-gray-900">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin">
            <Music size={40} className="text-white" />
          </div>
          <p className="text-white text-lg animate-pulse">Loading your song...</p>
        </div>
      </div>
    )
  }
  
  // Error state
  if (error || !song) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-black to-gray-900">
        <div className="bg-black/50 p-8 rounded-2xl backdrop-blur-lg border border-red-500/30">
          <p className="text-red-400 text-lg mb-4">{error || "Song not found"}</p>
          <Button onClick={() => router.push("/songs")} className="bg-white text-black hover:bg-white/80">
            Return to Songs
          </Button>
        </div>
      </div>
    )
  }
  
  const gradientColor = getPrimaryColor();
  
  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white overflow-hidden">
      {/* Background glow effect */}
      <div className={`absolute top-1/4 left-1/2 w-96 h-96 rounded-full bg-gradient-to-r ${gradientColor} opacity-20 blur-3xl -translate-x-1/2 -translate-y-1/2 z-0`}></div>
      
      <div className="relative z-10 container mx-auto px-4 py-6">
        {/* Header */}
        <header className="flex justify-between items-center mb-12">
          <Button 
            variant="ghost" 
            onClick={() => router.push("/songs")}
            className="text-white hover:bg-white/10 transition-all"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            <span>Back</span>
          </Button>
          
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMute}
              className="rounded-full bg-white/10 backdrop-blur-lg hover:bg-white/20 text-white"
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={`rounded-full backdrop-blur-lg ${micEnabled ? "bg-gradient-to-r " + gradientColor : "bg-white/10 hover:bg-white/20"} text-white`}
              onClick={toggleMic}
            >
              {micEnabled ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
            </Button>
          </div>
        </header>
        
        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left side - Album art and controls */}
          <div className="flex flex-col items-center">
            {/* Song info */}
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">{song.songName}</h1>
              <p className="text-gray-400 mt-2">{song.artist}</p>
            </div>
            
            {/* Album art with glow */}
            <div className="relative mb-10 group">
              <div className={`absolute inset-0 bg-gradient-to-r ${gradientColor} rounded-xl blur-xl opacity-40 group-hover:opacity-60 transition-opacity`}></div>
              <div className="relative rounded-xl overflow-hidden shadow-2xl border border-white/10 w-72 h-72">
                {song.image ? (
                  <Image 
                    src={song.image} 
                    alt={song.songName}
                    width={400}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br ${gradientColor}`}>
                    <Music size={80} className="text-white/80" />
                  </div>
                )}
                
                {/* Audio visualizer overlay */}
                {isPlaying && (
                  <div className="absolute bottom-0 left-0 right-0 h-20 flex items-end justify-center space-x-1 px-4">
                    {audioVisualizerRef.current.map((height, i) => (
                      <div
                        key={i}
                        className="w-1 bg-white/80 rounded-t-full"
                        style={{
                          height: `${height}%`,
                          maxHeight: "100%",
                          transition: "height 0.1s ease"
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            {/* Progress bar */}
            <div className="w-full max-w-md mb-6">
              <div className="flex justify-between items-center mb-2 text-sm text-gray-400">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
              <div 
                className="w-full h-2 bg-white/10 rounded-full relative cursor-pointer overflow-hidden group"
                ref={progressBarRef}
                onClick={handleSeek}
              >
                <div 
                  className={`h-full bg-gradient-to-r ${gradientColor} group-hover:brightness-110 transition-all`}
                  style={{ width: `${(currentTime / duration) * 100}%` }}
                ></div>
              </div>
            </div>
            
            {/* Playback controls */}
            <div className="flex items-center gap-4 mb-8">
              <Button 
                variant="ghost" 
                className="rounded-full w-12 h-12 bg-white/10 backdrop-blur-lg hover:bg-white/20 text-white"
                onClick={() => skip(-10)}
              >
                <SkipBack size={20} />
              </Button>
              
              <Button
                className={`rounded-full w-16 h-16 flex items-center justify-center bg-gradient-to-r ${gradientColor} hover:brightness-110 transition-all`}
                onClick={togglePlay}
              >
                {isPlaying ? <Pause size={28} /> : <Play size={28} className="ml-1" />}
              </Button>
              
              <Button 
                variant="ghost" 
                className="rounded-full w-12 h-12 bg-white/10 backdrop-blur-lg hover:bg-white/20 text-white"
                onClick={() => skip(10)}
              >
                <SkipForward size={20} />
              </Button>
            </div>
            
            {/* Volume slider */}
            <div className="w-full max-w-md flex items-center gap-3">
              <Volume2 size={16} className="text-gray-400" />
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                className="flex-grow h-1 appearance-none bg-white/20 rounded-full cursor-pointer accent-white"
              />
            </div>
            
            {/* Hidden video for audio playback */}
            <div className="hidden">
              <video ref={videoRef} playsInline controls={false} />
            </div>
          </div>
          
          {/* Right side - Lyrics */}
          <div className="h-full">
            <Card className="bg-black/40 backdrop-blur-md border-white/10 rounded-xl overflow-hidden h-full">
              <div className="bg-gradient-to-r from-white/10 to-transparent p-4">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Mic size={18} className="text-white/70" />
                  <span>Lyrics</span>
                </h2>
              </div>
              
              <div className="p-6 max-h-[500px] overflow-y-auto scroll-smooth scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
                {lyrics.length > 0 ? (
                  <div className="space-y-6">
                    {lyrics.map((line, index) => (
                      <p
                        key={index}
                        className={`transition-all duration-300 ${
                          index === currentLyricIndex
                            ? `text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r ${gradientColor}`
                            : index < currentLyricIndex
                              ? "text-gray-500"
                              : "text-gray-300"
                        }`}
                      >
                        {line}
                      </p>
                    ))}
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center">
                    <p className="text-gray-400 text-center">Lyrics not available</p>
                  </div>
                )}
              </div>
            </Card>
            
            {/* Karaoke info */}
            {micEnabled && (
              <div className="mt-6">
                <Card className={`bg-gradient-to-r ${gradientColor} bg-opacity-20 backdrop-blur-md border-none rounded-xl p-4`}>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                      <Mic className="w-4 h-4 animate-pulse" />
                    </div>
                    <div>
                      <h3 className="font-bold">Karaoke Mode Active</h3>
                      <p className="text-sm text-white/70">Sing along with the highlighted lyrics</p>
                    </div>
                  </div>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}