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
import { PyrolysisSection } from "@/components/pyrolysis-section"

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
  const helpRef = useRef<HTMLElement>(null)
  const solutionRef = useRef<HTMLElement>(null)
  const technologyRef = useRef<HTMLElement>(null)
  const pyrolysisRef = useRef<HTMLElement>(null)
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
    helpRef,
    solutionRef,
    technologyRef,
    pyrolysisRef,
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
            content="Project Riptide is driven by a commitment to environmental sustainability. We restore the health of aquatic ecosystems by removing plastic pollution, prioritize innovation and creativity through bio‑inspired solutions like our plastic‑removing fish, and believe in collaboration with research institutions and local communities to scale impact. We foster education and awareness about plastic pollution’s effects and the importance of healthy water bodies, and we uphold ethical responsibility in the careful development and deployment of our technology, ensuring the safety and well‑being of marine life. By embracing these values, we can make a significant contribution to addressing plastic waste and aquatic climate change impacts."
            highlight="Innovation, collaboration, education, and ethics — our values drive real ocean restoration."
            tone="teal"
          />
        </section>

  {/* Divider */}
  <ReefDivider tone="emerald" doubleSided height={64} />

        <section ref={approachRef}>
          <ContentSection
            id="approach"
            title="Our Approach"
            content="We deploy bio‑inspired, autonomous fish that remove plastic waste before it can break down into harmful microplastics. These robotic fish collect plastic debris from water bodies, concentrating the waste for efficient retrieval and recycling. The captured plastic is then separated and utilized for various purposes — cleaning aquatic ecosystems while reclaiming valuable materials."
            highlight="Stop plastics before they fragment — restore balance, ripple by ripple."
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
            content="Plastic pollution — in macro and micro forms — is a major contributor to aquatic ecosystem degradation. It contaminates water bodies, harms marine life via ingestion and entanglement, disrupts food chains, drives biodiversity loss, and poses human health risks. Addressing the crisis requires removing existing debris and transitioning to sustainable materials and waste practices."
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
            content="Plastic accumulates in huge subtropical oceanic gyres — massive circular currents that trap floating plastic for decades. The most infamous is the Great Pacific Garbage Patch (GPGP) between Hawaii and California, estimated to be triple the size of France and containing roughly 100 million kilograms of plastic across 1.8 trillion pieces. Critically, about 92% of this mass is larger macroplastics that are continually fragmenting into hard‑to‑clean secondary microplastics. Immediate large‑scale cleanup must remove macroplastics before they break down further."
            features={["5 major oceanic gyres", "GPGP ≈ 3× France", "~100M kg & 1.8T pieces", "~92% macroplastics (fragmenting)"]}
            highlight="Target gyres. Remove macroplastics now. Prevent tomorrow’s microplastics."
            dark
            tone="indigo"
          />
        </section>

  {/* Divider */}
  <ReefDivider tone="emerald" doubleSided height={64} />

        {/* How We Help: microplastics & data */}
        <section ref={helpRef}>
          <ContentSection
            id="help"
            title="How We Help"
            content="Project Riptide offers a crucial, scalable response to microplastic pollution. By deploying autonomous robotic fish, we actively remove microplastics at their source in high‑concentration areas and safeguard marine biodiversity and the integrity of the food web. Each unit doubles as a mobile data platform, streaming real‑time, granular data on microplastic distribution and types to refine cleanup strategies and inform policy."
            features={["Active microplastic removal at source","Targets high‑concentration hotspots","Real‑time data for science & policy","Bio‑inspired design inspires public action"]}
            highlight="Clean today, learn for tomorrow — action plus data."
            tone="emerald"
          />
        </section>

        <section ref={solutionRef}>
          <ContentSection
            id="solution"
            title="Our Solution"
            content="A scalable, autonomous system of bio‑inspired fish removes plastic and channels it into AI‑optimized pyrolysis — producing bio‑crude, syngas, and char. The syngas powers the process, creating a self‑sustaining loop and turning pollution into valuable resources."
            highlight="From plastic to power: circular, continuous, intelligent cleanup."
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

        {/* Pyrolysis Process */}
        <section ref={pyrolysisRef}>
          <PyrolysisSection />
        </section>

        <section ref={aiRef}>
          <ContentSection
            id="ai"
            title="The Use of AI"
            content="Artificial Intelligence is the operational core of the Riptide pyrolysis line. Machine learning analyzes the incoming feedstock’s chemical composition to optimize reactor temperature and pressure in real time, maximizing conversion of plastic into high‑value bio‑crude and syngas. AI also performs predictive maintenance to prevent downtime and ensure continuous, reliable resource recovery — elevating efficiency and product quality."
            highlight="Real‑time optimization and predictive maintenance — maximum yield, minimum downtime."
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
            content="The circular model transforms waste liability into valuable commercial assets, creating a robust, sustainable economy. New revenue streams include bio‑crude for refineries (fuels or new plastics), syngas for on‑site heat and power, and char as an industrial carbon product. By reusing discarded plastic, we reduce dependence on volatile fossil feedstocks, stabilize production costs, create regional jobs, and avoid mounting waste management expenses."
            features={[
              "Bio‑Crude → refinery feedstock & sustainable fuels",
              "Syngas → self‑powers operations (energy savings)",
              "Char → marketable industrial carbon",
              "Reduced virgin feedstock dependence",
              "Regional job creation across collection, sorting, and operations",
              "Waste management cost avoidance",
            ]}
            highlight="Turn plastic from liability to asset — profitably and sustainably."
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
