"use client"

import { motion } from "framer-motion"
import { Scan, Cpu, Zap, Database } from "lucide-react"

const techSteps = [
  {
    icon: Scan,
    title: "Collection",
    description: "The fish gathers and identifies plastic debris using computer vision.",
  },
  {
    icon: Cpu,
    title: "Sorting & Conversion",
    description:
      "Internal processors heat and decompose plastics into bio-crude and syngas through AI-optimized pyrolysis.",
  },
  {
    icon: Zap,
    title: "Energy Cycle",
    description: "The syngas fuels the fish, enabling self-sustained operation.",
  },
  {
    icon: Database,
    title: "Data Feedback",
    description: "Every fish transmits microplastic distribution data to a global AI ocean network.",
  },
]

export function TechnologySection() {
  return (
    <section id="technology" className="relative min-h-screen flex items-center justify-center px-6 py-16">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-4xl md:text-6xl font-bold mb-16 text-center glow-text text-balance"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.8 }}
          viewport={{ margin: "-100px" }}
        >
          The Technology
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8">
          {techSteps.map((step, index) => (
            <motion.div
              key={index}
              className="relative p-8 rounded-xl bg-card/50 backdrop-blur-sm border border-primary/20 glow-border hover:border-primary/40 transition-all duration-300"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ margin: "-100px" }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10 border border-primary/30">
                  <step.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-3 text-foreground">
                    {index + 1}. {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              </div>

              {/* Connecting line for flow */}
              {index < techSteps.length - 1 && index % 2 === 0 && (
                <motion.div
                  className="hidden md:block absolute -right-4 top-1/2 w-8 h-0.5 bg-gradient-to-r from-primary/50 to-transparent"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  exit={{ scaleX: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 + index * 0.15 }}
                  viewport={{ margin: "-100px" }}
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
