"use client"

import * as React from "react"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { cn } from "@/lib/utils"
import { personalInfo } from "@/lib/data"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

/* ── Styles ── */
const STYLES = `
@keyframes footer-breathe {
  0%   { transform: translate(-50%, -50%) scale(1);   opacity: 0.4; }
  100% { transform: translate(-50%, -50%) scale(1.08); opacity: 0.7; }
}
@keyframes footer-scroll-marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
@keyframes footer-heartbeat {
  0%,100% { transform: scale(1);   }
  15%,45% { transform: scale(1.25); }
  30%     { transform: scale(1);   }
}
.footer-breathe     { animation: footer-breathe 8s ease-in-out infinite alternate; }
.footer-marquee     { animation: footer-scroll-marquee 40s linear infinite; }
.footer-heartbeat   { animation: footer-heartbeat 2s cubic-bezier(0.25,1,0.5,1) infinite; }

.footer-bg-grid {
  background-size: 60px 60px;
  background-image:
    linear-gradient(to right,  rgba(127,207,224,0.04) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(127,207,224,0.04) 1px, transparent 1px);
  mask-image: linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);
  -webkit-mask-image: linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);
}
.footer-aurora {
  background: radial-gradient(
    circle at 50% 50%,
    rgba(127,207,224,0.12) 0%,
    rgba(132,132,200,0.10) 40%,
    transparent 70%
  );
}
.footer-glass-pill {
  background: linear-gradient(145deg, rgba(127,207,224,0.04) 0%, rgba(127,207,224,0.02) 100%);
  box-shadow: 0 10px 30px -10px rgba(0,0,0,0.4), inset 0 1px 1px rgba(127,207,224,0.08);
  border: 1px solid rgba(127,207,224,0.10);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  transition: all 0.4s cubic-bezier(0.16,1,0.3,1);
}
.footer-glass-pill:hover {
  background: linear-gradient(145deg, rgba(127,207,224,0.10) 0%, rgba(127,207,224,0.04) 100%);
  border-color: rgba(127,207,224,0.28);
  box-shadow: 0 20px 40px -10px rgba(0,0,0,0.5), inset 0 1px 1px rgba(127,207,224,0.18);
  color: #EDE8DC;
}
.footer-giant-bg-text {
  font-size: 26vw;
  line-height: 0.75;
  font-weight: 900;
  letter-spacing: -0.05em;
  color: transparent;
  -webkit-text-stroke: 1px rgba(127,207,224,0.05);
  background: linear-gradient(180deg, rgba(127,207,224,0.07) 0%, transparent 60%);
  -webkit-background-clip: text;
  background-clip: text;
  font-family: var(--font-bebas-neue, 'Bebas Neue', sans-serif);
}
.footer-text-glow {
  background: linear-gradient(180deg, #EDE8DC 0%, rgba(235,231,220,0.4) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0px 0px 20px rgba(127,207,224,0.15));
  font-family: var(--font-bebas-neue, 'Bebas Neue', sans-serif);
}
`

/* ── Magnetic Button ──
   Using a plain function component avoids the forwardRef<never> issue
   that arises when combining ButtonHTMLAttributes & AnchorHTMLAttributes
   with a polymorphic `as` prop. The magnetic effect uses an internal ref. */
interface MagneticProps {
  as?: "button" | "a"
  className?: string
  children?: React.ReactNode
  href?: string
  target?: string
  rel?: string
  onClick?: React.MouseEventHandler
  "aria-label"?: string
  type?: "button" | "submit" | "reset"
}

function MagneticButton({ as = "button", className, children, ...props }: MagneticProps) {
  const elRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (typeof window === "undefined") return
    const el = elRef.current
    if (!el) return

    const ctx = gsap.context(() => {
      const onMove = (e: MouseEvent) => {
        const rect = el.getBoundingClientRect()
        const x = e.clientX - rect.left - rect.width  / 2
        const y = e.clientY - rect.top  - rect.height / 2
        gsap.to(el, { x: x * 0.4, y: y * 0.4, rotationX: -y * 0.15, rotationY: x * 0.15, scale: 1.05, ease: "power2.out", duration: 0.4 })
      }
      const onLeave = () => {
        gsap.to(el, { x: 0, y: 0, rotationX: 0, rotationY: 0, scale: 1, ease: "elastic.out(1,0.3)", duration: 1.2 })
      }
      el.addEventListener("mousemove", onMove as EventListener)
      el.addEventListener("mouseleave", onLeave)
      return () => {
        el.removeEventListener("mousemove", onMove as EventListener)
        el.removeEventListener("mouseleave", onLeave)
      }
    }, el)

    return () => ctx.revert()
  }, [])

  const shared = { ref: elRef as React.Ref<never>, className: cn("cursor-pointer", className), ...props }

  if (as === "a") return <a {...shared as React.AnchorHTMLAttributes<HTMLAnchorElement>}>{children}</a>
  return <button type="button" {...shared as React.ButtonHTMLAttributes<HTMLButtonElement>}>{children}</button>
}

/* ── Marquee item ── */
const MarqueeItem = () => (
  <div className="flex items-center space-x-12 px-6 font-mono text-[11px] tracking-[0.25em] text-[#3D3F52] uppercase">
    <span>AI & ML Engineer</span>
    <span className="text-[#7FCFE0]">✦</span>
    <span>Computer Vision</span>
    <span className="text-[#8484C8]">✦</span>
    <span>Deep Learning</span>
    <span className="text-[#7FCFE0]">✦</span>
    <span>Edge AI</span>
    <span className="text-[#8484C8]">✦</span>
    <span>Mines Saint-Étienne</span>
    <span className="text-[#7FCFE0]">✦</span>
  </div>
)

/* ── Main ── */
export function CinematicFooter() {
  const wrapperRef    = useRef<HTMLDivElement>(null)
  const giantTextRef  = useRef<HTMLDivElement>(null)
  const headingRef    = useRef<HTMLHeadingElement>(null)
  const linksRef      = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === "undefined" || !wrapperRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        giantTextRef.current,
        { y: "10vh", scale: 0.8, opacity: 0 },
        {
          y: "0vh", scale: 1, opacity: 1, ease: "power1.out",
          scrollTrigger: { trigger: wrapperRef.current, start: "top 80%", end: "bottom bottom", scrub: 1 },
        },
      )
      gsap.fromTo(
        [headingRef.current, linksRef.current],
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.15, ease: "power3.out",
          scrollTrigger: { trigger: wrapperRef.current, start: "top 40%", end: "bottom bottom", scrub: 1 },
        },
      )
    }, wrapperRef)

    return () => ctx.revert()
  }, [])

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      <div
        ref={wrapperRef}
        className="relative h-screen w-full"
        style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
      >
        <footer className="fixed bottom-0 left-0 flex h-screen w-full flex-col justify-between overflow-hidden bg-[#07070F] text-[#EDE8DC]">

          {/* Ambient aurora */}
          <div className="footer-aurora absolute left-1/2 top-1/2 h-[60vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 footer-breathe rounded-[50%] blur-[80px] pointer-events-none z-0" />
          <div className="footer-bg-grid absolute inset-0 z-0 pointer-events-none" />

          {/* Giant background text */}
          <div
            ref={giantTextRef}
            className="footer-giant-bg-text absolute -bottom-[5vh] left-1/2 -translate-x-1/2 whitespace-nowrap z-0 pointer-events-none select-none"
          >
            CONNECT
          </div>

          {/* Marquee */}
          <div className="absolute top-12 left-0 w-full overflow-hidden border-y border-[rgba(127,207,224,0.06)] bg-[rgba(7,7,15,0.7)] backdrop-blur-md py-4 z-10 -rotate-1 scale-110">
            <div className="flex w-max footer-marquee">
              <MarqueeItem />
              <MarqueeItem />
            </div>
          </div>

          {/* Main content */}
          <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 mt-20 w-full max-w-5xl mx-auto">
            <h2
              ref={headingRef}
              className="footer-text-glow text-5xl md:text-8xl tracking-tight mb-12 text-center"
            >
              Let&apos;s collaborate.
            </h2>

            <div ref={linksRef} className="flex flex-col items-center gap-6 w-full">
              {/* Primary links */}
              <div className="flex flex-wrap justify-center gap-4 w-full">
                <MagneticButton
                  as="a"
                  href={`mailto:${personalInfo.email}`}
                  className="footer-glass-pill px-10 py-5 rounded-full text-[#EDE8DC] font-semibold text-sm md:text-base flex items-center gap-3 font-display"
                >
                  <svg className="w-5 h-5 text-[#7FCFE0]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  {personalInfo.email}
                </MagneticButton>

                <MagneticButton
                  as="a"
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-glass-pill px-10 py-5 rounded-full text-[#EDE8DC] font-semibold text-sm md:text-base flex items-center gap-3 font-display"
                >
                  <svg className="w-5 h-5 text-[#7FCFE0]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect width="4" height="12" x="2" y="9" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                  LinkedIn
                </MagneticButton>

                <MagneticButton
                  as="a"
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-glass-pill px-10 py-5 rounded-full text-[#EDE8DC] font-semibold text-sm md:text-base flex items-center gap-3 font-display"
                >
                  <svg className="w-5 h-5 text-[#8484C8]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.68-.22.68-.48v-1.69C6.86 19.93 6.28 18 6.28 18c-.45-1.15-1.11-1.46-1.11-1.46-.91-.62.07-.61.07-.61 1.01.07 1.54 1.03 1.54 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0 1 12 6.8c.85 0 1.71.11 2.51.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10.01 10.01 0 0 0 22 12c0-5.52-4.48-10-10-10z" />
                  </svg>
                  GitHub
                </MagneticButton>
              </div>

              {/* Secondary links */}
              <div className="flex flex-wrap justify-center gap-3 md:gap-6 w-full mt-2">
                <MagneticButton as="a" href="#about"   className="footer-glass-pill px-6 py-3 rounded-full text-[#717285] font-mono text-xs md:text-sm hover:text-[#EDE8DC] uppercase tracking-widest">
                  About
                </MagneticButton>
                <MagneticButton as="a" href="#projects" className="footer-glass-pill px-6 py-3 rounded-full text-[#717285] font-mono text-xs md:text-sm hover:text-[#EDE8DC] uppercase tracking-widest">
                  Work
                </MagneticButton>
                <MagneticButton as="a" href="#skills"  className="footer-glass-pill px-6 py-3 rounded-full text-[#717285] font-mono text-xs md:text-sm hover:text-[#EDE8DC] uppercase tracking-widest">
                  Skills
                </MagneticButton>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="relative z-20 w-full pb-8 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="font-mono text-[10px] text-[#3D3F52] tracking-widest uppercase order-2 md:order-1">
              © 2026 Imane MOUMOUN — All rights reserved
            </div>

            <div className="footer-glass-pill px-6 py-3 rounded-full flex items-center gap-2 order-1 md:order-2 cursor-default border-[rgba(127,207,224,0.08)]">
              <span className="font-mono text-[10px] text-[#3D3F52] uppercase tracking-widest">Crafted with</span>
              <span className="footer-heartbeat text-sm text-[#E07850] inline-block">❤</span>
              <span className="font-mono text-[10px] text-[#3D3F52] uppercase tracking-widest">in France</span>
            </div>

            <MagneticButton
              as="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="w-12 h-12 rounded-full footer-glass-pill flex items-center justify-center text-[#717285] hover:text-[#7FCFE0] group order-3"
              aria-label="Back to top"
            >
              <svg className="w-5 h-5 transform group-hover:-translate-y-1.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </MagneticButton>
          </div>
        </footer>
      </div>
    </>
  )
}
