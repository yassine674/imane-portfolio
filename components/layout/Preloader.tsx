"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const words = [
  "Hello",
  "Bonjour",
  "السلام عليكم",
  "Ciao",
  "Olà",
  "やあ",
  "Hallå",
  "Guten tag",
  "হ্যালো",
];

const opacityVariant = {
  initial: { opacity: 0 },
  enter: { opacity: 1, transition: { duration: 0.3 } },
};

const slideUp = {
  initial: { y: 0 },
  exit: {
    y: "-100vh",
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as const, delay: 0.2 },
  },
};

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const [index, setIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      onComplete();
      return;
    }

    if (index === words.length - 1) {
      const exitTimer = setTimeout(() => {
        setIsExiting(true);
        setTimeout(() => onComplete(), 1000);
      }, 800);
      return () => clearTimeout(exitTimer);
    }

    const delay = index === 0 ? 900 : 420;
    const t = setTimeout(() => setIndex((i) => i + 1), delay);
    return () => clearTimeout(t);
  }, [index, onComplete]);

  const isArabic = words[index] === "السلام عليكم";

  return (
    <motion.div
      variants={slideUp}
      initial="initial"
      animate={isExiting ? "exit" : "initial"}
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "oklch(30% 0.07 340)",
        zIndex: 99999,
        pointerEvents: isExiting ? "none" : "auto",
      }}
    >
      <motion.p
        variants={opacityVariant}
        initial="initial"
        animate="enter"
        key={index}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.65rem",
          color: "oklch(92% 0.03 355)",
          fontSize: "clamp(2rem, 5vw, 3.5rem)",
          fontFamily: isArabic ? "var(--font-serif)" : "var(--font-display)",
          fontWeight: isArabic ? 400 : 600,
          letterSpacing: isArabic ? "0.02em" : "-0.02em",
          direction: isArabic ? "rtl" : "ltr",
        }}
      >
        {words[index]}
      </motion.p>
    </motion.div>
  );
}
