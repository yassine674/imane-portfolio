"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { experiences } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

export function Experience() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.from(".ex-label", { scrollTrigger: { trigger: ".ex-label", start: "top 88%", once: true }, opacity: 0, y: 14, duration: 0.6, ease: "power3.out" });
      gsap.from(".ex-heading .ci", { scrollTrigger: { trigger: ".ex-heading", start: "top 85%", once: true }, yPercent: 108, duration: 1, stagger: 0.1, ease: "power4.out" });
      gsap.from(".ex-line", { scrollTrigger: { trigger: ".ex-list", start: "top 80%", once: true }, scaleY: 0, duration: 1.2, ease: "power3.inOut", transformOrigin: "top" });
      gsap.from(".ex-item", { scrollTrigger: { trigger: ".ex-list", start: "top 78%", once: true }, opacity: 0, x: 24, duration: 0.7, stagger: 0.18, ease: "power3.out" });
    }, ref);
    return () => ctx.revert();
  }, []);

  const Clip = ({ children }: { children: React.ReactNode }) => (
    <div style={{ overflow: "hidden" }}>
      <span className="ci" style={{ display: "block" }}>{children}</span>
    </div>
  );

  return (
    <section
      ref={ref}
      id="experience"
      aria-labelledby="exp-h"
      style={{
        padding: "clamp(6rem, 14vw, 12rem) clamp(1.5rem, 5vw, 3.5rem)",
        borderTop: "1px solid var(--border)",
      }}
    >
      <div className="ex-label" style={{ fontFamily: "var(--font-body)", fontSize: "0.65rem", letterSpacing: "0.2em", color: "var(--accent)", textTransform: "uppercase", marginBottom: "2rem" }}>
        02 / Experience
      </div>

      <h2
        id="exp-h"
        className="ex-heading"
        style={{
          fontFamily: "var(--font-display)", fontWeight: 800,
          fontSize: "clamp(2.8rem, 8vw, 7.5rem)",
          lineHeight: 0.9, letterSpacing: "-0.03em",
          color: "var(--text)",
          marginBottom: "clamp(3rem, 7vw, 6rem)",
        }}
      >
        <Clip>Where I&apos;ve</Clip>
        <Clip><span style={{ fontFamily: "var(--font-serif)", fontWeight: 400, color: "var(--accent)" }}>shipped</span></Clip>
      </h2>

      {/* Experience list */}
      <div className="ex-list" style={{ position: "relative" }}>
        {/* Timeline line */}
        <div
          className="ex-line"
          aria-hidden="true"
          style={{
            position: "absolute",
            left: 0, top: 0, bottom: 0,
            width: "1px",
            background: "var(--border)",
          }}
        />

        {experiences.map((exp, i) => (
          <article
            key={i}
            className="ex-item"
            aria-label={`${exp.role} at ${exp.company}`}
            style={{
              paddingLeft: "clamp(2rem, 5vw, 4rem)",
              paddingBottom: i < experiences.length - 1 ? "clamp(3rem, 6vw, 5rem)" : 0,
              position: "relative",
            }}
          >
            {/* Timeline dot */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                left: -5, top: "0.6rem",
                width: 9, height: 9,
                borderRadius: "50%",
                background: "var(--accent)",
                border: "2px solid var(--bg)",
              }}
            />

            {/* Company + period row */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "baseline",
                gap: "0.5rem 1.5rem",
                marginBottom: "0.75rem",
              }}
            >
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "0.8rem", color: "var(--accent)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                {exp.company}
              </span>
              <span style={{ fontFamily: "var(--font-body)", fontSize: "0.7rem", color: "var(--text-3)", letterSpacing: "0.08em" }}>
                {exp.period} · {exp.location}
              </span>
            </div>

            {/* Role */}
            <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(1.1rem, 2.5vw, 1.6rem)", color: "var(--text)", letterSpacing: "-0.01em", marginBottom: "1rem" }}>
              {exp.role}
            </h3>

            {/* Description */}
            <p style={{ fontFamily: "var(--font-body)", fontSize: "clamp(0.85rem, 1.3vw, 0.95rem)", lineHeight: 1.75, color: "var(--text-2)", maxWidth: "60ch", marginBottom: "1.25rem" }}>
              {exp.description}
            </p>

            {/* Tags */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
              {exp.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.68rem",
                    letterSpacing: "0.06em",
                    padding: "0.25rem 0.65rem",
                    border: "1px solid var(--border)",
                    borderRadius: "3px",
                    color: "var(--text-3)",
                    background: "var(--surface)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
