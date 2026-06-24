"use client";
import { useRef, useCallback } from "react";

interface TiltOptions {
  strength?: number;
}

export function useTilt<T extends HTMLElement>({ strength = 8 }: TiltOptions = {}) {
  const ref = useRef<T>(null);

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const rx = ((e.clientY - cy) / (rect.height / 2)) * -strength;
      const ry = ((e.clientX - cx) / (rect.width / 2)) * strength;
      el.style.transition = "transform 0.1s ease";
      el.style.transform = `perspective(1200px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(8px)`;
    },
    [strength]
  );

  const onMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transition = "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)";
    el.style.transform = "perspective(1200px) rotateX(0deg) rotateY(0deg) translateZ(0px)";
  }, []);

  return { ref, onMouseMove, onMouseLeave };
}
