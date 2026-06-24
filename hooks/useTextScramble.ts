"use client";
import { useState, useEffect, useRef } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&";

interface Options {
  delay?: number;
  duration?: number;
}

export function useTextScramble(target: string, { delay = 0, duration = 800 }: Options = {}): string {
  const [display, setDisplay] = useState("");
  const rafRef = useRef<number>(0);

  useEffect(() => {
    let startTime: number | null = null;
    const delayMs = delay;

    const tick = (now: number) => {
      if (startTime === null) startTime = now;
      const elapsed = now - startTime - delayMs;

      if (elapsed < 0) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      const progress = Math.min(elapsed / duration, 1);
      const len = target.length;
      let result = "";

      for (let i = 0; i < len; i++) {
        const charProgress = (progress - (i / len) * 0.4) / 0.6;
        if (charProgress >= 1) {
          result += target[i];
        } else if (charProgress > 0) {
          result += CHARS[Math.floor(Math.random() * CHARS.length)];
        } else {
          result += CHARS[Math.floor(Math.random() * CHARS.length)];
        }
      }

      setDisplay(result);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setDisplay(target);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, delay, duration]);

  return display;
}
