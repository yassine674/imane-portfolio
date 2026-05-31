"use client"

import { motion, AnimatePresence } from "framer-motion"

interface ShutterTextProps {
  text: string
  /** accent color for top/bottom shutter slices (defaults to portfolio mint) */
  accentColor?: string
  /** base text color (defaults to portfolio parchment) */
  textColor?: string
  /** font size class or value — pass a Tailwind class or inline value */
  className?: string
  /** animation key — increment to re-trigger */
  animKey?: number
}

export function ShutterText({
  text,
  accentColor = "#7FCFE0",
  textColor   = "#EDE8DC",
  className   = "",
  animKey     = 0,
}: ShutterTextProps) {
  const chars = text.split("")

  return (
    <AnimatePresence mode="wait">
      <motion.div key={animKey} className={`flex flex-wrap justify-start items-center ${className}`}>
        {chars.map((char, i) => (
          <div key={i} className="relative px-[0.05em] overflow-hidden">
            {/* Base character — blur-in reveal */}
            <motion.span
              initial={{ opacity: 0, filter: "blur(12px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ delay: i * 0.04 + 0.3, duration: 0.9 }}
              style={{ color: textColor }}
              className="block font-impact leading-none select-none"
            >
              {char === " " ? " " : char}
            </motion.span>

            {/* Top shutter slice — sweeps left → right */}
            <motion.span
              initial={{ x: "-105%", opacity: 0 }}
              animate={{ x: "105%", opacity: [0, 1, 0] }}
              transition={{ duration: 0.65, delay: i * 0.04, ease: "easeInOut" }}
              className="absolute inset-0 font-impact leading-none pointer-events-none"
              style={{
                clipPath: "polygon(0 0, 100% 0, 100% 35%, 0 35%)",
                color: accentColor,
              }}
              aria-hidden="true"
            >
              {char === " " ? " " : char}
            </motion.span>

            {/* Middle shutter slice — sweeps right → left, slightly delayed */}
            <motion.span
              initial={{ x: "105%", opacity: 0 }}
              animate={{ x: "-105%", opacity: [0, 1, 0] }}
              transition={{ duration: 0.65, delay: i * 0.04 + 0.08, ease: "easeInOut" }}
              className="absolute inset-0 font-impact leading-none pointer-events-none"
              style={{
                clipPath: "polygon(0 35%, 100% 35%, 100% 65%, 0 65%)",
                color: "#8484C8",
              }}
              aria-hidden="true"
            >
              {char === " " ? " " : char}
            </motion.span>

            {/* Bottom shutter slice — sweeps left → right, most delayed */}
            <motion.span
              initial={{ x: "-105%", opacity: 0 }}
              animate={{ x: "105%", opacity: [0, 1, 0] }}
              transition={{ duration: 0.65, delay: i * 0.04 + 0.16, ease: "easeInOut" }}
              className="absolute inset-0 font-impact leading-none pointer-events-none"
              style={{
                clipPath: "polygon(0 65%, 100% 65%, 100% 100%, 0 100%)",
                color: accentColor,
              }}
              aria-hidden="true"
            >
              {char === " " ? " " : char}
            </motion.span>
          </div>
        ))}
      </motion.div>
    </AnimatePresence>
  )
}
