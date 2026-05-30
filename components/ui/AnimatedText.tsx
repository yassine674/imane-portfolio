"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { easing } from "@/lib/motion"

interface AnimatedTextProps {
  text: string
  className?: string
  wordClassName?: string
  delay?: number
  stagger?: number
  duration?: number
  once?: boolean
  mode?: "words" | "chars"
}

/**
 * Reveals text word-by-word (or char-by-char) with a clip reveal from below.
 * Wrap each token in its own overflow:hidden clip so the text slides up into view.
 */
export function AnimatedText({
  text,
  className,
  wordClassName,
  delay    = 0,
  stagger  = 0.06,
  duration = 0.8,
  once     = true,
  mode     = "words",
}: AnimatedTextProps) {
  const ref   = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once, margin: "-40px" })

  const tokens = mode === "words" ? text.split(" ") : text.split("")

  return (
    <div ref={ref} className={className} aria-label={text} role="text">
      <span aria-hidden className="inline">
        {tokens.map((token, i) => (
          <span
            key={i}
            className="word-clip"
            style={{ marginRight: mode === "words" && i < tokens.length - 1 ? "0.28em" : 0 }}
          >
            <motion.span
              className={`inline-block ${wordClassName ?? ""}`}
              initial={{ y: "110%", opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : { y: "110%", opacity: 0 }}
              transition={{
                duration,
                ease: easing.expo,
                delay: delay + i * stagger,
              }}
            >
              {token}
            </motion.span>
          </span>
        ))}
      </span>
    </div>
  )
}
