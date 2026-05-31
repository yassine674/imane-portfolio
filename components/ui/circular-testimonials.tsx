"use client"

import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
} from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export interface CircularItem {
  src: string
  name: string
  designation: string
  quote: string
  tags?: string[]
  impact?: string
  github?: string
  color?: string
}

interface Colors {
  name?: string
  designation?: string
  testimony?: string
  arrowBackground?: string
  arrowForeground?: string
  arrowHoverBackground?: string
}

interface FontSizes {
  name?: string
  designation?: string
  quote?: string
}

interface CircularTestimonialsProps {
  testimonials: CircularItem[]
  autoplay?: boolean
  colors?: Colors
  fontSizes?: FontSizes
}

function calculateGap(width: number) {
  const minWidth = 320
  const maxWidth = 600
  const minGap  = 40
  const maxGap  = 68
  if (width <= minWidth) return minGap
  if (width >= maxWidth) return maxGap
  return minGap + (maxGap - minGap) * ((width - minWidth) / (maxWidth - minWidth))
}

export function CircularTestimonials({
  testimonials,
  autoplay = true,
  colors = {},
  fontSizes = {},
}: CircularTestimonialsProps) {
  const colorName      = colors.name             ?? "#EBE7DC"
  const colorDesig     = colors.designation      ?? "#7FCFE0"
  const colorTestimony = colors.testimony        ?? "#717285"
  const colorArrowBg   = colors.arrowBackground  ?? "#0D0C1E"
  const colorArrowFg   = colors.arrowForeground  ?? "#EBE7DC"
  const colorArrowHov  = colors.arrowHoverBackground ?? "#7FCFE0"
  const fsName  = fontSizes.name         ?? "2rem"
  const fsDesig = fontSizes.designation  ?? "0.875rem"
  const fsQuote = fontSizes.quote        ?? "0.9375rem"

  const [active,     setActive]     = useState(0)
  const [hoverPrev,  setHoverPrev]  = useState(false)
  const [hoverNext,  setHoverNext]  = useState(false)
  const [cWidth,     setCWidth]     = useState(400)

  const imgRef    = useRef<HTMLDivElement>(null)
  const timerRef  = useRef<ReturnType<typeof setInterval> | null>(null)

  const len  = useMemo(() => testimonials.length, [testimonials])
  const item = useMemo(() => testimonials[active], [active, testimonials])

  /* responsive gap */
  useEffect(() => {
    const onResize = () => {
      if (imgRef.current) setCWidth(imgRef.current.offsetWidth)
    }
    onResize()
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [])

  /* autoplay */
  useEffect(() => {
    if (!autoplay) return
    timerRef.current = setInterval(() => setActive(p => (p + 1) % len), 5000)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [autoplay, len])

  const next = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    setActive(p => (p + 1) % len)
  }, [len])

  const prev = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    setActive(p => (p - 1 + len) % len)
  }, [len])

  /* keyboard */
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft")  prev()
      if (e.key === "ArrowRight") next()
    }
    window.addEventListener("keydown", h)
    return () => window.removeEventListener("keydown", h)
  }, [prev, next])

  /* 3-D card positions */
  function imgStyle(i: number): React.CSSProperties {
    const gap  = calculateGap(cWidth)
    const lift = gap * 0.8
    const isCenter = i === active
    const isLeft   = (active - 1 + len) % len === i
    const isRight  = (active + 1) % len === i
    const t = "all 0.8s cubic-bezier(.4,2,.3,1)"
    if (isCenter)
      return { zIndex: 3, opacity: 1, pointerEvents: "auto", transform: "translateX(0) translateY(0) scale(1) rotateY(0deg)", transition: t }
    if (isLeft)
      return { zIndex: 2, opacity: 1, pointerEvents: "auto", transform: `translateX(-${gap}px) translateY(-${lift}px) scale(0.85) rotateY(15deg)`, transition: t }
    if (isRight)
      return { zIndex: 2, opacity: 1, pointerEvents: "auto", transform: `translateX(${gap}px) translateY(-${lift}px) scale(0.85) rotateY(-15deg)`, transition: t }
    return { zIndex: 1, opacity: 0, pointerEvents: "none", transition: t }
  }

  return (
    <div className="w-full">
      <div className="grid gap-12 lg:gap-20 lg:grid-cols-2 items-center">

        {/* ─── 3-D image stack — padded wrapper keeps side-cards on screen ─── */}
        <div style={{ padding: "0 clamp(28px, 6%, 64px)" }}>
        <div
          ref={imgRef}
          className="relative w-full h-72 sm:h-80 lg:h-96"
          style={{ perspective: "1000px" }}
        >
          {testimonials.map((t, i) => (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              key={t.src + i}
              src={t.src}
              alt={t.name}
              className="absolute w-full h-full object-cover rounded-3xl"
              style={{
                ...imgStyle(i),
                boxShadow: "0 12px 50px rgba(0,0,0,0.55)",
              }}
              loading="lazy"
            />
          ))}
        </div>
        </div>{/* end padding wrapper */}

        {/* ─── Content ─── */}
        <div className="flex flex-col justify-between min-h-[18rem]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="flex flex-col gap-3"
            >
              {/* Counter */}
              <span
                className="font-mono text-[10px] tracking-[0.25em] uppercase"
                style={{ color: colorName, opacity: 0.35 }}
              >
                {String(active + 1).padStart(2, "0")} / {String(len).padStart(2, "0")}
              </span>

              {/* Title */}
              <h3
                className="font-impact leading-[0.92]"
                style={{ color: colorName, fontSize: fsName, letterSpacing: "-0.015em" }}
              >
                {item.name.toUpperCase()}
              </h3>

              {/* Subtitle */}
              <p className="font-serif italic" style={{ color: colorDesig, fontSize: fsDesig }}>
                {item.designation}
              </p>

              {/* Description — word blur-in */}
              <motion.p
                className="leading-relaxed"
                style={{ color: colorTestimony, fontSize: fsQuote }}
              >
                {item.quote.split(" ").map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ filter: "blur(8px)", opacity: 0, y: 4 }}
                    animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                    transition={{ duration: 0.18, ease: "easeOut", delay: 0.018 * i }}
                    style={{ display: "inline-block" }}
                  >
                    {word}&nbsp;
                  </motion.span>
                ))}
              </motion.p>

              {/* Tech tags */}
              {item.tags && item.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-1">
                  {item.tags.slice(0, 4).map(tag => (
                    <span
                      key={tag}
                      className="font-mono text-[10px] tracking-wider uppercase px-2.5 py-1 rounded border"
                      style={{
                        color: item.color ?? colorDesig,
                        borderColor: `${item.color ?? colorDesig}30`,
                        backgroundColor: `${item.color ?? colorDesig}08`,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Impact */}
              {item.impact && (
                <div className="flex items-center gap-2 mt-0.5">
                  <span
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ backgroundColor: item.color ?? colorDesig }}
                  />
                  <span
                    className="font-mono text-[11px] leading-snug"
                    style={{ color: colorName, opacity: 0.65 }}
                  >
                    {item.impact}
                  </span>
                </div>
              )}

              {/* GitHub */}
              {item.github && (
                <a
                  href={item.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-widest uppercase transition-opacity duration-200 hover:opacity-70 w-fit mt-0.5"
                  style={{ color: item.color ?? colorDesig }}
                >
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.114 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                  </svg>
                  View Code →
                </a>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex gap-4 mt-8">
            <button
              type="button"
              onClick={prev}
              className="w-11 h-11 rounded-full flex items-center justify-center cursor-pointer transition-colors duration-300 border-0 outline-none focus-visible:ring-2"
              style={{ backgroundColor: hoverPrev ? colorArrowHov : colorArrowBg }}
              onMouseEnter={() => setHoverPrev(true)}
              onMouseLeave={() => setHoverPrev(false)}
              aria-label="Previous project"
            >
              <ArrowLeft size={16} color={colorArrowFg} />
            </button>
            <button
              type="button"
              onClick={next}
              className="w-11 h-11 rounded-full flex items-center justify-center cursor-pointer transition-colors duration-300 border-0 outline-none focus-visible:ring-2"
              style={{ backgroundColor: hoverNext ? colorArrowHov : colorArrowBg }}
              onMouseEnter={() => setHoverNext(true)}
              onMouseLeave={() => setHoverNext(false)}
              aria-label="Next project"
            >
              <ArrowRight size={16} color={colorArrowFg} />
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default CircularTestimonials
