"use client"

import { motion } from "framer-motion"
import { personalInfo } from "@/lib/data"

const links = [
  {
    label: "LI",
    href: personalInfo.linkedin,
    title: "LinkedIn",
  },
  {
    label: "GH",
    href: personalInfo.github,
    title: "GitHub",
  },
  {
    label: "✉",
    href: `mailto:${personalInfo.email}`,
    title: "Email",
  },
]

export function FloatingSocial() {
  return (
    <motion.div
      className="fixed left-6 bottom-8 z-40 hidden lg:flex flex-col items-center gap-4"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 2.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target={link.href.startsWith("http") ? "_blank" : undefined}
          rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
          title={link.title}
          className="
            w-9 h-9 rounded-full glass border border-[rgba(94,234,212,0.1)]
            flex items-center justify-center
            font-mono text-[10px] font-bold text-[#4B5563]
            hover:text-[#5EEAD4] hover:border-[rgba(94,234,212,0.4)]
            transition-all duration-300 hover:scale-110
          "
        >
          {link.label}
        </a>
      ))}

      {/* vertical line */}
      <div className="w-px h-16 bg-gradient-to-b from-[rgba(94,234,212,0.3)] to-transparent" />
    </motion.div>
  )
}
