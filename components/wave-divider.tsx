"use client"

import { motion } from "framer-motion"

interface WaveDividerProps {
  flip?: boolean
  height?: number
  colorStops?: [string, string, string]
  bubbles?: boolean
}

export function WaveDivider({ flip = false, height = 120, colorStops = ["#67d9d9", "#31bebe", "#67d9d9"], bubbles = true }: WaveDividerProps) {
  return (
    <div className={`relative w-full ${flip ? "rotate-180" : ""}`} style={{ height }}>
      <motion.svg
        viewBox="0 0 1440 140"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
        initial={{ y: 4 }}
        animate={{ y: [4, 0, 4] }}
        transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      >
        <defs>
          <linearGradient id="oceanGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={colorStops[0]} stopOpacity="0.35" />
            <stop offset="50%" stopColor={colorStops[1]} stopOpacity="0.8" />
            <stop offset="100%" stopColor={colorStops[2]} stopOpacity="0.35" />
          </linearGradient>
          <linearGradient id="highlightGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Deep wave layer */}
        <motion.path
          d="M0,90 C180,110 360,30 540,44 C720,58 900,128 1080,116 C1260,104 1440,72 1440,72 L1440,140 L0,140 Z"
          fill="url(#oceanGradient)"
          initial={{ translateY: 0 }}
          animate={{ translateY: [0, -2, 0] }}
          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          opacity={0.35}
        />
        {/* Mid wave layer */}
        <motion.path
          d="M0,78 C160,96 320,42 480,54 C640,66 800,114 960,102 C1120,90 1280,62 1440,60 L1440,140 L0,140 Z"
          fill="url(#oceanGradient)"
          initial={{ translateY: 0 }}
          animate={{ translateY: [0, -3, 0] }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          opacity={0.55}
          style={{ filter: "drop-shadow(0 2px 6px rgba(101,204,204,0.25))" }}
        />
        {/* Foreground wave with highlight */}
        <motion.g initial={{ translateY: 0 }} animate={{ translateY: [0, -4, 0] }} transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}>
          <path
            d="M0,66 C140,86 300,38 460,48 C640,60 790,100 980,92 C1140,84 1280,56 1440,52 L1440,140 L0,140 Z"
            fill="url(#oceanGradient)"
          />
          <path
            d="M0,64 C140,84 300,36 460,46 C640,58 790,98 980,90 C1140,82 1280,54 1440,50"
            fill="none"
            stroke="url(#highlightGradient)"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.8"
          />
        </motion.g>

        {/* Bubbles */}
        {bubbles && (
          <>
            {[...Array(8)].map((_, i) => (
              <motion.circle
                key={i}
                r={Math.random() * 2 + 1.5}
                cx={120 + i * 160}
                cy={120}
                fill="rgba(255,255,255,0.5)"
                animate={{
                  cy: [120, 80 + (i % 3) * 6, 120],
                  opacity: [0.2, 0.7, 0.2],
                }}
                transition={{ duration: 5 + i * 0.4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: i * 0.2 }}
              />
            ))}
          </>
        )}
      </motion.svg>
      {/* Subtle line at the bottom for separation */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-primary/40" />
    </div>
  )
}
