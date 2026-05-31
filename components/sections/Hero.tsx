"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import gsap from "gsap"
import { useMagnet } from "@/hooks/useMagnet"
import { personalInfo } from "@/lib/data"
import { useLang, t } from "@/lib/i18n"
import { ShutterText } from "@/components/ui/hero-shutter-text"

interface Ripple { id: number; x: number; y: number }

/* ── Inline styles for DigitalSerenity animations ── */
const HERO_STYLES = `
@keyframes hero-grid-draw {
  0%   { stroke-dashoffset: 1000; opacity: 0; }
  50%  { opacity: 0.15; }
  100% { stroke-dashoffset: 0; opacity: 0.1; }
}
@keyframes hero-dot-pulse {
  0%,100% { opacity: 0.08; transform: scale(1); }
  50%     { opacity: 0.22; transform: scale(1.15); }
}
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
.hero-grid-line {
  stroke: rgba(127,207,224,0.35);
  stroke-width: 0.5;
  opacity: 0;
  stroke-dasharray: 6 6;
  stroke-dashoffset: 1000;
  animation: hero-grid-draw 2.5s ease-out forwards;
}
.hero-detail-dot {
  fill: rgba(127,207,224,0.6);
  opacity: 0;
  animation: hero-dot-pulse 3s ease-in-out infinite;
}
.hero-corner-el {
  position: absolute;
  width: 36px; height: 36px;
  border: 1px solid rgba(127,207,224,0.15);
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
  background: radial-gradient(circle, rgba(127,207,224,0.06), rgba(132,132,200,0.04), transparent 70%);
  transform: translate(-50%,-50%);
  width: 420px; height: 420px;
  filter: blur(40px);
  will-change: left, top, opacity;
  transition: left 80ms linear, top 80ms linear, opacity 350ms ease-out;
}
`

export function Hero() {
  const containerRef = useRef<HTMLElement>(null)
  const { lang } = useLang()
  const tx = t[lang]

  /* Scroll parallax */
  const { scrollY } = useScroll()
  const yContent  = useTransform(scrollY, [0, 600], [0, -100])
  const yOpacity  = useTransform(scrollY, [0, 420],  [1, 0.15])

  /* Shutter text replay key */
  const [shutterKey, setShutterKey] = useState(0)

  /* Magnetic CTAs */
  const magnet1 = useMagnet(0.28)
  const magnet2 = useMagnet(0.2)

  /* Mouse gradient */
  const [mouseStyle, setMouseStyle] = useState({ left: "0px", top: "0px", opacity: 0 })

  /* Click ripples */
  const [ripples, setRipples] = useState<Ripple[]>([])

  /* Particles ref for scroll trigger */
  const particlesRef = useRef<HTMLDivElement[]>([])
  const scrolledRef = useRef(false)

  /* Mouse move */
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setMouseStyle({ left: `${e.clientX}px`, top: `${e.clientY}px`, opacity: 1 })
    }
    const onLeave = () => setMouseStyle((s) => ({ ...s, opacity: 0 }))
    window.addEventListener("mousemove", onMove)
    document.addEventListener("mouseleave", onLeave)
    return () => {
      window.removeEventListener("mousemove", onMove)
      document.removeEventListener("mouseleave", onLeave)
    }
  }, [])

  /* Click ripple */
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

  /* Particles on scroll */
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

  const setParticleRef = useCallback((el: HTMLDivElement | null, i: number) => {
    if (el) particlesRef.current[i] = el
  }, [])

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: HERO_STYLES }} />

      {/* Mouse gradient — outside section so it's fixed to viewport */}
      <div
        id="hero-mouse-gradient"
        style={{ left: mouseStyle.left, top: mouseStyle.top, opacity: mouseStyle.opacity }}
      />

      {/* Click ripples */}
      {ripples.map((r) => (
        <div
          key={r.id}
          className="hero-ripple-el"
          style={{ left: `${r.x}px`, top: `${r.y}px` }}
        />
      ))}

      <section
        ref={containerRef}
        className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden"
        aria-label="Hero"
      >
        {/* ── Animated SVG grid ── */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <pattern id="heroBaseGrid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(127,207,224,0.035)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#heroBaseGrid)" />
          {/* Animated accent lines */}
          <line x1="0" y1="20%" x2="100%" y2="20%" className="hero-grid-line" style={{ animationDelay: "0.8s" }} />
          <line x1="0" y1="80%" x2="100%" y2="80%" className="hero-grid-line" style={{ animationDelay: "1.2s" }} />
          <line x1="18%" y1="0" x2="18%" y2="100%" className="hero-grid-line" style={{ animationDelay: "1.5s" }} />
          <line x1="82%" y1="0" x2="82%" y2="100%" className="hero-grid-line" style={{ animationDelay: "1.9s" }} />
          {/* Intersection dots */}
          <circle cx="18%" cy="20%" r="2.5" className="hero-detail-dot" style={{ animationDelay: "2.6s" }} />
          <circle cx="82%" cy="20%" r="2.5" className="hero-detail-dot" style={{ animationDelay: "2.8s" }} />
          <circle cx="18%" cy="80%" r="2.5" className="hero-detail-dot" style={{ animationDelay: "3.0s" }} />
          <circle cx="82%" cy="80%" r="2.5" className="hero-detail-dot" style={{ animationDelay: "3.2s" }} />
          <circle cx="50%" cy="50%" r="1.5" className="hero-detail-dot" style={{ animationDelay: "3.5s" }} />
        </svg>

        {/* Corner ornaments */}
        <div className="hero-corner-el top-8 left-8"  style={{ animationDelay: "3.8s" }}>
          <div className="absolute top-0 left-0 w-2 h-2 rounded-full bg-[rgba(127,207,224,0.3)]" />
        </div>
        <div className="hero-corner-el top-8 right-8" style={{ animationDelay: "4.0s" }}>
          <div className="absolute top-0 right-0 w-2 h-2 rounded-full bg-[rgba(127,207,224,0.3)]" />
        </div>
        <div className="hero-corner-el bottom-24 left-8"  style={{ animationDelay: "4.2s" }}>
          <div className="absolute bottom-0 left-0 w-2 h-2 rounded-full bg-[rgba(127,207,224,0.3)]" />
        </div>
        <div className="hero-corner-el bottom-24 right-8" style={{ animationDelay: "4.4s" }}>
          <div className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-[rgba(127,207,224,0.3)]" />
        </div>

        {/* Floating particles (activated on first scroll) */}
        {[
          { top: "25%", left: "12%", delay: "0.5s" },
          { top: "60%", left: "88%", delay: "1.1s" },
          { top: "42%", left:  "8%", delay: "1.7s" },
          { top: "72%", left: "92%", delay: "2.3s" },
          { top: "35%", left: "95%", delay: "0.9s" },
          { top: "15%", left: "50%", delay: "1.4s" },
        ].map((p, i) => (
          <div
            key={i}
            ref={(el) => setParticleRef(el, i)}
            className="hero-particle"
            style={{ top: p.top, left: p.left, animationDelay: p.delay }}
          />
        ))}

        {/* Ambient orbs */}
        <div className="orb orb-float w-[600px] h-[400px] bg-[rgba(127,207,224,0.04)] top-1/4 -left-32 -z-0" style={{ animationDelay: "0s" }} />
        <div className="orb orb-float w-[400px] h-[300px] bg-[rgba(132,132,200,0.04)] bottom-1/4 -right-16 -z-0" style={{ animationDelay: "4s" }} />

        {/* Fade to next section */}
        <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[#07070F] to-transparent z-10 pointer-events-none" />

        {/* Content */}
        <motion.div
          className="relative z-20 max-w-7xl mx-auto px-6 lg:px-8 w-full pt-24"
          style={{ y: yContent, opacity: yOpacity }}
        >
          {/* Status badge */}
          <div className="hero-chip mb-6 w-fit">
            <div className="chip">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#4ADE80] animate-pulse" />
              {personalInfo.currentRole}
            </div>
          </div>

          {/* Name — shutter animation */}
          <div className="mb-2" aria-label={personalInfo.name}>
            {/* IMANE — parchment */}
            <div style={{ fontSize: "clamp(5rem, 16vw, 15rem)", letterSpacing: "-0.01em" }} className="-mb-3">
              <ShutterText
                text="IMANE"
                textColor="#EDE8DC"
                accentColor="#7FCFE0"
                animKey={shutterKey}
              />
            </div>
            {/* MOUMOUN — mint, with underline shimmer */}
            <div className="relative" style={{ fontSize: "clamp(5rem, 16vw, 15rem)", letterSpacing: "-0.01em" }}>
              <ShutterText
                text="MOUMOUN"
                textColor="#7FCFE0"
                accentColor="#8484C8"
                animKey={shutterKey}
              />
              <motion.div
                className="absolute bottom-2 left-0"
                style={{ height: "3px", background: "linear-gradient(90deg, transparent, #7FCFE0, #8484C8, transparent)" }}
                initial={{ scaleX: 0, transformOrigin: "left" }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.1, delay: 2.8, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>

            {/* Replay button */}
            <motion.button
              type="button"
              onClick={() => setShutterKey((k) => k + 1)}
              aria-label="Replay name animation"
              className="mt-3 flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] text-[#3D3F52] uppercase hover:text-[#7FCFE0] transition-colors duration-300 group"
              whileHover={{ x: 4 }}
              transition={{ duration: 0.2 }}
            >
              <svg className="w-3 h-3 group-hover:rotate-180 transition-transform duration-500" viewBox="0 0 16 16" fill="none">
                <path d="M13.5 8A5.5 5.5 0 1 1 8 2.5M13.5 2.5v3h-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              re-shutter
            </motion.button>
          </div>

          {/* Eyebrow divider */}
          <div className="hero-eyebrow h-px bg-gradient-to-r from-[#7FCFE0] via-[#8484C8] to-transparent mb-6 max-w-xl" />

          {/* Role */}
          <p className="hero-role font-display font-semibold text-xl md:text-2xl text-[#8B8FA8] mb-4 tracking-wide">
            {tx.hero.role}
          </p>

          {/* Subtitle */}
          <p className="hero-subtitle max-w-xl text-[#8B8FA8] text-lg leading-relaxed mb-8">
            {tx.hero.subtitle}
          </p>

          {/* Meta */}
          <div className="flex flex-wrap gap-6 mb-10">
            {[
              { label: "Institution", value: "Mines Saint-Étienne" },
              { label: "GPA",         value: "3.93 / 4.10" },
              { label: "Focus",       value: "AI · CV · Edge" },
            ].map((m) => (
              <div key={m.label} className="hero-meta flex flex-col gap-0.5">
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
              className="hero-cta magnetic-wrap"
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
              className="hero-cta magnetic-wrap"
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
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="font-mono text-[9px] tracking-[0.25em] text-[#3D3F52] uppercase" style={{ writingMode: "vertical-rl" }}>
            scroll
          </span>
          <motion.div
            className="w-px h-16 bg-gradient-to-b from-[rgba(127,207,224,0.5)] to-transparent"
            animate={{ scaleY: [1, 0.4, 1], opacity: [1, 0.4, 1] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 3.5 }}
            style={{ transformOrigin: "top" }}
          />
        </motion.div>
      </section>
    </>
  )
}
