"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Mic, MicOff, Volume2, VolumeX, ArrowLeft } from "lucide-react"

// Mock song data
const getSongData = (id: string) => {
  const songs = {
    "1": {
      title: "Pixel Flow",
      color: "bg-primary",
      lyrics: [
        "Welcome to the pixel flow",
        "Where the bits and bytes just glow",
        "Spitting rhymes in 8-bit style",
        "Retro gaming all the while",
        "Pixels forming on the screen",
        "Coolest rap you've ever seen",
        "Drop the beat and feel the vibe",
        "In this digital rhyme tribe",
      ],
    },
    "2": {
      title: "8-Bit Bars",
      color: "bg-secondary",
      lyrics: [
        "These 8-bit bars hit different",
        "My flow's got the crowd lifted",
        "Arcade dreams in every line",
        "Old school gaming, feeling fine",
        "Pixels popping with each beat",
        "This retro flow can't be beat",
        "Level up with every verse",
        "In this pixelated universe",
      ],
    },
    "3": {
      title: "Retro Rhymes",
      color: "bg-accent",
      lyrics: [
        "Retro rhymes from back in time",
        "When games were simple but sublime",
        "Blocky graphics, chunky sounds",
        "That's where true gaming is found",
        "Spitting pixels with each word",
        "Most authentic flow you've heard",
        "Old school vibes with new school skill",
        "This pixel rap is such a thrill",
      ],
    },
    "4": {
      title: "Digital Drops",
      color: "bg-destructive",
      lyrics: [
        "Digital drops falling down",
        "Pixel perfect, wear the crown",
        "Bits and bytes form every word",
        "Electronic flow, absurd",
        "Coding rhymes like no one else",
        "Virtual worlds within myself",
        "Gaming culture is my roots",
        "These digital drops are absolute",
      ],
    },
  }

  return songs[id as keyof typeof songs] || songs["1"]
}

export default function PlaySong({ params }: { params: { id: string } }) {
  const router = useRouter()
  const songData = getSongData(params.id)
  const [currentLine, setCurrentLine] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [micEnabled, setMicEnabled] = useState(false)
  const [audioEnabled, setAudioEnabled] = useState(true)
  const [progress, setProgress] = useState(0)
  const [score, setScore] = useState(0)
  const [feedback, setFeedback] = useState("")
  const [gameComplete, setGameComplete] = useState(false)

  const audioContextRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const micStreamRef = useRef<MediaStream | null>(null)

  // Initialize audio context
  useEffect(() => {
    audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
    analyserRef.current = audioContextRef.current.createAnalyser()
    analyserRef.current.fftSize = 256

    return () => {
      if (micStreamRef.current) {
        micStreamRef.current.getTracks().forEach((track) => track.stop())
      }
      if (audioContextRef.current && audioContextRef.current.state !== "closed") {
        audioContextRef.current.close()
      }
    }
  }, [])

  // Toggle microphone
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

      if (audioContextRef.current && analyserRef.current) {
        const source = audioContextRef.current.createMediaStreamSource(stream)
        source.connect(analyserRef.current)

        // Start analyzing audio for pitch/timing
        startAudioAnalysis()
      }

      setMicEnabled(true)
      setFeedback("Mic connected! Start rapping when the lyrics highlight.")
    } catch (err) {
      console.error("Error accessing microphone:", err)
      setFeedback("Could not access microphone. Please check permissions.")
    }
  }

  // Start/stop the game
  const togglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false)
      setFeedback("Game paused")
      return
    }

    if (!micEnabled) {
      setFeedback("Please enable your microphone first!")
      return
    }

    setIsPlaying(true)
    setProgress(0)
    setCurrentLine(0)
    setFeedback("Get ready to rap!")

    // Simulate game progress
    startGameSimulation()
  }

  // Simulate game progress (in a real app, this would sync with actual audio)
  const startGameSimulation = () => {
    const totalDuration = 20000 // 20 seconds total
    const interval = 100 // Update every 100ms
    const lineChangeDuration = totalDuration / songData.lyrics.length

    let elapsed = 0
    const timer = setInterval(() => {
      elapsed += interval
      const newProgress = (elapsed / totalDuration) * 100
      setProgress(newProgress)

      // Change current line based on progress
      const newLineIndex = Math.min(Math.floor(elapsed / lineChangeDuration), songData.lyrics.length - 1)

      if (newLineIndex !== currentLine) {
        setCurrentLine(newLineIndex)
        // Generate random feedback occasionally
        if (Math.random() > 0.5) {
          const feedbacks = ["Great flow!", "Nice rhythm!", "Keep it up!", "Awesome!", "Fire!"]
          setFeedback(feedbacks[Math.floor(Math.random() * feedbacks.length)])

          // Add to score
          setScore((prev) => prev + Math.floor(Math.random() * 100) + 50)
        }
      }

      // End game
      if (newProgress >= 100) {
        clearInterval(timer)
        setGameComplete(true)
        setFeedback("Rap battle complete!")
      }
    }, interval)

    return () => clearInterval(timer)
  }

  // Simulate audio analysis (in a real app, this would analyze actual pitch/timing)
  const startAudioAnalysis = () => {
    if (!analyserRef.current) return

    const bufferLength = analyserRef.current.frequencyBinCount
    const dataArray = new Uint8Array(bufferLength)

    const analyze = () => {
      if (!analyserRef.current || !isPlaying) return

      analyserRef.current.getByteFrequencyData(dataArray)

      // Calculate audio energy (simplified)
      let sum = 0
      for (let i = 0; i < bufferLength; i++) {
        sum += dataArray[i]
      }
      const average = sum / bufferLength

      // Use average to determine if user is rapping
      if (average > 30) {
        // User is making sound - could add visual feedback here
      }

      requestAnimationFrame(analyze)
    }

    analyze()
  }

  // Toggle audio
  const toggleAudio = () => {
    setAudioEnabled(!audioEnabled)
  }

  // Handle game completion
  const handleGameComplete = () => {
    router.push(`/results/${params.id}?score=${score}`)
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-4 bg-black">
      <header className="w-full max-w-4xl flex justify-between items-center mb-8 mt-4">
        <Button variant="ghost" onClick={() => router.push("/songs")}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          <span className="font-pixel text-xs">Back</span>
        </Button>
        <h1 className={`text-xl font-pixel pixel-text ${songData.color.replace("bg-", "text-")}`}>{songData.title}</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" className="pixel-borders h-10 w-10" onClick={toggleAudio}>
            {audioEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </Button>
          <Button
            variant="outline"
            size="icon"
            className={`pixel-borders h-10 w-10 ${micEnabled ? songData.color : ""}`}
            onClick={toggleMic}
          >
            {micEnabled ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
          </Button>
        </div>
      </header>

      <div className="w-full max-w-4xl mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="font-pixel text-xs">Progress</span>
          <span className="font-pixel text-xs">{Math.floor(progress)}%</span>
        </div>
        <div className="w-full h-6 pixel-borders bg-black">
          <div className={`h-full ${songData.color}`} style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      <Card className="w-full max-w-4xl pixel-container bg-black mb-8">
        <div className="space-y-4 p-4">
          {songData.lyrics.map((line, index) => (
            <p
              key={index}
              className={`font-pixel text-sm transition-all duration-200 ${
                index === currentLine
                  ? `${songData.color.replace("bg-", "text-")} scale-110 font-bold`
                  : index < currentLine
                    ? "text-gray-500"
                    : "text-gray-300"
              }`}
            >
              {line}
            </p>
          ))}
        </div>
      </Card>

      <div className="w-full max-w-4xl mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="font-pixel text-xs">Score</span>
          <span className="font-pixel text-xs text-primary">{score}</span>
        </div>
        <div className="w-full h-6 pixel-borders bg-black overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${Math.min((score / 1000) * 100, 100)}%` }}
          ></div>
        </div>
      </div>

      <div className="w-full max-w-4xl mb-8">
        <Card className="pixel-container bg-black">
          <p className="font-pixel text-sm text-center p-4">{feedback}</p>
        </Card>
      </div>

      <div className="w-full max-w-4xl flex gap-4">
        <Button
          className={`w-full pixel-button ${isPlaying ? "bg-destructive" : songData.color}`}
          onClick={togglePlay}
          disabled={!micEnabled && !isPlaying}
        >
          {isPlaying ? "Pause Game" : "Start Rapping"}
        </Button>
      </div>

      {gameComplete && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <Card className="w-full max-w-md pixel-container bg-black">
            <div className="p-6 space-y-6">
              <h2 className="text-2xl font-pixel text-primary text-center pixel-text">Battle Complete!</h2>
              <div className="text-center">
                <p className="font-pixel text-lg">Your Score</p>
                <p className="font-pixel text-4xl text-accent">{score}</p>
              </div>
              <Button className="w-full pixel-button" onClick={handleGameComplete}>
                See Results
              </Button>
            </div>
          </Card>
        </div>
      )}
    </main>
  )
}

