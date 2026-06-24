"use client";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/lib/data";
import { SplitReveal } from "@/components/layout/SplitReveal";

gsap.registerPlugin(ScrollTrigger);

type Project = (typeof projects)[number];

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.from(".proj-h-pre", {
        scrollTrigger: { trigger: ".proj-h-pre", start: "top 90%", once: true },
        opacity: 0, y: 16, duration: 0.7, ease: "power3.out",
      });
      /* heading now uses SplitReveal (per-char obsidian entrance) */

      projects.forEach((_, i) => {
        const even = i % 2 === 0;
        gsap.from(`.proj-img-${i}`, {
          scrollTrigger: { trigger: `.proj-row-${i}`, start: "top 78%", once: true },
          x: even ? -70 : 70,
          opacity: 0,
          duration: 1.3,
          ease: "power3.out",
        });
        gsap.from(`.proj-txt-${i}`, {
          scrollTrigger: { trigger: `.proj-row-${i}`, start: "top 78%", once: true },
          x: even ? 70 : -70,
          opacity: 0,
          duration: 1.3,
          delay: 0.18,
          ease: "power3.out",
        });
        gsap.from(`.proj-tag-${i}`, {
          scrollTrigger: { trigger: `.proj-row-${i}`, start: "top 68%", once: true },
          opacity: 0,
          y: 8,
          duration: 0.6,
          stagger: 0.05,
          delay: 0.4,
          ease: "power3.out",
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="projects" aria-labelledby="proj-h" data-progress>
      {/* ── Header ── */}
      <div
        style={{
          padding: "clamp(6rem, 14vw, 11rem) clamp(1.5rem, 5vw, 3.5rem) clamp(3rem, 6vw, 5rem)",
          borderTop: "1px solid var(--border)",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "1.5rem",
        }}
      >
        <div>
          <div
            className="proj-h-pre"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.65rem",
              letterSpacing: "0.22em",
              color: "var(--accent)",
              textTransform: "uppercase",
              marginBottom: "1.5rem",
            }}
          >
            03 / Selected Work
          </div>
          <h2
            id="proj-h"
            className="proj-h-title"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "clamp(3rem, 8vw, 8rem)",
              lineHeight: 0.88,
              letterSpacing: "-0.03em",
            }}
          >
            <div><SplitReveal text="Selected" style={{ color: "var(--text)" }} /></div>
            <div>
              <SplitReveal
                text="work"
                style={{ fontFamily: "var(--font-serif)", fontWeight: 400, fontStyle: "italic", color: "var(--accent)" }}
              />
            </div>
          </h2>
        </div>
        <span
          aria-hidden="true"
          data-parallax="up"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            fontSize: "clamp(5rem, 12vw, 10rem)",
            color: "var(--border)",
            lineHeight: 1,
            letterSpacing: "-0.05em",
          }}
        >
          0{projects.length}
        </span>
      </div>

      {/* ── Project rows ── */}
      {projects.map((project, i) => (
        <ProjectRow key={project.id} project={project} index={i} />
      ))}

      {/* ── GitHub footer ── */}
      <div
        style={{
          padding: "clamp(4rem, 8vw, 7rem) clamp(1.5rem, 5vw, 3.5rem)",
          borderTop: "1px solid var(--border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "2rem",
        }}
      >
        <div>
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "clamp(1.4rem, 3vw, 2.5rem)",
              letterSpacing: "-0.02em",
              color: "var(--text)",
              marginBottom: "0.5rem",
            }}
          >
            More on{" "}
            <span style={{ color: "var(--accent)" }}>GitHub</span>
          </p>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.85rem",
              color: "var(--text-3)",
              lineHeight: 1.6,
            }}
          >
            Additional experiments and research code on my profile.
          </p>
        </div>
        <a
          href="https://github.com/imanemn127"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.6rem",
            padding: "0.9rem 2rem",
            border: "1px solid var(--accent)",
            borderRadius: "4px",
            fontFamily: "var(--font-body)",
            fontSize: "0.72rem",
            letterSpacing: "0.12em",
            color: "var(--accent)",
            textDecoration: "none",
            textTransform: "uppercase",
            transition: "background 0.25s, transform 0.2s",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background =
              "color-mix(in oklch, var(--accent) 12%, transparent)";
            (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
            (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
          }}
        >
          github.com/imanemn127
          <svg width="13" height="13" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path
              d="M2 10L10 2M10 2H4M10 2v6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>
    </section>
  );
}

function ProjectRow({ project, index }: { project: Project; index: number }) {
  const [imgHovered, setImgHovered] = useState(false);
  const even = index % 2 === 0;

  return (
    <div
      className={`proj-row-${index}`}
      style={{
        display: "grid",
        gridTemplateColumns: even ? "55fr 45fr" : "45fr 55fr",
        minHeight: "clamp(440px, 65vh, 620px)",
        borderTop: "1px solid var(--border)",
        overflow: "hidden",
      }}
    >
      {/* Image side */}
      <div
        className={`proj-img-${index}`}
        style={{ order: even ? 0 : 1, position: "relative", overflow: "hidden" }}
        onMouseEnter={() => setImgHovered(true)}
        onMouseLeave={() => setImgHovered(false)}
      >
        <Image
          src={project.imageUrl!}
          alt={`${project.title} — ${project.description.slice(0, 60)}`}
          fill
          sizes="(max-width: 768px) 100vw, 55vw"
          className="img-fade"
          style={{
            objectFit: "cover",
            transition: "transform 1.5s var(--f-smooth)",
            transform: imgHovered ? "scale(1.05)" : "scale(1)",
          }}
        />
        {/* Dark overlay gradient */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background: even
              ? "linear-gradient(to right, transparent 60%, var(--bg) 100%)"
              : "linear-gradient(to left, transparent 60%, var(--bg) 100%)",
            zIndex: 1,
          }}
        />
        {/* Bottom fade */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "30%",
            background: "linear-gradient(to top, var(--bg) 0%, transparent 100%)",
            zIndex: 1,
          }}
        />
        {/* Year badge */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "1.5rem",
            left: even ? "auto" : "1.5rem",
            right: even ? "1.5rem" : "auto",
            fontFamily: "var(--font-body)",
            fontSize: "0.6rem",
            letterSpacing: "0.2em",
            color: "var(--text-2)",
            textTransform: "uppercase",
            background: "oklch(8% 0.018 260 / 0.7)",
            backdropFilter: "blur(8px)",
            padding: "0.3rem 0.8rem",
            borderRadius: "2px",
            border: "1px solid var(--border)",
            zIndex: 2,
          }}
        >
          {project.year}
        </div>
      </div>

      {/* Text side */}
      <div
        className={`proj-txt-${index}`}
        style={{
          order: even ? 1 : 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "clamp(2.5rem, 5vw, 5rem) clamp(2rem, 4vw, 4rem)",
          position: "relative",
        }}
      >
        {/* Ghost number */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "clamp(1rem, 3vh, 2.5rem)",
            right: even ? "clamp(1.5rem, 3vw, 2.5rem)" : "auto",
            left: even ? "auto" : "clamp(1.5rem, 3vw, 2.5rem)",
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            fontSize: "clamp(5rem, 10vw, 9rem)",
            lineHeight: 1,
            letterSpacing: "-0.05em",
            color: "var(--surface-2)",
            userSelect: "none",
            pointerEvents: "none",
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </div>

        {/* Title */}
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            fontSize: "clamp(1.8rem, 4vw, 3.5rem)",
            letterSpacing: "-0.02em",
            lineHeight: 0.95,
            color: "var(--text)",
            marginBottom: "clamp(1rem, 2.5vw, 1.75rem)",
            position: "relative",
            zIndex: 1,
          }}
        >
          {project.title}
        </h3>

        {/* Description */}
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "clamp(0.82rem, 1.2vw, 0.93rem)",
            lineHeight: 1.82,
            color: "var(--text-2)",
            maxWidth: "38ch",
            marginBottom: "clamp(1.5rem, 3vw, 2.5rem)",
            position: "relative",
            zIndex: 1,
          }}
        >
          {project.description}
        </p>

        {/* Tags */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.35rem",
            marginBottom: "clamp(2rem, 4vw, 3rem)",
            position: "relative",
            zIndex: 1,
          }}
        >
          {project.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className={`proj-tag-${index}`}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.58rem",
                letterSpacing: "0.08em",
                padding: "0.25rem 0.7rem",
                border: "1px solid var(--border)",
                borderRadius: "2px",
                color: "var(--text-3)",
                background: "var(--surface)",
                textTransform: "uppercase",
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTA */}
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View ${project.title} on GitHub`}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            fontFamily: "var(--font-body)",
            fontSize: "0.72rem",
            letterSpacing: "0.12em",
            color: "var(--accent)",
            textDecoration: "none",
            textTransform: "uppercase",
            transition: "gap 0.25s ease",
            cursor: "pointer",
            position: "relative",
            zIndex: 1,
            width: "fit-content",
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.gap = "0.9rem")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.gap = "0.5rem")}
        >
          View project
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path
              d="M3 7h8M7 3l4 4-4 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>

        {/* Thin accent border on inside edge */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "15%",
            bottom: "15%",
            [even ? "left" : "right"]: 0,
            width: "1px",
            background:
              "linear-gradient(to bottom, transparent, var(--border) 30%, var(--border) 70%, transparent)",
          }}
        />
      </div>

      <style>{`
        @media (max-width: 720px) {
          .proj-row-${index} {
            grid-template-columns: 1fr !important;
          }
          .proj-img-${index} {
            order: 0 !important;
            height: 260px;
          }
          .proj-txt-${index} {
            order: 1 !important;
          }
        }
      `}</style>
    </div>
  );
}
