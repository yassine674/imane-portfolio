"use client";
import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { personalInfo } from "@/lib/data";
import { MagneticButton } from "@/components/layout/MagneticButton";

/* Scattered editorial micro-labels, obsidian-assembly style */
const TAGS = [
  { text: "imagine possible", x: "13%", y: "16%" },
  { text: "a private practice", x: "76%", y: "22%" },
  { text: "coordinates 43.5°N", x: "82%", y: "63%" },
  { text: "nothing generic", x: "9%", y: "72%" },
];

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const crystalRef = useRef<HTMLDivElement>(null);
  const cardSilkRef = useRef<HTMLDivElement>(null);
  const cardSphereRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  /* Cursor parallax — crystal + cards drift toward pointer */
  useEffect(() => {
    if (!mounted) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onMove = (e: MouseEvent) => {
      const cx = (e.clientX / window.innerWidth - 0.5) * 2;
      const cy = (e.clientY / window.innerHeight - 0.5) * 2;
      if (crystalRef.current) crystalRef.current.style.transform = `translate(${cx * 22}px, ${cy * 18}px)`;
      if (cardSilkRef.current) cardSilkRef.current.style.transform = `translate(${cx * -34}px, ${cy * -26}px)`;
      if (cardSphereRef.current) cardSphereRef.current.style.transform = `translate(${cx * 40}px, ${cy * 30}px)`;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [mounted]);

  /* Entrance — synced to fast preloader */
  useEffect(() => {
    if (!mounted) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 1.7 });
      tl.from(".h-tagrow", { opacity: 0, y: 10, duration: 0.5, ease: "power3.out" })
        .from(".h-name-line", { yPercent: 115, duration: 1.1, stagger: 0.12, ease: "power4.out" }, "-=0.2")
        .from(".h-centerpiece", { opacity: 0, scale: 0.92, duration: 1.3, ease: "power3.out" }, "-=1.0")
        .from(".h-card", { opacity: 0, scale: 0.8, duration: 0.9, stagger: 0.14, ease: "power3.out" }, "-=0.9")
        .from(".h-role", { opacity: 0, y: 16, duration: 0.6, ease: "power3.out" }, "-=0.6")
        .from(".h-bio", { opacity: 0, y: 12, duration: 0.6, ease: "power3.out" }, "-=0.4")
        .from(".h-cta", { opacity: 0, y: 12, duration: 0.5, stagger: 0.1, ease: "power3.out" }, "-=0.3")
        .from(".h-tag", { opacity: 0, duration: 0.5, stagger: 0.08, ease: "power3.out" }, "-=0.3")
        .from(".h-scroll", { opacity: 0, duration: 0.5 }, "-=0.2");
    }, sectionRef);
    return () => ctx.revert();
  }, [mounted]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      aria-label="Hero"
      className="hero-obsidian"
      style={{
        position: "relative",
        minHeight: "100svh",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        padding: "0 clamp(1.5rem, 5vw, 3.5rem) clamp(2.5rem, 6vh, 4rem)",
        /* warm mocha → deep brown, obsidian-assembly gradient */
        background:
          "radial-gradient(120% 90% at 50% 8%, oklch(83% 0.045 62) 0%, oklch(64% 0.06 50) 32%, oklch(34% 0.05 40) 68%, oklch(16% 0.03 35) 100%)",
      }}
    >
      {/* ── Orbital line paths ── */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
          display: "grid", placeItems: "center",
        }}
      >
        <svg
          viewBox="0 0 1000 1000"
          style={{ width: "130vh", height: "130vh", opacity: 0.28, animation: "orbit-spin 90s linear infinite" }}
        >
          <ellipse cx="500" cy="500" rx="470" ry="300" fill="none" stroke="oklch(92% 0.03 70)" strokeWidth="0.7" />
          <ellipse cx="500" cy="500" rx="320" ry="440" fill="none" stroke="oklch(92% 0.03 70)" strokeWidth="0.5" opacity="0.7" />
        </svg>
      </div>

      {/* ── Floating crystal centerpiece ── */}
      {mounted && (
        <div
          className="h-centerpiece"
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "50%", left: "50%",
            width: "min(46vh, 80vw)",
            transform: "translate(-50%, -50%)",
            zIndex: 2,
            pointerEvents: "none",
          }}
        >
          <div ref={crystalRef} style={{ transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1)", willChange: "transform" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/generated/obsidian-hero.png"
              alt=""
              style={{
                width: "100%", height: "auto", display: "block",
                animation: "float-bob 8s ease-in-out infinite",
                /* feather edges so the crystal melts into the mocha gradient */
                WebkitMaskImage: "radial-gradient(58% 64% at 50% 46%, #000 56%, transparent 82%)",
                maskImage: "radial-gradient(58% 64% at 50% 46%, #000 56%, transparent 82%)",
                filter: "drop-shadow(0 40px 60px oklch(15% 0.03 35 / 0.5))",
              }}
            />
          </div>
        </div>
      )}

      {/* ── Floating editorial cards ── */}
      {mounted && (
        <>
          <div
            className="h-card"
            aria-hidden="true"
            style={{ position: "absolute", top: "15%", left: "8%", width: "clamp(110px, 13vw, 200px)", zIndex: 3, pointerEvents: "none" }}
          >
            <div ref={cardSilkRef} style={{ transition: "transform 0.6s cubic-bezier(0.16,1,0.3,1)", willChange: "transform" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/generated/silk-texture.png"
                alt=""
                style={{
                  width: "100%", height: "auto", display: "block",
                  borderRadius: "12px",
                  border: "1px solid oklch(95% 0.02 70 / 0.4)",
                  boxShadow: "0 24px 50px oklch(15% 0.03 35 / 0.4)",
                  animation: "drift-a 11s ease-in-out infinite",
                }}
              />
            </div>
          </div>

          <div
            className="h-card"
            aria-hidden="true"
            style={{ position: "absolute", bottom: "20%", right: "9%", width: "clamp(110px, 13vw, 190px)", zIndex: 3, pointerEvents: "none" }}
          >
            <div ref={cardSphereRef} style={{ transition: "transform 0.6s cubic-bezier(0.16,1,0.3,1)", willChange: "transform" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/generated/obsidian-sphere.png"
                alt=""
                style={{
                  width: "100%", height: "auto", display: "block",
                  borderRadius: "12px",
                  border: "1px solid oklch(95% 0.02 70 / 0.4)",
                  boxShadow: "0 24px 50px oklch(15% 0.03 35 / 0.45)",
                  animation: "drift-b 13s ease-in-out infinite",
                }}
              />
            </div>
          </div>
        </>
      )}

      {/* ── Scattered micro-labels ── */}
      {mounted && TAGS.map((t) => (
        <span
          key={t.text}
          className="h-tag"
          aria-hidden="true"
          style={{
            position: "absolute", left: t.x, top: t.y, zIndex: 4,
            fontFamily: "var(--font-mono)", fontSize: "0.64rem",
            letterSpacing: "0.08em", color: "oklch(95% 0.02 70 / 0.78)",
            textTransform: "lowercase", whiteSpace: "nowrap", pointerEvents: "none",
          }}
        >
          {t.text}
        </span>
      ))}

      {/* ── Giant serif name — overlaps the crystal ── */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 3, width: "100%", textAlign: "center", pointerEvents: "none",
        }}
      >
        <h1
          aria-label={personalInfo.name}
          style={{
            fontFamily: "var(--font-serif)", fontWeight: 400,
            fontSize: "clamp(3.8rem, 15vw, 16rem)",
            lineHeight: 0.82, letterSpacing: "-0.02em",
            color: "oklch(96% 0.02 75)", margin: 0,
            textShadow: "0 2px 40px oklch(20% 0.03 35 / 0.35)",
          }}
        >
          <div style={{ overflow: "hidden" }}>
            <span className="h-name-line" style={{ display: "block" }}>Imane</span>
          </div>
          <div style={{ overflow: "hidden" }}>
            <span className="h-name-line" style={{ display: "block", fontStyle: "italic", color: "oklch(82% 0.10 45)" }}>Moumoun</span>
          </div>
        </h1>
      </div>

      {/* ── Top tag row ── */}
      <div
        className="h-tagrow"
        style={{
          position: "absolute", top: "clamp(5.5rem, 12vh, 8rem)", left: "50%",
          transform: "translateX(-50%)", zIndex: 5,
          fontFamily: "var(--font-mono)", fontSize: "0.66rem",
          letterSpacing: "0.16em", color: "oklch(96% 0.02 75 / 0.85)",
          textTransform: "lowercase", whiteSpace: "nowrap",
        }}
      >
        ✦ a private practice for intelligent systems
      </div>

      {/* ── Lower-left content block ── */}
      <div style={{ position: "relative", zIndex: 6, maxWidth: "42ch" }}>
        <p
          className="h-role"
          style={{
            fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 500,
            fontSize: "clamp(1.2rem, 2.6vw, 1.9rem)",
            color: "oklch(90% 0.06 50)", marginBottom: "0.9rem", lineHeight: 1.1,
          }}
        >
          {personalInfo.title}
        </p>
        <p
          className="h-bio"
          style={{
            fontFamily: "var(--font-body)", fontSize: "clamp(0.85rem, 1.3vw, 0.98rem)",
            lineHeight: 1.7, color: "oklch(88% 0.03 65 / 0.85)", maxWidth: "38ch",
            marginBottom: "clamp(1.5rem, 3vw, 2.2rem)",
          }}
        >
          {personalInfo.subtitle}
        </p>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <MagneticButton
            href="#projects"
            variant="primary"
            className="h-cta"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            View work
            <svg className="btn-arrow" width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </MagneticButton>
          <MagneticButton href={`mailto:${personalInfo.email}`} variant="ghost" className="h-cta" ariaLabel="Get in touch by email">
            Get in touch
          </MagneticButton>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div
        className="h-scroll"
        aria-hidden="true"
        style={{
          position: "absolute", bottom: "clamp(2rem, 5vh, 3.5rem)", right: "clamp(1.5rem, 5vw, 3.5rem)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: "0.6rem", zIndex: 6,
        }}
      >
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.15em", color: "oklch(95% 0.02 70 / 0.7)", writingMode: "vertical-rl", transform: "rotate(180deg)", textTransform: "lowercase" }}>
          scroll
        </span>
        <div style={{ width: "1px", height: "56px", background: "oklch(95% 0.02 70 / 0.3)", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, oklch(82% 0.10 45), transparent)", animation: "scroll-line 2s ease-in-out infinite", transformOrigin: "top" }} />
        </div>
      </div>
    </section>
  );
}
