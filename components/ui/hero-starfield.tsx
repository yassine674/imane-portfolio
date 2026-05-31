"use client"

import { useEffect, useRef } from "react"

interface StarDot {
  x: number
  y: number
  r: number
  base: number
  speed: number
  phase: number
  color: string
}

// Pre-seeded star list — deterministic to avoid hydration mismatch
function makeStars(): StarDot[] {
  let seed = 42
  const rng = () => {
    seed = (seed * 1664525 + 1013904223) & 0xffffffff
    return (seed >>> 0) / 0xffffffff
  }

  return Array.from({ length: 220 }, () => {
    const roll = rng()
    // 90% white, 7% soft mint, 3% soft violet
    const color =
      roll < 0.90 ? "255,255,255"
      : roll < 0.97 ? "127,207,224"
      : "132,132,200"

    return {
      x: rng(),
      y: rng(),
      r: rng() * 0.9 + 0.15,
      base: rng() * 0.45 + 0.15,
      speed: rng() * 0.012 + 0.003,
      phase: rng() * Math.PI * 2,
      color,
    }
  })
}

const STARS = makeStars()

export function HeroStarfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let raf: number
    let frame = 0

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener("resize", resize)

    const draw = () => {
      raf = requestAnimationFrame(draw)
      frame++
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const s of STARS) {
        const alpha = s.base + Math.sin(frame * s.speed + s.phase) * 0.28
        ctx.beginPath()
        ctx.arc(s.x * canvas.width, s.y * canvas.height, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${s.color},${Math.max(0, Math.min(1, alpha))})`
        ctx.fill()
      }
    }

    draw()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  )
}
