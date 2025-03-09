import Image from "next/image";

export function PixelatedBackground() {
  const gifs = [
    { src: "/Pixelart/pixel1.gif", brightness: "bright", size: "small" },
    { src: "/Pixelart/pixel2.gif", brightness: "normal", size: "medium" },
    { src: "/Pixelart/pixel3.gif", brightness: "bright", size: "large" },
    { src: "/Pixelart/pixel4.gif", brightness: "normal", size: "small" },
    { src: "/Pixelart/pixel5.gif", brightness: "bright", size: "medium" },
    { src: "/Pixelart/pixel6.gif", brightness: "normal", size: "large" },
    { src: "/Pixelart/pixel7.gif", brightness: "bright", size: "small" },
    { src: "/Pixelart/pixel8.gif", brightness: "normal", size: "medium" },
    { src: "/Pixelart/pixel9.gif", brightness: "bright", size: "large" },
  ];

  return (
    <div className="absolute inset-0 z-0 opacity-50">
      {/* Gradient overlay with light yellow undertone */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-100/30 via-yellow-200/40 to-orange-500/50"></div>

      {/* Container for GIFs with absolute positioning */}
      <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-4 p-4">
        {gifs.map((gif, index) => (
          <div
            key={index}
            className={`relative transition-all duration-1000 ease-in-out hover:scale-105 ${
              index % 2 === 0 ? "animate-float-even" : "animate-float-odd"
            }`}
            style={{
              width: "100%", // Ensure each grid cell takes full width
              height: "100%", // Ensure each grid cell takes full height
            }}
          >
            <div
              className={`relative w-full h-full ${
                gif.brightness === "bright" ? "brightness-150" : "brightness-100"
              }`}
            >
              <div
                className={`w-full h-full rounded-lg border-4 ${
                  gif.brightness === "bright"
                    ? "border-yellow-300 shadow-lg shadow-yellow-400/50"
                    : "border-yellow-200 shadow-md shadow-yellow-300/30"
                } overflow-hidden`}
                style={{ opacity: 0.8 }} // Add transparency here
              >
                <Image
                  src={gif.src}
                  alt={`Pixel Art ${index + 1}`}
                  fill
                  className="object-cover"
                  style={{ opacity: gif.brightness === "bright" ? 1 : 0.8 }}
                  unoptimized // Use this if GIFs are not optimized by Next.js
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Floating animation styles */}
      <style jsx>{`
        @keyframes float-even {
          0% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
          100% {
            transform: translateY(0);
          }
        }

        @keyframes float-odd {
          0% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(10px);
          }
          100% {
            transform: translateY(0);
          }
        }

        .animate-float-even {
          animation: float-even 4s ease-in-out infinite;
        }

        .animate-float-odd {
          animation: float-odd 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}