"use client"

import { useEffect, useRef } from "react"
import { motion, useInView } from "framer-motion"
import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"
import { skillCategories, allSkills } from "@/lib/data"

/* ── Marquee strip ───────────────────────────────── */
function MarqueeStrip({
  items,
  reverse = false,
  speed   = 40,
}: {
  items: string[]
  reverse?: boolean
  speed?: number
}) {
  const doubled = [...items, ...items]
  return (
    <div className="overflow-hidden">
      <div
        className={`flex gap-3 w-max ${reverse ? "marquee-r" : "marquee-l"}`}
        style={{ animationDuration: `${speed}s` }}
      >
        {doubled.map((skill, i) => (
          <motion.span
            key={i}
            className="skill-tag"
            whileHover={{
              backgroundColor: "rgba(0,255,209,0.1)",
              borderColor:     "rgba(0,255,209,0.35)",
              color:           "#00FFD1",
              scale:           1.05,
              y:               -2,
            }}
            transition={{ duration: 0.2 }}
          >
            <span className="w-1 h-1 rounded-full bg-[rgba(0,255,209,0.4)]" />
            {skill}
          </motion.span>
        ))}
      </div>
    </div>
  )
}

/* ── Section ─────────────────────────────────────── */
export function Skills() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView   = useInView(sectionRef, { once: true, margin: "-80px" })

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const ctx = gsap.context(() => {
      gsap.fromTo(".skill-cat",
        { y: 45, opacity: 0, scale: 0.96 },
        {
          y: 0, opacity: 1, scale: 1,
          stagger: 0.12,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: { trigger: ".skill-cats", start: "top 80%" },
        },
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const row1 = allSkills.slice(0, 16)
  const row2 = allSkills.slice(8, 24)
  const row3 = allSkills.slice(14)

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="section-padding px-6 overflow-hidden"
      aria-label="Skills"
    >
      <div className="max-w-7xl mx-auto">

        {/* Label */}
        <motion.div
          className="flex items-center gap-4 mb-16"
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="chip">04 — Skills</span>
          <div className="section-label-line" />
        </motion.div>

        {/* Heading — wide inline treatment: label + large word on one axis */}
        <div className="mb-16 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <div>
            {/* Stacked: small label then large single word */}
            <motion.p
              className="font-mono text-[11px] tracking-[0.3em] text-[#00FFD1] uppercase mb-3"
              initial={{ opacity: 0, x: -16 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              Technical
            </motion.p>
            <div style={{ overflow: "hidden" }}>
              <motion.div
                className="font-impact text-[clamp(5rem,11vw,10rem)] leading-[0.9] text-[#EDE8DC]"
                style={{ letterSpacing: "-0.02em" }}
                initial={{ y: "100%" }}
                animate={isInView ? { y: 0 } : { y: "100%" }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
              >
                ARSENAL
              </motion.div>
            </div>
          </div>

          <motion.p
            className="text-[#8B8FA8] text-lg max-w-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            From PyTorch to TFLite on STM32 — full-stack AI from research to edge deployment.
          </motion.p>
        </div>

        {/* Marquee strips — fade-masked edges */}
        <div className="relative -mx-6 mb-16">
          <div className="absolute left-0 inset-y-0 w-24 z-10 bg-gradient-to-r from-[#010108] to-transparent pointer-events-none" />
          <div className="absolute right-0 inset-y-0 w-24 z-10 bg-gradient-to-l from-[#010108] to-transparent pointer-events-none" />
          <div className="space-y-3 py-2">
            <MarqueeStrip items={row1} speed={38} />
            <MarqueeStrip items={row2} reverse speed={46} />
            <MarqueeStrip items={row3} speed={34} />
          </div>
        </div>

        {/* Category cards */}
        <div className="skill-cats grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {skillCategories.map((cat) => (
            <motion.div
              key={cat.name}
              className="skill-cat relative p-6 rounded-2xl glass border border-[rgba(0,255,209,0.06)] group overflow-hidden"
              whileHover={{
                borderColor: `${cat.color}35`,
                y: -5,
              }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Per-category top accent line — distinguishes each card */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl"
                style={{ background: `linear-gradient(90deg, ${cat.color}, ${cat.color}30, transparent)` }}
              />

              {/* Subtle corner glow on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                style={{ background: `radial-gradient(ellipse at top left, ${cat.color}08 0%, transparent 60%)` }}
              />

              {/* Category header */}
              <div className="flex items-center gap-3 mb-6 relative z-10">
                <motion.div
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: cat.color }}
                  animate={{
                    boxShadow: [
                      `0 0 0px ${cat.color}00`,
                      `0 0 10px ${cat.color}90`,
                      `0 0 0px ${cat.color}00`,
                    ],
                  }}
                  transition={{ duration: 2.8, repeat: Infinity }}
                />
                <p
                  className="font-mono text-[11px] uppercase tracking-widest font-semibold"
                  style={{ color: cat.color }}
                >
                  {cat.name}
                </p>
              </div>

              {/* Skill list — individual item hover */}
              <ul className="space-y-2.5 relative z-10">
                {cat.skills.map((skill, i) => (
                  <motion.li
                    key={skill}
                    className="skill-item"
                    initial={{ opacity: 0, x: -8 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.2 + i * 0.07 }}
                    whileHover={{ x: 6, color: cat.color }}
                  >
                    <motion.span
                      className="skill-item-bar"
                      style={{ backgroundColor: `${cat.color}50` }}
                      whileHover={{ height: "20px", opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                    {skill}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
