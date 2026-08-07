"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Timeline, type TimelineEntry } from "@/components/ui/timeline";
import { useLang, t } from "@/lib/i18n";

gsap.registerPlugin(ScrollTrigger);

function EntryCard({
  label,
  title,
  period,
  location,
  description,
  tags,
  incoming,
  incomingLabel = "incoming",
}: {
  label: string;
  title: string;
  period: string;
  location: string;
  description: string;
  tags: string[];
  incoming?: boolean;
  incomingLabel?: string;
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
            {incomingLabel}
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

type ExperienceTr = {
  label: string;
  heading1: string;
  heading2: string;
  labelEdu: string;
  labelExp: string;
  incoming: string;
  entries: {
    prep: { title: string; period: string; location: string; description: string };
    mines2024: { title: string; period: string; location: string; description: string };
    minesCurrent: { title: string; period: string; location: string; description: string };
    pellenc: { title: string; period: string; location: string; description: string };
    inria: { title: string; period: string; location: string; description: string };
    ens: { title: string; period: string; location: string; description: string };
  };
};

/* Build the merged timeline entries grouped by year, oldest first */
function buildCarriereData(tr: ExperienceTr): TimelineEntry[] {
  const e = tr.entries;
  return [
    {
      title: "2022 – 24",
      content: (
        <EntryCard
          label={tr.labelEdu}
          title={e.prep.title}
          period={e.prep.period}
          location={e.prep.location}
          description={e.prep.description}
          tags={["Mathematics", "Physics", "Python", "Competitive Exam"]}
        />
      ),
    },
    {
      title: "2024",
      content: (
        <EntryCard
          label={tr.labelEdu}
          title={e.mines2024.title}
          period={e.mines2024.period}
          location={e.mines2024.location}
          description={e.mines2024.description}
          tags={["Grande École", "Engineering", "Competitive Entrance"]}
        />
      ),
    },
    {
      title: "2025",
      content: (
        <div>
          <EntryCard
            label={tr.labelEdu}
            title={e.minesCurrent.title}
            period={e.minesCurrent.period}
            location={e.minesCurrent.location}
            description={e.minesCurrent.description}
            tags={["Machine Learning", "Signal Processing", "Python", "Deep Learning"]}
          />
          <EntryCard
            label={tr.labelExp}
            title={e.pellenc.title}
            period={e.pellenc.period}
            location={e.pellenc.location}
            description={e.pellenc.description}
            tags={["YOLOv8", "Python", "OpenCV", "Roboflow", "Dataset Annotation"]}
          />
        </div>
      ),
    },
    {
      title: "2026",
      content: (
        <div>
          <EntryCard
            label={tr.labelExp}
            title={e.inria.title}
            period={e.inria.period}
            location={e.inria.location}
            description={e.inria.description}
            tags={["PyTorch", "Transformers", "GNN", "Satellite Imagery", "Python"]}
          />
          <EntryCard
            label={`✦ ${tr.labelEdu}`}
            title={e.ens.title}
            period={e.ens.period}
            location={e.ens.location}
            description={e.ens.description}
            tags={["Machine Learning", "Deep Learning", "Statistics", "Research"]}
            incoming
            incomingLabel={tr.incoming}
          />
        </div>
      ),
    },
  ];
}

export function Experience() {
  const { lang } = useLang();
  const tr = t[lang].experience;
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

  const data = buildCarriereData(tr);

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
        {tr.label}
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
        <Clip>{tr.heading1}</Clip>
        <Clip>
          <span
            style={{
              fontFamily: "var(--font-serif)",
              fontWeight: 400,
              color: "var(--accent)",
            }}
          >
            {tr.heading2}
          </span>
        </Clip>
      </h2>

      <Timeline data={data} />
    </section>
  );
}
