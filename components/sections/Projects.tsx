"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"
import { useTilt } from "@/hooks/useTilt"
import { projects } from "@/lib/data"

/* ── Project card ────────────────────────────────── */
interface CardProps {
  proj: (typeof projects)[number]
  featured?: boolean
}

function ProjectCard({ proj, featured = false }: CardProps) {
  const tilt         = useTilt(featured ? 5 : 10)
  const [open, setOpen] = useState(false)
  const spotRef      = useRef<HTMLDivElement>(null)

  /* Combined mouse move: 3-D tilt + spotlight beam */
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    tilt.onMouseMove(e)
    if (spotRef.current) {
      const rect = e.currentTarget.getBoundingClientRect()
      const x    = e.clientX - rect.left
      const y    = e.clientY - rect.top
      spotRef.current.style.background =
        `radial-gradient(500px circle at ${x}px ${y}px, ${proj.color}12, transparent 65%)`
      spotRef.current.style.opacity = "1"
    }
  }

  const handleMouseLeave = () => {
    tilt.onMouseLeave()
    if (spotRef.current) spotRef.current.style.opacity = "0"
  }

  return (
    <div
      ref={tilt.ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => setOpen(!open)}
      className="card-3d card-spotlight relative rounded-2xl overflow-hidden cursor-pointer select-none"
      style={{
        background: "rgba(8,8,18,0.65)",
        border: `1px solid rgba(0,255,209,0.07)`,
      }}
      data-cursor="VIEW"
    >
      {/* Spotlight beam overlay */}
      <div
        ref={spotRef}
        className="card-spotlight-beam"
        style={{ opacity: 0, transition: "opacity 0.3s ease" }}
      />

      {/* Top accent line */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px z-10"
        style={{ background: `linear-gradient(90deg, transparent, ${proj.color}70, transparent)` }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3, repeat: Infinity, delay: Math.random() * 2 }}
      />

      {/* Noise texture */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none z-0"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")"
        }}
      />

      <div className={`card-3d-inner p-7 ${featured ? "lg:p-10" : ""} relative z-10`}>
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-5">
          <div>
            <div
              className="chip mb-3 w-fit"
              style={{ borderColor: `${proj.color}35`, color: proj.color }}
            >
              {proj.period}
            </div>
            <div className="flex items-center gap-3">
              <span className={featured ? "text-4xl" : "text-3xl"}>{proj.emoji}</span>
              <h3 className={`font-display font-bold text-[#EDE8DC] ${featured ? "text-2xl lg:text-3xl" : "text-xl"}`}>
                {proj.title}
              </h3>
            </div>
            <p className="text-sm font-medium mt-1" style={{ color: proj.color }}>
              {proj.subtitle}
            </p>
          </div>

          {/* Expand toggle */}
          <motion.div
            className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center border"
            style={{
              borderColor: `${proj.color}30`,
              backgroundColor: `${proj.color}08`,
            }}
            animate={{ rotate: open ? 45 : 0 }}
            whileHover={{ scale: 1.15, backgroundColor: `${proj.color}18` }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M2.5 7h9M7.5 3l4 4-4 4"
                stroke={proj.color}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
        </div>

        {/* Description */}
        <p className="text-[#8B8FA8] leading-relaxed mb-5 text-sm">
          {proj.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {proj.tags.map((tag) => (
            <motion.span
              key={tag}
              className="px-3 py-1 rounded font-mono text-[11px] border"
              style={{
                borderColor: `${proj.color}18`,
                color: proj.color,
                backgroundColor: `${proj.color}07`,
              }}
              whileHover={{ backgroundColor: `${proj.color}18`, y: -2 }}
              transition={{ duration: 0.18 }}
            >
              {tag}
            </motion.span>
          ))}
        </div>

        {/* Expandable: impact statement + GitHub link */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              style={{ overflow: "hidden" }}
            >
              <div className="mt-5 pt-5 border-t flex items-start justify-between gap-4" style={{ borderColor: `${proj.color}18` }}>
                <div>
                  <p className="font-mono text-[10px] tracking-widest uppercase mb-2" style={{ color: proj.color }}>
                    Key result
                  </p>
                  <p className="text-[#EDE8DC] text-sm leading-relaxed">{proj.impact}</p>
                </div>
                {proj.github && (
                  <a
                    href={proj.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="shrink-0 flex items-center gap-1.5 font-mono text-[11px] tracking-wider uppercase transition-colors duration-200"
                    style={{ color: proj.color }}
                    aria-label={`View ${proj.title} on GitHub`}
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.114 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                    </svg>
                    Code
                    <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                      <path d="M2 10L10 2M7 2h3v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </a>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

/* ── Section ─────────────────────────────────────── */
export function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView   = useInView(sectionRef, { once: true, margin: "-80px" })

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const ctx = gsap.context(() => {
      gsap.fromTo(".proj-item",
        { y: 70, opacity: 0 },
        {
          y: 0, opacity: 1,
          stagger: 0.1,
          duration: 1.0,
          ease: "power3.out",
          scrollTrigger: { trigger: ".proj-grid", start: "top 78%" },
        },
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const [featured, ...rest] = projects
  const mid   = rest.slice(0, 2)
  const small = rest.slice(2)

  return (
    <section ref={sectionRef} id="projects" className="section-padding px-6" aria-label="Projects">
      <div className="max-w-7xl mx-auto">

        {/* Section label */}
        <motion.div
          className="flex items-center gap-4 mb-16"
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="chip">03 — Work</span>
          <div className="section-label-line" />
        </motion.div>

        {/* Heading — size contrast: small qualifier + oversized noun */}
        <div className="mb-16">
          {/* "selected" as a small italic serif qualifier */}
          <div style={{ overflow: "hidden" }}>
            <motion.div
              className="font-serif italic text-[clamp(1.5rem,3vw,2.4rem)] leading-[1.3] text-[#8B8FA8]"
              initial={{ y: "100%", opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: "100%", opacity: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              selected
            </motion.div>
          </div>
          {/* "WORK." dominates */}
          <div style={{ overflow: "hidden" }}>
            <motion.div
              className="font-impact leading-[0.88] text-[#EDE8DC]"
              style={{ fontSize: "clamp(5rem,14vw,13rem)", letterSpacing: "-0.02em" }}
              initial={{ y: "100%" }}
              animate={isInView ? { y: 0 } : { y: "100%" }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.06 }}
            >
              WORK<span style={{ color: "#00FFD1" }}>.</span>
            </motion.div>
          </div>
          <motion.p
            className="text-[#8B8FA8] text-lg max-w-lg mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.18 }}
          >
            Research prototypes, deployed systems, hackathon wins — six projects that matter.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="proj-grid space-y-4">
          <div className="proj-item">
            <ProjectCard proj={featured} featured />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mid.map((p) => (
              <div key={p.id} className="proj-item">
                <ProjectCard proj={p} />
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {small.map((p) => (
              <div key={p.id} className="proj-item">
                <ProjectCard proj={p} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
