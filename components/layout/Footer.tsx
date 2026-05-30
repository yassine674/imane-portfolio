"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { personalInfo } from "@/lib/data"

export function Footer() {
  const ref    = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: "-40px" })

  return (
    <motion.footer
      ref={ref}
      className="border-t border-[rgba(0,255,209,0.06)] py-10 px-6"
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-5">
        <motion.span
          className="font-impact text-2xl tracking-tight"
          style={{ color: "#3D3F52" }}
          whileHover={{ color: "#EDE8DC" }}
          transition={{ duration: 0.3 }}
        >
          IM<span style={{ color: "rgba(0,255,209,0.4)" }}>.</span>
        </motion.span>

        <p className="font-mono text-[10px] tracking-widest text-[#3D3F52] uppercase">
          © 2026 Imane MOUMOUN — All rights reserved
        </p>

        <div className="flex items-center gap-5">
          {[
            { label: "LI", href: personalInfo.linkedin },
            { label: "GH", href: personalInfo.github },
            { label: "✉",  href: `mailto:${personalInfo.email}` },
          ].map((l, i) => (
            <motion.a
              key={l.label}
              href={l.href}
              target={l.href.startsWith("http") ? "_blank" : undefined}
              rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="font-mono text-[11px] text-[#3D3F52] tracking-widest uppercase"
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ color: "#00FFD1", y: -2 }}
            >
              {l.label}
            </motion.a>
          ))}
        </div>
      </div>
    </motion.footer>
  )
}
