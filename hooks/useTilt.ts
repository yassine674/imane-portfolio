"use client"

import { useRef, useCallback } from "react"

export function useTilt(strength = 12) {
  const ref = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return

    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const rx = ((e.clientY - cy) / (rect.height / 2)) * -strength
    const ry = ((e.clientX - cx) / (rect.width / 2)) * strength

    el.style.transition = "transform 0.08s linear"
    el.style.transform = `perspective(1200px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(12px)`
  }, [strength])

  const handleMouseLeave = useCallback(() => {
    const el = ref.current
    if (!el) return
    el.style.transition = "transform 0.6s cubic-bezier(0.16,1,0.3,1)"
    el.style.transform = "perspective(1200px) rotateX(0deg) rotateY(0deg) translateZ(0px)"
  }, [])

  return { ref, onMouseMove: handleMouseMove, onMouseLeave: handleMouseLeave }
}
