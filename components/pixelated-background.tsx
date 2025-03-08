"use client"

import { useEffect, useRef } from "react"

export function PixelatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size to match window
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      drawBackground()
    }

    window.addEventListener("resize", resizeCanvas)
    resizeCanvas()

    // Draw pixelated background
    function drawBackground() {
      const gridSize = 20
      const colors = [
        "#000000", // Black
        "#111111", // Dark gray
        "#222222", // Slightly lighter gray
      ]

      // Clear canvas
      ctx.fillStyle = "#000000"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw grid of pixels
      for (let x = 0; x < canvas.width; x += gridSize) {
        for (let y = 0; y < canvas.height; y += gridSize) {
          // Random color from our palette
          const colorIndex = Math.floor(Math.random() * colors.length)
          ctx.fillStyle = colors[colorIndex]
          ctx.fillRect(x, y, gridSize, gridSize)
        }
      }

      // Add some "music wave" effect at the bottom
      const waveHeight = 100
      const waveStart = canvas.height - waveHeight

      for (let x = 0; x < canvas.width; x += gridSize) {
        const height = Math.sin(x * 0.02) * 20 + Math.random() * 15
        const barHeight = Math.max(10, height)

        ctx.fillStyle = "#00ff00" // Green for audio waves
        ctx.globalAlpha = 0.3
        ctx.fillRect(x, waveStart + waveHeight - barHeight, gridSize - 2, barHeight)
        ctx.globalAlpha = 1
      }
    }

    // Animate background slightly
    let animationFrame: number

    const animate = () => {
      drawBackground()
      animationFrame = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrame)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full object-cover" />
}

