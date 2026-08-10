"use client";
import { useState, useEffect, useCallback } from "react";
import { useLang, t } from "@/lib/i18n";
import { Preloader } from "@/components/layout/Preloader";
import { Header } from "@/components/layout/Header";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { ScrollingFeatureShowcase } from "@/components/ui/ScrollingFeatureShowcase";
import { Contact } from "@/components/sections/Contact";
import { CurveDivider } from "@/components/layout/CurveDivider";
import { AliceScrollStory } from "@/components/ui/AliceScrollStory";
import { YanCursor } from "@/components/ui/YanCursor";


export default function Home() {
  const { lang } = useLang();
  const trP = t[lang].projects;
  const [loaded, setLoaded] = useState(false);
  const handleComplete = useCallback(() => setLoaded(true), []);

  useEffect(() => {
    const el = document.documentElement;
    el.style.overflowY = loaded ? "" : "hidden";
    return () => { el.style.overflowY = ""; };
  }, [loaded]);

  return (
    <>
      <YanCursor />
      <Preloader onComplete={handleComplete} />
      <ScrollProgress />
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
