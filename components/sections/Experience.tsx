"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { experiences, education } from "@/lib/data";
import { Timeline, type TimelineEntry } from "@/components/ui/timeline";

gsap.registerPlugin(ScrollTrigger);

function EntryCard({
  label,
  title,
  period,
  location,
  description,
  tags,
  incoming,
}: {
  label: string;
  title: string;
  period: string;
  location: string;
  description: string;
  tags: string[];
  incoming?: boolean;
}) {
  return (
    <article
      style={{
        paddingLeft: "clamp(1.5rem,3vw,2.5rem)",
        paddingBottom: "clamp(2rem,4vw,3.5rem)",
        position: "relative",
      }}
    >
      {/* Type label */}
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.55rem",
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          color: "var(--accent)",
          marginBottom: "0.6rem",
          display: "flex",
          alignItems: "center",
          gap: "0.4rem",
        }}
      >
        {incoming && (
          <span
            style={{
              background: "var(--accent)",
              color: "var(--bg)",
              borderRadius: "2px",
              padding: "0.1rem 0.35rem",
              fontSize: "0.5rem",
              fontWeight: 700,
              letterSpacing: "0.15em",
            }}
          >
            incoming
          </span>
        )}
        {label}
      </div>

      {/* Title */}
      <h3
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          fontSize: "clamp(1rem,2.2vw,1.45rem)",
          color: "var(--text)",
          letterSpacing: "-0.01em",
          marginBottom: "0.4rem",
          lineHeight: 1.2,
        }}
      >
        {title}
      </h3>

      {/* Period + location */}
      <div
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "0.72rem",
          color: "var(--text-3)",
          letterSpacing: "0.06em",
          marginBottom: "0.9rem",
        }}
      >
        {period} · {location}
      </div>

      {/* Description */}
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "clamp(0.82rem,1.2vw,0.92rem)",
          lineHeight: 1.8,
          color: "var(--text-2)",
          maxWidth: "55ch",
          marginBottom: "1rem",
        }}
      >
        {description}
      </p>

      {/* Tags */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
        {tags.map((tag) => (
          <span
            key={tag}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.64rem",
              letterSpacing: "0.05em",
              padding: "0.2rem 0.55rem",
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
  );
}

/* Build the merged timeline entries grouped by year, oldest first */
function buildCarriereData(): TimelineEntry[] {
  return [
    {
      title: "2022 – 24",
      content: (
        <EntryCard
          label="Education"
          title="Preparatory Classes MPSI / MP · LYMED"
          period="2022 – 2024"
          location="Martil, Morocco"
          description="Two-year intensive preparatory programme in mathematics, physics and computer science (MPSI then MP track). Ranked in top tier for competitive entrance exams to French Grandes Écoles."
          tags={["Mathematics", "Physics", "Python", "Competitive Exam"]}
        />
      ),
    },
    {
      title: "2024",
      content: (
        <EntryCard
          label="Education"
          title="Engineering Degree admitted · Mines Saint-Étienne"
          period="Septembre 2024"
          location="Gardanne, France"
          description="Joined the engineering programme at ISMIN, Mines Saint-Étienne — one of France's top engineering schools (Grande École). Selection based on competitive entrance exams after two years of preparatory classes."
          tags={["Grande École", "Engineering", "Competitive Entrance"]}
        />
      ),
    },
    {
      title: "2025",
      content: (
        <div>
          {/* Mines Saint-Étienne ongoing */}
          <EntryCard
            label="Education"
            title="Engineering Degree · ISMIN, Mines Saint-Étienne"
            period="2024 – 2026"
            location="Gardanne, France"
            description="GPA 3.93 / 4.10. Core curriculum in Probability & Statistics, Signal Processing, Machine Learning and Deep Learning, complemented by applied projects in edge AI and computer vision."
            tags={["Machine Learning", "Signal Processing", "Python", "Deep Learning"]}
          />
          {/* PELLENC */}
          <EntryCard
            label="Experience"
            title="AI Intern · PELLENC"
            period="Jan. – Feb. 2025"
            location="Pertuis, France"
            description="Collection and annotation of a dedicated dataset for olive tree trunk detection. Fine-tuning of the YOLOv8 model and hyperparameter optimization to improve model performance."
            tags={["YOLOv8", "Python", "OpenCV", "Roboflow", "Dataset Annotation"]}
          />
        </div>
      ),
    },
    {
      title: "2026",
      content: (
        <div>
          {/* Inria internship */}
          <EntryCard
            label="Experience"
            title="AI Research Intern · Inria"
            period="Apr. – Aug. 2026"
            location="Montpellier, France"
            description="Development of deep learning models (Transformers, GNN) for the automatic extraction of agricultural parcels from satellite imagery. Exploration of approaches combining temporal information, geometric constraints, and end-to-end vectorization."
            tags={["PyTorch", "Transformers", "GNN", "Satellite Imagery", "Python"]}
          />
          {/* ENS Paris-Saclay */}
          <EntryCard
            label="✦ Education"
            title="Master — Artificial Intelligence · ENS Paris-Saclay"
            period="2026 – présent"
            location="Paris, France"
            description="Master en Intelligence Artificielle à l'ENS Paris-Saclay. Apprentissage statistique, théorie du deep learning et méthodologie de recherche."
            tags={["Machine Learning", "Deep Learning", "Statistics", "Research"]}
          />
        </div>
      ),
    },
  ];
}

export function Experience() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.from(".car-label", {
        scrollTrigger: { trigger: ".car-label", start: "top 88%", once: true },
        opacity: 0, y: 14, duration: 0.6, ease: "power3.out",
      });
      gsap.from(".car-heading .ci", {
        scrollTrigger: { trigger: ".car-heading", start: "top 85%", once: true },
        yPercent: 108, duration: 1, stagger: 0.1, ease: "power4.out",
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const Clip = ({ children }: { children: React.ReactNode }) => (
    <div style={{ overflow: "hidden" }}>
      <span className="ci" style={{ display: "block" }}>{children}</span>
    </div>
  );

  const data = buildCarriereData();

  return (
    <section
      ref={ref}
      id="experience"
      aria-labelledby="car-h"
      style={{
        padding: "clamp(6rem, 14vw, 12rem) clamp(1.5rem, 5vw, 3.5rem)",
        borderTop: "1px solid var(--border)",
      }}
    >
      <div
        className="car-label"
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "0.65rem",
          letterSpacing: "0.2em",
          color: "var(--accent)",
          textTransform: "uppercase",
          marginBottom: "2rem",
        }}
      >
        02 / Carrière
      </div>

      <h2
        id="car-h"
        className="car-heading"
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 800,
          fontSize: "clamp(2.8rem, 8vw, 7.5rem)",
          lineHeight: 0.9,
          letterSpacing: "-0.03em",
          color: "var(--text)",
          marginBottom: "clamp(3rem, 7vw, 6rem)",
        }}
      >
        <Clip>Parcours</Clip>
        <Clip>
          <span
            style={{
              fontFamily: "var(--font-serif)",
              fontWeight: 400,
              color: "var(--accent)",
            }}
          >
            &amp; formations
          </span>
        </Clip>
      </h2>

      <Timeline data={data} />
    </section>
  );
}
