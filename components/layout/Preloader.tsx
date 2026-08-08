"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const words = [
  "Hello",
  "Bonjour",
  "Guten tag",
  "Ciao",
  "Olà",
  "やあ",
  "হ্যালো",
  "السلام عليكم",
];

const opacityVariant = {
  initial: { opacity: 0 },
  enter: { opacity: 1, transition: { duration: 0.15 } },
};

const slideUp = {
  initial: { y: 0 },
  exit: {
    y: "calc(-100vh - 400px)",
    transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] as const, delay: 0.1 },
  },
};

const BG = "oklch(18% 0.08 290)";

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const [index, setIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [dimension, setDimension] = useState({ width: 1, height: 1 });

  useEffect(() => {
    setDimension({ width: window.innerWidth, height: window.innerHeight });
  }, []);

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

    const delay = index === 0 ? 700 : 180;
    const t = setTimeout(() => setIndex((i) => i + 1), delay);
    return () => clearTimeout(t);
  }, [index, onComplete]);

  const isArabic = words[index] === "السلام عليكم";


  const { width, height } = dimension;
  // Convex bottom — stays this shape throughout; the slide-up sweeps it across the screen
  const curvePath = `M0 0 L${width} 0 L${width} ${height} Q${width / 2} ${height + 400} 0 ${height} L0 0`;

  return (
    <motion.div
      variants={slideUp}
      initial="initial"
      animate={isExiting ? "exit" : "initial"}
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0, bottom: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: BG,
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
          position: "relative",
          zIndex: 10,
          color: "oklch(93% 0.04 290)",
          fontSize: "clamp(2rem, 5vw, 3.5rem)",
          fontFamily: isArabic ? "var(--font-serif)" : "var(--font-display)",
          fontWeight: isArabic ? 400 : 600,
          letterSpacing: isArabic ? "0.02em" : "-0.02em",
          direction: isArabic ? "rtl" : "ltr",
        }}
      >
        {words[index]}
      </motion.p>

      {width > 1 && (
        <svg
          style={{
            position: "absolute",
            top: 0,
            width: "100%",
            height: "calc(100% + 400px)",
            pointerEvents: "none",
          }}
        >
          <path d={curvePath} fill={BG} />
        </svg>
      )}
    </motion.div>
  );
}
