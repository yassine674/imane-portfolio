"use client"

import { useEffect } from "react"
import Lenis from "lenis"
import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"

let lenisInstance: Lenis | null = null

export function useLenis() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
      syncTouch: true,
    })

    lenisInstance = lenis

    lenis.on("scroll", ScrollTrigger.update)

    /* Store the tick reference so the exact same fn is removed on cleanup */
    const tick = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    ScrollTrigger.defaults({ markers: false })

    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
      lenisInstance = null
    }
  }, [])

  return lenisInstance
}

export function getLenis() {
  return lenisInstance
}
