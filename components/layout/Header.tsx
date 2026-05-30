"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion"
import { navLinks } from "@/lib/data"
import { cn } from "@/lib/utils"

export function Header() {
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)
  const [active,    setActive]    = useState("")
  const { scrollY } = useScroll()
  const toggleRef   = useRef<HTMLButtonElement>(null)
  const menuRef     = useRef<HTMLDivElement>(null)

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 60))

  /* ── Active section tracking ── */
  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.href.replace("#", ""))

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { threshold: 0.25, rootMargin: "-10% 0px -65% 0px" },
    )

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  /* ── Close on resize + Escape key ── */
  useEffect(() => {
    const close = () => setMenuOpen(false)
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && menuOpen) {
        setMenuOpen(false)
        toggleRef.current?.focus()
      }
    }
    window.addEventListener("resize", close)
    window.addEventListener("keydown", onKey)
    return () => {
      window.removeEventListener("resize", close)
      window.removeEventListener("keydown", onKey)
    }
  }, [menuOpen])

  /* ── Prevent body scroll when menu is open ── */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [menuOpen])

  /* ── Focus first menu link when opened ── */
  useEffect(() => {
    if (menuOpen) {
      const first = menuRef.current?.querySelector<HTMLAnchorElement>("a")
      first?.focus()
    }
  }, [menuOpen])

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "glass-strong py-4 border-b border-[rgba(0,255,209,0.06)]"
            : "py-7 bg-transparent",
        )}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link href="#" aria-label="Imane MOUMOUN">
            <motion.span
              className="font-impact text-2xl text-[#EDE8DC] tracking-tight"
              whileHover={{ color: "#00FFD1" }}
              transition={{ duration: 0.25 }}
            >
              IM<span className="text-[#00FFD1]">.</span>
            </motion.span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {navLinks.map((link) => {
              const isActive = active === link.href.replace("#", "")
              return (
                <motion.a
                  key={link.href}
                  href={link.href}
                  data-cursor-hover
                  className={cn(
                    "font-mono text-[11px] tracking-[0.15em] uppercase relative group transition-colors duration-300",
                    isActive ? "text-[#00FFD1]" : "text-[#8B8FA8] hover:text-[#00FFD1]",
                  )}
                  whileHover={{ y: -1 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                >
                  {link.label}
                  {/* underline */}
                  <span
                    className={cn(
                      "absolute -bottom-0.5 left-0 right-0 h-px bg-[#00FFD1] transition-transform duration-300 origin-left",
                      isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                    )}
                  />
                  {/* active dot */}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#00FFD1]"
                      style={{ boxShadow: "0 0 8px rgba(0,255,209,0.8)" }}
                    />
                  )}
                </motion.a>
              )
            })}
          </nav>

          {/* CTA */}
          <motion.a
            href="mailto:imanemn127@gmail.com"
            data-cursor-hover
            className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[rgba(0,255,209,0.22)] text-[#00FFD1] text-xs font-mono tracking-wider uppercase hover:bg-[rgba(0,255,209,0.08)] hover:border-[#00FFD1] transition-all duration-300"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2 }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#4ADE80] animate-pulse" />
            Open to work
          </motion.a>

          {/* Mobile toggle */}
          <button
            ref={toggleRef}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="md:hidden w-8 h-8 flex flex-col items-center justify-center gap-1.5"
          >
            <span className={cn("w-6 h-[1.5px] bg-[#EDE8DC] transition-all duration-400 origin-center", menuOpen && "rotate-45 translate-y-[5px]")} />
            <span className={cn("w-6 h-[1.5px] bg-[#EDE8DC] transition-all duration-300", menuOpen && "opacity-0 scale-x-0")} />
            <span className={cn("w-6 h-[1.5px] bg-[#EDE8DC] transition-all duration-400 origin-center", menuOpen && "-rotate-45 -translate-y-[5px]")} />
          </button>
        </div>
      </motion.header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            ref={menuRef}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0%   0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 glass-strong flex flex-col items-center justify-center gap-10"
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={() => { setMenuOpen(false); toggleRef.current?.focus() }}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0,   y: 20 }}
                transition={{ delay: i * 0.06, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="font-impact text-5xl text-[#EDE8DC] hover:text-[#00FFD1] transition-colors tracking-wide"
              >
                {link.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
