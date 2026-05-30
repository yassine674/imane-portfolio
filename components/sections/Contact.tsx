"use client"

import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { useMagnet } from "@/hooks/useMagnet"
import { personalInfo } from "@/lib/data"

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView   = useInView(sectionRef, { once: true, margin: "-80px" })
  const [copied, setCopied] = useState(false)

  const magLI = useMagnet(0.18)
  const magGH = useMagnet(0.18)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(personalInfo.email)
    } catch {
      /* fallback: execCommand is deprecated but handles older browsers */
      const ta = document.createElement("textarea")
      ta.value = personalInfo.email
      ta.style.position = "fixed"
      ta.style.opacity = "0"
      document.body.appendChild(ta)
      ta.focus()
      ta.select()
      document.execCommand("copy")
      document.body.removeChild(ta)
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="section-padding px-6 relative overflow-hidden"
      aria-label="Contact"
    >
      {/* Ambient glow */}
      <div className="orb w-[700px] h-[500px] bg-[rgba(0,255,209,0.03)] top-0 left-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Label */}
        <motion.div
          className="flex items-center gap-4 mb-20"
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="chip">06 — Contact</span>
          <div className="section-label-line" />
        </motion.div>

        {/* Cinematic heading — line-by-line clip reveal */}
        <div className="mb-16">
          <div style={{ overflow: "hidden" }}>
            <motion.div
              className="font-impact text-[clamp(4rem,11vw,10rem)] leading-[0.9] text-[#EDE8DC]"
              initial={{ y: "105%" }}
              animate={isInView ? { y: 0 } : { y: "105%" }}
              transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            >
              LET&apos;S
            </motion.div>
          </div>
          <div style={{ overflow: "hidden" }}>
            <motion.div
              className="font-impact text-[clamp(4rem,11vw,10rem)] leading-[0.9] -mt-2"
              style={{ color: "#00FFD1" }}
              initial={{ y: "105%" }}
              animate={isInView ? { y: 0 } : { y: "105%" }}
              transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.07 }}
            >
              COLLABORATE
            </motion.div>
          </div>
          <div style={{ overflow: "hidden" }}>
            <motion.div
              className="font-serif italic text-[clamp(2rem,5vw,4.5rem)] leading-[1.1] text-[#8B8FA8] mt-2"
              initial={{ y: "105%", opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: "105%", opacity: 0 }}
              transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1], delay: 0.16 }}
            >
              on something great.
            </motion.div>
          </div>
        </div>

        {/* Email interactive block */}
        <motion.div
          className="mb-12 max-w-2xl"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {/* aria-live: screen readers announce copy confirmation */}
          <div aria-live="polite" aria-atomic="true" className="sr-only">
            {copied ? "Email address copied to clipboard." : ""}
          </div>

          <p className="font-mono text-[10px] tracking-widest text-[#3D3F52] uppercase mb-4">Direct line</p>
          <motion.button
            onClick={copy}
            aria-label={copied ? "Email copied!" : `Copy email address: ${personalInfo.email}`}
            aria-pressed={copied}
            className="group w-full text-left p-6 rounded-2xl glass border transition-colors duration-400"
            style={{ borderColor: copied ? "rgba(163,230,53,0.25)" : "rgba(0,255,209,0.07)" }}
            whileHover={{ borderColor: "rgba(0,255,209,0.22)", y: -2 }}
            whileTap={{ scale: 0.99 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            data-cursor="COPY"
          >
            <div className="flex items-center justify-between gap-6">
              <div className="min-w-0">
                <p className="font-mono text-[10px] text-[#3D3F52] uppercase tracking-widest mb-2">Email</p>
                <motion.p
                  className="font-display font-semibold text-xl md:text-2xl truncate"
                  animate={{ color: copied ? "#A3E635" : "#EDE8DC" }}
                  whileHover={{ color: "#00FFD1" }}
                  transition={{ duration: 0.3 }}
                >
                  {personalInfo.email}
                </motion.p>
              </div>

              {/* Icon — spring swap */}
              <motion.div
                className="shrink-0 w-12 h-12 rounded-full flex items-center justify-center border"
                animate={{
                  borderColor: copied ? "rgba(163,230,53,0.5)"  : "rgba(0,255,209,0.2)",
                  backgroundColor: copied ? "rgba(163,230,53,0.1)" : "transparent",
                  scale: copied ? [1, 1.2, 1] : 1,
                }}
                transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
              >
                <AnimatePresence mode="wait">
                  {copied ? (
                    <motion.svg
                      key="check"
                      width="18" height="18" viewBox="0 0 18 18" fill="none"
                      initial={{ scale: 0, rotate: -45 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0 }}
                      transition={{ duration: 0.35, ease: [0.34, 1.56, 0.64, 1] }}
                    >
                      <path d="M3 9l4 4 8-8" stroke="#A3E635" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </motion.svg>
                  ) : (
                    <motion.svg
                      key="copy"
                      width="18" height="18" viewBox="0 0 18 18" fill="none"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <rect x="6" y="6" width="9" height="9" rx="2" stroke="#00FFD1" strokeWidth="1.5" />
                      <path d="M3 12V3h9" stroke="#00FFD1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </motion.svg>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </motion.button>
        </motion.div>

        {/* Social links — magnetic */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {[
            { label: "LinkedIn", href: personalInfo.linkedin, desc: "Connect professionally",  color: "#00FFD1", magnet: magLI },
            { label: "GitHub",   href: personalInfo.github,   desc: "Explore my repositories", color: "#7B61FF", magnet: magGH },
          ].map((link) => (
            <div
              key={link.label}
              ref={link.magnet.ref as React.RefObject<HTMLDivElement>}
              onMouseMove={link.magnet.onMouseMove as React.MouseEventHandler<HTMLDivElement>}
              onMouseLeave={link.magnet.onMouseLeave as React.MouseEventHandler<HTMLDivElement>}
              onMouseEnter={link.magnet.onMouseEnter as React.MouseEventHandler<HTMLDivElement>}
              className="magnetic-wrap"
            >
              <motion.a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-5 rounded-xl glass border border-[rgba(0,255,209,0.07)] w-full"
                whileHover={{ borderColor: `${link.color}35`, y: -3 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                data-cursor="OPEN"
              >
                <div>
                  <motion.p
                    className="font-display font-semibold text-[#EDE8DC]"
                    whileHover={{ color: link.color }}
                    transition={{ duration: 0.25 }}
                  >
                    {link.label}
                  </motion.p>
                  <p className="text-xs text-[#3D3F52] mt-0.5">{link.desc}</p>
                </div>
                <motion.svg
                  className="w-4 h-4 text-[#3D3F52]"
                  viewBox="0 0 16 16"
                  fill="none"
                  whileHover={{ color: link.color, x: 2, y: -2 }}
                  transition={{ duration: 0.25 }}
                >
                  <path d="M3 13L13 3M8 3h5v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </motion.svg>
              </motion.a>
            </div>
          ))}
        </motion.div>

        {/* Bottom footer line */}
        <div className="hr-fade mb-8" />
        <motion.div
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <p className="font-mono text-[10px] tracking-widest text-[#3D3F52] uppercase">
            Imane MOUMOUN · AI & ML Engineer · 2026
          </p>
          <div className="flex items-center gap-2">
            <motion.span
              className="w-1.5 h-1.5 rounded-full bg-[#4ADE80]"
              animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="font-mono text-[10px] tracking-widest text-[#4ADE80] uppercase">
              Available for opportunities
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
