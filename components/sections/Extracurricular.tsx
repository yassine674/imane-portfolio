"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

const roles = [
  {
    title: "General Secretary",
    org:   "BDI — International Students' Office",
    year:  "2025–2026",
    color: "#5EEAD4",
  },
  {
    title: "Project Manager",
    org:   "Solidar'ISMIN",
    year:  "2025–2026",
    color: "#A78BFA",
  },
  {
    title: "Head of IT Service",
    org:   "FEI — ISMIN Enterprise Forum",
    year:  "2025–2026",
    color: "#4ADE80",
  },
  {
    title: "2× Best Speaker Award",
    org:   "Public Speaking Contest",
    year:  "2019–2020",
    color: "#FCD34D",
  },
]

export function Extracurricular() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView   = useInView(sectionRef, { once: true, margin: "-80px" })

  return (
    <section
      ref={sectionRef}
      id="extras"
      className="section-padding"
      aria-label="Extracurricular"
    >
      <div className="max-w-7xl mx-auto">

        {/* Label */}
        <motion.div
          className="flex items-center gap-4 mb-16"
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="chip">05 — Activities</span>
          <div className="section-label-line" style={{ background: "linear-gradient(90deg, rgba(94,234,212,0.3), transparent)" }} />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">

          {/* Heading */}
          <div>
            <div style={{ overflow: "hidden" }}>
              <motion.h2
                className="font-display font-bold text-[clamp(2.5rem,5vw,4rem)] leading-[1.1] text-[#F5F0E6]"
                initial={{ y: "100%" }}
                animate={isInView ? { y: 0 } : { y: "100%" }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              >
                Beyond the
              </motion.h2>
            </div>
            <div style={{ overflow: "hidden" }}>
              <motion.h2
                className="font-display font-bold text-[clamp(2.5rem,5vw,4rem)] leading-[1.1] text-[#5EEAD4]"
                initial={{ y: "100%" }}
                animate={isInView ? { y: 0 } : { y: "100%" }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.07 }}
              >
                algorithm
              </motion.h2>
            </div>

            {/* Decorative element */}
            <motion.div
              className="mt-8 w-16 h-px"
              style={{ background: "linear-gradient(90deg, #5EEAD4, transparent)" }}
              initial={{ scaleX: 0, transformOrigin: "left" }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>

          {/* Role cards */}
          <div className="space-y-3">
            {roles.map((role, i) => (
              <motion.div
                key={i}
                className="role-card"
                initial={{ opacity: 0, x: 40 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{
                  duration: 0.65,
                  delay: 0.1 + i * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ x: 8 }}
              >
                {/* Color dot with pulse */}
                <motion.div
                  className="w-2 h-2 rounded-full mt-1.5 shrink-0"
                  style={{ backgroundColor: role.color }}
                  animate={{
                    boxShadow: [
                      `0 0 0px ${role.color}00`,
                      `0 0 10px ${role.color}80`,
                      `0 0 0px ${role.color}00`,
                    ],
                  }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.5 }}
                />
                <div className="flex-1 min-w-0">
                  <motion.p
                    className="font-semibold text-[#F5F0E6] leading-snug"
                    whileHover={{ color: role.color }}
                    transition={{ duration: 0.2 }}
                  >
                    {role.title}
                  </motion.p>
                  <p className="text-sm text-[#9CA3AF] mt-0.5">{role.org}</p>
                </div>
                <span className="font-mono text-xs text-[#4B5563] shrink-0">{role.year}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
