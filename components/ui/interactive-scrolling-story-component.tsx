"use client";
import React, { useState, useEffect, useRef } from "react";
import { asset } from "@/lib/asset";

const SLIDES = [
  {
    id: "multimodal-rag",
    index: "01",
    title: "Agentic Multi-Modal RAG",
    description:
      "Multi-modal RAG system for scientific paper analysis using structured PDF extraction, dense vector retrieval, and agentic reasoning chains via LlamaIndex. End-to-end FastAPI + Streamlit deployment.",
    tags: ["LlamaIndex", "FastAPI", "RAG", "Python"],
    year: "2026",
    github: "https://github.com/imanemn127",
    image: "/project/01-rag.jpg",
  },
  {
    id: "carepath-ai",
    index: "02",
    title: "CarePath AI",
    description:
      "10K+ synthetic Indian healthcare records generated with an LLM validation pipeline. Geocoding system reaching 98% resolution rate. Winner — Hack-Nation Global AI Hackathon.",
    tags: ["LLM", "Synthetic Data", "Geocoding", "Streamlit"],
    year: "2026",
    github: "https://github.com/imanemn127",
    image: "/project/02-carepath.jpg",
  },
  {
    id: "predictive-maintenance",
    index: "03",
    title: "Predictive Industrial Maintenance",
    description:
      "REINFORCE-based RL agent for maintenance scheduling combined with a neural fault classifier. Deployed on STM32L4R9 via TensorFlow Lite — full research-to-silicon pipeline.",
    tags: ["Reinforcement Learning", "TFLite", "STM32", "Edge AI"],
    year: "2026",
    github: "https://github.com/imanemn127",
    image: "/project/03-maintenance.jpg",
  },
  {
    id: "ecg-diagnosis",
    index: "04",
    title: "Cardiac Rhythm Diagnosis",
    description:
      "Comparative evaluation of ML classifiers on noisy ECG signals with PCA-based dimensionality reduction and clustering analysis. Benchmarked accuracy across five classifier families.",
    tags: ["Scikit-learn", "PCA", "Signal Processing", "Python"],
    year: "2025",
    github: "https://github.com/imanemn127",
    image: "/project/04-ecg.jpg",
  },
  {
    id: "iot-warehouse",
    index: "05",
    title: "IoT Environmental Monitoring",
    description:
      "STM32-based warehouse system with on-device logistic regression for leak detection and air-quality analysis. Real-time data transmission via LoRaWAN to cloud dashboard.",
    tags: ["STM32", "LoRaWAN", "Embedded ML", "C++"],
    year: "2025",
    github: "https://github.com/imanemn127",
    image: "/project/05-iot.jpg",
  },
];

export function ScrollingFeatureShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const scrolledInto = -rect.top;
      const scrollable = section.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const progress = Math.max(0, Math.min(1, scrolledInto / scrollable));
      const next = Math.min(SLIDES.length - 1, Math.floor(progress * SLIDES.length));
      setActiveIndex(next);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDotClick = (index: number) => {
    const section = sectionRef.current;
    if (!section) return;
    const sectionTop = section.getBoundingClientRect().top + window.scrollY;
    const scrollable = section.offsetHeight - window.innerHeight;
    window.scrollTo({
      top: sectionTop + (index / SLIDES.length) * scrollable,
      behavior: "smooth",
    });
  };

  const current = SLIDES[activeIndex];

  return (
    <div
      ref={sectionRef}
      id="projects"
      className="section-light"
      style={{ height: `${SLIDES.length * 100}vh` }}
    >
      {/* Sticky editorial panel */}
      <div
        className="sticky top-0 h-screen w-full overflow-hidden"
        style={{ background: "var(--bg)" }}
      >
        {/* ── Decorative thin SVG arc (like Obsidian Assembly) ── */}
        <svg
          aria-hidden="true"
          viewBox="0 0 1440 600"
          preserveAspectRatio="none"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
            zIndex: 1,
          }}
        >
          <path
            d="M -40 480 Q 380 -60 1480 260"
            fill="none"
            stroke="var(--border)"
            strokeWidth="0.8"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M 1460 520 Q 900 180 -40 320"
            fill="none"
            stroke="var(--border)"
            strokeWidth="0.5"
            opacity="0.5"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        {/* ── Ghost index number ── */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            right: "-0.05em",
            bottom: "-0.15em",
            fontFamily: "var(--font-serif)",
            fontStyle: "italic",
            fontSize: "clamp(14rem, 28vw, 26rem)",
            lineHeight: 1,
            color: "var(--border)",
            userSelect: "none",
            pointerEvents: "none",
            zIndex: 1,
            transition: "color 0.6s ease",
          }}
        >
          {current.index}
        </div>

        {/* ── Main content grid ── */}
        <div
          className="relative z-10 h-full grid grid-cols-1 md:grid-cols-[1fr_auto]"
          style={{ maxWidth: "1440px", margin: "0 auto", padding: "0 clamp(1.5rem, 5vw, 4rem)" }}
        >
          {/* ── LEFT — text ── */}
          <div
            className="flex flex-col justify-center"
            style={{ paddingRight: "clamp(2rem, 6vw, 6rem)", paddingTop: "5rem", paddingBottom: "5rem" }}
          >
            {/* Top bar */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "2rem",
                marginBottom: "clamp(3rem, 6vh, 5rem)",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.6rem",
                  letterSpacing: "0.3em",
                  color: "var(--accent)",
                  textTransform: "uppercase",
                }}
              >
                03 / Selected Work
              </span>

              <div style={{ display: "flex", gap: "5px", alignItems: "center", marginLeft: "auto" }}>
                {SLIDES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => handleDotClick(i)}
                    aria-label={`Go to project ${i + 1}`}
                    style={{
                      height: "1.5px",
                      width: i === activeIndex ? "2.8rem" : "0.9rem",
                      background: i === activeIndex ? "var(--text)" : "var(--border)",
                      border: "none",
                      borderRadius: "9999px",
                      cursor: "pointer",
                      padding: 0,
                      transition: "width 0.5s var(--f-cubic), background 0.4s ease",
                    }}
                  />
                ))}
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.55rem",
                    letterSpacing: "0.16em",
                    color: "var(--text-3)",
                    marginLeft: "0.5rem",
                  }}
                >
                  {current.index} / {String(SLIDES.length).padStart(2, "0")}
                </span>
              </div>
            </div>

            {/* Sliding title block */}
            <div style={{ position: "relative", height: "clamp(22rem, 52vh, 34rem)", overflow: "hidden" }}>
              {SLIDES.map((slide, i) => (
                <div
                  key={slide.id}
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    opacity: i === activeIndex ? 1 : 0,
                    transform: i === activeIndex ? "translateY(0)" : "translateY(1.5rem)",
                    transition:
                      "opacity 0.7s var(--f-cubic), transform 0.7s var(--f-cubic)",
                    pointerEvents: i === activeIndex ? "auto" : "none",
                  }}
                >
                  {/* Large italic serif title */}
                  <h2
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontStyle: "italic",
                      fontWeight: 400,
                      fontSize: "clamp(3rem, 7.5vw, 7.5rem)",
                      lineHeight: 0.92,
                      letterSpacing: "-0.02em",
                      color: "var(--text)",
                      marginBottom: "clamp(1.5rem, 3vh, 2.5rem)",
                    }}
                  >
                    {slide.title}
                  </h2>

                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "clamp(0.84rem, 1.1vw, 0.94rem)",
                      lineHeight: 1.85,
                      color: "var(--text-2)",
                      maxWidth: "44ch",
                      marginBottom: "1.6rem",
                    }}
                  >
                    {slide.description}
                  </p>

                  {/* Tags */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                    {slide.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.55rem",
                          letterSpacing: "0.1em",
                          padding: "0.22rem 0.65rem",
                          border: "1px solid var(--border)",
                          borderRadius: "2px",
                          color: "var(--text-3)",
                          textTransform: "uppercase",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA — editorial text link */}
            <div style={{ display: "flex", alignItems: "center", gap: "2rem", marginTop: "auto" }}>
              <a
                href={current.github}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.6rem",
                  fontFamily: "var(--font-body)",
                  fontWeight: 600,
                  fontSize: "0.7rem",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--text)",
                  textDecoration: "none",
                  transition: "gap 0.3s ease, color 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.gap = "1rem";
                  el.style.color = "var(--accent)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.gap = "0.6rem";
                  el.style.color = "var(--text)";
                }}
              >
                View on GitHub
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path
                    d="M2 10L10 2M10 2H4M10 2v6"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>

              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.56rem",
                  letterSpacing: "0.12em",
                  color: "var(--text-3)",
                }}
              >
                {current.year}
              </span>
            </div>
          </div>

          {/* ── RIGHT — tall image card ── */}
          <div
            className="hidden md:flex items-center justify-center"
            style={{ width: "clamp(260px, 28vw, 380px)", paddingTop: "3rem", paddingBottom: "3rem" }}
          >
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "100%",
                maxHeight: "82vh",
                borderRadius: "0.75rem",
                overflow: "hidden",
                boxShadow: "0 24px 72px oklch(38% 0.055 48 / 0.14), 0 0 0 1px var(--border)",
              }}
            >
              {/* Image strip */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: `${SLIDES.length * 100}%`,
                  transform: `translateY(-${activeIndex * (100 / SLIDES.length)}%)`,
                  transition: "transform 0.85s var(--f-cubic)",
                }}
              >
                {SLIDES.map((slide) => (
                  <div
                    key={slide.id}
                    style={{ width: "100%", height: `${100 / SLIDES.length}%`, position: "relative" }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={asset(slide.image)}
                      alt={slide.title}
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                      onError={(e) => {
                        const t = e.currentTarget;
                        t.onerror = null;
                        t.src = `https://placehold.co/800x1400/e8dfd4/7a6c60?text=${encodeURIComponent(slide.title)}`;
                      }}
                    />
                    {/* Subtle bottom vignette */}
                    <div
                      aria-hidden="true"
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: "35%",
                        background: "linear-gradient(to top, oklch(14% 0.025 50 / 0.45) 0%, transparent 100%)",
                      }}
                    />
                  </div>
                ))}
              </div>

              {/* Bottom label */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  bottom: "1rem",
                  left: "1rem",
                  right: "1rem",
                  zIndex: 4,
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.54rem",
                  letterSpacing: "0.14em",
                  color: "rgba(255,255,255,0.7)",
                  textTransform: "uppercase",
                  textAlign: "center",
                }}
              >
                {current.index} — {current.year}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
