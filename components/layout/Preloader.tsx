"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { gsap } from "gsap";

/* Floating data fragments visible during loading */
const DATA_CHIPS = [
  "∇ loss = 0.0023",
  "epoch 847/1000",
  "mAP 91.4%",
  "latency < 10ms",
  "CUDA:0",
  "torch.no_grad()",
  "self_attention(Q,K,V)",
  "Conv2d(3,64)",
  "sigmoid(Wx+b)",
  "∂L/∂w",
  "batch_size=32",
  "lr=3e-4",
];

interface ChipProps {
  text: string;
  x: string;
  y: string;
  delay: number;
  duration: number;
}

function DataChip({ text, x, y, delay, duration }: ChipProps) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        left: x,
        top: y,
        fontFamily: "var(--font-body)",
        fontSize: "0.6rem",
        letterSpacing: "0.06em",
        color: "var(--text-3)",
        whiteSpace: "nowrap",
        animation: `float-up ${duration}s ease-in-out ${delay}s infinite`,
        pointerEvents: "none",
        userSelect: "none",
      }}
    >
      {text}
    </div>
  );
}

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"in" | "exit" | "done">("in");
  const counterRef = useRef<HTMLSpanElement>(null);
  const lineRef    = useRef<HTMLDivElement>(null);
  const wordRefs   = useRef<(HTMLSpanElement | null)[]>([]);
  const roleRef    = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      setPhase("exit");
      setTimeout(() => { setPhase("done"); onComplete(); }, 400);
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        setPhase("exit");
        setTimeout(() => { setPhase("done"); onComplete(); }, 720);
      },
    });

    /* 1. Progress line + counter — snappier */
    tl.to(lineRef.current, {
      scaleX: 1,
      duration: 1.0,
      ease: "power3.inOut",
      transformOrigin: "left",
    })
      .to(
        counterRef.current,
        {
          innerHTML: 100,
          duration: 1.0,
          ease: "power2.inOut",
          snap: { innerHTML: 1 },
          roundProps: "innerHTML",
        },
        "<"
      )
      /* 2. Name reveal */
      .from(
        wordRefs.current.filter(Boolean),
        {
          yPercent: 110,
          duration: 0.7,
          stagger: 0.1,
          ease: "power4.out",
        },
        "-=0.45"
      )
      /* 3. Role tag */
      .from(
        roleRef.current,
        { opacity: 0, y: 8, duration: 0.4, ease: "power3.out" },
        "-=0.25"
      );

    return () => { tl.kill(); };
  }, [onComplete]);

  const words = ["IMANE", "MOUMOUN"];

  /* Randomised chip positions (stable — not random on each render) */
  const chips: ChipProps[] = DATA_CHIPS.map((text, i) => ({
    text,
    x: `${6 + (i * 37) % 80}%`,
    y: `${10 + (i * 19) % 72}%`,
    delay: i * 0.7,
    duration: 6 + (i % 3) * 2,
  }));

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <>
          {/* ── Top panel ── */}
          <motion.div
            key="panel-top"
            initial={{ y: "0%" }}
            animate={phase === "exit" ? { y: "-102%" } : { y: "0%" }}
            transition={{ duration: 0.68, ease: [0.76, 0, 0.24, 1], delay: 0 }}
            style={{
              position: "fixed",
              top: 0, left: 0, right: 0,
              height: "52vh",
              zIndex: 9999,
              background: "var(--bg)",
              overflow: "hidden",
            }}
          >
            {/* Floating data chips — top half */}
            {chips.slice(0, 6).map((c) => (
              <DataChip key={c.text} {...c} />
            ))}

            {/* Top-left meta */}
            <div style={{
              position: "absolute",
              top: "clamp(1.5rem, 4vw, 3rem)",
              left: "clamp(2rem, 5vw, 4rem)",
              display: "flex", gap: "3rem",
            }}>
              <span style={{
                fontFamily: "var(--font-body)", fontSize: "0.62rem",
                letterSpacing: "0.18em", color: "var(--text-3)", textTransform: "uppercase",
              }}>
                43.5297°N 5.7003°E
              </span>
              <span style={{
                fontFamily: "var(--font-body)", fontSize: "0.62rem",
                letterSpacing: "0.18em", color: "var(--text-3)", textTransform: "uppercase",
              }}>
                2025
              </span>
            </div>

            {/* Thin accent line across the seam */}
            <div style={{
              position: "absolute",
              bottom: 0, left: 0, right: 0,
              height: "1px",
              background: "var(--border)",
            }} />
          </motion.div>

          {/* ── Bottom panel ── */}
          <motion.div
            key="panel-bottom"
            initial={{ y: "0%" }}
            animate={phase === "exit" ? { y: "102%" } : { y: "0%" }}
            transition={{ duration: 0.68, ease: [0.76, 0, 0.24, 1], delay: 0.05 }}
            style={{
              position: "fixed",
              bottom: 0, left: 0, right: 0,
              height: "52vh",
              zIndex: 9999,
              background: "var(--bg)",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "flex-end",
              padding: "clamp(2rem, 5vw, 4rem)",
            }}
          >
            {/* Floating data chips — bottom half */}
            {chips.slice(6).map((c) => (
              <DataChip key={c.text} {...c} />
            ))}

            {/* Name */}
            <div style={{ marginBottom: "2.5rem", position: "relative", zIndex: 1 }}>
              {words.map((word, i) => (
                <div key={word} style={{ overflow: "hidden", lineHeight: 0.88 }}>
                  <span
                    ref={(el) => { wordRefs.current[i] = el; }}
                    style={{
                      display: "block",
                      fontFamily: "var(--font-display)",
                      fontWeight: 800,
                      fontSize: "clamp(3.5rem, 9vw, 8rem)",
                      letterSpacing: "-0.025em",
                      color: i === 0 ? "var(--text)" : "var(--accent)",
                      transform: "translateY(110%)",
                    }}
                  >
                    {word}
                  </span>
                </div>
              ))}
            </div>

            {/* Progress bar */}
            <div style={{ width: "100%", maxWidth: "420px", position: "relative", zIndex: 1 }}>
              <div style={{
                display: "flex", justifyContent: "space-between", marginBottom: "0.7rem",
              }}>
                <span style={{
                  fontFamily: "var(--font-body)", fontSize: "0.62rem",
                  letterSpacing: "0.16em", color: "var(--text-3)", textTransform: "uppercase",
                }}>
                  Initialising
                </span>
                <span style={{
                  fontFamily: "var(--font-body)", fontSize: "0.62rem",
                  letterSpacing: "0.1em", color: "var(--text-3)",
                }}>
                  <span ref={counterRef}>0</span>
                  <span>%</span>
                </span>
              </div>
              <div style={{
                height: "1px", background: "var(--border)", overflow: "hidden",
              }}>
                <div
                  ref={lineRef}
                  style={{
                    height: "100%",
                    background: "linear-gradient(90deg, var(--accent), var(--accent-2))",
                    transform: "scaleX(0)",
                    transformOrigin: "left",
                  }}
                />
              </div>
            </div>

            {/* Role bottom-right */}
            <div style={{
              position: "absolute",
              bottom: "clamp(1.5rem, 4vw, 3rem)",
              right: "clamp(2rem, 5vw, 4rem)",
            }}>
              <span
                ref={roleRef}
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "0.78rem",
                  fontStyle: "italic",
                  letterSpacing: "0.04em",
                  color: "var(--text-3)",
                }}
              >
                AI & Machine Learning Engineer
              </span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
