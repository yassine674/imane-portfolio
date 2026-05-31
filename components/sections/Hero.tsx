"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import gsap from "gsap"
import { useMagnet } from "@/hooks/useMagnet"
import { personalInfo } from "@/lib/data"
import { useLang, t } from "@/lib/i18n"
import { ShutterText } from "@/components/ui/hero-shutter-text"
import { SparklesCore } from "@/components/ui/sparkles"
import { usePreloader } from "@/lib/preloader-context"

interface Ripple { id: number; x: number; y: number }

const HERO_STYLES = `
@keyframes hero-ripple {
  0%   { transform: translate(-50%,-50%) scale(0); opacity: 0.6; }
  100% { transform: translate(-50%,-50%) scale(8); opacity: 0; }
}
@keyframes hero-corner-in {
  from { opacity: 0; transform: translateY(10px) scale(0.9); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}
@keyframes hero-float-particle {
  0%,100% { transform: translateY(0)    translateX(0);   opacity: 0.15; }
  25%     { transform: translateY(-12px) translateX(6px); opacity: 0.55; }
  50%     { transform: translateY(-6px)  translateX(-4px);opacity: 0.35; }
  75%     { transform: translateY(-18px) translateX(8px); opacity: 0.7; }
}
.hero-corner-el {
  position: absolute;
  width: 36px; height: 36px;
  border: 1px solid rgba(127,207,224,0.12);
  opacity: 0;
  animation: hero-corner-in 0.8s ease-out forwards;
}
.hero-particle {
  position: absolute;
  width: 2px; height: 2px;
  background: rgba(127,207,224,0.7);
  border-radius: 50%;
  opacity: 0;
  animation: hero-float-particle 5s ease-in-out infinite;
  animation-play-state: paused;
}
.hero-ripple-el {
  position: fixed;
  width: 6px; height: 6px;
  border-radius: 50%;
  background: rgba(127,207,224,0.45);
  transform: translate(-50%,-50%);
  pointer-events: none;
  animation: hero-ripple 0.9s ease-out forwards;
  z-index: 99;
}
#hero-mouse-gradient {
  position: fixed;
  pointer-events: none;
  border-radius: 9999px;
  background: radial-gradient(circle, rgba(127,207,224,0.05), rgba(132,132,200,0.03), transparent 70%);
  transform: translate(-50%,-50%);
  width: 420px; height: 420px;
  filter: blur(40px);
  will-change: left, top, opacity;
  transition: left 80ms linear, top 80ms linear, opacity 350ms ease-out;
}
.hero-content-wrap {
  padding-left: clamp(2rem, 8vw, 6rem);
  padding-right: clamp(2rem, 8vw, 6rem);
}
.hero-name-row {
  font-size: clamp(5rem, 16vw, 15rem);
  letter-spacing: -0.01em;
}
.hero-particle-delay-1 { animation-delay: 0.5s; }
.hero-particle-delay-2 { animation-delay: 1.1s; }
.hero-particle-delay-3 { animation-delay: 1.7s; }
.hero-particle-delay-4 { animation-delay: 2.3s; }
.hero-particle-delay-5 { animation-delay: 0.9s; }
.hero-particle-delay-6 { animation-delay: 1.4s; }
.hero-particle-pos-1 { top: 25%; left: 12%; }
.hero-particle-pos-2 { top: 60%; left: 88%; }
.hero-particle-pos-3 { top: 42%; left:  8%; }
.hero-particle-pos-4 { top: 72%; left: 92%; }
.hero-particle-pos-5 { top: 35%; left: 95%; }
.hero-particle-pos-6 { top: 15%; left: 50%; }
.hero-corner-delay-1 { animation-delay: 0.6s; }
.hero-corner-delay-2 { animation-delay: 0.8s; }
.hero-corner-delay-3 { animation-delay: 1.0s; }
.hero-corner-delay-4 { animation-delay: 1.2s; }
.hero-scroll-label { writing-mode: vertical-rl; }
.hero-scroll-bar   { transform-origin: top; }
`

export function Hero() {
  const containerRef = useRef<HTMLElement>(null)
  const { lang } = useLang()
  const tx = t[lang]
  const { preloaderDone } = usePreloader()

  const { scrollY } = useScroll()
  const yContent = useTransform(scrollY, [0, 600], [0, -80])
  const yOpacity = useTransform(scrollY, [0, 420], [1, 0.15])

  const magnet1 = useMagnet(0.28)
  const magnet2 = useMagnet(0.2)

  const [mouseStyle, setMouseStyle] = useState({ left: "0px", top: "0px", opacity: 0 })
  const [ripples, setRipples] = useState<Ripple[]>([])
  const particlesRef = useRef<HTMLDivElement[]>([])
  const scrolledRef = useRef(false)

  useEffect(() => {
    const onMove = (e: MouseEvent) =>
      setMouseStyle({ left: `${e.clientX}px`, top: `${e.clientY}px`, opacity: 1 })
    const onLeave = () => setMouseStyle((s) => ({ ...s, opacity: 0 }))
    window.addEventListener("mousemove", onMove)
    document.addEventListener("mouseleave", onLeave)
    return () => {
      window.removeEventListener("mousemove", onMove)
      document.removeEventListener("mouseleave", onLeave)
    }
  }, [])

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const r: Ripple = { id: Date.now(), x: e.clientX, y: e.clientY }
      setRipples((prev) => [...prev, r])
      setTimeout(() => setRipples((prev) => prev.filter((x) => x.id !== r.id)), 900)
    }
    const section = containerRef.current
    section?.addEventListener("click", onClick)
    return () => section?.removeEventListener("click", onClick)
  }, [])

  useEffect(() => {
    const onScroll = () => {
      if (scrolledRef.current) return
      scrolledRef.current = true
      particlesRef.current.forEach((el) => {
        if (el) el.style.animationPlayState = "running"
      })
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    if (!preloaderDone) return
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.1 })
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
        { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
        "-=0.3",
      )
      .fromTo(".hero-subtitle",
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
        "-=0.2",
      )
      .fromTo(".hero-meta",
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: "power2.out" },
        "-=0.2",
      )
      .fromTo(".hero-cta",
        { y: 20, opacity: 0, scale: 0.94 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: "back.out(1.4)" },
        "-=0.1",
      )
    }, containerRef)

    return () => ctx.revert()
  }, [preloaderDone])

  const setParticleRef = useCallback((el: HTMLDivElement | null, i: number) => {
    if (el) particlesRef.current[i] = el
  }, [])

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: HERO_STYLES }} />

      <div
        id="hero-mouse-gradient"
        style={{ left: mouseStyle.left, top: mouseStyle.top, opacity: mouseStyle.opacity }}
      />

      {ripples.map((r) => (
        <div
          key={r.id}
          className="hero-ripple-el"
          style={{ left: `${r.x}px`, top: `${r.y}px` }}
        />
      ))}

      <section
        ref={containerRef}
        className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden bg-black"
        aria-label="Hero"
      >
        {/* ── Ambient background sparkles ── */}
        <SparklesCore
          id="hero-bg-sparkles"
          background="transparent"
          minSize={0.3}
          maxSize={1.2}
          particleDensity={55}
          particleColor="#ffffff"
          speed={0.4}
          className="absolute inset-0 w-full h-full pointer-events-none"
        />

        {/* Corner ornaments */}
        <div className="hero-corner-el hero-corner-delay-1 top-8 left-8">
          <div className="absolute top-0 left-0 w-2 h-2 rounded-full bg-[rgba(127,207,224,0.3)]" />
        </div>
        <div className="hero-corner-el hero-corner-delay-2 top-8 right-8">
          <div className="absolute top-0 right-0 w-2 h-2 rounded-full bg-[rgba(127,207,224,0.3)]" />
        </div>
        <div className="hero-corner-el hero-corner-delay-3 bottom-24 left-8">
          <div className="absolute bottom-0 left-0 w-2 h-2 rounded-full bg-[rgba(127,207,224,0.3)]" />
        </div>
        <div className="hero-corner-el hero-corner-delay-4 bottom-24 right-8">
          <div className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-[rgba(127,207,224,0.3)]" />
        </div>

        {/* Floating particles (activated on scroll) */}
        {(["1","2","3","4","5","6"] as const).map((n, i) => (
          <div
            key={n}
            ref={(el) => setParticleRef(el, i)}
            className={`hero-particle hero-particle-pos-${n} hero-particle-delay-${n}`}
          />
        ))}

        {/* Fade to next section */}
        <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none" />

        {/* ── Content ── */}
        <motion.div
          className="relative z-20 max-w-7xl mx-auto w-full pt-24 hero-content-wrap"
          style={{ y: yContent, opacity: yOpacity }}
        >
          {/* Status badge */}
          <div className="hero-chip mb-6 w-fit opacity-0">
            <div className="chip">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#4ADE80] animate-pulse" />
              {personalInfo.currentRole}
            </div>
          </div>

          {/* Name — shutter animation (mounted only after preloader exits) */}
          <div className="mb-0" aria-label={personalInfo.name}>
            <div className="hero-name-row -mb-3">
              {preloaderDone && (
                <ShutterText text="IMANE" textColor="#EDE8DC" accentColor="#7FCFE0" baseDelay={0.2} />
              )}
            </div>
            <div className="hero-name-row relative">
              {preloaderDone && (
                <ShutterText text="MOUMOUN" textColor="#7FCFE0" accentColor="#8484C8" baseDelay={0.2} />
              )}
            </div>
          </div>

          {/* ── Sparkle horizon — the "starfield below the name" ── */}
          <div className="relative w-full h-44 -mt-2 mb-8 overflow-hidden">
            {/* Glow line — cyan */}
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#7FCFE0] to-transparent blur-sm" />
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#7FCFE0] to-transparent" />
            {/* Glow line — violet accent */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 w-1/3 h-[5px] bg-gradient-to-r from-transparent via-[#8484C8] to-transparent blur-sm" />
            <div className="absolute left-1/2 -translate-x-1/2 top-0 w-1/3 h-px bg-gradient-to-r from-transparent via-[#8484C8] to-transparent" />

            {/* Dense sparkles in this zone */}
            <SparklesCore
              id="hero-horizon-sparkles"
              background="transparent"
              minSize={0.4}
              maxSize={1.0}
              particleDensity={1200}
              particleColor="#ffffff"
              speed={0.8}
              className="w-full h-full"
            />

            {/* Radial mask — fades sparkles at edges, keeps center bright */}
            <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(500px_180px_at_top,transparent_20%,white)]" />
          </div>

          {/* Eyebrow divider */}
          <div className="hero-eyebrow h-px bg-gradient-to-r from-[#7FCFE0] via-[#8484C8] to-transparent mb-6 max-w-xl opacity-0" />

          {/* Role */}
          <p className="hero-role font-display font-semibold text-xl md:text-2xl text-[#8B8FA8] mb-4 tracking-wide opacity-0">
            {tx.hero.role}
          </p>

          {/* Subtitle */}
          <p className="hero-subtitle max-w-xl text-[#8B8FA8] text-lg leading-relaxed mb-8 opacity-0">
            {tx.hero.subtitle}
          </p>

          {/* Meta */}
          <div className="flex flex-wrap gap-6 mb-10">
            {[
              { label: "Institution", value: "Mines Saint-Étienne" },
              { label: "GPA",         value: "3.93 / 4.10" },
              { label: "Focus",       value: "AI · CV · Edge" },
            ].map((m) => (
              <div key={m.label} className="hero-meta flex flex-col gap-0.5 opacity-0">
                <span className="font-mono text-[10px] tracking-widest text-[#3D3F52] uppercase">{m.label}</span>
                <span className="font-display font-semibold text-sm text-[#EDE8DC]">{m.value}</span>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <div
              ref={magnet1.ref as React.RefObject<HTMLDivElement>}
              onMouseMove={magnet1.onMouseMove as React.MouseEventHandler<HTMLDivElement>}
              onMouseLeave={magnet1.onMouseLeave as React.MouseEventHandler<HTMLDivElement>}
              onMouseEnter={magnet1.onMouseEnter as React.MouseEventHandler<HTMLDivElement>}
              className="hero-cta magnetic-wrap opacity-0"
            >
              <a
                href="#projects"
                className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full overflow-hidden font-semibold text-sm text-[#07070F] bg-[#7FCFE0] hover:bg-[#8484C8] transition-colors duration-500"
              >
                <span className="relative z-10">{tx.hero.cta1}</span>
                <svg className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>

            <div
              ref={magnet2.ref as React.RefObject<HTMLDivElement>}
              onMouseMove={magnet2.onMouseMove as React.MouseEventHandler<HTMLDivElement>}
              onMouseLeave={magnet2.onMouseLeave as React.MouseEventHandler<HTMLDivElement>}
              onMouseEnter={magnet2.onMouseEnter as React.MouseEventHandler<HTMLDivElement>}
              className="hero-cta magnetic-wrap opacity-0"
            >
              <a
                href="#contact"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-[rgba(127,207,224,0.25)] text-[#EDE8DC] text-sm font-medium hover:border-[#7FCFE0] hover:text-[#7FCFE0] transition-all duration-300"
              >
                {tx.hero.cta2}
              </a>
            </div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute right-8 bottom-12 hidden lg:flex flex-col items-center gap-3 z-20"
          initial={{ opacity: 0, y: 16 }}
          animate={preloaderDone ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="hero-scroll-label font-mono text-[9px] tracking-[0.25em] text-[#3D3F52] uppercase">
            scroll
          </span>
          <motion.div
            className="hero-scroll-bar w-px h-16 bg-gradient-to-b from-[rgba(127,207,224,0.5)] to-transparent"
            animate={{ scaleY: [1, 0.4, 1], opacity: [1, 0.4, 1] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
          />
        </motion.div>
      </section>
    </>
  )
}
