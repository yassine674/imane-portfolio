"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { personalInfo } from "@/lib/data";
import { MovingGradient } from "@/components/layout/MovingGradient";
import { MagneticButton } from "@/components/layout/MagneticButton";

gsap.registerPlugin(ScrollTrigger);

/* Split text into individual character spans for the reveal animation */
function SplitText({ text, className }: { text: string; className: string }) {
  return (
    <>
      {text.split("").map((char, i) => (
        <span
          key={i}
          className={className}
          style={{ display: "inline-block", willChange: "transform" }}
        >
          {char === " " ? " " : char}
        </span>
      ))}
    </>
  );
}

export function Contact() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      /* Label */
      gsap.from(".ct-label", {
        scrollTrigger: { trigger: ".ct-label", start: "top 90%", once: true },
        opacity: 0,
        y: 14,
        duration: 0.6,
        ease: "power3.out",
      });

      /* "LET'S" — slide up from clip */
      gsap.from(".ct-lets-char", {
        scrollTrigger: { trigger: ".ct-lets", start: "top 82%", once: true },
        yPercent: 115,
        duration: 0.95,
        stagger: 0.028,
        ease: "power4.out",
      });

      /* "Collaborate" — slide up slightly after */
      gsap.from(".ct-collab-char", {
        scrollTrigger: { trigger: ".ct-collab", start: "top 82%", once: true },
        yPercent: 115,
        duration: 1.1,
        stagger: 0.022,
        delay: 0.08,
        ease: "power4.out",
      });

      /* Subtext + links */
      gsap.from(".ct-sub-item", {
        scrollTrigger: { trigger: ".ct-sub-row", start: "top 88%", once: true },
        opacity: 0,
        y: 14,
        duration: 0.6,
        stagger: 0.08,
        ease: "power3.out",
      });

      /* Horizontal rule reveal */
      gsap.from(".ct-rule", {
        scrollTrigger: { trigger: ".ct-rule", start: "top 90%", once: true },
        scaleX: 0,
        duration: 1.0,
        ease: "power3.inOut",
        transformOrigin: "left",
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      id="contact"
      aria-labelledby="ct-h"
      style={{
        minHeight: "90svh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "clamp(6rem, 12vw, 10rem) clamp(1.5rem, 5vw, 3.5rem) clamp(4rem, 8vw, 6rem)",
        borderTop: "1px solid var(--border)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* ── Animated moving mesh-gradient background ── */}
      <MovingGradient />

      {/* ── Main content ── */}
      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Section label */}
        <div
          className="ct-label"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.65rem",
            letterSpacing: "0.22em",
            color: "var(--accent)",
            textTransform: "uppercase",
            marginBottom: "clamp(2.5rem, 5vw, 4rem)",
          }}
        >
          05 / Contact
        </div>

        {/* ── "LET'S" ── */}
        <div className="ct-lets" style={{ overflow: "hidden", lineHeight: 0.85 }}>
          <h2
            id="ct-h"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "clamp(4.5rem, 14vw, 14rem)",
              letterSpacing: "-0.04em",
              color: "var(--text)",
              margin: 0,
              lineHeight: 0.85,
              display: "block",
            }}
          >
            <SplitText text="LET'S" className="ct-lets-char" />
          </h2>
        </div>

        {/* ── "Collaborate" ── */}
        <div
          className="ct-collab"
          style={{
            overflow: "hidden",
            lineHeight: 0.85,
            marginBottom: "clamp(3rem, 6vw, 5rem)",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-serif)",
              fontWeight: 400,
              fontStyle: "italic",
              fontSize: "clamp(4rem, 13vw, 13rem)",
              letterSpacing: "-0.03em",
              color: "var(--accent)",
              lineHeight: 0.85,
              display: "block",
            }}
          >
            <SplitText text="Collaborate." className="ct-collab-char" />
          </span>
        </div>

        {/* ── Rule ── */}
        <div
          className="ct-rule"
          style={{
            height: "1px",
            background: "var(--border)",
            marginBottom: "clamp(2.5rem, 5vw, 4rem)",
          }}
        />

        {/* ── Sub row ── */}
        <div
          className="ct-sub-row"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1.5rem 3rem",
          }}
        >
          {/* Left: tagline + CTA */}
          <div>
            <p
              className="ct-sub-item"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(0.82rem, 1.3vw, 1rem)",
                color: "var(--text-3)",
                lineHeight: 1.7,
                marginBottom: "1.75rem",
                maxWidth: "42ch",
              }}
            >
              Open to research roles, internships &amp; collaborations.
              <br />
              Let's build something that matters.
            </p>
            <MagneticButton
              href={`mailto:${personalInfo.email}`}
              variant="primary"
              className="ct-sub-item"
              ariaLabel="Send Imane an email"
            >
              Send a message
              <svg className="btn-arrow" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path
                  d="M3 7h8M7 3l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </MagneticButton>
          </div>

          {/* Right: social links */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.5rem",
            }}
          >
            {[
              { label: "GitHub", note: "imanemn127", href: personalInfo.github },
              { label: "LinkedIn", note: "imane-moumoun", href: personalInfo.linkedin },
              { label: "Location", note: personalInfo.location, href: "#" },
            ].map((l) => (
              <a
                key={l.label}
                href={l.href}
                target={l.href.startsWith("http") ? "_blank" : undefined}
                rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="ct-sub-item"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.15rem",
                  textDecoration: "none",
                  cursor: l.href === "#" ? "default" : "pointer",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.58rem",
                    letterSpacing: "0.2em",
                    color: "var(--text-3)",
                    textTransform: "uppercase",
                  }}
                >
                  {l.label}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 600,
                    fontSize: "0.88rem",
                    color: "var(--text-2)",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    l.href !== "#" && ((e.currentTarget as HTMLElement).style.color = "var(--accent)")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.color = "var(--text-2)")
                  }
                >
                  {l.note}
                </span>
              </a>
            ))}

            {/* Available indicator */}
            <div
              className="ct-sub-item"
              style={{ display: "flex", alignItems: "center", gap: "0.6rem", paddingTop: "0.5rem" }}
            >
              <span
                aria-hidden="true"
                style={{
                  display: "block",
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: "oklch(72% 0.2 145)",
                  flexShrink: 0,
                  animation: "pulse 2s infinite",
                }}
              />
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.62rem",
                  letterSpacing: "0.14em",
                  color: "var(--text-3)",
                  textTransform: "uppercase",
                }}
              >
                Available for opportunities
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
