"use client"

import { motion } from "framer-motion"
import { Recycle, Settings, Flame, Droplets, Fuel, Wind, Factory, Leaf } from "lucide-react"
import { OceanCard } from "@/components/ui/ocean-card"

const steps = [
  {
    icon: Recycle,
    title: "Feedstock Preparation",
    description:
      "Mixed and non-recyclable plastics are aggregated as feedstock. Proper upstream collection enables scale.",
  },
  {
    icon: Settings,
    title: "Shredding & Sorting",
    description:
      "Contaminants are removed and plastics are sized for stable feeding. Drying and pelletizing improve consistency.",
  },
  {
    icon: Flame,
    title: "Thermal Decomposition",
    description:
      "In an oxygen-free reactor, plastics are heated to 400–650°C, cracking long chains into vapors and gases.",
  },
  {
    icon: Droplets,
    title: "Condensation (Bio‑Crude)",
    description:
      "Hot vapors cool into a liquid pyrolysis oil — a bio‑crude similar to fossil crude in chemistry.",
  },
  {
    icon: Fuel,
    title: "Refining to Fuels",
    description:
      "Bio‑crude is upgradable in refineries into diesel, naphtha (for gasoline/jet), or feedstock for new plastics.",
  },
  {
    icon: Wind,
    title: "Syngas for Heat & Power",
    description:
      "Non‑condensable gases fuel the process itself, closing the energy loop for self‑sustained operations.",
  },
  {
    icon: Factory,
    title: "Char Utilization",
    description:
      "The carbon‑rich solid residue (char) can be used as industrial filler, carbon product, or for process heat.",
  },
  {
    icon: Leaf,
    title: "AI Optimization",
    description:
      "ML tunes reactor parameters in real time based on feedstock composition for maximum yield and uptime.",
  },
]

export function PyrolysisSection() {
  return (
    <section id="pyrolysis" className="relative min-h-screen flex items-center justify-center px-6 py-16">
      <div className="max-w-6xl mx-auto w-full">
        <motion.h2
          className="text-4xl md:text-6xl font-bold mb-8 text-center glow-text text-balance"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.8 }}
          viewport={{ margin: "-100px" }}
        >
          Plastic-to-Energy Pyrolysis
        </motion.h2>

        <motion.p
          className="text-lg md:text-xl text-muted-foreground mb-12 text-center max-w-3xl mx-auto leading-relaxed text-balance"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ margin: "-100px" }}
        >
          Our advanced pyrolysis line converts difficult plastics into valuable outputs: bio‑crude, syngas, and char —
          creating circular revenue while preventing microplastic formation.
        </motion.p>

        <OceanCard tone="blue" className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {steps.map((s, i) => (
              <motion.div
                key={i}
                className="flex items-start gap-4 p-5 rounded-xl bg-card/40 border border-primary/20 hover:border-primary/40 transition-all"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                viewport={{ margin: "-100px" }}
              >
                <div className="p-3 rounded-lg bg-primary/10 border border-primary/30">
                  <s.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">{i + 1}. {s.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{s.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </OceanCard>
      </div>
    </section>
  )
}
