"use client"

import { useEffect, useRef, Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { motion, useScroll, useTransform } from "framer-motion"
import gsap from "gsap"
import { NeuralGrid } from "@/components/three/NeuralGrid"
import { useTextScramble } from "@/hooks/useTextScramble"
import { useMagnet } from "@/hooks/useMagnet"
import { personalInfo } from "@/lib/data"

/* ── 3D Scene ─────────────────────────────────────────────────── */
function HeroScene() {
  const mouse = useRef<[number, number]>([0, 0])

  useEffect(() => {
    const h = (e: MouseEvent) => {
      mouse.current = [
        (e.clientX / window.innerWidth  - 0.5) * 2,
        -(e.clientY / window.innerHeight - 0.5) * 2,
      ]
    }
    window.addEventListener("mousemove", h)
    return () => window.removeEventListener("mousemove", h)
  }, [])

  return (
    <Canvas
      camera={{ position: [0, 0, 9], fov: 55 }}
      dpr={[1, 1.5]}
      gl={{ antialias: false, alpha: true }}
    >
      <Suspense fallback={null}>
        <NeuralGrid mouse={mouse} />
      </Suspense>
    </Canvas>
  )
}

/* ── Hero ─────────────────────────────────────────────────────── */
export function Hero() {
  const containerRef = useRef<HTMLElement>(null)

  /* Scroll parallax */
  const { scrollY } = useScroll()
  const yContent = useTransform(scrollY, [0, 600], [0, -100])
  const opacityContent = useTransform(scrollY, [0, 420], [1, 0.15])
  const yCanvas  = useTransform(scrollY, [0, 600], [0,  60])

  /* Text scramble */
  const firstName = useTextScramble("IMANE",   { delay: 1.8, duration: 900  })
  const lastName  = useTextScramble("MOUMOUN", { delay: 2.1, duration: 1100 })

  /* Magnetic CTAs */
  const magnet1 = useMagnet(0.28)
  const magnet2 = useMagnet(0.2)

  /* GSAP entrance */
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 })

      tl.fromTo(".hero-chip",
        { y: -30, opacity: 0, scale: 0.8 },
        { y: 0, opacity: 1, scale: 1, duration: 0.7, ease: "back.out(1.7)" },
      )
      .fromTo(".hero-eyebrow",
        { scaleX: 0, transformOrigin: "left center" },
        { scaleX: 1, duration: 0.9, ease: "power4.out" },
        "-=0.2",
      )
      .fromTo(".hero-role",
        { y: 40, opacity: 0 },
        { y: 0,  opacity: 1, duration: 0.7, ease: "power3.out" },
        "-=0.3",
      )
      .fromTo(".hero-subtitle",
        { y: 24, opacity: 0 },
        { y: 0,  opacity: 1, duration: 0.6, ease: "power3.out" },
        "-=0.2",
      )
      .fromTo(".hero-meta",
        { y: 16, opacity: 0 },
        { y: 0,  opacity: 1, duration: 0.5, stagger: 0.08, ease: "power2.out" },
        "-=0.2",
      )
      .fromTo(".hero-cta",
        { y: 20, opacity: 0, scale: 0.94 },
        { y: 0,  opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: "back.out(1.4)" },
        "-=0.1",
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden"
      aria-label="Hero"
    >
      {/* 3D reactive grid — slow parallax opposite to content */}
      <motion.div className="canvas-wrap opacity-70" style={{ y: yCanvas }}>
        <HeroScene />
      </motion.div>

      {/* Ambient orbs */}
      <div className="orb orb-float w-[600px] h-[400px] bg-[rgba(0,255,209,0.04)] top-1/4 -left-32 -z-0"
           style={{ animationDelay: "0s" }} />
      <div className="orb orb-float w-[400px] h-[300px] bg-[rgba(123,97,255,0.05)] bottom-1/4 -right-16 -z-0"
           style={{ animationDelay: "4s" }} />

      {/* Fade to sections */}
      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[#010108] to-transparent z-10 pointer-events-none" />

      {/* Content — scroll parallax wrapper */}
      <motion.div
        className="relative z-20 max-w-7xl mx-auto px-6 lg:px-8 w-full pt-24"
        style={{ y: yContent, opacity: opacityContent }}
      >
        {/* Status badge */}
        <div className="hero-chip mb-6 w-fit">
          <div className="chip">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#4ADE80] animate-pulse" />
            {personalInfo.currentRole}
          </div>
        </div>

        {/* Name — Bebas Neue impact + scramble */}
        <div className="mb-2 overflow-hidden" aria-label={personalInfo.name}>
          <div
            className="font-impact leading-none select-none"
            style={{
              fontSize: "clamp(5rem, 16vw, 15rem)",
              color: "#EDE8DC",
              letterSpacing: "-0.01em",
            }}
            aria-hidden="true"
          >
            {firstName}
          </div>
          {/* Last name — solid mint, no gradient */}
          <div
            className="font-impact leading-none select-none -mt-4 relative"
            style={{
              fontSize: "clamp(5rem, 16vw, 15rem)",
              letterSpacing: "-0.01em",
              color: "#00FFD1",
            }}
            aria-hidden="true"
          >
            {lastName}
            {/* Subtle animated underline shimmer — accent, not gradient text */}
            <motion.div
              className="absolute bottom-2 left-0"
              style={{ height: "3px", background: "linear-gradient(90deg, transparent, #00FFD1, #7B61FF, transparent)" }}
              initial={{ scaleX: 0, transformOrigin: "left" }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.1, delay: 2.8, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
        </div>

        {/* Eyebrow divider */}
        <div className="hero-eyebrow h-px bg-gradient-to-r from-[#00FFD1] via-[#7B61FF] to-transparent mb-6 max-w-xl" />

        {/* Role */}
        <p className="hero-role font-display font-semibold text-xl md:text-2xl text-[#8B8FA8] mb-4 tracking-wide">
          {personalInfo.title}
          <span className="mx-3 text-[#3D3F52]">·</span>
          <span className="text-[#EDE8DC]">{personalInfo.location}</span>
        </p>

        {/* Subtitle */}
        <p className="hero-subtitle max-w-xl text-[#8B8FA8] text-lg leading-relaxed mb-8">
          {personalInfo.subtitle}
        </p>

        {/* Meta */}
        <div className="flex flex-wrap gap-6 mb-10">
          {[
            { label: "Institution", value: "Mines Saint-Étienne" },
            { label: "GPA",         value: "3.93 / 4.10"          },
            { label: "Focus",       value: "AI · CV · Edge"        },
          ].map((m) => (
            <div key={m.label} className="hero-meta flex flex-col gap-0.5">
              <span className="font-mono text-[10px] tracking-widest text-[#3D3F52] uppercase">{m.label}</span>
              <span className="font-display font-semibold text-sm text-[#EDE8DC]">{m.value}</span>
            </div>
          ))}
        </div>

        {/* CTAs — magnetic buttons */}
        <div className="flex flex-wrap gap-4">
          {/* Primary CTA */}
          <div
            ref={magnet1.ref as React.RefObject<HTMLDivElement>}
            onMouseMove={magnet1.onMouseMove as React.MouseEventHandler<HTMLDivElement>}
            onMouseLeave={magnet1.onMouseLeave as React.MouseEventHandler<HTMLDivElement>}
            onMouseEnter={magnet1.onMouseEnter as React.MouseEventHandler<HTMLDivElement>}
            className="hero-cta magnetic-wrap"
          >
            <a
              href="#projects"
              className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full overflow-hidden font-semibold text-sm text-[#010108] bg-[#00FFD1] hover:bg-[#7B61FF] transition-colors duration-500"
              data-cursor="VIEW"
            >
              <span className="relative z-10">View Projects</span>
              <svg
                className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                viewBox="0 0 16 16" fill="none"
              >
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>

          {/* Secondary CTA */}
          <div
            ref={magnet2.ref as React.RefObject<HTMLDivElement>}
            onMouseMove={magnet2.onMouseMove as React.MouseEventHandler<HTMLDivElement>}
            onMouseLeave={magnet2.onMouseLeave as React.MouseEventHandler<HTMLDivElement>}
            onMouseEnter={magnet2.onMouseEnter as React.MouseEventHandler<HTMLDivElement>}
            className="hero-cta magnetic-wrap"
          >
            <a
              href="#contact"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-[rgba(0,255,209,0.25)] text-[#EDE8DC] text-sm font-medium hover:border-[#00FFD1] hover:text-[#00FFD1] transition-all duration-300"
              data-cursor-hover
            >
              Let&apos;s talk
            </a>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator — fully framer-motion controlled */}
      <motion.div
        className="absolute right-8 bottom-12 hidden lg:flex flex-col items-center gap-3 z-20"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1,  y: 0  }}
        transition={{ duration: 0.8, delay: 2.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <span
          className="font-mono text-[9px] tracking-[0.25em] text-[#3D3F52] uppercase"
          style={{ writingMode: "vertical-rl" }}
        >
          scroll
        </span>
        {/* Pulsing line */}
        <motion.div
          className="w-px h-16 bg-gradient-to-b from-[rgba(0,255,209,0.5)] to-transparent"
          animate={{ scaleY: [1, 0.4, 1], opacity: [1, 0.4, 1] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 3.5 }}
          style={{ transformOrigin: "top" }}
        />
      </motion.div>
    </section>
  )
}
