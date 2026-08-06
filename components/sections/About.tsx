"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { personalInfo, languages } from "@/lib/data";
import { MovingGradient } from "@/components/layout/MovingGradient";
import { FloatingPetals } from "@/components/layout/FloatingPetals";
import { SplitReveal } from "@/components/layout/SplitReveal";

gsap.registerPlugin(ScrollTrigger);

/* Warm amber glow blobs on dark background */
const DARK_BLOBS = [
  { size: "52vw", top: "-16%", right: "-10%", color: "oklch(52% 0.11 42 / 0.28)", anim: "mesh-1 21s ease-in-out infinite", blur: "90px" },
  { size: "44vw", top: "-8%",  left: "-12%",  color: "oklch(44% 0.09 55 / 0.22)", anim: "mesh-2 26s ease-in-out infinite", blur: "100px" },
  { size: "38vw", bottom: "-14%", left: "20%", color: "oklch(38% 0.07 30 / 0.18)", anim: "mesh-3 19s ease-in-out infinite", blur: "100px" },
];

export function About() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.from(".ab-label", { scrollTrigger: { trigger: ".ab-label", start: "top 88%", once: true }, opacity: 0, y: 14, duration: 0.6, ease: "power3.out" });
      /* heading now uses SplitReveal (per-char obsidian entrance) */
      gsap.from(".ab-body", { scrollTrigger: { trigger: ".ab-body", start: "top 85%", once: true }, opacity: 0, y: 18, duration: 0.7, ease: "power3.out" });
      gsap.from(".ab-fact", { scrollTrigger: { trigger: ".ab-facts", start: "top 80%", once: true }, opacity: 0, y: 20, duration: 0.6, stagger: 0.1, ease: "power3.out" });
      gsap.from(".ab-lang", { scrollTrigger: { trigger: ".ab-langs", start: "top 85%", once: true }, opacity: 0, y: 10, duration: 0.5, stagger: 0.07, ease: "power3.out" });
    }, ref);
    return () => ctx.revert();
  }, []);

  const facts = [
    { value: "3.93", label: "GPA", sub: `/ ${personalInfo.gpaOf} · ${personalInfo.school}` },
    { value: "2+", label: "Internships", sub: "Inria & PELLENC" },
    { value: "6+", label: "Projects", sub: "Edge AI to LLMs" },
    { value: "4", label: "Languages", sub: "FR · AR · EN · DE" },
  ];

  return (
    <section
      ref={ref}
      id="about"
      aria-labelledby="about-h"
      style={{
        padding: "clamp(5rem, 11vw, 9rem) clamp(1.5rem, 5vw, 3.5rem) clamp(6rem, 14vw, 12rem)",
        overflow: "hidden",
      }}
    >
      <MovingGradient blobs={DARK_BLOBS} hueSpin={false} />

      <div style={{ position: "relative", zIndex: 2 }}>
      {/* Label — mono micro-caption */}
      <div className="ab-label" style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", letterSpacing: "0.12em", color: "var(--accent)", textTransform: "lowercase", marginBottom: "2.5rem", display: "flex", alignItems: "center", gap: "0.6rem" }}>
        <span aria-hidden="true" style={{ width: "1.8rem", height: "1px", background: "var(--accent)", display: "inline-block" }} />
        01 — about
      </div>

      {/* Heading — elegant all-serif, humanist (microsoft.ai) */}
      <h2
        id="about-h"
        className="ab-heading"
        style={{
          fontFamily: "var(--font-serif)", fontWeight: 400,
          fontSize: "clamp(3rem, 9vw, 8.5rem)",
          lineHeight: 0.94, letterSpacing: "-0.01em",
          color: "var(--text)",
          marginBottom: "clamp(3rem, 7vw, 6rem)",
          maxWidth: "16ch",
        }}
      >
        <div><SplitReveal text="Where math" /></div>
        <div>
          <SplitReveal text={"meets "} />
          <SplitReveal text="intuition" style={{ color: "var(--accent)", fontStyle: "italic", fontWeight: 500 }} />
        </div>
      </h2>

      {/* Two-col layout */}
      <div
        className="about-cols"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.2fr",
          gap: "clamp(3rem, 6vw, 6rem)",
          alignItems: "start",
        }}
      >
        {/* Left — bio + facts */}
        <div>
          <p
            className="ab-body"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(0.9rem, 1.4vw, 1.05rem)",
              lineHeight: 1.8,
              color: "var(--text-2)",
              maxWidth: "52ch",
              marginBottom: "clamp(2.5rem, 5vw, 4rem)",
            }}
          >
            {personalInfo.bio}
          </p>

          {/* Facts — editorial list */}
          <ul
            className="ab-facts"
            style={{ listStyle: "none", padding: 0, margin: 0 }}
            aria-label="Key statistics"
          >
            {facts.map((f) => (
              <li
                key={f.label}
                className="ab-fact"
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: "1.25rem",
                  padding: "1.25rem 0",
                  borderBottom: "1px solid var(--border)",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-serif)", fontWeight: 500, fontStyle: "italic",
                    fontSize: "clamp(2.4rem, 5.5vw, 4rem)",
                    color: "var(--accent)",
                    lineHeight: 1,
                    minWidth: "3.5rem",
                  }}
                >
                  {f.value}
                </span>
                <div>
                  <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.9rem", color: "var(--text)", letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: "0.15rem" }}>
                    {f.label}
                  </div>
                  <div style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "var(--text-3)" }}>
                    {f.sub}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Right — languages */}
        <div>
          {/* Languages */}
          <div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", letterSpacing: "0.1em", color: "var(--text-3)", textTransform: "lowercase", marginBottom: "1.25rem" }}>
              languages
            </div>
            <div className="ab-langs" style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
              {languages.map((l) => (
                <div
                  key={l.name}
                  className="ab-lang"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.5rem 1rem",
                    border: "1px solid var(--border)",
                    borderRadius: "3px",
                    background: "var(--surface)",
                  }}
                >
                  <span aria-hidden="true" style={{ fontSize: "0.9rem" }}>{l.flag}</span>
                  <span style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "var(--text-2)" }}>{l.name}</span>
                  <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.68rem", color: "var(--accent)", letterSpacing: "0.08em" }}>{l.level}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
