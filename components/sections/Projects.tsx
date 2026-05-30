"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"
import { projects } from "@/lib/data"

type Project = (typeof projects)[number]

/* ─── SVG Data-Viz Panels ───────────────────────────────────── */

function NeuralPattern({ color }: { color: string }) {
  const nodes: [number, number][] = [
    [18, 50], [36, 24], [36, 76], [60, 12], [60, 44], [60, 78], [82, 30], [82, 70],
  ]
  const edges = [[0,1],[0,2],[1,3],[1,4],[2,4],[2,5],[3,6],[4,6],[4,7],[5,7]]
  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice" aria-hidden>
      {edges.map(([a, b], i) => (
        <line key={i}
          x1={nodes[a][0]} y1={nodes[a][1]}
          x2={nodes[b][0]} y2={nodes[b][1]}
          stroke={color} strokeWidth="0.3" opacity="0.25"
        />
      ))}
      {nodes.map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="3.5" fill={color} opacity="0.06" />
          <circle cx={x} cy={y} r="1.2" fill={color} opacity="0.55" />
        </g>
      ))}
    </svg>
  )
}

function WavePattern({ color }: { color: string }) {
  const wave = (freq: number, amp: number, phase: number) =>
    Array.from({ length: 51 }, (_, i) => {
      const x = i * 2
      const y = 50 + amp * Math.sin(x * freq * 0.13 + phase)
      return `${x},${y.toFixed(2)}`
    }).join(" ")
  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice" aria-hidden>
      <polyline points={wave(1.2, 16, 0)} fill="none" stroke={color} strokeWidth="0.5" opacity="0.2" />
      <polyline points={wave(2.0, 9, Math.PI * 0.6)} fill="none" stroke={color} strokeWidth="0.35" opacity="0.35" />
      <polyline points={wave(0.6, 22, Math.PI)} fill="none" stroke={color} strokeWidth="0.25" opacity="0.1" />
    </svg>
  )
}

function CircuitPattern({ color }: { color: string }) {
  const tracePts: [number, number][] = [[20,25],[40,25],[40,50],[60,50],[60,75],[80,75]]
  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice" aria-hidden>
      {[20, 40, 60, 80].map(x => (
        <line key={`v${x}`} x1={x} y1="5" x2={x} y2="95" stroke={color} strokeWidth="0.14" opacity="0.12" />
      ))}
      {[25, 50, 75].map(y => (
        <line key={`h${y}`} x1="5" y1={y} x2="95" y2={y} stroke={color} strokeWidth="0.14" opacity="0.12" />
      ))}
      <polyline
        points={tracePts.map(([x,y]) => `${x},${y}`).join(" ")}
        fill="none" stroke={color} strokeWidth="0.7" opacity="0.42"
      />
      {tracePts.map(([x, y], i) => (
        <rect key={i} x={x - 2.5} y={y - 2.5} width="5" height="5"
          fill={color} opacity="0.35" rx="0.8"
          transform={`rotate(45, ${x}, ${y})`}
        />
      ))}
    </svg>
  )
}

function DataPattern({ color }: { color: string }) {
  const vals = [28, 42, 36, 58, 50, 70, 63, 80, 72, 90]
  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice" aria-hidden>
      {vals.map((h, i) => (
        <rect key={i} x={5 + i * 9.5} y={100 - h} width="6" height={h}
          fill={color} opacity={0.04 + (h / 100) * 0.18} rx="0.5"
        />
      ))}
      <polyline
        points={vals.map((h, i) => `${8 + i * 9.5},${100 - h}`).join(" ")}
        fill="none" stroke={color} strokeWidth="0.6" opacity="0.45"
      />
      {vals.map((h, i) => (
        <circle key={i} cx={8 + i * 9.5} cy={100 - h} r="1.1" fill={color} opacity="0.5" />
      ))}
    </svg>
  )
}

function PulsePattern({ color }: { color: string }) {
  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid meet" aria-hidden>
      <path
        d="M0,50 L10,50 L14,50 L18,42 L21,58 L24,34 L27,66 L30,50 L40,50 L46,50 L50,50 L54,44 L57,56 L60,37 L63,63 L66,50 L76,50 L80,50 L84,46 L87,54 L90,43 L93,57 L96,50 L100,50"
        fill="none" stroke={color} strokeWidth="0.9" opacity="0.5" strokeLinecap="round"
      />
      <path
        d="M0,62 L14,62 L18,56 L21,68 L24,48 L27,76 L30,62 L100,62"
        fill="none" stroke={color} strokeWidth="0.35" opacity="0.12" strokeLinecap="round"
      />
    </svg>
  )
}

function TrackPattern({ color }: { color: string }) {
  const dotProps: Array<{ x: number; y: number; r: number; op: number }> = []
  for (let i = 0; i <= 13; i++) {
    const t = i / 13
    const x = 8 + t * 84
    const y = 76 - Math.sin(t * Math.PI) * 46
    dotProps.push({ x, y, r: 0.5 + t * 1.4, op: 0.1 + t * 0.55 })
  }
  const pts = dotProps.map(d => `${d.x.toFixed(1)},${d.y.toFixed(1)}`).join(" ")
  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice" aria-hidden>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="0.4"
        strokeDasharray="2,3" opacity="0.35" />
      {dotProps.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r={d.r} fill={color} opacity={d.op} />
      ))}
    </svg>
  )
}

function ProjectPattern({ visual, color }: { visual: string; color: string }) {
  switch (visual) {
    case "neural":  return <NeuralPattern color={color} />
    case "wave":    return <WavePattern color={color} />
    case "circuit": return <CircuitPattern color={color} />
    case "data":    return <DataPattern color={color} />
    case "pulse":   return <PulsePattern color={color} />
    case "track":   return <TrackPattern color={color} />
    default:        return null
  }
}

/* ─── Visual panel ───────────────────────────────────────────── */
function ProjectVisual({ proj, index, hovered }: { proj: Project; index: number; hovered: boolean }) {
  const num = String(index + 1).padStart(2, "0")
  return (
    <div className="proj-visual hidden lg:block rounded-2xl overflow-hidden relative" style={{ minHeight: "300px" }}>
      <motion.div
        className="absolute inset-0"
        animate={{ scale: hovered ? 1.04 : 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Gradient base */}
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 90% 80% at 50% 50%, ${proj.color}16 0%, transparent 70%), #020210`,
          }}
        />
        {/* Pattern */}
        <ProjectPattern visual={proj.visual} color={proj.color} />
        {/* Noise grain */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />
        {/* Ghost number */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none select-none">
          <span
            className="font-impact leading-none"
            style={{ fontSize: "clamp(7rem, 18vw, 15rem)", color: `${proj.color}05`, letterSpacing: "-0.04em" }}
            aria-hidden
          >
            {num}
          </span>
        </div>
        {/* Top accent line */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: `linear-gradient(90deg, transparent, ${proj.color}55, transparent)` }}
        />
        {/* Border */}
        <div
          className="absolute inset-0 rounded-2xl transition-shadow duration-400"
          style={{ boxShadow: hovered ? `inset 0 0 0 1px ${proj.color}30` : `inset 0 0 0 1px ${proj.color}12` }}
        />
        {/* Corner pulse */}
        <div
          className="absolute top-5 right-5 w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: proj.color, boxShadow: `0 0 10px ${proj.color}` }}
        />
      </motion.div>
    </div>
  )
}

/* ─── Project row ────────────────────────────────────────────── */
function ProjectRow({ proj, index, isLast }: { proj: Project; index: number; isLast: boolean }) {
  const [hovered, setHovered] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const num = String(index + 1).padStart(2, "0")

  return (
    <>
      <motion.article
        className="proj-row"
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        data-cursor="VIEW"
      >
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-0 py-14 lg:py-16 relative items-start">

          {/* ── Content ──────────────────── */}
          <div className="relative pr-0 lg:pr-16">
            {/* Ghost number */}
            <span
              className="absolute -top-6 -left-3 font-impact leading-none select-none pointer-events-none"
              style={{
                fontSize: "clamp(5rem, 13vw, 10rem)",
                color: `${proj.color}07`,
                letterSpacing: "-0.04em",
              }}
              aria-hidden
            >
              {num}
            </span>

            {/* Tags + period */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-1 mb-5">
              {proj.tags.slice(0, 3).map(tag => (
                <span key={tag} className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#3D3F52]">
                  {tag}
                </span>
              ))}
              <span className="font-mono text-[10px] text-[#1D1F2E]" aria-hidden>·</span>
              <span className="font-mono text-[10px] tracking-wider text-[#3D3F52]">{proj.period}</span>
            </div>

            {/* Title */}
            <h3
              className="font-impact leading-[0.9] mb-2 transition-colors duration-500"
              style={{
                fontSize: "clamp(2.4rem, 4.5vw, 4rem)",
                color: hovered ? proj.color : "#EDE8DC",
                letterSpacing: "-0.015em",
              }}
            >
              {proj.title.toUpperCase()}
            </h3>

            {/* Subtitle */}
            <p className="font-serif italic text-xl text-[#8B8FA8] mb-4 leading-snug">{proj.subtitle}</p>

            {/* Description */}
            <p className="text-sm text-[#8B8FA8] leading-relaxed max-w-lg mb-6">{proj.description}</p>

            {/* Impact metric */}
            <div
              className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-lg border mb-7"
              style={{ borderColor: `${proj.color}25`, backgroundColor: `${proj.color}07` }}
            >
              <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: proj.color }} />
              <span className="text-[13px] text-[#EDE8DC] font-medium leading-snug">{proj.impact}</span>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-6">
              {proj.github && (
                <a
                  href={proj.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 font-mono text-[11px] tracking-widest uppercase transition-colors duration-200"
                  style={{ color: proj.color }}
                  aria-label={`View ${proj.title} on GitHub`}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.114 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                  </svg>
                  View Code
                  <svg width="8" height="8" viewBox="0 0 10 10" fill="none" aria-hidden>
                    <path d="M1.5 8.5L8.5 1.5M6 1.5h2.5v2.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                  </svg>
                </a>
              )}

              <button
                type="button"
                className="flex items-center gap-2 font-mono text-[11px] tracking-widest uppercase text-[#3D3F52] hover:text-[#8B8FA8] transition-colors duration-200"
                onClick={() => setExpanded(v => !v)}
                aria-expanded={expanded ? "true" : "false"}
              >
                <span>Stack</span>
                <motion.span
                  animate={{ rotate: expanded ? 45 : 0 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  style={{ display: "inline-block" }}
                >
                  +
                </motion.span>
              </button>
            </div>

            {/* Expandable full tag list */}
            <AnimatePresence>
              {expanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  style={{ overflow: "hidden" }}
                >
                  <div
                    className="mt-4 pt-4 border-t flex flex-wrap gap-2"
                    style={{ borderColor: `${proj.color}12` }}
                  >
                    {proj.tags.map(tag => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded font-mono text-[11px] border"
                        style={{
                          borderColor: `${proj.color}22`,
                          color: proj.color,
                          backgroundColor: `${proj.color}06`,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ── Visual panel ──────────── */}
          <ProjectVisual proj={proj} index={index} hovered={hovered} />
        </div>
      </motion.article>

      {!isLast && <div className="hr-fade" />}
    </>
  )
}

/* ─── Section ────────────────────────────────────────────────── */
export function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView   = useInView(sectionRef, { once: true, margin: "-80px" })

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const ctx = gsap.context(() => {
      gsap.fromTo(".proj-row",
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1,
          stagger: 0.1,
          duration: 1.0,
          ease: "power3.out",
          scrollTrigger: { trigger: ".proj-list", start: "top 82%" },
        },
      )
      gsap.fromTo(".proj-visual",
        { clipPath: "inset(0 100% 0 0)" },
        {
          clipPath: "inset(0 0% 0 0)",
          stagger: 0.1,
          duration: 1.3,
          ease: "power4.out",
          scrollTrigger: { trigger: ".proj-list", start: "top 78%" },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="projects" className="section-padding px-6" aria-label="Projects">
      <div className="max-w-7xl mx-auto">

        {/* Section label */}
        <motion.div
          className="flex items-center gap-4 mb-16"
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="chip">03 — Work</span>
          <div className="section-label-line" />
        </motion.div>

        {/* Heading */}
        <div>
          <div style={{ overflow: "hidden" }}>
            <motion.div
              className="font-serif italic text-[clamp(1.5rem,3vw,2.4rem)] leading-[1.3] text-[#8B8FA8]"
              initial={{ y: "100%", opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: "100%", opacity: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              selected
            </motion.div>
          </div>
          <div style={{ overflow: "hidden" }}>
            <motion.div
              className="font-impact leading-[0.88] text-[#EDE8DC]"
              style={{ fontSize: "clamp(5rem,14vw,13rem)", letterSpacing: "-0.02em" }}
              initial={{ y: "100%" }}
              animate={isInView ? { y: 0 } : { y: "100%" }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.06 }}
            >
              WORK<span style={{ color: "#00FFD1" }}>.</span>
            </motion.div>
          </div>
          <motion.p
            className="text-[#8B8FA8] text-lg max-w-lg mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.18 }}
          >
            Research prototypes, deployed systems, hackathon wins — six projects that matter.
          </motion.p>
        </div>

        {/* Project rows */}
        <div className="proj-list mt-12 lg:mt-16">
          <div className="hr-fade" />
          {projects.map((proj, i) => (
            <ProjectRow key={proj.id} proj={proj} index={i} isLast={i === projects.length - 1} />
          ))}
        </div>
      </div>
    </section>
  )
}
