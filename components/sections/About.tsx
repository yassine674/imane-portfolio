"use client"

import { useEffect, useRef } from "react"
import { motion, useInView } from "framer-motion"
import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"
import { personalInfo, languages, education } from "@/lib/data"
import { AnimatedText } from "@/components/ui/AnimatedText"

const facts = [
  { label: "GPA",         display: "3.93", numeric: 3.93, decimals: 2, suffix: "",  context: "out of 4.10 — Mines Saint-Étienne" },
  { label: "Projects",    display: "8+",   numeric: 8,    decimals: 0, suffix: "+", context: "from satellite imagery to embedded ML" },
  { label: "Languages",   display: "4",    numeric: 4,    decimals: 0, suffix: "",  context: "French, Arabic (C2) · English (C1)" },
  { label: "Distinction", display: "2×",   numeric: 2,    decimals: 0, suffix: "×", context: "Best Speaker Award — public speaking" },
]

/* ── Count-up stat component ─────────────────────────────────── */
function CountStat({ fact, inView }: { fact: typeof facts[number]; inView: boolean }) {
  const ref  = useRef<HTMLSpanElement>(null)
  const done = useRef(false)

  useEffect(() => {
    if (!inView || done.current || !ref.current) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      if (ref.current) ref.current.textContent = fact.display
      return
    }
    done.current = true
    const obj = { val: 0 }
    gsap.to(obj, {
      val: fact.numeric,
      duration: 1.6,
      ease: "power3.out",
      delay: 0.2,
      onUpdate() {
        if (!ref.current) return
        const n = fact.decimals > 0
          ? obj.val.toFixed(fact.decimals)
          : Math.round(obj.val).toString()
        ref.current.textContent = n + fact.suffix
      },
    })
  }, [inView, fact])

  return (
    <span ref={ref} className="font-impact text-4xl text-[#7FCFE0] leading-none w-16 shrink-0">
      {fact.display}
    </span>
  )
}

/* ── About section ───────────────────────────────────────────── */
export function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView   = useInView(sectionRef, { once: true, margin: "-80px" })
  const factsRef   = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) return

    const ctx = gsap.context(() => {
      gsap.fromTo(".lang-card",
        { scale: 0.88, opacity: 0, y: 12 },
        {
          scale: 1, opacity: 1, y: 0,
          stagger: 0.08,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: ".lang-row", start: "top 85%" },
        },
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="about" className="section-padding px-6" aria-label="About">
      <div className="max-w-7xl mx-auto">

        {/* Label */}
        <motion.div
          className="flex items-center gap-4 mb-16"
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="chip">01 — About</span>
          <div className="section-label-line" />
        </motion.div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-16 lg:gap-24 mb-20">

          {/* Left: narrative */}
          <div>
            {/* Heading — editorial mix: impact + serif italic counterpoint */}
            <div className="mb-8">
              <div style={{ overflow: "hidden" }}>
                <motion.div
                  className="font-impact text-[clamp(3.5rem,7vw,6rem)] leading-[0.95] text-[#EDE8DC]"
                  initial={{ y: "100%" }}
                  animate={isInView ? { y: 0 } : { y: "100%" }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                >
                  TURNING
                </motion.div>
              </div>
              {/* Serif italic interlude — breaks the all-caps monotony */}
              <div style={{ overflow: "hidden" }}>
                <motion.div
                  className="font-serif italic text-[clamp(1.6rem,3.5vw,3rem)] leading-[1.1] text-[#8B8FA8] pl-1"
                  initial={{ y: "100%", opacity: 0 }}
                  animate={isInView ? { y: 0, opacity: 1 } : { y: "100%", opacity: 0 }}
                  transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.06 }}
                >
                  research
                </motion.div>
              </div>
              <div style={{ overflow: "hidden" }}>
                <motion.div
                  className="font-impact text-[clamp(3.5rem,7vw,6rem)] leading-[0.95]"
                  style={{ color: "#7FCFE0" }}
                  initial={{ y: "100%" }}
                  animate={isInView ? { y: 0 } : { y: "100%" }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.13 }}
                >
                  INTO IMPACT.
                </motion.div>
              </div>
            </div>

            {/* Bio — AnimatedText word-by-word */}
            <AnimatedText
              text={personalInfo.bio}
              className="text-[#8B8FA8] text-lg leading-relaxed mb-6 max-w-prose"
              delay={0.15}
              stagger={0.025}
              duration={0.7}
            />

            <AnimatedText
              text="Currently at Inria building Transformer + GNN models for satellite agricultural imagery. Past: deploying neural fault classifiers on STM32 with TFLite under 256KB flash."
              className="text-[#8B8FA8] text-lg leading-relaxed max-w-prose"
              delay={0.3}
              stagger={0.02}
              duration={0.65}
            />

            {/* Languages */}
            <motion.div
              className="mt-10"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.45 }}
            >
              <p className="font-mono text-[10px] tracking-widest text-[#3D3F52] uppercase mb-5">Languages</p>
              <div className="lang-row flex flex-wrap gap-3">
                {languages.map((lang) => (
                  <motion.div
                    key={lang.name}
                    className="lang-card flex items-center gap-4 px-5 py-3 rounded-lg border border-[rgba(127,207,224,0.08)] bg-[rgba(13,12,30,0.5)]"
                    whileHover={{
                      borderColor: "rgba(127,207,224,0.28)",
                      backgroundColor: "rgba(127,207,224,0.04)",
                      y: -3,
                    }}
                    transition={{ duration: 0.25 }}
                  >
                    <span className="font-impact text-2xl leading-none text-[#7FCFE0]">{lang.level}</span>
                    <div className="w-px h-7 bg-[rgba(255,255,255,0.06)]" />
                    <p className="font-display font-semibold text-[#EDE8DC] text-sm tracking-wide">{lang.name}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: facts + education */}
          <div>
            <p className="font-mono text-[10px] tracking-widest text-[#3D3F52] uppercase mb-8">Quick facts</p>

            {/* Facts with count-up */}
            <div ref={factsRef} className="space-y-0">
              {facts.map((f, i) => (
                <motion.div
                  key={i}
                  className="flex items-baseline gap-4 py-5 border-b border-[rgba(255,255,255,0.05)] last:border-0"
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.7, delay: 0.1 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  <CountStat fact={f} inView={isInView} />
                  <div>
                    <p className="font-mono text-[10px] text-[#3D3F52] uppercase tracking-wider mb-0.5">{f.label}</p>
                    <p className="text-sm text-[#8B8FA8] leading-snug">{f.context}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Education timeline */}
            <div className="mt-10">
              <p className="font-mono text-[10px] tracking-widest text-[#3D3F52] uppercase mb-6">Education</p>
              <div className="space-y-6 relative">
                <motion.div
                  className="absolute left-[5px] top-2 bottom-2 w-px"
                  style={{ background: "linear-gradient(to bottom, rgba(127,207,224,0.4), rgba(132,132,200,0.2), transparent)" }}
                  initial={{ scaleY: 0, transformOrigin: "top" }}
                  animate={isInView ? { scaleY: 1 } : {}}
                  transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                />
                {education.map((edu, i) => (
                  <motion.div
                    key={i}
                    className="relative pl-7"
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.65, delay: 0.5 + i * 0.14, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <motion.div
                      className="absolute left-0 top-1.5 w-2.5 h-2.5 rounded-full border-2 border-[#07070F]"
                      style={{ backgroundColor: i === 0 ? "#7FCFE0" : "#8484C8" }}
                      animate={{
                        boxShadow: i === 0
                          ? ["0 0 0px rgba(127,207,224,0)", "0 0 14px rgba(127,207,224,0.6)", "0 0 0px rgba(127,207,224,0)"]
                          : ["0 0 0px rgba(132,132,200,0)", "0 0 14px rgba(132,132,200,0.6)", "0 0 0px rgba(132,132,200,0)"],
                      }}
                      transition={{ duration: 2.5, repeat: Infinity, delay: i * 1 }}
                    />
                    <p className="font-mono text-[10px] text-[#3D3F52] uppercase tracking-wider mb-1">{edu.period}</p>
                    <p className="font-display font-bold text-[#EDE8DC] leading-tight">{edu.degree}</p>
                    <p className="text-sm text-[#8B8FA8]">{edu.institution}</p>
                    {edu.gpa && (
                      <p className="font-mono text-xs mt-1" style={{ color: i === 0 ? "#7FCFE0" : "#8484C8" }}>
                        GPA {edu.gpa}
                      </p>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
