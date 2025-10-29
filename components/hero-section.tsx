"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, ChevronDown } from "lucide-react"

export function HeroSection({ onStartSlideshow }: { onStartSlideshow: () => void }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 py-16">
      <div className="absolute inset-0 bg-background/20 backdrop-blur-[2px]" />

      <div className="max-w-6xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <motion.h1
            className="text-6xl md:text-8xl lg:text-9xl font-bold mb-6 glow-text tracking-tight"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.3 }}
          >
            PROJECT RIPTIDE
          </motion.h1>
        </motion.div>

        <motion.p
          className="text-xl md:text-3xl text-foreground/90 mb-4 max-w-3xl mx-auto leading-relaxed text-balance font-medium"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          Autonomous robotic fish cleaning our oceans and turning plastic into power.
        </motion.p>

        <motion.p
          className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto text-balance"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          Bio-inspired technology restoring aquatic ecosystems one ripple at a time
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <Button size="lg" className="glow-border group text-lg px-8 py-6" onClick={onStartSlideshow}>
            Start Slideshow
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>

        {/* Scroll hint below the button */}
        <motion.div
          className="mt-10 flex items-center justify-center"
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: [0, 6, 0] }}
          transition={{ duration: 2.2, repeat: Number.POSITIVE_INFINITY }}
        >
          <ChevronDown className="w-8 h-8 text-primary/70 drop-shadow-[0_0_8px_rgba(101,204,204,0.35)]" />
        </motion.div>
      </div>
    </section>
  )
}
