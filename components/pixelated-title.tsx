"use client";

import { useEffect, useState } from "react";

export function PixelatedTitle() {
  const [glitching, setGlitching] = useState(false);
  const [glitchingTagline, setGlitchingTagline] = useState(false);

  useEffect(() => {
    // Main title glitch effect
    const glitchInterval = setInterval(() => {
      setGlitching(true);
      setTimeout(() => setGlitching(false), 100); 
    }, 1000); 
    
    // Tagline subtle glitch effect (offset from main title)
    const taglineGlitchInterval = setInterval(() => {
      setGlitchingTagline(true);
      setTimeout(() => setGlitchingTagline(false), 100);
    }, 2500);

    return () => {
      clearInterval(glitchInterval);
      clearInterval(taglineGlitchInterval);
    };
  }, []);

  return (
    <div className="mb-8 relative text-center">
      {/* Container with neon orange theme - NO BLACK BACKGROUND */}
      <div >
        {/* Main Title with NEON ORANGE Color Scheme */}
        <h1
          className={`text-6xl md:text-8xl font-pixel pixel-text ${
            glitching ? "glitch-effect" : ""
          } transition-all duration-50 bg-gradient-to-r from-orange-500 via-orange-400 to-orange-300 bg-clip-text text-transparent mb-4 tracking-wider font-extrabold`}
        >
          RAP IT UP
        </h1>
        
        {/* Tagline with complementary style */}
        
      </div>

      {/* Glitch effect styles with neon orange */}
      <style jsx>{`
        .glitch-effect {
          animation: glitch 0.2s infinite;
          text-shadow: 0 0 20px rgba(249, 115, 22, 0.9);
          letter-spacing: 0.1em;
          position: relative;
        }
        
        /* Add pseudo-elements for more dramatic glitch effect */
        .glitch-effect::before,
        .glitch-effect::after {
          content: 'RAP IT UP';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: transparent;
        }
        
        .glitch-effect::before {
          left: 2px;
          text-shadow: -2px 0 #fb923c;
          clip-path: rect(24px, 550px, 90px, 0);
          animation: glitch-anim-1 2s infinite linear alternate-reverse;
        }

        .glitch-effect::after {
          left: -2px;
          text-shadow: -2px 0 #fdba74;
          clip-path: rect(85px, 550px, 140px, 0);
          animation: glitch-anim-2 2s infinite linear alternate-reverse;
        }

        .tagline-glitch {
          animation: taglineGlitch 0.1s infinite;
          text-shadow: 0 0 8px rgba(255, 255, 255, 0.8);
        }

        @keyframes glitch {
          0% {
            transform: translate(0);
            text-shadow: 
                0 0 10px rgba(249, 115, 22, 0.9),
                0 0 20px rgba(249, 115, 22, 0.7),
                0 0 30px rgba(249, 115, 22, 0.5),
                0 0 40px rgba(234, 88, 12, 0.9),
                0 0 50px rgba(234, 88, 12, 0.7),
                0 0 60px rgba(234, 88, 12, 0.5);
          }
          25% {
            transform: translate(-3px, 3px);
            text-shadow: 
                -2px 2px 10px rgba(249, 115, 22, 0.9),
                -4px 4px 20px rgba(249, 115, 22, 0.7),
                -6px 6px 30px rgba(249, 115, 22, 0.5),
                -8px 8px 40px rgba(234, 88, 12, 0.9),
                -10px 10px 50px rgba(234, 88, 12, 0.7),
                -12px 12px 60px rgba(234, 88, 12, 0.5);
          }
          50% {
            transform: translate(3px, -3px);
            text-shadow: 
                2px -2px 10px rgba(249, 115, 22, 0.9),
                4px -4px 20px rgba(249, 115, 22, 0.7),
                6px -6px 30px rgba(249, 115, 22, 0.5),
                8px -8px 40px rgba(234, 88, 12, 0.9),
                10px -10px 50px rgba(234, 88, 12, 0.7),
                12px -12px 60px rgba(234, 88, 12, 0.5);
          }
          75% {
            transform: translate(-3px, 3px);
            text-shadow: 
                -2px 2px 10px rgba(249, 115, 22, 0.9),
                -4px 4px 20px rgba(249, 115, 22, 0.7),
                -6px 6px 30px rgba(249, 115, 22, 0.5),
                -8px 8px 40px rgba(234, 88, 12, 0.9),
                -10px 10px 50px rgba(234, 88, 12, 0.7),
                -12px 12px 60px rgba(234, 88, 12, 0.5);
          }
          100% {
            transform: translate(0);
            text-shadow: 
                0 0 10px rgba(249, 115, 22, 0.9),
                0 0 20px rgba(249, 115, 22, 0.7),
                0 0 30px rgba(249, 115, 22, 0.5),
                0 0 40px rgba(234, 88, 12, 0.9),
                0 0 50px rgba(234, 88, 12, 0.7),
                0 0 60px rgba(234, 88, 12, 0.5);
          }
        }
        
        @keyframes glitch-anim-1 {
          0% {
            clip-path: rect(12px, 550px, 42px, 0);
          }
          20% {
            clip-path: rect(62px, 550px, 78px, 0);
          }
          40% {
            clip-path: rect(42px, 550px, 54px, 0);
          }
          60% {
            clip-path: rect(62px, 550px, 98px, 0);
          }
          80% {
            clip-path: rect(52px, 550px, 108px, 0);
          }
          100% {
            clip-path: rect(32px, 550px, 142px, 0);
          }
        }

        @keyframes glitch-anim-2 {
          0% {
            clip-path: rect(78px, 550px, 96px, 0);
          }
          20% {
            clip-path: rect(24px, 550px, 62px, 0);
          }
          40% {
            clip-path: rect(32px, 550px, 82px, 0);
          }
          60% {
            clip-path: rect(22px, 550px, 112px, 0);
          }
          80% {
            clip-path: rect(56px, 550px, 128px, 0);
          }
          100% {
            clip-path: rect(42px, 550px, 96px, 0);
          }
        }
        
        @keyframes taglineGlitch {
          0% {
            transform: translate(0);
            opacity: 1;
          }
          25% {
            transform: translate(-1px, 1px);
            opacity: 0.9;
          }
          50% {
            transform: translate(1px, -1px);
            opacity: 1;
          }
          75% {
            transform: translate(1px, 1px);
            opacity: 0.9;
          }
          100% {
            transform: translate(0);
            opacity: 1;
          }
        }
        
        /* Neon orange glow effect */
        @keyframes neonPulse {
          0% {
            box-shadow: 0 0 10px rgba(249, 115, 22, 0.7),
                      0 0 20px rgba(249, 115, 22, 0.5),
                      0 0 30px rgba(249, 115, 22, 0.3);
          }
          50% {
            box-shadow: 0 0 20px rgba(249, 115, 22, 0.9),
                      0 0 40px rgba(249, 115, 22, 0.7),
                      0 0 60px rgba(249, 115, 22, 0.5);
          }
          100% {
            box-shadow: 0 0 10px rgba(249, 115, 22, 0.7),
                      0 0 20px rgba(249, 115, 22, 0.5),
                      0 0 30px rgba(249, 115, 22, 0.3);
          }
        }
        
        div.relative > div {
          animation: neonPulse 3s infinite;
          background: transparent;
        }
      `}</style>
    </div>
  );
}