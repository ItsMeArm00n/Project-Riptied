"use client"

import { motion } from "framer-motion"
import { Fish, Leaf, TrendingUp } from "lucide-react"

const impacts = [
  {
    icon: Fish,
    stat: "80%",
    label: "Reduction in plastic leakage by 2040",
  },
  {
    icon: Leaf,
    stat: "100M kg",
    label: "Plastic removed from oceans",
  },
  {
    icon: TrendingUp,
    stat: "∞",
    label: "Self-sustaining energy cycle",
  },
]

export function ImpactSection() {
  return (
    <section
      id="impact"
      className="relative min-h-screen flex items-center justify-center px-6 py-16 bg-black/20 backdrop-blur-sm"
    >
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-4xl md:text-6xl font-bold mb-8 text-center glow-text text-balance"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.8 }}
          viewport={{ margin: "-100px" }}
        >
          Environmental Impact
        </motion.h2>

        <motion.p
          className="text-lg md:text-xl text-muted-foreground mb-16 text-center max-w-3xl mx-auto leading-relaxed text-balance"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ margin: "-100px" }}
        >
          By removing macroplastics and preventing microplastic formation, Riptide protects marine life, biodiversity,
          and food chains.
        </motion.p>

        <div className="grid md:grid-cols-3 gap-8">
          {impacts.map((impact, index) => (
            <motion.div
              key={index}
              className="text-center p-8 rounded-xl bg-card/30 backdrop-blur-sm border border-primary/20 glow-border"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ margin: "-100px" }}
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                className="inline-flex p-4 rounded-full bg-primary/10 border border-primary/30 mb-6"
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(101, 204, 204, 0.3)",
                    "0 0 40px rgba(101, 204, 204, 0.5)",
                    "0 0 20px rgba(101, 204, 204, 0.3)",
                  ],
                }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                <impact.icon className="w-8 h-8 text-primary" />
              </motion.div>

              <motion.div
                className="text-5xl md:text-6xl font-bold text-primary mb-3 glow-text"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.15 }}
                viewport={{ margin: "-100px" }}
              >
                {impact.stat}
              </motion.div>

              <p className="text-muted-foreground text-lg">{impact.label}</p>
            </motion.div>
          ))}
        </div>

        <motion.p
          className="text-xl md:text-2xl font-semibold text-primary mt-16 text-center text-balance"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ margin: "-100px" }}
        >
          A full-scale deployment could reduce plastic leakage into oceans by 80% by 2040 — turning the tide toward
          sustainability.
        </motion.p>
      </div>
    </section>
  )
}
