"use client";
import { useState, useEffect } from "react";
import { Preloader } from "@/components/layout/Preloader";
import { Header } from "@/components/layout/Header";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { ScrollFX } from "@/components/layout/ScrollFX";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { ScrollingFeatureShowcase } from "@/components/ui/interactive-scrolling-story-component";
import { Contact } from "@/components/sections/Contact";
import { CurveDivider } from "@/components/layout/CurveDivider";
import { AliceScrollStory } from "@/components/ui/alice-scroll-story";
import { MagneticCursor } from "@/components/ui/magnetic-cursor";

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (loaded) {
      document.documentElement.style.overflow = "";
    } else {
      document.documentElement.style.overflow = "hidden";
    }
    return () => { document.documentElement.style.overflow = ""; };
  }, [loaded]);

  return (
    <MagneticCursor
      magneticFactor={0.45}
      cursorSize={32}
      blendMode="difference"
      cursorColor="white"
      lerpAmount={0.12}
      speedMultiplier={0.025}
      contrastBoost={1}
    >
      <Preloader onComplete={() => setLoaded(true)} />
      <ScrollProgress />
      <ScrollFX />
      <div
        style={{
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.4s ease",
          pointerEvents: loaded ? "auto" : "none",
        }}
      >
        <Header />
        <main id="main-content" tabIndex={-1}>
          <Hero />
          <About />
          <Experience />
          <AliceScrollStory
            wordA="SELECTED"
            wordB="WORKS"
            eyebrow="a collection of case studies"
          />
          <CurveDivider from="dark" to="paper" accent="oklch(70% 0.22 48)" />
          <ScrollingFeatureShowcase />
          <CurveDivider from="paper" to="dark" />
          <Contact />
        </main>
      </div>
    </MagneticCursor>
  );
}
