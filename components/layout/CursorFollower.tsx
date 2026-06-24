"use client";
import { useEffect, useRef } from "react";

export function CursorFollower() {
  const dotRef   = useRef<HTMLDivElement>(null);
  const ringRef  = useRef<HTMLDivElement>(null);
  const posRef   = useRef({ x: -200, y: -200 });
  const ringPos  = useRef({ x: -200, y: -200 });
  const rafRef   = useRef<number>(0);
  const hoverRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      const d = dotRef.current;
      if (d) d.style.transform = `translate(${e.clientX - 3}px, ${e.clientY - 3}px)`;
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const tick = () => {
      ringPos.current.x = lerp(ringPos.current.x, posRef.current.x, 0.1);
      ringPos.current.y = lerp(ringPos.current.y, posRef.current.y, 0.1);
      const r = ringRef.current;
      if (r) r.style.transform = `translate(${ringPos.current.x - 22}px, ${ringPos.current.y - 22}px)`;
      rafRef.current = requestAnimationFrame(tick);
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as Element;
      const isHover = !!t.closest("a, button, [data-cursor]");
      if (isHover !== hoverRef.current) {
        hoverRef.current = isHover;
        const r = ringRef.current;
        if (!r) return;
        if (isHover) {
          r.style.width = "48px";
          r.style.height = "48px";
          r.style.borderColor = "var(--accent)";
          r.style.opacity = "1";
        } else {
          r.style.width = "44px";
          r.style.height = "44px";
          r.style.borderColor = "color-mix(in oklch, var(--accent) 40%, transparent)";
          r.style.opacity = "0.7";
        }
      }
    };

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver);
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: "fixed", top: 0, left: 0,
          width: 6, height: 6,
          borderRadius: "50%",
          background: "var(--accent)",
          pointerEvents: "none", zIndex: 9998,
          willChange: "transform",
        }}
      />
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          position: "fixed", top: 0, left: 0,
          width: 44, height: 44,
          borderRadius: "50%",
          border: "1px solid color-mix(in oklch, var(--accent) 40%, transparent)",
          pointerEvents: "none", zIndex: 9997,
          willChange: "transform",
          opacity: 0.7,
          transition: "width 0.25s var(--ease-out-expo), height 0.25s var(--ease-out-expo), border-color 0.25s, opacity 0.25s",
        }}
      />
    </>
  );
}
