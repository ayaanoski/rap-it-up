"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy, Star, Share2, Download, Home } from "lucide-react"
import Link from "next/link"

// Mock NFT data
const nftImages = [
  "/placeholder.svg?height=200&width=200",
  "/placeholder.svg?height=200&width=200",
  "/placeholder.svg?height=200&width=200",
  "/placeholder.svg?height=200&width=200",
]

export default function Results({ params }: { params: { id: string } }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const score = Number.parseInt(searchParams.get("score") || "0")

  const [rank, setRank] = useState("")
  const [stars, setStars] = useState(0)
  const [nftEarned, setNftEarned] = useState(false)
  const [nftImage, setNftImage] = useState("")
  const [isNftMinting, setIsNftMinting] = useState(false)
  const [isMinted, setIsMinted] = useState(false)

  useEffect(() => {
    // Calculate rank based on score
    if (score >= 800) {
      setRank("S")
      setStars(5)
      setNftEarned(true)
    } else if (score >= 600) {
      setRank("A")
      setStars(4)
      setNftEarned(true)
    } else if (score >= 400) {
      setRank("B")
      setStars(3)
      setNftEarned(true)
    } else if (score >= 200) {
      setRank("C")
      setStars(2)
      setNftEarned(false)
    } else {
      setRank("D")
      setStars(1)
      setNftEarned(false)
    }

    // Select random NFT image
    if (nftEarned) {
      const randomIndex = Math.floor(Math.random() * nftImages.length)
      setNftImage(nftImages[randomIndex])
    }
  }, [score, nftEarned])

  const mintNFT = () => {
    setIsNftMinting(true)

    // Simulate minting process
    setTimeout(() => {
      setIsNftMinting(false)
      setIsMinted(true)
    }, 3000)
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-4 bg-black">
      <header className="w-full max-w-4xl flex justify-center items-center mb-8 mt-4">
        <h1 className="text-2xl font-pixel text-primary pixel-text">Battle Results</h1>
      </header>

      <Card className="w-full max-w-md pixel-container bg-black mb-8">
        <CardHeader>
          <CardTitle className="text-xl font-pixel text-center pixel-text">Your Performance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 bg-accent flex items-center justify-center pixel-borders mb-4">
              <span className="font-pixel text-4xl text-black">{rank}</span>
            </div>
            <p className="font-pixel text-lg">Final Score: {score}</p>
            <div className="flex mt-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-6 h-6 ${i < stars ? "text-accent" : "text-accent/30"}`} />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="pixel-container bg-black p-2">
              <p className="font-pixel text-xs text-muted-foreground">Accuracy</p>
              <p className="font-pixel text-lg">{Math.min(Math.floor(score / 10), 100)}%</p>
            </div>
            <div className="pixel-container bg-black p-2">
              <p className="font-pixel text-xs text-muted-foreground">Timing</p>
              <p className="font-pixel text-lg">{Math.min(Math.floor(score / 12), 100)}%</p>
            </div>
            <div className="pixel-container bg-black p-2">
              <p className="font-pixel text-xs text-muted-foreground">Flow</p>
              <p className="font-pixel text-lg">{Math.min(Math.floor(score / 11), 100)}%</p>
            </div>
            <div className="pixel-container bg-black p-2">
              <p className="font-pixel text-xs text-muted-foreground">Style</p>
              <p className="font-pixel text-lg">{Math.min(Math.floor(score / 13), 100)}%</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {nftEarned && (
        <Card className="w-full max-w-md pixel-container bg-black mb-8">
          <CardHeader>
            <CardTitle className="text-xl font-pixel text-center pixel-text text-secondary">
              NFT Reward Earned!
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-center">
              <div className="w-48 h-48 pixel-borders overflow-hidden">
                <img src={nftImage || "/placeholder.svg"} alt="NFT Reward" className="w-full h-full object-cover" />
              </div>
            </div>
            <p className="font-pixel text-sm text-center">
              {isMinted
                ? "Your Pixel Rap NFT has been minted to your wallet!"
                : "You've earned a unique Pixel Rap NFT! Mint it to your wallet."}
            </p>
          </CardContent>
          <CardFooter>
            {!isMinted ? (
              <Button className="w-full pixel-button bg-secondary" onClick={mintNFT} disabled={isNftMinting}>
                {isNftMinting ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-t-primary-foreground border-r-primary-foreground border-b-primary-foreground border-l-transparent animate-spin rounded-full"></div>
                    Minting...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Mint NFT
                  </span>
                )}
              </Button>
            ) : (
              <Button className="w-full pixel-button bg-accent text-black" onClick={() => {}}>
                <span className="flex items-center gap-2">
                  <Share2 className="w-4 h-4" />
                  Share NFT
                </span>
              </Button>
            )}
          </CardFooter>
        </Card>
      )}

      <div className="w-full max-w-md flex flex-col gap-4">
        <Button className="w-full pixel-button" onClick={() => router.push("/songs")}>
          Try Another Song
        </Button>
        <Link href="/leaderboard" className="w-full">
          <Button variant="outline" className="w-full pixel-borders bg-secondary">
            <Trophy className="w-4 h-4 mr-2" />
            View Leaderboard
          </Button>
        </Link>
        <Link href="/" className="w-full">
          <Button variant="outline" className="w-full pixel-borders">
            <Home className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>
      </div>
    </main>
  )
}

