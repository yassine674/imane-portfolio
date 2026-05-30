"use client"

import { useEffect, useId, useRef } from "react"
import { tsParticles } from "@tsparticles/engine"
import { loadSlim } from "@tsparticles/slim"
import { cn } from "@/lib/utils"
import { motion, useAnimation } from "framer-motion"
import type { Container } from "@tsparticles/engine"

type SparklesProps = {
  id?: string
  className?: string
  background?: string
  minSize?: number
  maxSize?: number
  speed?: number
  particleColor?: string
  particleDensity?: number
}

let slimLoaded = false

export function SparklesCore(props: SparklesProps) {
  const {
    id,
    className,
    background,
    minSize,
    maxSize,
    speed,
    particleColor,
    particleDensity,
  } = props

  const generatedId = useId()
  const effectiveId = id ?? generatedId.replace(/:/g, "")
  const containerRef = useRef<Container | null>(null)
  const controls = useAnimation()

  useEffect(() => {
    let cancelled = false

    const init = async () => {
      if (!slimLoaded) {
        await loadSlim(tsParticles)
        slimLoaded = true
      }
      if (cancelled) return

      const container = await tsParticles.load({
        id: effectiveId,
        options: {
          fullScreen: { enable: false },
          fpsLimit: 60,
          particles: {
            color: { value: particleColor ?? "#ffffff" },
            move: {
              direction: "none",
              enable: true,
              outModes: { default: "out" },
              random: true,
              speed: { min: 0.05, max: speed ?? 0.4 },
              straight: false,
            },
            number: {
              density: { enable: true, width: 800, height: 800 },
              value: particleDensity ?? 40,
            },
            opacity: {
              value: { min: 0.05, max: 0.65 },
              animation: {
                enable: true,
                speed: 1.2,
                sync: false,
                startValue: "random",
                count: 0,
                decay: 0,
                delay: 0,
                mode: "auto",
                destroy: "none",
              },
            },
            shape: { type: "circle" },
            size: {
              value: { min: minSize ?? 0.5, max: maxSize ?? 1.8 },
            },
          },
          background: {
            color: { value: background ?? "transparent" },
          },
          detectRetina: true,
        },
      })

      if (cancelled) {
        container?.destroy()
        return
      }

      containerRef.current = container ?? null
      controls.start({ opacity: 1, transition: { duration: 1 } })
    }

    init()

    return () => {
      cancelled = true
      containerRef.current?.destroy()
      containerRef.current = null
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [effectiveId])

  return (
    <motion.div
      animate={controls}
      className={cn("opacity-0", className)}
    >
      <div id={effectiveId} className="w-full h-full" />
    </motion.div>
  )
}
