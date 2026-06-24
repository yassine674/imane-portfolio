"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { navLinks } from "@/lib/data";
import { RollText } from "@/components/layout/RollText";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [entered, setEntered] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Page-load entrance (obsidianassembly): each group drops in with a
     skew, settling on f-cubic-in. Synced to ~2.4s after the preloader
     panels clear. Skips the transform under reduced-motion. */
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) { setEntered(true); return; }
    const t = setTimeout(() => setEntered(true), 2400);
    return () => clearTimeout(t);
  }, []);

  /* Per-group entrance style: hidden = lifted + skewed, shown = settled */
  const enter = (i: number): React.CSSProperties => ({
    transform: entered
      ? "translate3d(0, 0, 0) skew(0deg, 0deg)"
      : "translate3d(0, -160%, 0) skew(-10deg, -5deg)",
    opacity: entered ? 1 : 0,
    transition: "transform 2.1s var(--f-cubic-in), opacity 1.2s var(--f-cubic-in)",
    transitionDelay: `${i * 0.12}s`,
    willChange: "transform",
  });

  const scrollTo = (href: string) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <header
        ref={headerRef}
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
          padding: "1.25rem clamp(1.5rem, 5vw, 3.5rem)",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          background: scrolled ? "color-mix(in oklch, var(--bg) 90%, transparent)" : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled ? "1px solid var(--border)" : "none",
          transition: "background 0.4s, backdrop-filter 0.4s, border-color 0.4s",
        }}
      >
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          style={{
            background: "none", border: "none", padding: 0,
            fontFamily: "var(--font-display)", fontWeight: 800,
            fontSize: "1.2rem", letterSpacing: "-0.01em",
            color: "var(--text)",
            ...enter(0),
          }}
        >
          IM<span style={{ color: "var(--accent)" }}>.</span>
        </button>

        {/* Desktop nav */}
        <nav aria-label="Main navigation" className="nav-desktop" style={{ gap: "2.5rem", alignItems: "center", ...enter(1) }}>
          {navLinks.map((l) => (
            <button
              type="button"
              key={l.href}
              aria-label={l.label}
              onClick={() => scrollTo(l.href)}
              style={{
                background: "none", border: "none", cursor: "pointer",
                fontFamily: "var(--font-body)", fontSize: "0.75rem",
                letterSpacing: "0.12em", color: "var(--text-2)",
                textTransform: "uppercase", transition: "color 0.9s var(--f-cubic)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-2)")}
            >
              <RollText text={l.label} />
            </button>
          ))}
        </nav>

        <div style={{ display: "flex", alignItems: "center", gap: "1rem", ...enter(2) }}>
          {/* Open to work badge */}
          <div className="nav-desktop" style={{ alignItems: "center", gap: "0.5rem" }}>
            <span style={{ display: "block", width: 6, height: 6, borderRadius: "50%", background: "oklch(72% 0.2 145)", animation: "pulse 2s infinite" }} />
            <span style={{ fontFamily: "var(--font-body)", fontSize: "0.68rem", letterSpacing: "0.12em", color: "var(--text-3)", textTransform: "uppercase" }}>
              Open to work
            </span>
          </div>

          {/* Hamburger */}
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            className="nav-mobile"
            style={{ background: "none", border: "none", padding: "0.4rem", display: "flex", flexDirection: "column", gap: "5px" }}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  display: "block", width: 20, height: "1px", background: "var(--text)",
                  transition: "transform 0.3s var(--ease-out-expo), opacity 0.3s",
                  transform: open
                    ? i === 0 ? "translateY(6px) rotate(45deg)"
                    : i === 2 ? "translateY(-6px) rotate(-45deg)" : "none"
                    : "none",
                  opacity: open && i === 1 ? 0 : 1,
                }}
              />
            ))}
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-label="Navigation menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              position: "fixed", inset: 0, zIndex: 999,
              background: "var(--bg)",
              display: "flex", flexDirection: "column",
              alignItems: "flex-start", justifyContent: "flex-end",
              padding: "clamp(2rem, 8vw, 5rem)",
            }}
          >
            {navLinks.map((l, i) => (
              <motion.button
                type="button"
                key={l.href}
                onClick={() => scrollTo(l.href)}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  background: "none", border: "none",
                  fontFamily: "var(--font-display)", fontWeight: 800,
                  fontSize: "clamp(2.5rem, 10vw, 5rem)",
                  letterSpacing: "-0.02em", color: "var(--text)",
                  lineHeight: 1.1, marginBottom: "0.25rem",
                }}
              >
                {l.label}
              </motion.button>
            ))}
            <div style={{ marginTop: "2rem", fontFamily: "var(--font-body)", fontSize: "0.7rem", letterSpacing: "0.15em", color: "var(--text-3)", textTransform: "uppercase" }}>
              AI & ML Engineer · Inria
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
