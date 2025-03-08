"use client"

import { useEffect, useState } from "react"

export function PixelatedTitle() {
  const [glitching, setGlitching] = useState(false)

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitching(true)
      setTimeout(() => setGlitching(false), 100)
    }, 3000)

    return () => clearInterval(glitchInterval)
  }, [])

  return (
    <div className="mb-8 relative">
      <h1
        className={`text-4xl md:text-6xl font-pixel text-primary pixel-text ${glitching ? "translate-x-[2px]" : ""} transition-transform duration-50`}
      >
        RAP-IT
      </h1>
      <h1
        className={`text-4xl md:text-6xl font-pixel text-secondary pixel-text mt-4 ${glitching ? "-translate-x-[2px]" : ""} transition-transform duration-50`}
      >
        UP
      </h1>
      <div className="absolute -bottom-4 left-0 right-0 flex justify-center">
        <div className="w-16 h-1 bg-accent"></div>
      </div>
    </div>
  )
}

