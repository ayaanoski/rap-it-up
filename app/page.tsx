import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PixelatedTitle } from "@/components/pixelated-title"
import { PixelatedBackground } from "@/components/pixelated-background"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 relative overflow-hidden">
      <PixelatedBackground />

      <div className="z-10 flex flex-col items-center justify-center gap-8 text-center">
        <PixelatedTitle />

        <div className="max-w-md space-y-4 pixel-container bg-black">
          <h2 className="text-xl font-pixel text-accent pixel-text">Battle. Rap. Earn NFTs.</h2>
          <p className="text-sm font-pixel">
            Connect your wallet, choose a beat, and show off your rap skills to earn exclusive pixel NFTs!
          </p>
        </div>

        <div className="flex flex-col gap-4 w-full max-w-xs">
          <Link href="/connect" className="w-full">
            <Button className="w-full pixel-button text-lg h-auto py-4">Get Started</Button>
          </Link>

          <Link href="/leaderboard" className="w-full">
            <Button variant="outline" className="w-full pixel-borders bg-secondary text-white text-lg h-auto py-4">
              Leaderboard
            </Button>
          </Link>
        </div>
      </div>

      <footer className="absolute bottom-4 font-pixel text-xs text-center">
        <p>© 2024 Pixel Rap Battle</p>
      </footer>
    </main>
  )
}

