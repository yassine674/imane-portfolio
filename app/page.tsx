"use client";
import { useState, useEffect } from "react";
import { Preloader } from "@/components/layout/Preloader";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CursorFollower } from "@/components/layout/CursorFollower";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { ScrollFX } from "@/components/layout/ScrollFX";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Contact } from "@/components/sections/Contact";
import { MarqueeBand } from "@/components/sections/MarqueeBand";
import { CurveDivider } from "@/components/layout/CurveDivider";

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
    <>
      <Preloader onComplete={() => setLoaded(true)} />
      <CursorFollower />
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
          <MarqueeBand />
          <CurveDivider from="dark" to="paper" accent="oklch(70% 0.22 48)" />
          <About />
          <CurveDivider from="paper" to="dark" />
          <Experience />
          <Projects />
          <CurveDivider from="dark" to="paper" accent="oklch(70% 0.22 48)" />
          <Skills />
          <CurveDivider from="paper" to="dark" />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
