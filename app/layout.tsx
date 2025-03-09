import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import OCConnectWrapper from "@/components/OCConnectWrapper"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Pixel Rap Battle",
  description: "8-bit gamified rap karaoke experience",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const opts = {
    redirectUri: "http://localhost:3000/songs",
    referalUri: "OSKI",
  }
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet" />
      </head>
      <body className="font-pixel bg-black text-white">
        <ThemeProvider attribute="class" defaultTheme="dark">
          <OCConnectWrapper opts={opts} sandboxMode={true}>
          {children}
          </OCConnectWrapper>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'