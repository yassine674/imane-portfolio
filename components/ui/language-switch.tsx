"use client"

import { motion } from "framer-motion"
import { useLang } from "@/lib/i18n"

export function LanguageSwitch() {
  const { lang, toggle } = useLang()
  const isFr = lang === "fr"

  return (
    <button
      onClick={toggle}
      aria-label={`Switch to ${isFr ? "English" : "French"}`}
      className="relative h-8 w-16 rounded-full border border-[rgba(127,207,224,0.18)] bg-[rgba(13,12,30,0.6)] flex items-center px-1 overflow-hidden"
    >
      {/* Sliding pill */}
      <motion.span
        className="absolute h-6 w-7 rounded-full bg-[rgba(127,207,224,0.15)] border border-[rgba(127,207,224,0.25)]"
        animate={{ x: isFr ? 28 : 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      />

      {/* Labels */}
      <span
        className={`relative z-10 font-mono text-[10px] tracking-widest uppercase w-7 text-center transition-colors duration-300 ${!isFr ? "text-[#7FCFE0]" : "text-[#3D3F52]"}`}
      >
        EN
      </span>
      <span
        className={`relative z-10 font-mono text-[10px] tracking-widest uppercase w-7 text-center transition-colors duration-300 ${isFr ? "text-[#7FCFE0]" : "text-[#3D3F52]"}`}
      >
        FR
      </span>
    </button>
  )
}
