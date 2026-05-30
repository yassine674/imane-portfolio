import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { BackgroundGrid } from "@/components/layout/BackgroundGrid"
import { Hero } from "@/components/sections/Hero"
import { About } from "@/components/sections/About"
import { Experience } from "@/components/sections/Experience"
import { Projects } from "@/components/sections/Projects"
import { Skills } from "@/components/sections/Skills"
import { Extracurricular } from "@/components/sections/Extracurricular"
import { Contact } from "@/components/sections/Contact"

export default function Home() {
  return (
    <>
      <BackgroundGrid />
      <Header />
      <main className="relative z-10">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Extracurricular />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
