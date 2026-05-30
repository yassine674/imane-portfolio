"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"
import { projects } from "@/lib/data"

type Project = (typeof projects)[number]

/* ─── Single project card — jesseermens style ───────────────── */
function ProjectCard({
  proj,
  index,
  featured = false,
}: {
  proj: Project
  index: number
  featured?: boolean
}) {
  const [hovered, setHovered] = useState(false)
  const num = String(index + 1).padStart(2, "0")

  return (
    <motion.article
      className="proj-card group"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      data-cursor="VIEW"
    >
      {/* ── Image panel ── */}
      <div
        className="relative overflow-hidden rounded-2xl mb-6"
        style={{ aspectRatio: featured ? "16/7" : "4/3" }}
      >
        {/* Gradient fallback */}
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 120% 120% at 40% 60%, ${proj.color}18 0%, #07070F 65%)`,
          }}
        />

        {/* Photography */}
        {proj.image && (
          /* eslint-disable-next-line @next/next/no-img-element */
          <motion.img
            src={proj.image}
            alt={proj.title}
            className="absolute inset-0 w-full h-full object-cover"
            animate={{ scale: hovered ? 1.06 : 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            loading="lazy"
          />
        )}

        {/* Base dark overlay */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, rgba(7,7,15,0.25) 0%, rgba(7,7,15,0.55) 100%)" }}
        />

        {/* Hover overlay — View Project pill */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.28 }}
          style={{ background: "rgba(7,7,15,0.5)" }}
        >
          <span className="font-mono text-[11px] tracking-[0.28em] uppercase text-[#EBE7DC] border border-[rgba(235,231,220,0.3)] px-5 py-2.5 rounded-full">
            View Project
          </span>
        </motion.div>

        {/* Top accent line */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: `linear-gradient(90deg, transparent, ${proj.color}55, transparent)` }}
          initial={{ scaleX: 0, transformOrigin: "left" }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Project number */}
        <div className="absolute top-5 left-5 font-mono text-[10px] tracking-widest text-white/35 select-none">
          {num}
        </div>

        {/* Color dot */}
        <div
          className="absolute top-5 right-5 w-2 h-2 rounded-full"
          style={{ backgroundColor: proj.color, boxShadow: `0 0 8px ${proj.color}80` }}
        />
      </div>

      {/* ── Text below image ── */}
      <div className="flex items-start justify-between gap-4 px-1">
        <div className="min-w-0 flex-1">
          {/* Tags + period */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 mb-3">
            {proj.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="font-mono text-[10px] tracking-[0.15em] uppercase" style={{ color: proj.color }}>
                {tag}
              </span>
            ))}
            <span className="font-mono text-[10px] text-[#2A2A3A]" aria-hidden>·</span>
            <span className="font-mono text-[10px] text-[#3D3F52]">{proj.period}</span>
          </div>

          {/* Title */}
          <div style={{ overflow: "hidden" }}>
            <h3
              className="font-impact leading-[0.92] transition-colors duration-400"
              style={{
                fontSize: featured ? "clamp(2rem, 3.5vw, 3rem)" : "clamp(1.5rem, 2.2vw, 2rem)",
                color: hovered ? proj.color : "#EBE7DC",
                letterSpacing: "-0.015em",
              }}
            >
              {proj.title.toUpperCase()}
            </h3>
          </div>

          {/* Subtitle */}
          <p className="font-serif italic text-[#717285] text-sm mt-1.5 leading-snug">{proj.subtitle}</p>

          {/* Impact */}
          <p className="font-mono text-[11px] text-[#4A4A5A] mt-2 leading-snug">{proj.impact}</p>
        </div>

        {/* Arrow */}
        <motion.div
          className="shrink-0 mt-2 w-9 h-9 flex items-center justify-center rounded-full border transition-colors duration-300"
          style={{ borderColor: hovered ? `${proj.color}50` : `${proj.color}20` }}
          animate={{
            x: hovered ? 3 : 0,
            backgroundColor: hovered ? `${proj.color}10` : "transparent",
          }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
            <path d="M2 7h10M7.5 3l4 4-4 4" stroke={proj.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
      </div>

      {/* GitHub link — hover reveal */}
      <AnimatePresence>
        {hovered && proj.github && (
          <motion.div
            className="mt-3 px-1"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.2 }}
          >
            <a
              href={proj.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-widest uppercase transition-colors duration-200"
              style={{ color: proj.color }}
              aria-label={`View ${proj.title} on GitHub`}
            >
              <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.114 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
              View Code →
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  )
}

/* ─── Section ────────────────────────────────────────────────── */
export function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView   = useInView(sectionRef, { once: true, margin: "-80px" })

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const ctx = gsap.context(() => {
      gsap.fromTo(".proj-featured",
        { y: 70, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.1, ease: "power3.out",
          scrollTrigger: { trigger: ".proj-featured", start: "top 82%" } },
      )
      gsap.fromTo(".proj-card-grid",
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 1.0, ease: "power3.out",
          scrollTrigger: { trigger: ".proj-grid", start: "top 82%" } },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const [featured, ...rest] = projects

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

        {/* Featured — full width */}
        <div className="proj-featured mb-5">
          <ProjectCard proj={featured} index={0} featured />
        </div>

        {/* Grid */}
        <div className="proj-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {rest.map((proj, i) => (
            <div key={proj.id} className="proj-card-grid">
              <ProjectCard proj={proj} index={i + 1} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
