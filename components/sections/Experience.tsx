"use client"

import { useEffect, useRef } from "react"
import { motion, useInView } from "framer-motion"
import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"
import { experiences } from "@/lib/data"

export function Experience() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView   = useInView(sectionRef, { once: true, margin: "-80px" })

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const ctx = gsap.context(() => {
      /* Entrance: slide in experience blocks */
      gsap.fromTo(".exp-block",
        { y: 80, opacity: 0 },
        {
          y: 0, opacity: 1,
          stagger: 0.22,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".exp-list", start: "top 78%" },
        },
      )

      /* Timeline line draws down */
      gsap.fromTo(".exp-timeline-line",
        { scaleY: 0, transformOrigin: "top" },
        {
          scaleY: 1,
          duration: 1.4,
          ease: "power2.inOut",
          scrollTrigger: { trigger: ".exp-list", start: "top 78%" },
        },
      )

      /* Tech tags stagger per card */
      gsap.fromTo(".exp-tech-tag",
        { scale: 0.7, opacity: 0 },
        {
          scale: 1, opacity: 1,
          stagger: 0.04,
          duration: 0.45,
          ease: "back.out(1.6)",
          scrollTrigger: { trigger: ".exp-list", start: "top 72%" },
        },
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="experience" className="section-padding" aria-label="Experience">
      <div className="max-w-7xl mx-auto">

        {/* Label */}
        <motion.div
          className="flex items-center gap-4 mb-16"
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="chip">02 — Experience</span>
          <div className="section-label-line" />
        </motion.div>

        {/* Heading — asymmetric scale: verb dominates */}
        <div className="mb-16 relative">
          {/* Ghost number — positional context at low opacity */}
          <motion.span
            className="absolute -top-4 right-0 font-impact text-[clamp(6rem,18vw,16rem)] leading-none select-none pointer-events-none"
            style={{ color: "rgba(132,132,200,0.05)", letterSpacing: "-0.04em" }}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.2 }}
            aria-hidden="true"
          >02</motion.span>

          <div style={{ overflow: "hidden" }}>
            <motion.div
              className="font-serif italic text-[clamp(1.4rem,2.8vw,2.2rem)] leading-[1.2] text-[#8B8FA8]"
              initial={{ y: "100%", opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: "100%", opacity: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              where I&apos;ve
            </motion.div>
          </div>
          <div style={{ overflow: "hidden" }}>
            <motion.div
              className="font-impact text-[clamp(4rem,9vw,8rem)] leading-[0.9]"
              style={{ color: "#8484C8" }}
              initial={{ y: "100%" }}
              animate={isInView ? { y: 0 } : { y: "100%" }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.07 }}
            >
              SHIPPED.
            </motion.div>
          </div>
        </div>

        {/* Experience list */}
        <div className="exp-list relative max-w-4xl">
          {/* Timeline vertical line — GSAP-animated */}
          <div className="exp-timeline-line absolute left-6 top-8 bottom-8 w-px bg-gradient-to-b from-[rgba(127,207,224,0.4)] via-[rgba(132,132,200,0.3)] to-transparent hidden md:block" />

          <div className="space-y-8">
            {experiences.map((exp, i) => (
              <article key={exp.id} className="exp-block relative">

                {/* Timeline dot — desktop */}
                <motion.div
                  className="absolute -left-[37px] top-10 w-5 h-5 rounded-full border-2 border-[#07070F] hidden md:block z-10"
                  style={{ backgroundColor: exp.color }}
                  animate={{
                    boxShadow: [
                      `0 0 0px ${exp.color}00`,
                      `0 0 16px ${exp.color}80`,
                      `0 0 0px ${exp.color}00`,
                    ],
                  }}
                  transition={{ duration: 2.8, repeat: Infinity, delay: i * 0.8 }}
                />

                {/* Hover: lift + border glow */}
                <motion.div
                  className="exp-card-wrap rounded-2xl overflow-hidden"
                  style={{
                    background: "rgba(13,12,30,0.6)",
                    border: "1px solid rgba(127,207,224,0.07)",
                  }}
                  whileHover={{
                    y: -4,
                    borderColor: `${exp.color}30`,
                  }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* Top accent line — no side-stripe */}
                  <motion.div
                    className="absolute top-0 left-0 right-0 h-px"
                    style={{ background: `linear-gradient(90deg, ${exp.color}80, ${exp.color}20, transparent)` }}
                    initial={{ scaleX: 0, transformOrigin: "left" }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  />

                  <div className="p-8 lg:p-10 pl-8 md:pl-12">
                    <div className="flex flex-col lg:flex-row lg:items-start gap-6">

                      {/* Left meta */}
                      <div className="lg:w-48 shrink-0 space-y-2">
                        <div
                          className="chip w-fit"
                          style={{ borderColor: `${exp.color}35`, color: exp.color }}
                        >
                          {exp.type}
                        </div>
                        <p className="font-mono text-[10px] text-[#3D3F52] uppercase tracking-wider">
                          {exp.period}
                        </p>
                        <p className="font-mono text-[10px] text-[#3D3F52] flex items-center gap-1">
                          <svg width="7" height="9" viewBox="0 0 7 9" fill="currentColor" aria-hidden>
                            <path d="M3.5 0C1.57 0 0 1.57 0 3.5c0 2.46 3.5 5.25 3.5 5.25S7 5.96 7 3.5C7 1.57 5.43 0 3.5 0zm0 4.8a1.3 1.3 0 1 1 0-2.6 1.3 1.3 0 0 1 0 2.6z"/>
                          </svg>
                          {exp.location}
                        </p>
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="mb-5">
                          <h3 className="font-display font-bold text-2xl text-[#EDE8DC] mb-1">{exp.role}</h3>
                          <p className="text-lg font-semibold" style={{ color: exp.color }}>{exp.company}</p>
                        </div>

                        {/* Bullet points */}
                        <ul className="space-y-3 mb-6">
                          {exp.description.map((item, j) => (
                            <motion.li
                              key={j}
                              className="flex items-start gap-3 text-[#8B8FA8] text-sm leading-relaxed"
                              initial={{ opacity: 0, x: -12 }}
                              animate={isInView ? { opacity: 1, x: 0 } : {}}
                              transition={{ duration: 0.55, delay: 0.6 + i * 0.2 + j * 0.1, ease: [0.16, 1, 0.3, 1] }}
                            >
                              <motion.span
                                className="mt-2 w-1 h-1 rounded-full shrink-0"
                                style={{ backgroundColor: exp.color }}
                                animate={{
                                  scale: [1, 1.5, 1],
                                  opacity: [0.6, 1, 0.6],
                                }}
                                transition={{ duration: 3, repeat: Infinity, delay: j * 0.4 }}
                              />
                              {item}
                            </motion.li>
                          ))}
                        </ul>

                        {/* Tech tags */}
                        <div className="flex flex-wrap gap-2">
                          {exp.tech.map((t) => (
                            <motion.span
                              key={t}
                              className="exp-tech-tag px-3 py-1 rounded font-mono text-[11px] border"
                              style={{
                                borderColor: `${exp.color}20`,
                                color: exp.color,
                                backgroundColor: `${exp.color}07`,
                              }}
                              whileHover={{
                                backgroundColor: `${exp.color}18`,
                                borderColor: `${exp.color}50`,
                                y: -2,
                              }}
                              transition={{ duration: 0.2 }}
                            >
                              {t}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
