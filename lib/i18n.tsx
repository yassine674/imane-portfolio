"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

export type Lang = "en" | "fr"

interface LangCtx {
  lang: Lang
  toggle: () => void
}

const Ctx = createContext<LangCtx>({ lang: "en", toggle: () => {} })

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en")

  useEffect(() => {
    const stored = localStorage.getItem("lang") as Lang | null
    if (stored === "en" || stored === "fr") setLang(stored)
  }, [])

  const toggle = () => {
    setLang((prev) => {
      const next: Lang = prev === "en" ? "fr" : "en"
      localStorage.setItem("lang", next)
      return next
    })
  }

  return <Ctx.Provider value={{ lang, toggle }}>{children}</Ctx.Provider>
}

export function useLang() {
  return useContext(Ctx)
}

/* ── Translations ── */
export const t = {
  en: {
    nav: { about: "About", experience: "Experience", projects: "Projects", skills: "Skills", contact: "Contact" },
    hero: {
      role: "AI & ML Engineer · Gardanne, France",
      subtitle: "Building intelligent systems at the intersection of deep learning, computer vision, and edge AI",
      cta1: "View Projects",
      cta2: "Let's talk",
    },
    projects: {
      label: "03 — Work",
      suptitle: "selected",
      title: "WORK",
      sub: "Research prototypes, deployed systems, hackathon wins — six projects that matter.",
    },
    contact: {
      heading1: "Let's",
      heading2: "collaborate",
      heading3: "on something great.",
    },
    footer: {
      copy: "© 2026 Imane MOUMOUN — All rights reserved",
    },
  },
  fr: {
    nav: { about: "À propos", experience: "Expérience", projects: "Projets", skills: "Compétences", contact: "Contact" },
    hero: {
      role: "Ingénieure IA & ML · Gardanne, France",
      subtitle: "Construire des systèmes intelligents à l'intersection du deep learning, de la vision par ordinateur et de l'IA embarquée",
      cta1: "Voir les projets",
      cta2: "Discutons",
    },
    projects: {
      label: "03 — Travaux",
      suptitle: "sélection",
      title: "PROJETS",
      sub: "Prototypes de recherche, systèmes déployés, prix hackathon — six projets qui comptent.",
    },
    contact: {
      heading1: "Collaborons",
      heading2: "ensemble",
      heading3: "sur quelque chose de grand.",
    },
    footer: {
      copy: "© 2026 Imane MOUMOUN — Tous droits réservés",
    },
  },
} as const
