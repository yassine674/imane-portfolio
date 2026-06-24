"use client";
import { useRef, useEffect, type CSSProperties } from "react";

/* Per-character heading entrance — replicated from obsidianassembly.com
   (.-lrg .-splitted .-s-char): each letter starts blurred, skewed,
   scaled-up and dropped below, then settles with a per-char delay.
   Triggered when the element scrolls into view (IntersectionObserver). */
export function SplitReveal({
  text,
  className = "",
  style,
  startIndex = 0,
}: {
  text: string;
  className?: string;
  style?: CSSProperties;
  startIndex?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("is-inview");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.classList.add("is-inview");
            io.disconnect();
          }
        });
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <span ref={ref} className={`split-reveal ${className}`.trim()} aria-label={text} style={style}>
      {text.split("").map((ch, i) =>
        ch === " " ? (
          <span key={i} className="sr-space" aria-hidden="true" />
        ) : (
          <span
            key={i}
            className="sr-char"
            aria-hidden="true"
            style={{ ["--ci" as string]: String(startIndex + i) } as CSSProperties}
          >
            {ch}
          </span>
        )
      )}
    </span>
  );
}
