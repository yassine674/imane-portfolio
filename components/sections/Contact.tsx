"use client";
import React, { useRef, useState } from "react";
import { useScroll, useTransform } from "framer-motion";
import { personalInfo } from "@/lib/data";
import { GoogleGeminiEffect } from "@/components/ui/google-gemini-effect";
import ContactCards, { LinkedinIcon, XIcon } from "@/components/ui/contact-cards";
import { asset } from "@/lib/asset";

export function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [btnHovered, setBtnHovered] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end start"],
  });

  const pathLengthFirst  = useTransform(scrollYProgress, [0, 0.6], [0.05, 1.2]);
  const pathLengthSecond = useTransform(scrollYProgress, [0, 0.6], [0.04, 1.2]);
  const pathLengthThird  = useTransform(scrollYProgress, [0, 0.6], [0.03, 1.2]);
  const pathLengthFourth = useTransform(scrollYProgress, [0, 0.6], [0.01, 1.2]);
  const pathLengthFifth  = useTransform(scrollYProgress, [0, 0.6], [0, 1.2]);

  const handleCopy = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <section id="contact" aria-labelledby="ct-h" style={{ borderTop: "1px solid var(--border)" }}>
      <div
        ref={ref}
        style={{ height: "350vh", background: "#050505", position: "relative", overflow: "clip" }}
      >
        <div
          style={{
            position: "sticky", top: 0, height: "100vh",
            display: "flex", flexDirection: "column",
            justifyContent: "space-between", alignItems: "center",
            padding: "clamp(2.5rem, 5vw, 4rem) 0 1.5rem",
            zIndex: 10, pointerEvents: "none",
          }}
        >
          {/* TOP — badge + headline */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.9rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.55rem" }}>
              <span style={{ display: "block", width: 8, height: 8, borderRadius: "50%", background: "oklch(72% 0.2 145)", animation: "pulse 2s infinite", flexShrink: 0 }} />
              <span style={{ fontFamily: "var(--font-body)", fontSize: "0.6rem", letterSpacing: "0.22em", color: "rgba(255,255,255,0.5)", textTransform: "uppercase" }}>
                Available for projects
              </span>
            </div>

            <div
              style={{
                textAlign: "center", lineHeight: 1,
                transform: btnHovered ? "translateY(-10px)" : "translateY(0)",
                transition: "transform 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
              }}
            >
              <h2
                id="ct-h"
                style={{
                  fontFamily: "var(--font-display)", fontWeight: 300,
                  fontSize: "clamp(2.4rem, 6vw, 5.5rem)", letterSpacing: "-0.03em",
                  color: "rgba(255,255,255,0.9)", margin: 0, lineHeight: 1.05,
                }}
              >
                Let&apos;s work
              </h2>
              <div
                style={{
                  fontFamily: "var(--font-serif)", fontWeight: 400, fontStyle: "italic",
                  fontSize: "clamp(2.2rem, 5.8vw, 5.2rem)", letterSpacing: "-0.02em",
                  color: "rgba(255,255,255,0.22)", lineHeight: 1.05,
                }}
              >
                together
              </div>
            </div>
          </div>

          {/* BOTTOM — CTA + tagline + email */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
            <button
              data-magnetic
              onClick={handleCopy}
              onMouseEnter={() => setBtnHovered(true)}
              onMouseLeave={() => setBtnHovered(false)}
              style={{
                pointerEvents: "auto", cursor: "pointer",
                background: "#fff", border: "none",
                borderRadius: "100px", padding: "1rem 2.6rem",
                fontFamily: "var(--font-body)", fontWeight: 500,
                fontSize: "0.88rem", letterSpacing: "0.04em", color: "#0a0a0a",
                transition: "transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease",
                transform: btnHovered ? "scale(1.06)" : "scale(1)",
                boxShadow: btnHovered
                  ? "0 0 0 1px rgba(255,255,255,0.4), 0 0 45px rgba(255,255,255,0.3), 0 0 90px rgba(255,255,255,0.12)"
                  : "0 0 28px rgba(255,255,255,0.18), 0 0 60px rgba(255,255,255,0.07)",
              }}
              aria-label="Copy email address"
            >
              {copied ? "Copied ✓" : "Contact me"}
            </button>

            <p style={{ fontFamily: "var(--font-body)", fontSize: "clamp(0.72rem, 1vw, 0.85rem)", color: "rgba(255,255,255,0.28)", textAlign: "center", maxWidth: "38ch", lineHeight: 1.75, margin: 0 }}>
              Have a project in mind? I&apos;d love to hear about it.<br />
              Let&apos;s create something exceptional together.
            </p>

            <div style={{ pointerEvents: "auto", fontFamily: "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif", fontSize: "16px", marginTop: "3rem" }} className="dark">
              <ContactCards
                email={personalInfo.email}
                github={{
                  username: "imanemn127",
                  url: "https://github.com/imanemn127",
                  avatar: (
                    <img
                      src="https://github.com/imanemn127.png"
                      alt="imanemn127"
                      width={40}
                      height={40}
                      style={{ borderRadius: "50%", width: 40, height: 40, objectFit: "cover", flexShrink: 0 }}
                    />
                  ),
                }}
                links={[
                  {
                    label: "LinkedIn",
                    href: "https://www.linkedin.com/in/imane-moumoun/",
                    icon: <LinkedinIcon />,
                    card: (
                      <div style={{ width: '16rem', overflow: 'hidden' }}>
                        {/* Banner */}
                        <div style={{ height: '3.5rem', position: 'relative', overflow: 'hidden' }}>
                          <img
                            src={asset("/linkedin-banner.jpg")}
                            alt=""
                            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
                          />
                        </div>
                        {/* Avatar overlapping banner */}
                        <div style={{ padding: '0 1rem 0.6rem', position: 'relative' }}>
                          <img
                            src="https://github.com/imanemn127.png"
                            alt="Imane MOUMOUN"
                            width={56}
                            height={56}
                            style={{
                              borderRadius: '50%',
                              width: 56,
                              height: 56,
                              objectFit: 'cover',
                              border: '3px solid #18181b',
                              position: 'absolute',
                              top: -28,
                              left: '1rem',
                            }}
                          />
                          <div style={{ paddingTop: '2rem', display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                            <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>Imane MOUMOUN</span>
                            <span style={{ fontSize: '0.8rem', color: 'rgb(161 161 170)', lineHeight: 1.4 }}>AI &amp; ML Engineer · Mines Saint-Étienne → ENS Paris-Saclay</span>
                            <span style={{ fontSize: '0.75rem', color: 'rgb(113 113 122)', marginTop: '0.15rem' }}>Morocco · 500+ connections</span>
                          </div>
                        </div>
                      </div>
                    ),
                  },
                  {
                    label: "X",
                    href: "https://x.com/imanemn127",
                    icon: <XIcon />,
                    card: (
                      <div style={{ width: '16rem', padding: '0.8rem' }} className="flex items-center gap-3">
                        <img
                          src="https://github.com/imanemn127.png"
                          alt="imanemn127"
                          width={40}
                          height={40}
                          style={{ borderRadius: "50%", width: 40, height: 40, objectFit: "cover", flexShrink: 0 }}
                        />
                        <div className="flex flex-col">
                          <span className="font-medium">Imane MOUMOUN</span>
                          <span className="text-sm text-zinc-500">@imanemn127</span>
                        </div>
                      </div>
                    ),
                  },
                ]}
              />
            </div>
          </div>
        </div>

        {/* Animated lines */}
        <div style={{ position: "absolute", inset: 0, zIndex: 1, transform: "translateY(-5.5vh)" }}>
          <GoogleGeminiEffect
            pathLengths={[pathLengthFirst, pathLengthSecond, pathLengthThird, pathLengthFourth, pathLengthFifth]}
          />
        </div>
      </div>
    </section>
  );
}
