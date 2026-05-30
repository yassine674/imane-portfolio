export const easing = {
  smooth:  [0.25, 0.1, 0.25, 1]     as [number, number, number, number],
  snappy:  [0.4, 0, 0.2, 1]          as [number, number, number, number],
  entrance:[0, 0, 0.2, 1]            as [number, number, number, number],
  expo:    [0.16, 1, 0.3, 1]         as [number, number, number, number],
  cinema:  [0.76, 0, 0.24, 1]        as [number, number, number, number],
  overshoot:[0.34, 1.56, 0.64, 1]   as [number, number, number, number],
  spring:  { type: "spring" as const, stiffness: 100,  damping: 20 },
  springStiff: { type: "spring" as const, stiffness: 200, damping: 25 },
  springBounce: { type: "spring" as const, stiffness: 300, damping: 18 },
}

export const duration = {
  fast:     0.15,
  normal:   0.35,
  slow:     0.6,
  crawl:    1.0,
  dramatic: 1.4,
}

/* ── Reusable animation variants ─────────────────────────────── */

export const variants = {
  fadeUp: {
    hidden:  { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: duration.slow, ease: easing.expo } },
  },
  fadeDown: {
    hidden:  { opacity: 0, y: -30 },
    visible: { opacity: 1, y: 0, transition: { duration: duration.slow, ease: easing.expo } },
  },
  fadeIn: {
    hidden:  { opacity: 0 },
    visible: { opacity: 1, transition: { duration: duration.normal } },
  },
  fadeLeft: {
    hidden:  { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0, transition: { duration: duration.slow, ease: easing.expo } },
  },
  fadeRight: {
    hidden:  { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0, transition: { duration: duration.slow, ease: easing.expo } },
  },
  scale: {
    hidden:  { opacity: 0, scale: 0.85 },
    visible: { opacity: 1, scale: 1, transition: { duration: duration.slow, ease: easing.expo } },
  },
  scaleUp: {
    hidden:  { opacity: 0, scale: 0.92, y: 20 },
    visible: { opacity: 1, scale: 1,    y: 0,  transition: { duration: duration.slow, ease: easing.expo } },
  },

  /* Word/line reveal — use inside overflow:hidden wrapper */
  slideUp: {
    hidden:  { y: "110%", opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: easing.expo } },
  },
  slideDown: {
    hidden:  { y: "-110%" },
    visible: { y: 0, transition: { duration: 0.8, ease: easing.expo } },
  },

  /* Clip-path reveals */
  clipLeft: {
    hidden:  { clipPath: "inset(0 100% 0 0)" },
    visible: { clipPath: "inset(0 0% 0 0)", transition: { duration: 0.9, ease: easing.expo } },
  },
  clipRight: {
    hidden:  { clipPath: "inset(0 0 0 100%)" },
    visible: { clipPath: "inset(0 0 0 0%)", transition: { duration: 0.9, ease: easing.expo } },
  },

  stagger: {
    hidden:  {},
    visible: { transition: { staggerChildren: 0.08,  delayChildren: 0.1 } },
  },
  staggerSlow: {
    hidden:  {},
    visible: { transition: { staggerChildren: 0.15,  delayChildren: 0.2 } },
  },
  staggerFast: {
    hidden:  {},
    visible: { transition: { staggerChildren: 0.045, delayChildren: 0.05 } },
  },
}

export const containerVariants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
}

/* ── Helper: build a transition with delay ───────────────────── */
export function withDelay(delay: number, extra?: object) {
  return { delay, ease: easing.expo, duration: duration.slow, ...extra }
}
