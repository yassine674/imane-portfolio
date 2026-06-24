"use client";

/* Animated mesh-gradient backdrop for dark sections.
   Three large blurred blobs drift on independent loops while the
   whole layer slowly rotates hue, so the "black" is alive without
   ever competing with foreground text. Pure transform/filter -> GPU. */

interface Blob {
  size: string;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  color: string;
  anim: string;
  blur: string;
}

const DEFAULT_BLOBS: Blob[] = [
  {
    size: "46vw",
    top: "-8%",
    right: "-6%",
    color: "oklch(74% 0.16 33 / 0.20)",   /* warm coral */
    anim: "mesh-1 19s ease-in-out infinite",
    blur: "70px",
  },
  {
    size: "38vw",
    top: "30%",
    left: "-10%",
    color: "oklch(72% 0.13 350 / 0.16)",  /* soft rose-pink */
    anim: "mesh-2 24s ease-in-out infinite",
    blur: "80px",
  },
  {
    size: "32vw",
    bottom: "-10%",
    right: "20%",
    color: "oklch(78% 0.12 60 / 0.12)",   /* peach */
    anim: "mesh-3 16s ease-in-out infinite",
    blur: "60px",
  },
];

export function MovingGradient({
  blobs = DEFAULT_BLOBS,
  hueSpin = true,
  opacity = 1,
}: {
  blobs?: Blob[];
  hueSpin?: boolean;
  opacity?: number;
}) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        overflow: "hidden",
        pointerEvents: "none",
        opacity,
        animation: hueSpin ? "hue-spin 28s linear infinite" : undefined,
      }}
    >
      {blobs.map((b, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: b.size,
            height: b.size,
            top: b.top,
            left: b.left,
            right: b.right,
            bottom: b.bottom,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${b.color} 0%, transparent 68%)`,
            filter: `blur(${b.blur})`,
            animation: b.anim,
            willChange: "transform",
          }}
        />
      ))}
    </div>
  );
}
