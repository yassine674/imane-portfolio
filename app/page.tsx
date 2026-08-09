"use client";
import { useState, useEffect, useCallback } from "react";
import { useLang, t } from "@/lib/i18n";
import { Preloader } from "@/components/layout/Preloader";
import { Header } from "@/components/layout/Header";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { ScrollFX } from "@/components/layout/ScrollFX";
import { Hero, About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { ScrollingFeatureShowcase } from "@/components/ui/interactive-scrolling-story-component";
import { Contact } from "@/components/sections/Contact";
import { CurveDivider } from "@/components/layout/CurveDivider";
import { AliceScrollStory } from "@/components/ui/alice-scroll-story";
import { YanCursor } from "@/components/ui/yan-cursor";


export default function Home() {
  const { lang } = useLang();
  const trP = t[lang].projects;
  const [loaded, setLoaded] = useState(false);
  const handleComplete = useCallback(() => setLoaded(true), []);

  useEffect(() => {
    if (loaded) {
      document.documentElement.style.overflow = "";
    } else {
      document.documentElement.style.overflow = "hidden";
    }
    return () => { document.documentElement.style.overflow = ""; };
  }, [loaded]);

  return (
    <>
      <YanCursor />
      <Preloader onComplete={handleComplete} />
      <ScrollProgress />
      <ScrollFX />
      <div
        style={{
          pointerEvents: loaded ? "auto" : "none",
        }}
      >
        <Header />
        <main id="main-content" tabIndex={-1}>
          <Hero />
          <About />
          <Experience />
          <AliceScrollStory
            wordA={trP.aliceWordA}
            wordB={trP.aliceWordB}
            eyebrow={trP.aliceEyebrow}
          />
          <CurveDivider from="dark" to="paper" accent="oklch(70% 0.22 48)" />
          <ScrollingFeatureShowcase />
          <CurveDivider from="paper" to="dark" />
          <Contact />
        </main>
      </div>
    </>
  );
}
