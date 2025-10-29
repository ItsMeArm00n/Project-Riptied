"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"

type OceanTone = "teal" | "blue" | "emerald" | "indigo"

const toneClassMap: Record<OceanTone, { outer: string; shadow: string; accentPos: "tr" | "bl" | "tl" | "br" }> = {
  teal: {
    outer: "from-cyan-400/40 via-sky-500/20 to-emerald-400/40",
    shadow: "shadow-[0_0_30px_rgba(25,200,200,0.12)]",
    accentPos: "tr",
  },
  blue: {
    outer: "from-sky-400/40 via-blue-500/20 to-indigo-400/40",
    shadow: "shadow-[0_0_30px_rgba(60,140,255,0.12)]",
    accentPos: "bl",
  },
  emerald: {
    outer: "from-emerald-400/40 via-teal-500/20 to-lime-300/40",
    shadow: "shadow-[0_0_30px_rgba(40,200,140,0.12)]",
    accentPos: "tl",
  },
  indigo: {
    outer: "from-indigo-400/40 via-violet-500/20 to-sky-400/40",
    shadow: "shadow-[0_0_30px_rgba(110,90,255,0.12)]",
    accentPos: "br",
  },
}

export function OceanCard({
  children,
  className = "",
  tone = "teal",
}: {
  children: ReactNode
  className?: string
  tone?: OceanTone
}) {
  const toneCfg = toneClassMap[tone]

  // Vary the overlay pattern slightly per tone for subtle variety
  const overlays: Record<OceanTone, { image: string; size: string; animDur: number; opacity: number[] }> = {
    teal: {
      image:
        "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.12) 0%, transparent 40%), radial-gradient(circle at 80% 30%, rgba(255,255,255,0.12) 0%, transparent 40%), radial-gradient(circle at 40% 80%, rgba(255,255,255,0.08) 0%, transparent 50%)",
      size: "140% 140%",
      animDur: 12,
      opacity: [0.2, 0.35, 0.2],
    },
    blue: {
      image:
        "radial-gradient(circle at 15% 30%, rgba(255,255,255,0.10) 0%, transparent 45%), radial-gradient(circle at 85% 20%, rgba(255,255,255,0.14) 0%, transparent 45%), radial-gradient(circle at 50% 85%, rgba(255,255,255,0.08) 0%, transparent 55%)",
      size: "160% 160%",
      animDur: 10,
      opacity: [0.18, 0.32, 0.18],
    },
    emerald: {
      image:
        "radial-gradient(circle at 25% 25%, rgba(255,255,255,0.10) 0%, transparent 42%), radial-gradient(circle at 78% 40%, rgba(255,255,255,0.12) 0%, transparent 44%), radial-gradient(circle at 60% 80%, rgba(255,255,255,0.08) 0%, transparent 52%)",
      size: "150% 150%",
      animDur: 13,
      opacity: [0.18, 0.30, 0.18],
    },
    indigo: {
      image:
        "radial-gradient(circle at 30% 15%, rgba(255,255,255,0.10) 0%, transparent 42%), radial-gradient(circle at 70% 35%, rgba(255,255,255,0.13) 0%, transparent 44%), radial-gradient(circle at 45% 85%, rgba(255,255,255,0.07) 0%, transparent 52%)",
      size: "155% 155%",
      animDur: 11,
      opacity: [0.16, 0.28, 0.16],
    },
  }

  const ov = overlays[tone]
  const accentPosClass =
    toneCfg.accentPos === "tr"
      ? "top-3 right-4"
      : toneCfg.accentPos === "bl"
      ? "bottom-3 left-4"
      : toneCfg.accentPos === "tl"
      ? "top-3 left-4"
      : "bottom-3 right-4"

  return (
    <div className={`relative p-[1px] rounded-2xl bg-gradient-to-br ${toneCfg.outer} ${toneCfg.shadow} ${className}`}>
      <div className="relative rounded-2xl bg-background/50 backdrop-blur-md border border-primary/20 overflow-hidden">
        {/* Animated caustics overlay (varies per tone) */}
        <motion.div
          className="pointer-events-none absolute inset-0 opacity-30 mix-blend-overlay"
          style={{
            backgroundImage: ov.image,
            backgroundSize: ov.size,
            backgroundPosition: "0% 0%",
          }}
          animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"], opacity: ov.opacity }}
          transition={{ duration: ov.animDur, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />

        {/* A tiny pulsing accent dot for subtle variation */}
        <motion.span
          className={`pointer-events-none absolute w-2.5 h-2.5 rounded-full bg-gradient-to-br from-white/70 to-white/0 blur-[1px] ${accentPosClass}`}
          animate={{ scale: [1, 1.2, 1], opacity: [0.7, 0.4, 0.7] }}
          transition={{ duration: 3.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />

        {/* Subtle top highlight */}
        <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        <div className="relative p-8 md:p-12">{children}</div>
      </div>
    </div>
  )
}
