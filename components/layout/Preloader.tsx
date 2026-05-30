"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import gsap from "gsap"

export function Preloader() {
  const [phase, setPhase] = useState<"loading" | "reveal" | "done">("loading")
  const counterRef = useRef<HTMLSpanElement>(null)
  const barRef = useRef<HTMLDivElement>(null)
  const nameRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const obj = { val: 0 }
    const tl = gsap.timeline()

    // Count 0 → 100
    tl.to(obj, {
      val: 100,
      duration: 2.0,
      ease: "power1.inOut",
      onUpdate() {
        const v = Math.round(obj.val)
        if (counterRef.current) counterRef.current.textContent = String(v).padStart(3, "0")
        if (barRef.current)     barRef.current.style.transform = `scaleX(${v / 100})`
      },
    })

    // Reveal name
    .fromTo(nameRef.current,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
      "-=0.4",
    )

    // Hold briefly, then exit
    .to({}, { duration: 0.35 })
    .call(() => setPhase("reveal"))

    return () => { tl.kill() }
  }, [])

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[99999] bg-[#010108] flex flex-col items-center justify-center"
          exit={{
            clipPath: ["inset(0% 0% 0% 0%)", "inset(0% 0% 100% 0%)"],
            transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] },
          }}
          onAnimationComplete={() => { if (phase === "reveal") setPhase("done") }}
        >
          {/* Corner coords — futuristic feel */}
          <div className="absolute top-8 left-8 font-mono text-[10px] text-[#3D3F52] tracking-widest">
            43.5297°N / 5.7003°E
          </div>
          <div className="absolute top-8 right-8 font-mono text-[10px] text-[#3D3F52] tracking-widest">
            PORTFOLIO.V3
          </div>

          {/* Name reveal */}
          <div ref={nameRef} className="mb-14 text-center opacity-0">
            <div
              className="font-impact text-[clamp(4rem,12vw,10rem)] leading-none"
              style={{ color: "#EDE8DC", letterSpacing: "-0.01em" }}
            >
              IMANE
            </div>
            <div
              className="font-impact text-[clamp(4rem,12vw,10rem)] leading-none -mt-2"
              style={{ color: "#00FFD1", letterSpacing: "-0.01em" }}
            >
              MOUMOUN
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-48 h-px bg-[rgba(255,255,255,0.06)] overflow-hidden relative mb-4">
            <div
              ref={barRef}
              className="absolute inset-y-0 left-0 right-0 origin-left"
              style={{
                background: "linear-gradient(90deg, #00FFD1, #7B61FF)",
                transform: "scaleX(0)",
                transition: "none",
              }}
            />
          </div>

          {/* Counter */}
          <span ref={counterRef} className="font-mono text-xs text-[#3D3F52] tracking-widest">
            000
          </span>

          {/* Bottom bar */}
          <div className="absolute bottom-8 left-8 right-8 flex items-center justify-between">
            <span className="font-mono text-[10px] text-[#3D3F52] tracking-widest">AI & ML ENGINEER</span>
            <span className="font-mono text-[10px] text-[#3D3F52] tracking-widest">MINES SAINT-ÉTIENNE</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
