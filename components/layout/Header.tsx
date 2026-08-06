"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";

if (typeof window !== "undefined") {
  gsap.registerPlugin(CustomEase);
}

export function Header() {
  const containerRef  = useRef<HTMLDivElement>(null);
  const isMenuOpenRef = useRef(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) { setEntered(true); return; }
    const t = setTimeout(() => setEntered(true), 2400);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => { isMenuOpenRef.current = isMenuOpen; }, [isMenuOpen]);

  // Initial Setup & Hover Effects
  useEffect(() => {
    if (!containerRef.current) return;

    try {
      if (!gsap.parseEase("main")) {
        CustomEase.create("main", "0.65, 0.01, 0.05, 0.99");
        gsap.defaults({ ease: "main", duration: 0.7 });
      }
    } catch (e) {
      gsap.defaults({ ease: "power2.out", duration: 0.7 });
    }

    const ctx = gsap.context(() => {
      const arrowLine = document.querySelector(".arrow-line");
      if (arrowLine) {
        const pathLength = (arrowLine as SVGPathElement).getTotalLength();
        gsap.set(arrowLine, { strokeDasharray: pathLength, strokeDashoffset: pathLength });
        const arrowTl = gsap.timeline({ repeat: -1, repeatDelay: 0.8 });
        arrowTl
          .to(arrowLine, { strokeDashoffset: 0, duration: 1, ease: "power2.out" })
          .to({}, { duration: 1.2 })
          .to(arrowLine, { strokeDashoffset: -pathLength, duration: 0.6, ease: "power2.in" })
          .set(arrowLine, { strokeDashoffset: pathLength });
      }

      const menuItems = containerRef.current!.querySelectorAll(".menu-list-item[data-shape]");
      const shapesContainer = containerRef.current!.querySelector(".ambient-background-shapes");

      menuItems.forEach((item) => {
        const shapeIndex = item.getAttribute("data-shape");
        const shape = shapesContainer ? shapesContainer.querySelector(`.bg-shape-${shapeIndex}`) : null;
        if (!shape) return;
        const shapeEls = shape.querySelectorAll(".shape-element");

        const navLink  = item.querySelector(".nav-link");
        const linkTexts = item.querySelectorAll(".nav-link-text");

        const onEnter = () => {
          if (shapesContainer) {
            shapesContainer.querySelectorAll(".bg-shape").forEach((s) => s.classList.remove("active"));
          }
          shape.classList.add("active");
          gsap.fromTo(shapeEls,
            { scale: 0.5, opacity: 0, rotation: -10 },
            { scale: 1, opacity: 1, rotation: 0, duration: 0.6, stagger: 0.08, ease: "back.out(1.7)", overwrite: "auto" }
          );
          // same yPercent trick as Menu → Close button
          gsap.to(linkTexts, { yPercent: -100, duration: 0.5, ease: "power3.out", overwrite: "auto" });
          gsap.to(navLink,   { backgroundColor: "rgba(45,30,36,0.88)", duration: 0.45, ease: "power3.out", overwrite: "auto" });
        };

        const onLeave = () => {
          gsap.to(shapeEls, {
            scale: 0.8, opacity: 0, duration: 0.3, ease: "power2.in",
            onComplete: () => shape.classList.remove("active"),
            overwrite: "auto",
          });
          gsap.to(linkTexts, { yPercent: 0, duration: 0.45, ease: "power3.out", overwrite: "auto" });
          gsap.to(navLink,   { backgroundColor: "transparent", duration: 0.35, ease: "power3.out", overwrite: "auto" });
        };

        item.addEventListener("mouseenter", onEnter);
        item.addEventListener("mouseleave", onLeave);
        (item as any)._cleanup = () => {
          item.removeEventListener("mouseenter", onEnter);
          item.removeEventListener("mouseleave", onLeave);
        };
      });

      // Rotate icon on button hover (only when menu is closed)
      const btn  = containerRef.current!.querySelector(".nav-close-btn");
      const icon = btn?.querySelector(".menu-button-icon");
      const onBtnEnter = () => { if (!isMenuOpenRef.current) gsap.to(icon, { rotate: 90, duration: 0.4, ease: "power3.out" }); };
      const onBtnLeave = () => { if (!isMenuOpenRef.current) gsap.to(icon, { rotate: 0,  duration: 0.35, ease: "power3.out" }); };
      btn?.addEventListener("mouseenter", onBtnEnter);
      btn?.addEventListener("mouseleave", onBtnLeave);
      (btn as any)._cleanup = () => { btn?.removeEventListener("mouseenter", onBtnEnter); btn?.removeEventListener("mouseleave", onBtnLeave); };
    }, containerRef);

    return () => {
      ctx.revert();
      if (containerRef.current) {
        const items = containerRef.current.querySelectorAll(".menu-list-item[data-shape]");
        items.forEach((item: any) => item._cleanup && item._cleanup());
        const btn = containerRef.current.querySelector(".nav-close-btn") as any;
        btn?._cleanup?.();
      }
    };
  }, []);

  // Menu Open/Close Animation Effect
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const navWrap         = containerRef.current!.querySelector(".nav-overlay-wrapper");
      const menu            = containerRef.current!.querySelector(".menu-content");
      const overlay         = containerRef.current!.querySelector(".overlay");
      const bgPanels        = containerRef.current!.querySelectorAll(".backdrop-layer");
      const menuLinks       = containerRef.current!.querySelectorAll(".nav-link");
      const fadeTargets     = containerRef.current!.querySelectorAll("[data-menu-fade]");
      const menuButton      = containerRef.current!.querySelector(".nav-close-btn");
      const menuButtonTexts = menuButton?.querySelectorAll("p");
      const menuButtonIcon  = menuButton?.querySelector(".menu-button-icon");
      const toggleText      = containerRef.current!.querySelector(".toggle-text");
      const tl = gsap.timeline();

      if (isMenuOpen) {
        if (navWrap) navWrap.setAttribute("data-nav", "open");

        tl.set(navWrap, { display: "block" })
          .set(menu, { xPercent: 0 }, "<")
          .to(menuButtonTexts, { color: "#3d2318", duration: 0.3 }, "<")
          .to(menuButtonIcon, { color: "#3d2318", duration: 0.3 }, "<")
          .to(toggleText, { color: "#3d2318", duration: 0.3 }, "<")
          .fromTo(menuButtonTexts, { yPercent: 0 }, { yPercent: -100, stagger: 0.2 })
          .fromTo(menuButtonIcon, { rotate: 0 }, { rotate: 315 }, "<")
          .fromTo(overlay, { autoAlpha: 0 }, { autoAlpha: 1 }, "<")
          .fromTo(bgPanels, { xPercent: 101 }, { xPercent: 0, stagger: 0.12, duration: 0.575 }, "<")
          .fromTo(menuLinks, { yPercent: 140, rotate: 10 }, { yPercent: 0, rotate: 0, stagger: 0.05 }, "<+=0.35");

        if (fadeTargets.length) {
          tl.fromTo(fadeTargets, { autoAlpha: 0, yPercent: 50 }, { autoAlpha: 1, yPercent: 0, stagger: 0.04, clearProps: "all" }, "<+=0.2");
        }
      } else {
        if (navWrap) navWrap.setAttribute("data-nav", "closed");

        tl.to(overlay, { autoAlpha: 0 })
          .to(menu, { xPercent: 120 }, "<")
          .to(menuButtonTexts, { yPercent: 0 }, "<")
          .to(menuButtonIcon, { rotate: 0 }, "<")
          .to([menuButtonTexts, menuButtonIcon, toggleText], { duration: 0.2, onComplete: () => gsap.set([menuButtonTexts, menuButtonIcon, toggleText], { clearProps: "color" }) }, "<")
          .set(navWrap, { display: "none" });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [isMenuOpen]);

  // Darken fixed header elements when over a light-background section
  useEffect(() => {
    const DARK = "#2a1810";
    const getTargets = () => {
      if (!containerRef.current) return [];
      const btn = containerRef.current.querySelector(".nav-close-btn");
      return [
        containerRef.current.querySelector(".im-bubble"),
        containerRef.current.querySelector(".toggle-text"),
        ...(btn ? Array.from(btn.querySelectorAll("p")) : []),
        btn?.querySelector(".menu-button-icon"),
      ].filter(Boolean);
    };

    let lightCount = 0;
    const applyDark = () => {
      if (isMenuOpenRef.current) return;
      gsap.to(getTargets(), { color: DARK, duration: 0.4, ease: "power2.out", overwrite: "auto" });
    };
    const applyDefault = () => {
      if (isMenuOpenRef.current) return;
      gsap.to(getTargets(), { color: "inherit", duration: 0.35, ease: "power2.out", overwrite: "auto",
        onComplete: () => gsap.set(getTargets(), { clearProps: "color" }) });
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((e) => { lightCount += e.isIntersecting ? 1 : -1; });
      lightCount = Math.max(0, lightCount);
      if (lightCount > 0) applyDark(); else applyDefault();
    }, { rootMargin: "0px 0px -92% 0px" });

    const sections = document.querySelectorAll(".section-light");
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMenuOpen) setIsMenuOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu  = () => setIsMenuOpen(false);

  const scrollTo = (href: string) => {
    closeMenu();
    setTimeout(() => document.querySelector(href)?.scrollIntoView({ behavior: "smooth" }), 450);
  };

  const enterStyle = (i: number): React.CSSProperties => ({
    transform: entered ? "translate3d(0,0,0) skew(0,0)" : "translate3d(0,-160%,0) skew(-10deg,-5deg)",
    opacity: entered ? 1 : 0,
    transition: "transform 2.1s var(--f-cubic-in), opacity 1.2s var(--f-cubic-in)",
    transitionDelay: `${i * 0.12}s`,
    willChange: "transform",
  });

  return (
    <div ref={containerRef}>
      {/* ── IM. bubble — fixed top-left ── */}
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        className="im-bubble"
        style={{
          position: "fixed", top: "1.4rem", left: "clamp(1.5rem, 5vw, 3.5rem)",
          zIndex: 1001, background: "none", border: "none", padding: 0, cursor: "pointer",
          fontFamily: "var(--font-display)", fontWeight: 800,
          fontSize: "1.2rem", letterSpacing: "-0.01em", color: "var(--text)",
          ...enterStyle(0),
        }}
      >
        IM<span style={{ color: "var(--accent)" }}>.</span>
      </button>

      {/* ── Top-right: "click me" label + Menu button — exact source structure ── */}
      <div
        style={{
          position: "fixed", top: "1rem", right: "clamp(1.5rem, 5vw, 3.5rem)",
          zIndex: 1001, display: "flex", alignItems: "center", gap: "1.25rem",
          ...enterStyle(1),
        }}
      >
        <div className="nav-toggle-label" onClick={toggleMenu} style={{ cursor: "pointer", pointerEvents: "auto" }}>
          <span className="toggle-text">click me</span>
        </div>

        <button role="button" className="nav-close-btn" onClick={toggleMenu} style={{ pointerEvents: "auto" }}>
          <div className="menu-button-text">
            <p className="p-large">Menu</p>
            <p className="p-large">Close</p>
          </div>
          <div className="icon-wrap">
            <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 16 16" fill="none" className="menu-button-icon">
              <path d="M7.33333 16L7.33333 -3.2055e-07L8.66667 -3.78832e-07L8.66667 16L7.33333 16Z" fill="currentColor" />
              <path d="M16 8.66667L-2.62269e-07 8.66667L-3.78832e-07 7.33333L16 7.33333L16 8.66667Z" fill="currentColor" />
              <path d="M6 7.33333L7.33333 7.33333L7.33333 6C7.33333 6.73637 6.73638 7.33333 6 7.33333Z" fill="currentColor" />
              <path d="M10 7.33333L8.66667 7.33333L8.66667 6C8.66667 6.73638 9.26362 7.33333 10 7.33333Z" fill="currentColor" />
              <path d="M6 8.66667L7.33333 8.66667L7.33333 10C7.33333 9.26362 6.73638 8.66667 6 8.66667Z" fill="currentColor" />
              <path d="M10 8.66667L8.66667 8.66667L8.66667 10C8.66667 9.26362 9.26362 8.66667 10 8.66667Z" fill="currentColor" />
            </svg>
          </div>
        </button>
      </div>

      {/* ── Fullscreen menu — exact source structure ── */}
      <section className="fullscreen-menu-container">
        <div data-nav="closed" className="nav-overlay-wrapper">
          <div className="overlay" onClick={closeMenu}></div>
          <nav className="menu-content">
            <div className="menu-bg">
              <div className="backdrop-layer first"></div>
              <div className="backdrop-layer second"></div>
              <div className="backdrop-layer"></div>

              <div className="ambient-background-shapes">
                <svg className="bg-shape bg-shape-1" viewBox="0 0 400 400" fill="none">
                  <circle className="shape-element" cx="80" cy="120" r="40" fill="rgba(99,102,241,0.15)" />
                  <circle className="shape-element" cx="300" cy="80" r="60" fill="rgba(139,92,246,0.12)" />
                  <circle className="shape-element" cx="200" cy="300" r="80" fill="rgba(236,72,153,0.1)" />
                  <circle className="shape-element" cx="350" cy="280" r="30" fill="rgba(99,102,241,0.15)" />
                </svg>
                <svg className="bg-shape bg-shape-2" viewBox="0 0 400 400" fill="none">
                  <path className="shape-element" d="M0 200 Q100 100, 200 200 T 400 200" stroke="rgba(99,102,241,0.2)" strokeWidth="60" fill="none" />
                  <path className="shape-element" d="M0 280 Q100 180, 200 280 T 400 280" stroke="rgba(139,92,246,0.15)" strokeWidth="40" fill="none" />
                </svg>
                <svg className="bg-shape bg-shape-3" viewBox="0 0 400 400" fill="none">
                  <circle className="shape-element" cx="50"  cy="50"  r="8"  fill="rgba(99,102,241,0.3)"  />
                  <circle className="shape-element" cx="150" cy="50"  r="8"  fill="rgba(139,92,246,0.3)"  />
                  <circle className="shape-element" cx="250" cy="50"  r="8"  fill="rgba(236,72,153,0.3)"  />
                  <circle className="shape-element" cx="350" cy="50"  r="8"  fill="rgba(99,102,241,0.3)"  />
                  <circle className="shape-element" cx="100" cy="150" r="12" fill="rgba(139,92,246,0.25)" />
                  <circle className="shape-element" cx="200" cy="150" r="12" fill="rgba(236,72,153,0.25)" />
                  <circle className="shape-element" cx="300" cy="150" r="12" fill="rgba(99,102,241,0.25)" />
                  <circle className="shape-element" cx="50"  cy="250" r="10" fill="rgba(236,72,153,0.3)"  />
                  <circle className="shape-element" cx="150" cy="250" r="10" fill="rgba(99,102,241,0.3)"  />
                  <circle className="shape-element" cx="250" cy="250" r="10" fill="rgba(139,92,246,0.3)"  />
                  <circle className="shape-element" cx="350" cy="250" r="10" fill="rgba(236,72,153,0.3)"  />
                  <circle className="shape-element" cx="100" cy="350" r="6"  fill="rgba(99,102,241,0.3)"  />
                  <circle className="shape-element" cx="200" cy="350" r="6"  fill="rgba(139,92,246,0.3)"  />
                  <circle className="shape-element" cx="300" cy="350" r="6"  fill="rgba(236,72,153,0.3)"  />
                </svg>
                <svg className="bg-shape bg-shape-4" viewBox="0 0 400 400" fill="none">
                  <path className="shape-element" d="M100 100 Q150 50, 200 100 Q250 150, 200 200 Q150 250, 100 200 Q50 150, 100 100" fill="rgba(99,102,241,0.12)" />
                  <path className="shape-element" d="M250 200 Q300 150, 350 200 Q400 250, 350 300 Q400 250, 350 300 Q300 350, 250 300 Q200 250, 250 200" fill="rgba(236,72,153,0.1)" />
                </svg>
                <svg className="bg-shape bg-shape-5" viewBox="0 0 400 400" fill="none">
                  <line className="shape-element" x1="0"   y1="100" x2="300" y2="400" stroke="rgba(99,102,241,0.15)"  strokeWidth="30" />
                  <line className="shape-element" x1="100" y1="0"   x2="400" y2="300" stroke="rgba(139,92,246,0.12)" strokeWidth="25" />
                  <line className="shape-element" x1="200" y1="0"   x2="400" y2="200" stroke="rgba(236,72,153,0.1)"  strokeWidth="20" />
                </svg>
              </div>
            </div>

            <div className="menu-content-wrapper">
              <ul className="menu-list">
                {[
                  { shape: "1", href: "#about",      label: "About"    },
                  { shape: "2", href: "#experience", label: "Carrière" },
                  { shape: "3", href: "#projects",   label: "Projects" },
                  { shape: "4", href: "#skills",     label: "Skills"   },
                  { shape: "5", href: "#contact",    label: "Contact"  },
                ].map(({ shape, href, label }) => (
                  <li key={href} className="menu-list-item" data-shape={shape}>
                    <a href={href} className="nav-link w-inline-block" onClick={(e) => { e.preventDefault(); scrollTo(href); }}>
                      <div className="nav-link-text-wrap">
                        <p className="nav-link-text">{label}</p>
                        <p className="nav-link-text">{label}</p>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>
      </section>
    </div>
  );
}
