"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { SpiralAnimation } from "@/components/ui/spiral-animation"
import { usePreloader } from "@/lib/preloader-context"

export function Preloader() {
  const { markDone } = usePreloader()
  const [visible, setVisible] = useState(true)
  const [done, setDone] = useState(false)
  const [enterVisible, setEnterVisible] = useState(false)

  useEffect(() => {
    // Show "Enter" button after 2s
    const showEnter = setTimeout(() => setEnterVisible(true), 2000)
    // Auto-dismiss after 9s if user hasn't clicked
    const autoDismiss = setTimeout(() => setVisible(false), 9000)
    return () => {
      clearTimeout(showEnter)
      clearTimeout(autoDismiss)
    }
  }, [])

  if (done) return null

  return (
    <AnimatePresence onExitComplete={() => { setDone(true); markDone() }}>
      {visible && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[99999] bg-black overflow-hidden"
          initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
          exit={{
            clipPath: "inset(0% 0% 100% 0%)",
            transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] },
          }}
        >
          {/* Spiral canvas fills the entire screen */}
          <div className="absolute inset-0">
            <SpiralAnimation />
          </div>

          {/* Corner labels */}
          <div className="absolute top-8 left-8 font-mono text-[10px] text-[rgba(255,255,255,0.2)] tracking-widest pointer-events-none">
            43.5297°N / 5.7003°E
          </div>
          <div className="absolute top-8 right-8 font-mono text-[10px] text-[rgba(255,255,255,0.2)] tracking-widest pointer-events-none">
            PORTFOLIO.V3
          </div>
          <div className="absolute bottom-8 left-8 font-mono text-[10px] text-[rgba(255,255,255,0.2)] tracking-widest pointer-events-none">
            AI & ML ENGINEER
          </div>
          <div className="absolute bottom-8 right-8 font-mono text-[10px] text-[rgba(255,255,255,0.2)] tracking-widest pointer-events-none">
            MINES SAINT-ÉTIENNE
          </div>

          {/* Enter button — fades in after 2s */}
          <motion.button
            type="button"
            onClick={() => setVisible(false)}
            aria-label="Enter portfolio"
            className="absolute left-1/2 top-[62%] -translate-x-1/2 -translate-y-1/2 z-10 group"
            initial={{ opacity: 0, y: 12 }}
            animate={enterVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="
              block text-white text-base tracking-[0.35em] uppercase font-light
              transition-all duration-500
              group-hover:tracking-[0.5em] group-hover:text-[#7FCFE0]
            ">
              Enter
            </span>
            {/* Animated underline */}
            <motion.span
              className="block h-px bg-white mx-auto mt-2"
              initial={{ width: 0 }}
              animate={enterVisible ? { width: "100%" } : { width: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
