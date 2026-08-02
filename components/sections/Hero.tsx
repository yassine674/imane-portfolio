"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import Lenis from "lenis";
import { personalInfo } from "@/lib/data";
import { MagneticButton } from "@/components/layout/MagneticButton";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const img = (name: string) => `${BASE}/parallax/${name}`;

/* Exact parallax values from pauschal.design source */
const LAYERS = [
  { key: "clouds",         from:  60, to: -160 },
  { key: "s",              from:   0, to: -130 },
  { key: "m",              from:   0, to: -100 },
  { key: "text-bottom",    from:   0, to:  -65 },
  { key: "b",              from:   0, to:  -60 },
  { key: "text-top",       from:   0, to:  -51 },
  { key: "w",              from:   0, to:  -25 },
  { key: "back",           from:   0, to:   -5 },
] as const;

export function Hero() {
  const wrapperRef  = useRef<HTMLDivElement>(null);
  const blackBgRef  = useRef<HTMLDivElement>(null);
  const cloudsRef   = useRef<HTMLDivElement>(null);
  const sRef        = useRef<HTMLDivElement>(null);
  const mRef        = useRef<HTMLDivElement>(null);
  const textBotRef  = useRef<HTMLDivElement>(null);
  const bRef        = useRef<HTMLDivElement>(null);
  const textTopRef  = useRef<HTMLDivElement>(null);
  const wRef        = useRef<HTMLDivElement>(null);
  const backRef     = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    /* Lenis smooth scroll — matches pauschal.design setup exactly */
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: false,
    });
    (window as unknown as { lenis: Lenis }).lenis = lenis;
    gsap.ticker.add((time: number) => { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);

    const heroEnd  = wrapper.offsetHeight - window.innerHeight;
    const blackBg  = blackBgRef.current;
    const layerEls = [
      { ref: cloudsRef,  ...LAYERS[0] },
      { ref: sRef,       ...LAYERS[1] },
      { ref: mRef,       ...LAYERS[2] },
      { ref: textBotRef, ...LAYERS[3] },
      { ref: bRef,       ...LAYERS[4] },
      { ref: textTopRef, ...LAYERS[5] },
      { ref: wRef,       ...LAYERS[6] },
      { ref: backRef,    ...LAYERS[7] },
    ];

    /* Set initial positions */
    layerEls.forEach(({ ref, from }) => {
      if (ref.current) ref.current.style.transform = `translate3d(0,${from}%,0)`;
    });

    const tick = () => {
      const scroll: number =
        (window as unknown as { lenis?: { scroll: number } }).lenis?.scroll ?? window.scrollY;
      if (scroll > heroEnd * 1.2) return;
      const p = Math.max(0, Math.min(1, scroll / heroEnd));
      layerEls.forEach(({ ref, from, to }) => {
        if (ref.current)
          ref.current.style.transform = `translate3d(0,${from + (to - from) * p}%,0)`;
      });
      if (blackBg) blackBg.style.height = `${130 * p}%`;
    };

    gsap.ticker.add(tick);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return (
    <div ref={wrapperRef} id="hero" style={{ position: "relative", height: "250vh" }}>
      <section
        aria-label="Hero"
        style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}
      >

        {/* ── Clouds (hero_8) z:18 — starts 60% below, sweeps through scene ── */}
        <div ref={cloudsRef} aria-hidden style={layer(18)}>
          <img src={img("hero_8.avif")} alt="" style={{ ...imgBase, zIndex: 11 }} />
        </div>

        {/* ── Black gradient overlay — grows from bottom as scroll progresses ── */}
        <div
          ref={blackBgRef}
          aria-hidden
          style={{
            position: "absolute", right: 0, bottom: "2px", left: 0,
            zIndex: 16, height: "0%",
            background: "linear-gradient(#000, #0d0d0d)",
            pointerEvents: "none",
          }}
        />

        {/* ── S layer (hero_7) z:16 ── */}
        <div ref={sRef} aria-hidden style={layer(16)}>
          <img src={img("hero_7.avif")} alt="" style={imgBase} />
        </div>

        {/* ── Hero text bottom: role + bio + CTAs (z:14, top 5rem) ── */}
        <div ref={textBotRef} style={{ position: "absolute", top: "5rem", left: 0, right: 0, width: "100%", height: "100%", zIndex: 14 }}>
          <div style={{
            display: "flex", flexDirection: "column", justifyContent: "flex-end",
            padding: "0 clamp(2rem,6vw,5rem) clamp(4.5rem,9vh,7rem)",
            width: "100%", height: "100%",
          }}>
            <p style={{
              fontFamily: "var(--font-serif)", fontStyle: "italic",
              fontSize: "clamp(1.1rem,2.4vw,1.75rem)",
              color: "oklch(94% 0.06 50)", marginBottom: "0.75rem", lineHeight: 1.15,
            }}>
              {personalInfo.title}
            </p>
            <p style={{
              fontFamily: "var(--font-body)", fontSize: "clamp(0.82rem,1.2vw,0.95rem)",
              lineHeight: 1.75, color: "oklch(90% 0.02 70 / 0.82)", maxWidth: "38ch",
              marginBottom: "clamp(1.4rem,2.8vw,2rem)",
            }}>
              {personalInfo.subtitle}
            </p>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <MagneticButton
                href="#projects"
                variant="primary"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                View work
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </MagneticButton>
              <MagneticButton href={`mailto:${personalInfo.email}`} variant="ghost" ariaLabel="Get in touch by email">
                Get in touch
              </MagneticButton>
            </div>
          </div>
        </div>

        {/* ── M layer (hero_9) z:14 ── */}
        <div ref={mRef} aria-hidden style={layer(14)}>
          <img src={img("hero_9.avif")} alt="" style={imgBase} />
        </div>

        {/* ── B layer (hero_10) z:13 ── */}
        <div ref={bRef} aria-hidden style={layer(13)}>
          <img src={img("hero_10.avif")} alt="" style={{ ...imgBase, zIndex: 6 }} />
        </div>

        {/* ── Hero text top: main headline (z:12, inset auto 0 5rem) ── */}
        <div ref={textTopRef} style={{ position: "absolute", right: 0, bottom: "5rem", left: 0, width: "100%", height: "100%", zIndex: 12, pointerEvents: "none" }}>
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", width: "100%", height: "100vh" }}>
            <h1
              aria-label={personalInfo.name}
              style={{
                fontFamily: "var(--font-serif)", fontWeight: 400,
                fontSize: "clamp(3rem,7.5vw,9rem)",
                lineHeight: 0.9, letterSpacing: "-0.025em",
                color: "oklch(97% 0.012 70)",
                textShadow: "0 2px 80px oklch(10% 0.03 28 / 0.5), 0 0 120px oklch(55% 0.14 22 / 0.18)",
                margin: 0, textAlign: "center",
              }}
            >
              <div style={{ overflow: "hidden" }}>
                <span style={{ display: "block" }}>Imane</span>
              </div>
              <div style={{ overflow: "hidden" }}>
                <span style={{ display: "block", fontStyle: "italic", color: "oklch(84% 0.13 38)" }}>
                  Moumoun
                </span>
              </div>
            </h1>
          </div>
        </div>

        {/* ── W layer (hero_6) z:1 ── */}
        <div ref={wRef} aria-hidden style={layer(1)}>
          <img src={img("hero_6.avif")} alt="" style={imgBase} />
        </div>

        {/* ── Back layer (hero_5) z:-1 — sky background, barely moves ── */}
        <div ref={backRef} aria-hidden style={{ ...layer(-1), overflow: "hidden" }}>
          <img src={img("hero_5.avif")} alt="" style={imgBase} />
        </div>

      </section>
    </div>
  );
}

/* Shared layer container style */
function layer(z: number): React.CSSProperties {
  return { position: "absolute", inset: 0, zIndex: z, pointerEvents: "none", display: "block" };
}

/* Shared img style — fills container, anchored bottom-center */
const imgBase: React.CSSProperties = {
  width: "100%", height: "100%",
  objectFit: "cover", objectPosition: "50% 100%",
  display: "block",
};
