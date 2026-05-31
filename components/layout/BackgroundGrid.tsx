"use client"

import { useScroll, useTransform, motion } from "framer-motion"

export function BackgroundGrid() {
  const { scrollY } = useScroll()
  // Dot grid shifts slightly as you scroll — creates subtle depth
  const bgY   = useTransform(scrollY, [0, 2000], [0, 180])
  const orbY1 = useTransform(scrollY, [0, 2000], [0, -120])
  const orbY2 = useTransform(scrollY, [0, 2000], [0, 80])

  return (
    <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
      {/* Parallax dot grid */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(127,207,224,0.2) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          opacity: 0.12,
          y: bgY,
        }}
      />

      {/* Strong radial vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,transparent_30%,#07070F_80%)]" />

      {/* Top center glow — parallax upward */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full blur-[120px]"
        style={{
          background: "rgba(127,207,224,0.028)",
          y: orbY1,
        }}
      />

      {/* Bottom right accent — parallax downward */}
      <motion.div
        className="absolute bottom-1/4 right-0 w-[500px] h-[400px] rounded-full blur-[100px]"
        style={{
          background: "rgba(132,132,200,0.035)",
          y: orbY2,
        }}
      />
    </div>
  )
}
