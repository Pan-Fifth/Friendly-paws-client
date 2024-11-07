'use client'

import React from 'react'
import { PawPrint } from 'lucide-react'

export default function TextHome() {
  const text1 = "Friendly"
  const text2 = "Paws"
  const outlineColor = "#db2777"
  const fillColor = "#000000"

  const TextLine = ({ text, direction, isFirstLine }) => (
    <div className={`relative ${isFirstLine ? 'self-start' : 'self-end'}`}>
      <h1 
        className={`font-bold relative z-10 ${isFirstLine ? 'text-5xl sm:text-6xl md:text-7xl lg:text-8xl' : 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl'}`}
        style={{
          WebkitTextStroke: `0.5px ${outlineColor}`,
          WebkitTextFillColor: 'transparent',
          animation: 'strokeAnimation 6s infinite alternate',
        }}
      >
        {isFirstLine ? (
          <>
            <span className="text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] relative">
              {text[0]}
              <PawPrint className="absolute -bottom-8 sm:-bottom-10 md:-bottom-12 lg:-bottom-16 left-[60%] transform -translate-x-1/2 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24" style={{ color: fillColor }} />
            </span>
            {text.slice(1)}
          </>
        ) : text}
        <span 
          className="absolute inset-0"
          style={{
            WebkitTextStroke: 'transparent',
            WebkitTextFillColor: fillColor,
            clipPath: direction === 'ltr' ? 'inset(0 100% 0 0)' : 'inset(0 0 0 100%)',
            animation: `fillAnimation${direction === 'ltr' ? 'LTR' : 'RTL'} 6s infinite alternate`,
          }}
          aria-hidden="true"
        >
          {isFirstLine ? (
            <>
              <span className="text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] relative">
                {text[0]}
              </span>
              {text.slice(1)}
            </>
          ) : text}
        </span>
      </h1>
    </div>
  )

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="p-8">
        <div className="flex flex-col items-stretch space-y-2 w-full max-w-4xl">
          <TextLine text={text1} direction="ltr" isFirstLine={true} />
          <TextLine text={text2} direction="rtl" isFirstLine={false} />
        </div>
      </div>
      <style jsx>{`
        @keyframes strokeAnimation {
          0% {
            filter: drop-shadow(0 0 1px ${outlineColor});
          }
          100% {
            filter: drop-shadow(0 0 3px ${outlineColor});
          }
        }
        @keyframes fillAnimationLTR {
          0% {
            clip-path: inset(0 100% 0 0);
          }
          100% {
            clip-path: inset(0 0 0 0);
          }
        }
        @keyframes fillAnimationRTL {
          0% {
            clip-path: inset(0 0 0 100%);
          }
          100% {
            clip-path: inset(0 0 0 0);
          }
        }
      `}</style>
    </div>
  )
}
