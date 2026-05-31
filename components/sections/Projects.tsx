"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { HeroParallax, type ParallaxProduct } from "@/components/ui/hero-parallax"
import { projects } from "@/lib/data"
import { useLang, t } from "@/lib/i18n"

/* Cycle the 6 projects to fill 15 parallax slots */
const padded: ParallaxProduct[] = Array.from({ length: 15 }, (_, i) => {
  const p = projects[i % projects.length]
  return {
    title:     p.title,
    link:      p.github,
    thumbnail: p.image ?? "",
    tags:      p.tags,
  }
})

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView   = useInView(sectionRef, { once: true, margin: "-80px" })
  const { lang }   = useLang()
  const tx         = t[lang].projects

  return (
    <section ref={sectionRef} id="projects" className="relative" aria-label="Projects">
      {/* Section header — above the parallax scroll area */}
      <div className="max-w-7xl mx-auto pt-[140px] pb-0 px-[clamp(1.5rem,5vw,5rem)]">

        <motion.div
          className="flex items-center gap-4 mb-20"
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="chip">{tx.label}</span>
          <div className="section-label-line" />
        </motion.div>

        <div className="mb-16">
          <div style={{ overflow: "hidden" }}>
            <motion.div
              className="font-serif italic text-[clamp(1.5rem,3vw,2.4rem)] leading-[1.3] text-[#717285]"
              initial={{ y: "100%", opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: "100%", opacity: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              {tx.suptitle}
            </motion.div>
          </div>
          <div style={{ overflow: "hidden" }}>
            <motion.div
              className="font-impact leading-[0.88] text-[#EBE7DC]"
              style={{ fontSize: "clamp(5rem,14vw,13rem)", letterSpacing: "-0.02em" }}
              initial={{ y: "100%" }}
              animate={isInView ? { y: 0 } : { y: "100%" }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.06 }}
            >
              {tx.title}<span style={{ color: "#7FCFE0" }}>.</span>
            </motion.div>
          </div>
          <motion.p
            className="text-[#717285] text-lg max-w-lg mt-5"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.18 }}
          >
            {tx.sub}
          </motion.p>
        </div>
      </div>

      {/* Scroll-parallax grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1.0, delay: 0.3 }}
      >
        <HeroParallax products={padded} />
      </motion.div>
    </section>
  )
}
