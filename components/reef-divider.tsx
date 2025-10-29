"use client"

import { motion } from "framer-motion"

interface ReefDividerProps {
  flip?: boolean
  height?: number
  tone?: "teal" | "blue" | "emerald"
  doubleSided?: boolean
}

const toneMap = {
  teal: ["#89f0f0", "#42c7c7", "#128b8b"],
  blue: ["#9bd3ff", "#4aa3ff", "#1b5fd1"],
  emerald: ["#a6f4c5", "#4dd4a3", "#1f8f6b"],
} as const

function SingleReef({ tone }: { tone: keyof typeof toneMap }) {
  const colors = toneMap[tone]
  return (
    <svg viewBox="0 0 1440 160" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
      <defs>
        <linearGradient id="reefGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={colors[0]} stopOpacity="0.25" />
          <stop offset="50%" stopColor={colors[1]} stopOpacity="0.6" />
          <stop offset="100%" stopColor={colors[2]} stopOpacity="0.25" />
        </linearGradient>
      </defs>
      {/* Deep seabed */}
      <path d="M0,120 C180,140 260,120 400,130 C560,142 780,158 980,140 C1180,122 1310,120 1440,132 L1440,160 L0,160 Z" fill="url(#reefGrad)" opacity="0.35" />
      {/* Coral silhouettes - back */}
      <path d="M0,120 C60,110 100,100 140,120 C180,140 220,120 260,130 C300,140 340,114 380,128 C420,142 460,120 500,130 C560,146 600,118 660,132 C720,146 780,124 860,132 C940,140 1020,120 1100,130 C1180,140 1260,124 1440,132 L1440,160 L0,160 Z" fill={colors[2]} opacity="0.25" />
      {/* Coral silhouettes - mid */}
      <path d="M0,132 C90,126 160,140 240,134 C320,128 400,146 480,138 C560,130 640,150 720,140 C800,130 900,148 980,140 C1060,132 1180,146 1260,140 C1340,134 1390,140 1440,144 L1440,160 L0,160 Z" fill={colors[1]} opacity="0.35" />
      {/* Coral silhouettes - front */}
      <path d="M0,144 C100,146 200,150 300,148 C420,146 540,154 660,150 C780,146 900,156 1020,152 C1140,148 1260,156 1380,154 L1440,154 L1440,160 L0,160 Z" fill={colors[0]} opacity="0.5" />
    </svg>
  )
}

export function ReefDivider({ flip = false, height = 120, tone = "teal", doubleSided = false }: ReefDividerProps) {
  if (doubleSided) {
    return (
      <div className="relative w-full" style={{ height }}>
        {/* Top half */}
        <div className="absolute inset-x-0 top-0 h-1/2">
          <SingleReef tone={tone} />
        </div>
        {/* Bottom half mirrored */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 rotate-180">
          <SingleReef tone={tone} />
        </div>
        {/* Center separator line for crisp edge */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-primary/30" />
      </div>
    )
  }

  return (
    <div className={`relative w-full ${flip ? "rotate-180" : ""}`} style={{ height }}>
      <SingleReef tone={tone} />

      {/* Floating bubbles and fish silhouettes */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`b-${i}`}
            className="absolute rounded-full"
            style={{
              width: 6 + (i % 3),
              height: 6 + (i % 3),
              left: `${10 + i * 16}%`,
              bottom: `${8 + (i % 2) * 6}%`,
              background: "rgba(255,255,255,0.5)",
            }}
            animate={{ y: [0, -12, 0], opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 3 + i * 0.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: i * 0.2 }}
          />
        ))}
        {/* Tiny fish */}
        <motion.div
          className="absolute w-3 h-1 bg-primary/70 rounded-full"
          style={{ left: "-5%", bottom: "24%" }}
          animate={{ left: ["-5%", "105%"], rotate: [0, 0] }}
          transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
      </div>

      {/* Top separator line */}
      <div className="absolute inset-x-0 top-0 h-px bg-primary/30" />
    </div>
  )
}
