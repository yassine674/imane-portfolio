"use client"

import { useState, useEffect, useRef } from "react"

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&"

export function useTextScramble(finalText: string, options?: { delay?: number; duration?: number; trigger?: boolean }) {
  const { delay = 0, duration = 1200, trigger = true } = options ?? {}
  const [display, setDisplay] = useState(() => finalText.replace(/[^ ]/g, CHARS[0]))
  const frameRef = useRef<number | null>(null)
  const startRef = useRef<number | null>(null)

  useEffect(() => {
    if (!trigger) return

    const timeout = setTimeout(() => {
      const animate = (timestamp: number) => {
        if (!startRef.current) startRef.current = timestamp
        const elapsed = timestamp - startRef.current
        const progress = Math.min(elapsed / duration, 1)

        const result = finalText
          .split("")
          .map((char, i) => {
            if (char === " ") return " "
            const charProgress = Math.max(0, (progress - (i / finalText.length) * 0.4) / 0.6)
            if (charProgress >= 1) return char
            return CHARS[Math.floor(Math.random() * CHARS.length)]
          })
          .join("")

        setDisplay(result)

        if (progress < 1) {
          frameRef.current = requestAnimationFrame(animate)
        }
      }

      frameRef.current = requestAnimationFrame(animate)
    }, delay * 1000)

    return () => {
      clearTimeout(timeout)
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
      startRef.current = null
    }
  }, [finalText, delay, duration, trigger])

  return display
}
