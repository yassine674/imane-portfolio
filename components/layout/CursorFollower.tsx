"use client"

import { useEffect, useRef } from "react"

/**
 * Premium cursor: dot + ring + optional text label.
 *
 * Elements can set:
 *   data-cursor-hover  — enlarges ring (default interactive state)
 *   data-cursor="VIEW" — enlarges ring and shows text label
 *   data-cursor="OPEN" — same, different label
 *   data-cursor="COPY" — same, different label
 */
export function CursorFollower() {
  const dotRef    = useRef<HTMLDivElement>(null)
  const ringRef   = useRef<HTMLDivElement>(null)
  const labelRef  = useRef<HTMLSpanElement>(null)
  const spotRef   = useRef<HTMLDivElement>(null)

  const pos     = useRef({ x: -100, y: -100 })
  const ring    = useRef({ x: -100, y: -100 })
  const hovered = useRef(false)
  const label   = useRef("")

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY }
    }

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement
      const cursorEl = t.closest("[data-cursor]")
      const attr = cursorEl?.getAttribute("data-cursor") ?? ""
      label.current = attr

      hovered.current = !!(
        t.closest("a, button, [data-cursor-hover], [data-cursor]")
      )

      if (labelRef.current) labelRef.current.textContent = attr
    }

    window.addEventListener("mousemove", onMove)
    window.addEventListener("mouseover",  onOver)

    let raf: number
    const tick = () => {
      const lerp = 0.1
      ring.current.x += (pos.current.x - ring.current.x) * lerp
      ring.current.y += (pos.current.y - ring.current.y) * lerp

      if (dotRef.current) {
        dotRef.current.style.transform =
          `translate(${pos.current.x - 3}px, ${pos.current.y - 3}px)`
      }

      if (ringRef.current) {
        const hasLabel = label.current.length > 0
        const scale    = hovered.current ? (hasLabel ? 2.4 : 1.9) : 1

        ringRef.current.style.transform =
          `translate(${ring.current.x - 20}px, ${ring.current.y - 20}px) scale(${scale})`
        ringRef.current.style.borderColor = hovered.current
          ? "rgba(0,255,209,0.9)"
          : "rgba(0,255,209,0.35)"
        ringRef.current.style.backgroundColor = hovered.current
          ? "rgba(0,255,209,0.05)"
          : "transparent"
        ringRef.current.style.mixBlendMode = hasLabel ? "normal" : (hovered.current ? "normal" : "difference")
      }

      if (spotRef.current) {
        spotRef.current.style.left = `${pos.current.x}px`
        spotRef.current.style.top  = `${pos.current.y}px`
      }

      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("mouseover",  onOver)
    }
  }, [])

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        className="cursor-dot w-1.5 h-1.5 rounded-full bg-[#00FFD1] hidden lg:block"
        style={{ willChange: "transform" }}
      />

      {/* Ring with optional text label */}
      <div
        ref={ringRef}
        className="cursor-ring w-10 h-10 rounded-full border hidden lg:flex items-center justify-center"
        style={{
          willChange: "transform",
          transition: "border-color 0.2s, background-color 0.2s, scale 0.35s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <span
          ref={labelRef}
          className="font-mono text-[7px] tracking-[0.15em] text-[#00FFD1] uppercase select-none"
          style={{ pointerEvents: "none" }}
        />
      </div>

      {/* Spotlight glow */}
      <div
        ref={spotRef}
        className="fixed pointer-events-none z-[9990] hidden lg:block"
        style={{
          width: 400,
          height: 400,
          background: "radial-gradient(circle, rgba(0,255,209,0.035) 0%, transparent 70%)",
          transform: "translate(-50%, -50%)",
          willChange: "left, top",
          transition: "left 0.07s linear, top 0.07s linear",
        }}
      />
    </>
  )
}
