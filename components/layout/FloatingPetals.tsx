"use client";

/* Soft drifting petals — gentle feminine motion layer.
   Tiny blurred rounded shapes fall and sway down the section.
   Decorative only (aria-hidden); disabled under reduced-motion via
   the global media query that zeroes animation durations. */

const PETALS = Array.from({ length: 14 }, (_, i) => {
  const left = (i * 67) % 100;            // pseudo-spread across width
  const size = 8 + ((i * 13) % 12);       // 8–20px
  const delay = (i * 1.7) % 16;           // staggered entry
  const duration = 13 + ((i * 5) % 9);    // 13–22s fall
  const hue = i % 3 === 0 ? 350 : i % 3 === 1 ? 33 : 60; // rose / coral / peach
  return { left, size, delay, duration, hue };
});

export function FloatingPetals({ opacity = 0.5 }: { opacity?: number }) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 1,
        opacity,
      }}
    >
      {PETALS.map((p, i) => (
        <span
          key={i}
          style={{
            position: "absolute",
            top: "-6vh",
            left: `${p.left}%`,
            width: p.size,
            height: p.size * 0.7,
            borderRadius: "60% 40% 55% 45% / 55% 45% 60% 40%",
            background: `oklch(80% 0.13 ${p.hue} / 0.7)`,
            filter: "blur(0.5px)",
            animation: `petal-fall ${p.duration}s linear ${p.delay}s infinite`,
            willChange: "transform, opacity",
          }}
        />
      ))}
    </div>
  );
}
