"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { CircularTestimonials, type CircularItem } from "@/components/ui/circular-testimonials"
import { projects } from "@/lib/data"

const projectItems: CircularItem[] = projects.map((p) => ({
  src:         p.image ?? "",
  name:        p.title,
  designation: p.subtitle,
  quote:       p.description,
  tags:        p.tags,
  impact:      p.impact,
  github:      p.github,
  color:       p.color,
}))

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView   = useInView(sectionRef, { once: true, margin: "-80px" })

  return (
    <section ref={sectionRef} id="projects" className="section-padding px-6" aria-label="Projects">
      <div className="max-w-7xl mx-auto">

        <motion.div
          className="flex items-center gap-4 mb-20"
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="chip">03 — Work</span>
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
              selected
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
              WORK<span style={{ color: "#7FCFE0" }}>.</span>
            </motion.div>
          </div>
          <motion.p
            className="text-[#717285] text-lg max-w-lg mt-5"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.18 }}
          >
            Research prototypes, deployed systems, hackathon wins — six projects that matter.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.0, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <CircularTestimonials
            testimonials={projectItems}
            autoplay
            colors={{
              name:                "#EBE7DC",
              designation:         "#7FCFE0",
              testimony:           "#717285",
              arrowBackground:     "#0D0C1E",
              arrowForeground:     "#EBE7DC",
              arrowHoverBackground:"#7FCFE0",
            }}
            fontSizes={{
              name:        "clamp(1.6rem, 2.8vw, 2.4rem)",
              designation: "0.9rem",
              quote:       "0.9375rem",
            }}
          />
        </motion.div>

      </div>
    </section>
  )
}
