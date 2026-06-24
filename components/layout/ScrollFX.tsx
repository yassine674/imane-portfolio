"use client";
import { useEffect } from "react";

/* Vanilla-style scroll/pointer FX engine, wired the React way.
   Implements the obsidianassembly data-* API without fighting the
   existing GSAP reveals:
     - [data-progress]            → sets --progress 0→1 as it crosses the viewport
     - [data-parallax=slow|...]   → CSS reads --progress (see globals.css)
     - [data-lerp="0.12"]         → floats with lag behind scroll
     - [data-spotlight]           → radial glow follows the cursor
   Everything is GPU-only (transform/opacity) and no-ops under
   prefers-reduced-motion, leaving content in its visible rest state. */
export function ScrollFX() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let rafId = 0;
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const progressEls = Array.from(
      document.querySelectorAll<HTMLElement>("[data-progress]")
    );
    const lerpEls = Array.from(
      document.querySelectorAll<HTMLElement>("[data-lerp]")
    );

    let currentY = window.scrollY;

    const tick = () => {
      const vh = window.innerHeight;

      /* Section scroll progress 0→1 */
      for (const el of progressEls) {
        const rect = el.getBoundingClientRect();
        const total = vh + rect.height;
        const p = Math.max(0, Math.min(1, 1 - rect.bottom / total));
        el.style.setProperty("--progress", p.toFixed(4));
      }

      /* Lerped floating objects (lag behind real scroll) */
      if (lerpEls.length) {
        currentY = lerp(currentY, window.scrollY, 0.08);
        for (const el of lerpEls) {
          const speed = parseFloat(el.dataset.lerp || "0.1");
          el.style.transform = `translate3d(0, ${(-currentY * speed).toFixed(2)}px, 0)`;
        }
      }

      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    /* Cursor spotlight — drives --spotlight-x/y on each opted-in element */
    const spotlightEls = Array.from(
      document.querySelectorAll<HTMLElement>("[data-spotlight]")
    );
    const moveHandlers = new Map<HTMLElement, (e: MouseEvent) => void>();
    for (const el of spotlightEls) {
      const onMove = (e: MouseEvent) => {
        const r = el.getBoundingClientRect();
        const x = ((e.clientX - r.left) / r.width) * 100;
        const y = ((e.clientY - r.top) / r.height) * 100;
        el.style.setProperty("--spotlight-x", `${x.toFixed(1)}%`);
        el.style.setProperty("--spotlight-y", `${y.toFixed(1)}%`);
      };
      el.addEventListener("mousemove", onMove, { passive: true });
      moveHandlers.set(el, onMove);
    }

    return () => {
      cancelAnimationFrame(rafId);
      moveHandlers.forEach((fn, el) => el.removeEventListener("mousemove", fn));
    };
  }, []);

  return null;
}
