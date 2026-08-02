"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Real Osmo layered landscape images — transparent webp, 4 depth layers
const IMG = {
  bg:  "https://cdn.prod.website-files.com/671752cd4027f01b1b8f1c7f/6717795be09b462b2e8ebf71_osmo-parallax-layer-3.webp",
  mid: "https://cdn.prod.website-files.com/671752cd4027f01b1b8f1c7f/6717795b4d5ac529e7d3a562_osmo-parallax-layer-2.webp",
  fg:  "https://cdn.prod.website-files.com/671752cd4027f01b1b8f1c7f/6717795bb5aceca85011ad83_osmo-parallax-layer-1.webp",
};

export function ParallaxScrolling() {
  const outerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const outer = outerRef.current;
    if (!outer) return;

    const layersEl = outer.querySelector<HTMLElement>("[data-parallax-layers]");
    if (!layersEl) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        // Trigger on the OUTER wrapper (non-sticky) so GSAP measures positions correctly.
        // CSS sticky confuses ScrollTrigger when used as the trigger element itself.
        trigger: outer,
        start: "top top",
        end: "bottom bottom",
        scrub: 0,
      },
    });

    // bg drops fastest (feels far away), fg barely moves (feels close)
    [
      { layer: "1", yPercent: 70 },
      { layer: "2", yPercent: 55 },
      { layer: "3", yPercent: 40 },
      { layer: "4", yPercent: 10 },
    ].forEach(({ layer, yPercent }, idx) => {
      tl.to(
        layersEl.querySelectorAll(`[data-parallax-layer="${layer}"]`),
        { yPercent, ease: "none" },
        idx === 0 ? undefined : "<"
      );
    });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <div ref={outerRef}>
      <section aria-hidden="true" style={{ position: "relative" }}>
        {/* Sticky frame — stays at top while the extra 100vh below scrolls */}
        <div
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
            overflow: "hidden",
            // Dark fill for the gap that appears above layers as they slide down
            background: "oklch(11% 0.018 28)",
          }}
        >
          {/* 1px seam cover at top — prevents hairline gap between hero and this */}
          <div
            style={{
              position: "absolute",
              top: 0, left: 0, right: 0,
              height: "2px",
              background: "oklch(11% 0.018 28)",
              zIndex: 30,
              pointerEvents: "none",
            }}
          />

          {/* ── 4 stacked parallax layers ── */}
          <div
            data-parallax-layers
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          >
            {/* Layer 1 — sky / distant mountains, moves most (depth = far back) */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={IMG.bg}
              alt=""
              data-parallax-layer="1"
              loading="eager"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center top",
                zIndex: 1,
              }}
            />

            {/* Layer 2 — midground, medium speed */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={IMG.mid}
              alt=""
              data-parallax-layer="2"
              loading="eager"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center bottom",
                zIndex: 2,
              }}
            />

            {/* Layer 3 — "About" title: sits in the bright mountain zone (transparent area of layer 4) */}
            <div
              data-parallax-layer="3"
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "center",
                paddingTop: "8vh",
                zIndex: 3,
                pointerEvents: "none",
              }}
            >
              <h2
                aria-hidden="true"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontWeight: 400,
                  fontStyle: "italic",
                  fontSize: "clamp(6rem, 18vw, 20rem)",
                  lineHeight: 0.88,
                  letterSpacing: "-0.03em",
                  color: "oklch(96% 0.018 70)",
                  textShadow: "0 4px 60px oklch(10% 0.02 28 / 0.4)",
                  margin: 0,
                  textAlign: "center",
                  userSelect: "none",
                }}
              >
                About
              </h2>
            </div>

            {/* Layer 4 — foreground person/ground, barely moves (depth = in front) */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={IMG.fg}
              alt=""
              data-parallax-layer="4"
              loading="eager"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center bottom",
                zIndex: 4,
              }}
            />
          </div>

          {/* Bottom fade — dissolves into the About section (paper/cream) */}
          <div
            style={{
              position: "absolute",
              bottom: 0, left: 0, right: 0,
              height: "32%",
              background: "linear-gradient(to bottom, transparent, oklch(96% 0.03 78))",
              zIndex: 20,
              pointerEvents: "none",
            }}
          />
        </div>

        {/* Extra 100vh — the scroll distance GSAP uses to run the parallax animation */}
        <div style={{ height: "100vh" }} />
      </section>
    </div>
  );
}
