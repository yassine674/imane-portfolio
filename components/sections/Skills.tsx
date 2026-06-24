"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { allSkills, skillCategories } from "@/lib/data";
import { MovingGradient } from "@/components/layout/MovingGradient";
import { SplitReveal } from "@/components/layout/SplitReveal";

gsap.registerPlugin(ScrollTrigger);

const PAPER_BLOBS = [
  { size: "40vw", top: "-8%", left: "-6%", color: "oklch(80% 0.13 55 / 0.20)", anim: "mesh-2 23s ease-in-out infinite", blur: "85px" },
  { size: "32vw", bottom: "-10%", right: "-4%", color: "oklch(72% 0.12 300 / 0.13)", anim: "mesh-3 27s ease-in-out infinite", blur: "90px" },
];

export function Skills() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.from(".sk-label", { scrollTrigger: { trigger: ".sk-label", start: "top 88%", once: true }, opacity: 0, y: 14, duration: 0.6, ease: "power3.out" });
      /* heading now uses SplitReveal (per-char obsidian entrance) */
      gsap.from(".sk-word", {
        scrollTrigger: { trigger: ".sk-cloud", start: "top 80%", once: true },
        opacity: 0, y: 24, duration: 0.5,
        stagger: { amount: 0.8, from: "random" },
        ease: "power3.out",
      });
      gsap.from(".sk-cat", {
        scrollTrigger: { trigger: ".sk-cats", start: "top 78%", once: true },
        opacity: 0, y: 20, duration: 0.6, stagger: 0.12, ease: "power3.out",
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      id="skills"
      aria-labelledby="sk-h"
      className="section-light"
      style={{
        padding: "clamp(5rem, 11vw, 9rem) clamp(1.5rem, 5vw, 3.5rem) clamp(6rem, 14vw, 12rem)",
        overflow: "hidden",
      }}
    >
      <MovingGradient blobs={PAPER_BLOBS} hueSpin={false} />

      <div style={{ position: "relative", zIndex: 1 }}>
      <div className="sk-label" style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", letterSpacing: "0.12em", color: "var(--accent)", textTransform: "lowercase", marginBottom: "2.5rem", display: "flex", alignItems: "center", gap: "0.6rem" }}>
        <span aria-hidden="true" style={{ width: "1.8rem", height: "1px", background: "var(--accent)", display: "inline-block" }} />
        04 — skills
      </div>

      <h2
        id="sk-h"
        className="sk-heading"
        style={{
          fontFamily: "var(--font-serif)", fontWeight: 400,
          fontSize: "clamp(3rem, 9vw, 8.5rem)",
          lineHeight: 0.94, letterSpacing: "-0.01em",
          color: "var(--text)",
          marginBottom: "clamp(4rem, 8vw, 7rem)",
        }}
      >
        <div><SplitReveal text="Tools I" /></div>
        <div><SplitReveal text="master" style={{ fontStyle: "italic", fontWeight: 500, color: "var(--accent)" }} /></div>
      </h2>

      {/* Typographic word flow */}
      <div
        className="sk-cloud"
        role="list"
        aria-label="All skills"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.5rem 0.75rem",
          marginBottom: "clamp(4rem, 8vw, 7rem)",
          maxWidth: "900px",
        }}
      >
        {allSkills.map((skill, i) => {
          const sizes = ["0.72rem", "0.85rem", "1rem", "1.15rem", "0.78rem"];
          const weights: Array<100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900> = [400, 500, 600, 700, 800];
          const sz = sizes[i % sizes.length];
          const wt = weights[i % weights.length];
          const isAccent = i % 7 === 0;

          return (
            <span
              key={skill}
              role="listitem"
              className="sk-word"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: wt,
                fontSize: sz,
                letterSpacing: "-0.01em",
                color: isAccent ? "var(--accent)" : "var(--text-2)",
                cursor: "default",
                transition: "color 0.2s",
                lineHeight: 2,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = isAccent ? "var(--accent)" : "var(--text-2)")}
            >
              {skill}
            </span>
          );
        })}
      </div>

      {/* Category breakdown */}
      <div
        className="sk-cats"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "clamp(1rem, 2vw, 1.5rem)",
        }}
        role="list"
        aria-label="Skill categories"
      >
        {skillCategories.map((cat) => (
          <div
            key={cat.name}
            className="sk-cat"
            role="listitem"
            data-spotlight
            style={{
              padding: "1.5rem",
              border: "1px solid var(--border)",
              borderRadius: "6px",
              background: "var(--surface)",
              overflow: "hidden",
              transition: "border-color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
          >
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "0.78rem", color: "var(--accent)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1rem" }}>
              {cat.name}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
              {cat.skills.map((s) => (
                <span
                  key={s}
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.72rem",
                    color: "var(--text-2)",
                    padding: "0.2rem 0.55rem",
                    background: "var(--surface-2)",
                    borderRadius: "3px",
                  }}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      </div>
    </section>
  );
}
