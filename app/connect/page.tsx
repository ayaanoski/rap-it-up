"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Wallet, Info, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { PixelatedBackground } from "@/components/pixelated-background";
import LoginButton from "@/components/LoginButton";

export default function ConnectOCID() {
  const router = useRouter();
  const [connecting, setConnecting] = useState(false);
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState("");

  const connectOCID = async () => {
    setConnecting(true);
    setError("");

    try {
      // Simulate connecting
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setConnected(true);
        router.push("/songs");
    } catch (err: any) {
      console.error("Error connecting OCID:", err);
      setError(err.message || "Failed to connect OCID");
    } finally {
      setConnecting(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-br from-yellow-900/50 via-orange-800/50 to-orange-900/50 relative">
      <PixelatedBackground />
      
      {/* Decorative pixel elements */}
      <div className="absolute top-20 left-20 w-6 h-6 bg-yellow-400/30 animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-6 h-6 bg-yellow-400/30 animate-pulse"></div>
      <div className="absolute top-40 right-40 w-4 h-4 bg-orange-400/30 animate-pulse"></div>
      <div className="absolute bottom-40 left-40 w-4 h-4 bg-orange-400/30 animate-pulse"></div>
      
      <Card className="w-full max-w-md pixel-container bg-black/80 backdrop-blur-sm border-2 border-yellow-400/50 shadow-lg shadow-yellow-600/20 z-20 hover:shadow-yellow-500/30 hover:border-yellow-400/70 transition-all duration-300">
        <CardHeader className="pb-2">
          <div className="w-16 h-1 bg-gradient-to-r from-yellow-400/0 via-yellow-400 to-yellow-400/0 mx-auto mb-4"></div>
          <CardTitle className="text-2xl font-pixel text-yellow-400 text-center pixel-text glow-text">
            Connect OCID
          </CardTitle>
          <CardDescription className="text-center font-pixel text-xs mt-3 text-yellow-400/90">
            Connect your OCID to start your rap battle journey
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-8 pt-4">
          <div className="flex justify-center">
            <div className="w-28 h-28 bg-gradient-to-br from-yellow-400/30 to-orange-500/20 rounded-lg flex items-center justify-center border-2 border-yellow-400/50 shadow-inner shadow-yellow-400/10 transform hover:scale-105 transition-all duration-300">
              <Wallet className="w-14 h-14 text-yellow-400 drop-shadow-lg" />
            </div>
          </div>

          {error && (
            <div className="bg-red-500/20 p-4 rounded-lg text-red-400 font-pixel text-xs text-center border border-red-500/30">
              <span className="inline-block animate-pulse">⚠</span> {error}
            </div>
          )}

          {connected ? (
            <div className="space-y-2">
              <p className="font-pixel text-sm text-center text-yellow-400 glow-text">OCID Connected!</p>
              <div className="flex justify-center mt-4">
                <div className="w-8 h-8 border-4 border-t-yellow-400 border-r-yellow-400 border-b-yellow-400 border-l-transparent animate-spin rounded-full"></div>
              </div>
              <p className="font-pixel text-xs text-center mt-2 text-yellow-400/80">
                Redirecting to song selection...
              </p>
            </div>
          ) : (
            <div className="transform hover:scale-105 transition-all duration-300 shadow-lg shadow-yellow-500/20 hover:shadow-yellow-500/40 rounded-xl">
              <LoginButton />
            </div>
          )}
        </CardContent>
        
        <CardFooter className="flex flex-col gap-4 pt-2">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-yellow-400/40 to-transparent my-1"></div>
          <div className="flex items-center gap-2 text-xs font-pixel text-yellow-400/80 hover:text-yellow-400 transition-colors duration-300 cursor-pointer">
            <Info className="w-4 h-4 text-yellow-400" />
            <span>Learn more about OCID</span>
          </div>
          <Link href="#" className="w-full">
            <Button
              variant="outline"
              className="w-full pixel-borders bg-yellow-400/10 text-yellow-400 border-yellow-400/40 hover:bg-yellow-400/20 hover:text-yellow-400 hover:border-yellow-400/60 transition-all duration-300"
            >
              OCID Info
            </Button>
          </Link>
        </CardFooter>
      </Card>

      <Button
        variant="outline"
        className="mt-8 font-pixel text-sm md:text-base text-yellow-400 border-2 border-yellow-400/50 hover:bg-yellow-400 hover:text-black transition-all duration-300 px-6 py-3 rounded-md shadow-lg shadow-yellow-600/10 hover:shadow-yellow-500/30 z-20 uppercase tracking-wide font-bold group"
        onClick={() => router.push("/")}
      >
        <ChevronLeft className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform duration-300" />
        <span className="relative inline-block">
          Back to Home
        </span>
      </Button>

      {/* Add subtle glow effect */}
      <style jsx global>{`
        .glow-text {
          text-shadow: 0 0 10px rgba(253, 224, 71, 0.6);
        }
      `}</style>
    </main>
  );
}