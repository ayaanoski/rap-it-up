'use client';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PixelatedTitle } from "@/components/pixelated-title";
import { PixelatedBackground } from "@/components/pixelated-background";
import { useEffect, useState } from "react";

export default function Home() {
  const [typedText, setTypedText] = useState("");
  const slogan = "Ignite your talent and create something extraordinary.";

  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= slogan.length) {
        setTypedText(slogan.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100); // Adjust typing speed here

    return () => clearInterval(typingInterval);
  }, [slogan]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 relative overflow-hidden bg-gradient-to-br from-yellow-900 via-orange-900 to-yellow-900">
      <PixelatedBackground />

      <div className="z-10 flex flex-col items-center justify-center gap-8 mt-10 text-center">
        <PixelatedTitle />

        {/* Typing Effect Banner */}
        <div className="max-w-full font-pixel text-lg text-red-500 whitespace-nowrap overflow-hidden">
          <span>{typedText}</span>
          <span className="ml-1 animate-blink">|</span>
        </div>

        <div className="max-w-xl space-y-6 pixel-container bg-black/80 backdrop-blur-md p-8 rounded-xl border-4 border-orange-500/40 hover:border-orange-400/80 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/50 transform-gpu">
  {/* Decorative pixel corners */}
  <div className="absolute w-4 h-4 bg-orange-500 top-0 left-0 animate-pulse"></div>
  <div className="absolute w-4 h-4 bg-orange-500 top-0 right-0 animate-pulse" style={{animationDelay: "0.5s"}}></div>
  <div className="absolute w-4 h-4 bg-orange-500 bottom-0 left-0 animate-pulse" style={{animationDelay: "1s"}}></div>
  <div className="absolute w-4 h-4 bg-orange-500 bottom-0 right-0 animate-pulse" style={{animationDelay: "1.5s"}}></div>
  
  <h2 className="text-2xl font-pixel text-orange-400 text-center relative">
    <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400 bg-clip-text text-transparent">Create. Build. Earn Rewards.</span>
  </h2>
  
  <div className="h-px bg-gradient-to-r from-transparent via-orange-500 to-transparent w-full my-4"></div>
  
  <p className="text-base font-pixel text-white/90 text-center leading-relaxed">
    Connect your wallet, showcase your skills, and earn exclusive rewards for your creativity!
  </p>
  
  {/* New feature list */}
  <ul className="grid grid-cols-2 gap-4 pt-2">
    <li className="flex items-center text-sm text-yellow-300/90 font-pixel">
      <span className="mr-2">✦</span> Digital Badges
    </li>
    <li className="flex items-center text-sm text-yellow-300/90 font-pixel">
      <span className="mr-2">✦</span> NFT Rewards
    </li>
    <li className="flex items-center text-sm text-yellow-300/90 font-pixel">
      <span className="mr-2">✦</span> Weekly Contests
    </li>
    <li className="flex items-center text-sm text-yellow-300/90 font-pixel">
      <span className="mr-2">✦</span> Creator Community
    </li>
  </ul>
</div>

<div className="flex flex-col gap-4 w-full max-w-xs">
  <Link href="/connect" className="w-full">
    <Button
      variant="default"
      size="lg"
      className="w-full font-pixel bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-500 hover:from-orange-600 hover:via-yellow-600 hover:to-orange-600 text-white shadow-md hover:shadow-lg hover:shadow-orange-500/50 transition-all duration-300 transform hover:scale-105 active:scale-95 rounded-xl border-2 border-orange-400/30 hover:border-orange-400/70 relative overflow-hidden"
    >
      <span className="relative z-10 flex items-center justify-center">
        Get Started <span className="ml-2">→</span>
      </span>
    </Button>
  </Link>

  <Link href="/leaderboard" className="w-full">
    <Button
      variant="default"
      size="lg"
      className="w-full font-pixel bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-500 hover:from-orange-600 hover:via-yellow-600 hover:to-orange-600 text-white shadow-md hover:shadow-lg hover:shadow-orange-500/50 transition-all duration-300 transform hover:scale-105 active:scale-95 rounded-xl border-2 border-orange-400/30 hover:border-orange-400/70 relative overflow-hidden"
    >
      <span className="relative z-10 flex items-center justify-center">
        Leaderboard <span className="ml-2">🏆</span>
      </span>
    </Button>
  </Link>
</div>
      </div>

      <footer className="absolute bottom-4 font-pixel text-xs text-center text-white/50">
        <p>© 2024 Pixel Rewards</p>
      </footer>

      {/* Blinking cursor animation */}
      <style jsx>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        .animate-blink {
          animation: blink 1s infinite;
        }

        /* Pulse animation for buttons */
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        .animate-pulse {
          animation: pulse 1.5s infinite;
        }

        /* Ensure the font-pixel class is applied correctly */
        .font-pixel {
          font-family: "Press Start 2P", cursive; /* Example pixel font */
        }
      `}</style>
    </main>
  );
}