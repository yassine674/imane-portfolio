"use client";
import { personalInfo } from "@/lib/data";
import { RollText } from "@/components/layout/RollText";

export function Footer() {
  return (
    <footer
      style={{
        padding: "2.5rem clamp(1.5rem, 5vw, 3.5rem)",
        borderTop: "1px solid var(--border)",
        display: "flex", flexWrap: "wrap", gap: "1.5rem",
        alignItems: "center", justifyContent: "space-between",
      }}
    >
      <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1rem", color: "var(--text)" }}>
        IM<span style={{ color: "var(--accent)" }}>.</span>
      </span>
      <span style={{ fontFamily: "var(--font-body)", fontSize: "0.7rem", letterSpacing: "0.1em", color: "var(--text-3)", textTransform: "uppercase" }}>
        © {new Date().getFullYear()} {personalInfo.name}
      </span>
      <div style={{ display: "flex", gap: "2rem" }}>
        {[
          { label: "GitHub", href: personalInfo.github },
          { label: "LinkedIn", href: personalInfo.linkedin },
          { label: "Email", href: `mailto:${personalInfo.email}` },
        ].map((l) => (
          <a
            key={l.label}
            href={l.href}
            aria-label={l.label}
            target={l.href.startsWith("http") ? "_blank" : undefined}
            rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
            style={{
              fontFamily: "var(--font-body)", fontSize: "0.7rem",
              letterSpacing: "0.1em", color: "var(--text-3)",
              textDecoration: "none", textTransform: "uppercase",
              transition: "color 0.9s var(--f-cubic)",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-3)")}
          >
            <RollText text={l.label} />
          </a>
        ))}
      </div>
    </footer>
  );
}
