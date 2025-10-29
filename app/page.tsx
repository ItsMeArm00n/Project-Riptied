"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll } from "framer-motion"
import { OceanScene } from "@/components/ocean-scene"
import { HeroSection } from "@/components/hero-section"
import { ContentSection } from "@/components/content-section"
import { TechnologySection } from "@/components/technology-section"
import { ImpactSection } from "@/components/impact-section"
import { Button } from "@/components/ui/button"
import { ArrowRight, Waves } from "lucide-react"
import { ReefDivider } from "@/components/reef-divider"

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const [isSlideshowActive, setIsSlideshowActive] = useState(false)
  const [slideshowProgress, setSlideshowProgress] = useState(0)

  // Refs for each section
  const heroRef = useRef<HTMLElement>(null)
  const valuesRef = useRef<HTMLElement>(null)
  const approachRef = useRef<HTMLElement>(null)
  const crisisRef = useRef<HTMLElement>(null)
  const captureRef = useRef<HTMLElement>(null)
  const solutionRef = useRef<HTMLElement>(null)
  const technologyRef = useRef<HTMLElement>(null)
  const aiRef = useRef<HTMLElement>(null)
  const impactRef = useRef<HTMLElement>(null)
  const economicRef = useRef<HTMLElement>(null)
  const futureRef = useRef<HTMLElement>(null)

  const sections = [
    heroRef,
    valuesRef,
    approachRef,
    crisisRef,
    captureRef,
    solutionRef,
    technologyRef,
    aiRef,
    impactRef,
    economicRef,
    futureRef,
  ]

  // Ref mirror of slideshow active to ensure async loop sees live value
  const slideshowActiveRef = useRef(false)

  // Cancel slideshow on explicit user input only (not programmatic smooth scroll)
  useEffect(() => {
    if (!isSlideshowActive) return

    const cancel = () => {
      slideshowActiveRef.current = false
      setIsSlideshowActive(false)
      setSlideshowProgress(0)
    }

    const onWheel = () => cancel()
    const onTouchStart = () => cancel()
    const onKeyDown = (e: KeyboardEvent) => {
      const scrollKeys = [
        'ArrowUp',
        'ArrowDown',
        'PageUp',
        'PageDown',
        'Home',
        'End',
        ' ', // Space
      ]
      if (scrollKeys.includes(e.key)) cancel()
    }

    window.addEventListener('wheel', onWheel, { passive: true })
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('keydown', onKeyDown)

    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isSlideshowActive])

  const startSlideshow = async () => {
    if (isSlideshowActive) return
    slideshowActiveRef.current = true
    setIsSlideshowActive(true)
    setSlideshowProgress(0)

    for (let i = 0; i < sections.length; i++) {
      const section = sections[i]
      if (!slideshowActiveRef.current) break
      if (section.current) {
        section.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
        setSlideshowProgress(((i + 1) / sections.length) * 100)
        await new Promise(resolve => setTimeout(resolve, 3800)) // Wait ~3.8s per section
      }
      if (!slideshowActiveRef.current) break
    }

    slideshowActiveRef.current = false
    setIsSlideshowActive(false)
    setSlideshowProgress(0)
  }

  return (
    <div ref={containerRef} className="relative min-h-screen ocean-gradient overflow-x-hidden">
      {/* Fixed 3D Background */}
      <div className="fixed inset-0 z-0">
        <OceanScene />
      </div>

      {/* Floating particles overlay */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 opacity-30">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary/40 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0.2, 0.6, 0.2],
              }}
              transition={{
                duration: 3 + Math.random() * 4,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <section ref={heroRef}>
          <HeroSection onStartSlideshow={startSlideshow} />
        </section>

  {/* Divider */}
  <ReefDivider tone="teal" doubleSided height={64} />

        <section ref={valuesRef}>
          <ContentSection
            id="values"
            title="Our Values"
            content="Project Riptide is driven by environmental sustainability, innovation, and collaboration. We partner with research institutions and local communities to restore aquatic ecosystems while fostering education about plastic pollution's impact on marine life and human health."
            highlight="Together, we can turn the tide on plastic pollution."
            tone="teal"
          />
        </section>

  {/* Divider */}
  <ReefDivider tone="emerald" doubleSided height={64} />

        <section ref={approachRef}>
          <ContentSection
            id="approach"
            title="Our Approach"
            content="Our approach involves deploying bio-inspired, autonomous robotic fish that collect plastic debris before it breaks down into harmful microplastics. These fish concentrate waste for efficient retrieval and recycling, cleaning aquatic ecosystems while reclaiming valuable materials."
            highlight="Each movement restores balance — one ripple at a time."
            dark
            tone="emerald"
          />
        </section>

  {/* Divider */}
  <ReefDivider tone="blue" doubleSided height={64} />

        <section ref={crisisRef}>
          <ContentSection
            id="crisis"
            title="The Plastic Crisis"
            content="Plastic pollution is a major contributor to aquatic ecosystem degradation. It contaminates water bodies, harms marine life through ingestion and entanglement, disrupts food chains, causes biodiversity loss, and poses potential human health impacts. Plastic accumulates in massive subtropical oceanic gyres, trapped for decades."
            highlight="Every second counts before they become invisible pollutants."
            tone="blue"
          />
        </section>

  {/* Divider */}
  <ReefDivider tone="teal" doubleSided height={64} />

        <section ref={captureRef}>
          <ContentSection
            id="capture"
            title="Plastic Capture & Storage"
            content="Our robotic fish target plastic in oceanic gyres where debris concentrates. By removing macroplastics before they fragment into microplastics, we prevent the creation of pollutants that are impossible to fully remove from the ocean."
            highlight="Prevention is the most powerful form of ocean restoration."
            dark
            tone="indigo"
          />
        </section>

  {/* Divider */}
  <ReefDivider tone="emerald" doubleSided height={64} />

        <section ref={solutionRef}>
          <ContentSection
            id="solution"
            title="Our Solution"
            content="Project Riptide offers a scalable solution: autonomous fish that collect plastic and convert it into clean energy using onboard AI and pyrolysis systems."
            highlight="They're self-powered, data-driven, and designed to make marine cleanup continuous and intelligent."
            tone="teal"
          />
        </section>

  {/* Divider */}
  <ReefDivider tone="blue" doubleSided height={64} />

        <section ref={technologyRef}>
          <TechnologySection />
        </section>

  {/* Divider */}
  <ReefDivider tone="teal" doubleSided height={64} />

        <section ref={aiRef}>
          <ContentSection
            id="ai"
            title="The Use of AI"
            content="AI is the operational heart of Riptide. Machine learning algorithms analyze each type of plastic, optimize reactor conditions, and perform predictive maintenance."
            highlight="This ensures maximum efficiency, zero downtime, and continuous energy generation."
            dark
            tone="emerald"
          />
        </section>

  {/* Divider */}
  <ReefDivider tone="emerald" doubleSided height={64} />

        <section ref={impactRef}>
          <ImpactSection />
        </section>

  {/* Divider */}
  <ReefDivider tone="blue" doubleSided height={64} />

        <section ref={economicRef}>
          <ContentSection
            id="economic"
            title="Economic Value"
            content="Our circular approach transforms plastic from pollution to profit."
            features={["Bio-Crude → Sustainable fuels", "Syngas → Energy source", "Char → Industrial carbon product"]}
            highlight="Project Riptide not only cleans oceans but also creates jobs, fuels innovation, and redefines waste as opportunity."
            tone="indigo"
          />
        </section>

  {/* Divider */}
  <ReefDivider tone="teal" doubleSided height={64} />

        {/* Final CTA Section */}
        <section ref={futureRef} className="relative min-h-screen flex items-center justify-center px-6 py-16">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 1 }}
            viewport={{ margin: "-100px" }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div
              className="inline-block mb-8"
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
              }}
            >
              <Waves className="w-20 h-20 text-primary glow-text" />
            </motion.div>

            <h2 className="text-5xl md:text-7xl font-bold mb-6 glow-text text-balance">The Future</h2>

            <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed text-balance">
              From AI intelligence to ocean resilience — Project Riptide represents a new wave of innovation.
            </p>

            <p className="text-2xl md:text-3xl font-semibold mb-12 text-primary text-balance">
              A future where technology breathes life back into the sea.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                className="glow-border group text-lg px-8 py-6"
                onClick={() => heroRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
              >
                Home
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="relative border-t border-border/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-2">
                <Waves className="w-6 h-6 text-primary" />
                <span className="text-xl font-bold">PROJECT RIPTIDE</span>
              </div>
              <p className="text-sm text-muted-foreground">
                © 2025 Project Riptide. Turning the tide toward sustainability.
              </p>
            </div>
          </div>
        </footer>
      </div>

      {/* Slideshow Progress Bar */}
      {isSlideshowActive && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-sm border-t border-border"
        >
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium">Slideshow Progress</span>
              <div className="flex-1 bg-muted rounded-full h-2">
                <motion.div
                  className="bg-primary h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${slideshowProgress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <span className="text-sm text-muted-foreground">{Math.round(slideshowProgress)}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
