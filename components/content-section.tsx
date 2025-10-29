"use client"

import { motion } from "framer-motion"
import { Check } from "lucide-react"
import { OceanCard } from "@/components/ui/ocean-card"

interface ContentSectionProps {
  id: string
  title: string
  content: string
  highlight?: string
  features?: string[]
  dark?: boolean
  tone?: "teal" | "blue" | "emerald" | "indigo"
}

export function ContentSection({ id, title, content, highlight, features, dark = false, tone = "teal" }: ContentSectionProps) {
  return (
    <section
      id={id}
      className={`relative min-h-screen flex items-center justify-center px-6 py-16 ${
        dark ? "bg-black/20 backdrop-blur-sm" : ""
      }`}
    >
  <OceanCard className="max-w-5xl mx-auto" tone={tone}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.8 }}
          viewport={{ margin: "-100px" }}
        >
        <motion.h2
          className="text-4xl md:text-6xl font-bold mb-8 glow-text text-balance"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ margin: "-100px" }}
        >
          {title}
        </motion.h2>

        <motion.p
          className="text-lg md:text-xl text-muted-foreground mb-6 leading-relaxed text-pretty"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ margin: "-100px" }}
        >
          {content}
        </motion.p>

        {features && (
          <motion.ul
            className="space-y-3 mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ margin: "-100px" }}
          >
            {features.map((feature, index) => (
              <motion.li
                key={index}
                className="flex items-center gap-3 text-lg text-foreground"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                viewport={{ margin: "-100px" }}
              >
                <Check className="w-5 h-5 text-primary flex-shrink-0" />
                <span>{feature}</span>
              </motion.li>
            ))}
          </motion.ul>
        )}

        {highlight && (
          <motion.p
            className="text-xl md:text-2xl font-semibold text-primary mt-8 text-balance"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ margin: "-100px" }}
          >
            {highlight}
          </motion.p>
        )}
        </motion.div>
      </OceanCard>
    </section>
  )
}
