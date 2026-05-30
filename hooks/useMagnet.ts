"use client"

import { useRef, useCallback } from "react"

export function useMagnet(strength = 0.3) {
  const ref = useRef<HTMLElement>(null)

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const el = ref.current
      if (!el) return

      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = (e.clientX - cx) * strength
      const dy = (e.clientY - cy) * strength

      el.style.transform = `translate(${dx}px, ${dy}px)`
    },
    [strength],
  )

  const handleMouseLeave = useCallback(() => {
    const el = ref.current
    if (!el) return
    el.style.transform = "translate(0, 0)"
    el.style.transition = "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)"
  }, [])

  const handleMouseEnter = useCallback(() => {
    const el = ref.current
    if (!el) return
    el.style.transition = "transform 0.1s ease"
  }, [])

  const bind = {
    ref,
    onMouseMove: handleMouseMove as unknown as React.MouseEventHandler,
    onMouseLeave: handleMouseLeave as unknown as React.MouseEventHandler,
    onMouseEnter: handleMouseEnter as unknown as React.MouseEventHandler,
  }

  return bind
}
