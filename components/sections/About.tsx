"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useLang, t } from "@/lib/i18n";
import { asset } from "@/lib/asset";

/* ─── exact Yan Liu body background ─── */
const GRID: React.CSSProperties = {
  backgroundColor: "#faf8f5",
  backgroundImage:
    "linear-gradient(hsla(36,31%,69%,.25) 1px,transparent 0)," +
    "linear-gradient(90deg,hsla(36,31%,69%,.25) 1px,transparent 0)",
  backgroundSize: "56px 56px",
};

/* ═══════════════════════════════════════════════════════
   BADGE
══════════════════════════════════════════════════════════ */
function Badge() {
  const [flipped, setFlipped] = useState(false);
  const [landed,  setLanded]  = useState(false);

  return (
    <motion.div
      className="hidden lg:flex flex-col items-center absolute z-30"
      style={{ left: 65, top: -0.5 }}
      initial={{ y: -520, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        y:       { type: "spring", stiffness: 110, damping: 9, mass: 1.3, delay: 0.3 },
        opacity: { duration: 0.01, delay: 0.3 },
      }}
      onAnimationComplete={() => setLanded(true)}
    >
      <div className={landed ? "badge-swing" : ""} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>

        {/* lanyard strip */}
        <div style={{ width: 26, height: 220, background: "#292524", position: "relative", boxShadow: "0 2px 6px rgba(0,0,0,0.3)", zIndex: 0 }}>
          <div style={{ position: "absolute", inset: 0, opacity: 0.2, backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(255,255,255,0.3) 2px,rgba(255,255,255,0.3) 3px)" }} />
          <span style={{ position: "absolute", bottom: "38%", left: "50%", transform: "translateX(-50%) rotate(-90deg)", fontFamily: "monospace", fontSize: 6, fontWeight: 700, color: "rgba(255,255,255,0.45)", letterSpacing: "0.22em", textTransform: "uppercase", whiteSpace: "nowrap", userSelect: "none" }}>
            imane.ai
          </span>
        </div>

        {/* card */}
        <div onClick={() => setFlipped(f => !f)} style={{ width: 210, marginTop: -30, position: "relative", perspective: 800, cursor: "pointer" }}>
          <motion.div
            animate={{ rotateY: flipped ? 180 : 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            style={{ transformStyle: "preserve-3d", position: "relative" }}
          >
            {/* front */}
            <div style={{ background: "linear-gradient(170deg,#57534e 0%,#44403c 15%,#292524 60%,#1c1917 100%)", borderRadius: 12, padding: 6, borderTop: "1.5px solid rgba(255,255,255,0.15)", borderLeft: "1px solid rgba(255,255,255,0.08)", borderRight: "1px solid rgba(0,0,0,0.3)", borderBottom: "2px solid rgba(0,0,0,0.4)", transform: "rotateX(1deg)", transformStyle: "preserve-3d", backfaceVisibility: "hidden" }}>
              <div style={{ position: "absolute", inset: 0, borderRadius: 12, pointerEvents: "none", zIndex: 20, background: "linear-gradient(115deg,rgba(255,255,255,0.12) 0%,rgba(255,255,255,0.04) 15%,transparent 40%,transparent 85%,rgba(255,255,255,0.03) 100%)" }} />
              <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 26, height: 22, background: "#292524", zIndex: 0, borderRadius: "0 0 4px 4px" }} />
              <div style={{ position: "relative", zIndex: 10, display: "flex", justifyContent: "center", paddingTop: 4 }}>
                <div style={{ width: 32, height: 6, borderRadius: 999, border: "1px solid rgba(87,83,78,0.5)", background: "linear-gradient(180deg,#1c1917,#292524)", boxShadow: "inset 0 1px 2px rgba(0,0,0,0.5)" }} />
              </div>
              <div style={{ borderRadius: 8, overflow: "hidden", position: "relative", zIndex: 10, borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(0,0,0,0.3)" }}>
                <div style={{ padding: "14px 16px", position: "relative", background: "linear-gradient(175deg,#6b6560 0%,#57534e 20%,#44403c 100%)" }}>
                  <div style={{ position: "absolute", inset: 0, opacity: 0.12, backgroundImage: "radial-gradient(circle,rgba(255,255,255,0.8) 1px,transparent 1px)", backgroundSize: "18px 18px" }} />
                  <div style={{ position: "relative", zIndex: 10 }}>
                    <h3 style={{ color: "#fff", fontWeight: 800, fontSize: 22, lineHeight: 1.05, letterSpacing: "0.06em", margin: 0 }}>Imane M.</h3>
                    <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 10, letterSpacing: "0.04em", marginTop: 7, lineHeight: 1.6, margin: "7px 0 0" }}>
                      AI Engineer · builder,<br />researcher &amp; explorer.
                    </p>
                  </div>
                </div>
                <div style={{ padding: "18px 16px", display: "flex", flexDirection: "column", alignItems: "center", background: "linear-gradient(180deg,#1c1917,#0c0a09)" }}>
                  <div style={{ width: 120, height: 120, borderRadius: "50%", border: "3px solid #57534e", overflow: "hidden", background: "#3a3530", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                    {/* GitHub avatar — always up-to-date, no file needed */}
                    <img
                      src="https://github.com/imanemn127.png"
                      alt="Imane Moumoun"
                      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
                      draggable={false}
                      onError={e => { (e.target as HTMLImageElement).style.display = "none"; }}
                    />
                  </div>
                  <p style={{ color: "rgba(255,255,255,0.25)", fontSize: 9, marginTop: 8, letterSpacing: "0.12em", textTransform: "uppercase" }}>click to flip</p>
                </div>
              </div>
            </div>

            {/* back — quote */}
            <div style={{ position: "absolute", inset: 0, backfaceVisibility: "hidden", transform: "rotateY(180deg)", background: "linear-gradient(170deg,#1c1917 0%,#0c0a09 100%)", borderRadius: 12, padding: "22px 18px", border: "1.5px solid rgba(255,255,255,0.08)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16 }}>
              <span style={{ fontSize: 22, opacity: 0.4 }}>&ldquo;</span>
              <p style={{ color: "rgba(255,255,255,0.82)", fontSize: 11.5, lineHeight: 1.75, textAlign: "center", fontStyle: "italic", letterSpacing: "0.02em", margin: 0 }}>
                The most beautiful thing about intelligence is that it is never finished — it only grows deeper with every question asked.
              </p>
              <span style={{ fontSize: 9, color: "rgba(255,255,255,0.28)", letterSpacing: "0.18em", textTransform: "uppercase", marginTop: 4 }}>— Imane M.</span>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════
   RIPPED PAPER — plant / coffee / pencil
══════════════════════════════════════════════════════════ */
function RippedPaper() {
  const [pencilHov, setPencilHov] = useState(false);
  return (
    <div
      className="absolute z-20 hero-entrance group/paper"
      style={{ top: 20, left: "50%", transform: "translateX(-50%) rotate(-5deg)", animation: "hero-fade-in 0.7s cubic-bezier(0.4,0,0.2,1) 0.5s both", willChange: "transform" }}
    >
      <div className="group-hover/paper:scale-110 group-hover/paper:rotate-[1deg]" style={{ transition: "all 0.3s ease-out" }}>
        <img src={asset("/about/ripped-paper.png")} alt="" draggable={false}
          style={{ width: "clamp(240px,30vw,380px)", filter: "drop-shadow(0 6px 20px rgba(0,0,0,0.25))" }}
        />
        <div style={{ position: "absolute", top: "50%", left: "55%", transform: "translate(-50%,-50%)" }}>
          <img src={asset("/about/ice-coffee.png")} alt="Ice coffee" draggable={false} className="coffee-wobble"
            style={{ width: "clamp(40px,5vw,65px)", filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.2))" }}
          />
        </div>
        <div style={{ position: "absolute", top: "70%", left: "16%", transform: "translate(-50%,-50%) scale(1.45) rotate(-5deg) translateY(-3px)" }}>
          <img src={asset("/about/plant.png")} alt="Plant" draggable={false} className="plant-hover"
            style={{ width: "clamp(75px,9vw,118px)", filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.2))" }}
          />
        </div>
        <div
          style={{ position: "absolute", top: "50%", left: "80%", transform: "translate(-50%,-50%)" }}
          onMouseEnter={() => setPencilHov(true)} onMouseLeave={() => setPencilHov(false)}
        >
          <img src={asset("/about/apple-pencil.png")} alt="Apple Pencil" draggable={false}
            style={{ width: "clamp(32px,4vw,54px)", filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.2))", transition: "all 0.3s", transform: pencilHov ? "scale(1.1) translateY(-8px)" : "scale(1)" }}
          />
          <div style={{ position: "absolute", bottom: -6, left: 0, width: "clamp(55px,7vw,90px)", height: 12, overflow: "hidden", pointerEvents: "none" }}>
            <img src={asset("/about/hand-drawn-line.svg")} alt="" draggable={false}
              style={{ width: "100%", height: "100%", objectFit: "contain", clipPath: pencilHov ? "inset(0 0 0 0)" : "inset(0 100% 0 0)", transition: "clip-path 1s linear" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   FLOWER
══════════════════════════════════════════════════════════ */
function Flower() {
  const [hov, setHov] = useState(false);
  return (
    <div
      className="hidden lg:block absolute z-20 hero-entrance"
      style={{ left: 410, top: 355, animation: "hero-pop 0.7s cubic-bezier(0.4,0,0.2,1) 0.8s both" }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
    >
      <div style={{ position: "relative", width: "clamp(55px,6vw,80px)", transform: `rotate(-6deg)${hov ? " scale(1.8) translateY(-24px)" : ""}`, transformOrigin: "bottom center", transition: "transform 0.5s ease-out", willChange: "transform", zIndex: hov ? 40 : "auto" }}>
        <img src={asset("/about/flower.png")} alt="" draggable={false} style={{ width: "100%", opacity: hov ? 0 : 1, transition: "opacity 0.5s" }} />
        <img src={asset("/about/flower-hover.png")} alt="" draggable={false}
          style={{ position: "absolute", inset: 0, width: "100%", opacity: hov ? 1 : 0, transition: "opacity 0.5s", animation: hov ? "flower-glitch 1.5s ease-in-out infinite" : "none" }}
        />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   TICKET
══════════════════════════════════════════════════════════ */
function Ticket() {
  const [hov, setHov] = useState(false);
  return (
    <div
      className="hidden lg:block absolute z-30 hero-entrance"
      style={{ right: 80, top: 100, width: "clamp(160px,20vw,260px)", rotate: "4deg", animation: "hero-slide-right 0.7s cubic-bezier(0.4,0,0.2,1) 0.9s both", willChange: "transform" }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
    >
      <div style={{ transform: hov ? "scale(1.5) rotate(1deg)" : "scale(1)", transition: "transform 0.3s ease-out" }}>
        <img src={asset("/about/ticket.jpg")} alt="Design x Technology" draggable={false} style={{ width: "100%", borderRadius: 4, opacity: 0.95 }} />
        {hov && (
          <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", borderRadius: 4 }}>
            <div style={{ position: "absolute", top: 0, left: "-100%", width: "100%", height: "100%", animation: "ticket-scan 2.2s ease-in-out infinite", background: "linear-gradient(90deg,transparent 0%,rgba(255,100,100,0.08) 25%,rgba(255,200,50,0.12) 35%,rgba(100,255,150,0.12) 45%,rgba(255,255,255,0.3) 50%,rgba(100,180,255,0.12) 55%,transparent 100%)", filter: "blur(1.5px)" }} />
          </div>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   COLLAGE + CAT
══════════════════════════════════════════════════════════ */
function CollageAndCat() {
  const [hov, setHov] = useState(false);
  return (
    <div
      className="hidden lg:block absolute z-10 hero-entrance"
      style={{ right: -20, top: 195, rotate: "6deg", animation: "hero-fade-in 0.7s cubic-bezier(0.4,0,0.2,1) 1.0s both", willChange: "transform" }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
    >
      <div style={{ position: "relative", overflow: "visible", transform: hov ? "scale(1.05) rotate(2deg)" : "scale(1)", transition: "transform 0.3s ease-out" }}>
        <img src={asset("/about/cat.png")} alt="Cat peeking" draggable={false}
          style={{ position: "absolute", top: "28%", right: "8%", width: "clamp(90px,11vw,145px)", zIndex: 2, transform: hov ? "scale(1) rotate(8deg) translateY(-12px)" : "scale(0)", opacity: hov ? 1 : 0, transition: "transform 0.5s cubic-bezier(0.34,1.56,0.64,1),opacity 0.4s", filter: "drop-shadow(0 8px 20px rgba(0,0,0,0.3))", transformOrigin: "center bottom" }}
        />
        <img src={asset("/about/image-collage.jpg")} alt="Photo collage" draggable={false}
          style={{ width: "clamp(155px,18vw,240px)", borderRadius: 10, display: "block", boxShadow: "0 4px 20px rgba(0,0,0,0.15)" }}
        />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   VINYL
══════════════════════════════════════════════════════════ */
function Vinyl() {
  const [hov, setHov] = useState(false);
  return (
    <div
      className="hidden lg:block absolute z-30 group/vinyl hero-entrance"
      style={{ left: 40, top: 410, rotate: "-5deg", overflow: "visible", animation: "hero-slide-left 0.7s cubic-bezier(0.4,0,0.2,1) 0.7s both", transition: "all 0.3s ease-out", willChange: "transform" }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
    >
      <div style={{ position: "relative", width: "clamp(150px,16vw,200px)", overflow: "visible" }}>
        <div style={{ position: "absolute", inset: "0 0 auto", top: 24, display: "flex", justifyContent: "center", zIndex: 10, pointerEvents: "none", overflow: "visible" }}>
          <img
            src={asset("/about/vinyl.png")} alt="Vinyl record" draggable={false}
            style={{ width: "clamp(96px,10vw,130px)", height: "clamp(96px,10vw,130px)", willChange: "transform", transition: "transform 0.5s ease-out,filter 0.5s ease-out", transform: hov ? "scale(2.3) translateY(-70px) translateX(-20px)" : "scale(1)", filter: hov ? "drop-shadow(0 12px 30px rgba(0,0,0,0.35))" : "none", animation: hov ? "vinyl-spin 12s linear infinite" : "none" }}
          />
        </div>
        <div style={{ position: "absolute", inset: -1, borderRadius: 16, opacity: hov ? 1 : 0, transition: "opacity 0.4s", pointerEvents: "none", background: "conic-gradient(from var(--vinyl-angle),#39FF14,#FAEF5D,transparent,transparent,#39FF14)", animation: "vinyl-border-rotate 3s linear infinite" }} />
        <div style={{ position: "relative", background: "#fff", borderRadius: 16, border: "1px solid #e7e5e4", boxShadow: "0 2px 8px rgba(0,0,0,0.08)", display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 24, paddingBottom: 24 }}>
          <div style={{ position: "absolute", inset: 0, borderRadius: 16, overflow: "hidden", pointerEvents: "none", opacity: hov ? 1 : 0, transition: "opacity 0.5s ease-out" }}>
            <div className="vinyl-blob vinyl-blob-1" />
            <div className="vinyl-blob vinyl-blob-2" />
            <div className="vinyl-blob vinyl-blob-3" />
          </div>
          <div style={{ width: "clamp(96px,10vw,130px)", height: "clamp(96px,10vw,130px)" }} />
          <div style={{ position: "relative", zIndex: 1, marginTop: 14, textAlign: "center" }}>
            <p style={{ fontSize: 10, color: "#a8a29e", textTransform: "uppercase", letterSpacing: "0.18em", marginBottom: 4 }}>Playlist</p>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: "#1c1917", lineHeight: 1.2, margin: "0 0 4px" }}>Study &amp; Focus</h3>
            <p style={{ fontSize: 11, color: "#a8a29e", margin: 0 }}>∞ songs and counting</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   FOLDER — mac folder, items fly out on hover
   Position: left-[400px] top-[560px] (Yan Liu exact)
══════════════════════════════════════════════════════════ */
function Folder() {
  const [hov, setHov] = useState(false);
  return (
    <div
      className="hidden lg:block absolute z-30 hero-entrance"
      style={{ left: 400, top: 545, rotate: "6deg", perspective: 500, animation: "hero-slide-up 0.7s cubic-bezier(0.4,0,0.2,1) 1.2s both", willChange: "transform", transition: "all 0.3s ease-out", cursor: "pointer" }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
    >
      <div style={{
        position: "relative", width: 155, height: 155,
        filter: hov ? "drop-shadow(0 8px 16px rgba(0,0,0,0.25))" : "none",
        transition: "filter 0.3s ease-out",
      }}>
        <img src={asset("/about/mac-folder-back.svg")} alt="" draggable={false} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 0 }} />
        {/* iPad + notebook → upper-left (Yan Liu exact: translateX(-140px) translateY(-75px)) */}
        <img src={asset("/about/ipad-notebook.svg")} alt="iPad and notebook" draggable={false}
          style={{ position: "absolute", left: "50%", bottom: "30%", width: 105, transform: hov ? "translateX(-140px) translateY(-75px) rotate(-15deg)" : "translateX(-50%)", opacity: hov ? 1 : 0, transition: "all 0.5s ease-out", filter: "drop-shadow(0 6px 12px rgba(0,0,0,0.25))", zIndex: 25 }}
        />
        {/* Claude logo → upper-center (Yan Liu exact: translateX(-30px) translateY(-95px)) */}
        <img src={asset("/about/claude-logo.svg")} alt="Claude" draggable={false}
          style={{ position: "absolute", left: "50%", bottom: "30%", width: 65, transform: hov ? "translateX(-30px) translateY(-95px) rotate(5deg)" : "translateX(-50%)", opacity: hov ? 1 : 0, transition: "all 0.5s ease-out 75ms", filter: "drop-shadow(0 6px 12px rgba(0,0,0,0.25))", zIndex: 25 }}
        />
        {/* laptop → upper-right (Yan Liu exact: translateX(40px) translateY(-65px)) */}
        <img src={asset("/about/laptop.svg")} alt="Laptop" draggable={false}
          style={{ position: "absolute", left: "50%", bottom: "30%", width: 105, transform: hov ? "translateX(40px) translateY(-65px) rotate(10deg)" : "translateX(-50%)", opacity: hov ? 1 : 0, transition: "all 0.5s ease-out 150ms", filter: "drop-shadow(0 6px 12px rgba(0,0,0,0.25))", zIndex: 25 }}
        />
        <img src={asset("/about/mac-folder-front.svg")} alt="Folder" draggable={false}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 20, transition: "transform 0.5s ease-out", transformOrigin: "bottom center", transform: hov ? "rotateX(-22deg)" : "none" }}
        />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   TERMINAL — whoami typewriter
   Position: right-[310px] top-[500px] (Yan Liu exact)
══════════════════════════════════════════════════════════ */
const TERMINAL_LINES = [
  { prompt: "$ whoami",    output: "AI & ML Engineer · ENS Paris-Saclay" },
  { prompt: "$ ls interests/", output: "AI/maths/chess/languages/travel" },
];

function Terminal() {
  const [lines, setLines] = useState<string[]>([]);
  const [hov, setHov]     = useState(false);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    let delay = 800;
    TERMINAL_LINES.forEach((item, i) => {
      for (let c = 1; c <= item.prompt.length; c++) {
        const ci = c;
        timers.push(setTimeout(() => {
          setLines(prev => { const next = [...prev]; next[2*i] = item.prompt.slice(0, ci); return next; });
        }, delay));
        delay += 28;
      }
      delay += 220;
      timers.push(setTimeout(() => {
        setLines(prev => { const next = [...prev]; next[2*i+1] = item.output; return next; });
      }, delay));
      delay += 380;
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  const done = lines.length > 0 && lines[2*TERMINAL_LINES.length-1] !== undefined;

  return (
    <div
      className="hidden lg:block absolute z-20 hero-entrance"
      style={{ right: 310, top: 490, animation: "hero-slide-up 0.7s cubic-bezier(0.4,0,0.2,1) 1.35s both" }}
      onMouseEnter={() => done && setHov(true)} onMouseLeave={() => setHov(false)}
    >
      <div style={{ width: 340, transform: hov ? "scale(1.05)" : "scale(1)", transition: "transform 0.3s ease-out", cursor: done ? "pointer" : "default" }}>
        <div style={{ borderRadius: 10, overflow: "hidden", background: "#ffffff", boxShadow: "0 4px 20px rgba(0,0,0,0.15),0 1px 3px rgba(0,0,0,0.1)", border: "1px solid #e7e5e4" }}>
          {/* title bar */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "6px 12px", background: "linear-gradient(to bottom,#FAFAF9,#F0EFED)", borderBottom: "1px solid #e7e5e4" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              {[["#FF5F57","#E0443E"],["#FEBC2E","#DEA123"],["#28C840","#1AAB29"]].map(([bg,brd]) => (
                <div key={bg} style={{ width: 11, height: 11, borderRadius: "50%", background: bg, border: `1px solid ${brd}` }} />
              ))}
            </div>
            <span style={{ fontSize: 11, color: "#a8a29e", userSelect: "none" }}>imane — zsh</span>
            <div style={{ width: 52 }} />
          </div>

          {/* terminal body */}
          <div style={{ padding: 12, fontFamily: "monospace", fontSize: 11, lineHeight: 1.7, minHeight: 140, background: "#fff" }}>
            {TERMINAL_LINES.map((item, i) => (
              <div key={i}>
                {lines[2*i] !== undefined && (
                  <div style={{ color: "#1c1917" }}>
                    <span style={{ color: "#16a34a" }}>~</span>{" "}{lines[2*i]}
                    {lines[2*i+1] === undefined && (
                      <span style={{ display: "inline-block", width: 6, height: 12, background: "#a8a29e", marginLeft: 1, verticalAlign: "text-bottom", animation: "blink 1s step-end infinite" }} />
                    )}
                  </div>
                )}
                {lines[2*i+1] !== undefined && (
                  <div style={{ color: "#78716c", marginBottom: 4 }}>{lines[2*i+1]}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   CENTER NAME — two lines
══════════════════════════════════════════════════════════ */
function CenterName({ tagline }: { tagline: string }) {
  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 15, pointerEvents: "none" }}>
      <motion.div
        style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, pointerEvents: "none" }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.85, delay: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div style={{ textAlign: "center", userSelect: "none", lineHeight: 1.05 }}>
          <div style={{ fontFamily: "var(--font-script)", fontSize: "clamp(54px,6.5vw,92px)", fontWeight: 400, color: "#1c1917", letterSpacing: "-0.01em" }}>
            Imane
          </div>
          <div style={{ fontFamily: "var(--font-script)", fontSize: "clamp(54px,6.5vw,92px)", fontWeight: 400, color: "#1c1917", letterSpacing: "-0.01em", marginTop: "-0.1em" }}>
            Moumoun
          </div>
        </div>
        <p style={{ fontSize: "clamp(8px,0.8vw,11px)", letterSpacing: "0.22em", textTransform: "uppercase", color: "#78716c", margin: 0, userSelect: "none", fontFamily: "'Noto Sans',system-ui,sans-serif" }}>
          {tagline}
        </p>
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   STICKY NOTE SECTION
══════════════════════════════════════════════════════════ */
function StickyNoteSection({ bio }: { bio: string }) {
  return (
    <div style={{ ...GRID, position: "relative", minHeight: "50vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "clamp(4rem,9vw,7rem) clamp(1.5rem,5vw,4rem)", gap: "clamp(2rem,4vw,3rem)" }}>
      {[{ top: 24, left: 24 }, { top: 24, right: 24 }, { bottom: 24, left: 24 }, { bottom: 24, right: 24 }].map((pos, i) => (
        <div key={i} style={{ position: "absolute", ...pos, width: 20, height: 20, opacity: 0.22, pointerEvents: "none" }}>
          <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: 1, background: "#a8a29e", transform: "translateY(-50%)" }} />
          <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 1, background: "#a8a29e", transform: "translateX(-50%)" }} />
        </div>
      ))}
      <motion.div
        initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }} viewport={{ once: true }}
      >
        <div
          style={{ position: "relative", background: "#FFF3A3", borderRadius: 3, width: "min(560px,90vw)", boxShadow: "0 8px 32px rgba(0,0,0,0.13),0 2px 6px rgba(0,0,0,0.07)", transform: "rotate(3deg)", overflow: "hidden", transition: "transform 0.25s ease, box-shadow 0.25s ease", cursor: "default" }}
          onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = "rotate(1.5deg) translateY(-4px)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 14px 40px rgba(0,0,0,0.16),0 4px 10px rgba(0,0,0,0.09)"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = "rotate(3deg)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 32px rgba(0,0,0,0.13),0 2px 6px rgba(0,0,0,0.07)"; }}
        >
          {/* Glue-edge top strip */}
          <div style={{ background: "#F0DC6A", height: 44, display: "flex", alignItems: "center", justifyContent: "center", borderBottom: "1px solid rgba(60,30,10,0.08)" }}>
            <span style={{ fontSize: "1.4rem", lineHeight: 1 }}>🌸</span>
          </div>

          {/* Ruled lines */}
          <div style={{ position: "absolute", top: 44, left: 0, right: 0, bottom: 0, pointerEvents: "none" }}>
            {[44, 77, 110, 143, 176, 209, 242, 275].map(top => (
              <div key={top} style={{ position: "absolute", top, left: 20, right: 20, height: 1, background: "rgba(60,30,10,0.07)" }} />
            ))}
          </div>

          {/* Text content */}
          <div style={{ position: "relative", zIndex: 1, padding: "clamp(1.4rem,3vw,1.8rem) clamp(1.8rem,4vw,2.6rem) clamp(2rem,5vw,2.8rem)" }}>
            <p style={{ fontFamily: "var(--font-handwriting)", fontSize: "clamp(17px,1.9vw,23px)", lineHeight: 1.85, color: "#3d2f0e", margin: 0 }}>
              Curious mind doing a Master&rsquo;s in AI at ENS Paris-Saclay — where I get to ask the hard questions and build the tools that try to answer them. I am passionate about intelligence in all its forms: how it learns, how it surprises us, and where mathematics meets the unknown. ✨
            </p>
          </div>

          {/* Folded corner */}
          <div style={{ position: "absolute", bottom: 0, right: 0, width: 34, height: 34, background: "linear-gradient(135deg, transparent 50%, #E8D040 50%)" }} />
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }} viewport={{ once: true }}
        style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.75em" }}
      >
        <p style={{ textAlign: "center", maxWidth: 700, fontFamily: "var(--font-mono,monospace)", fontSize: "clamp(13px,1.4vw,17px)", color: "#57534e", lineHeight: 1.7, margin: 0 }}>
          I turn mathematical intuition{" "}
          <img src={asset("/about/messy.svg")} alt="" draggable={false} style={{ display: "inline-block", width: "clamp(22px,2.2vw,30px)", verticalAlign: "middle", margin: "0 3px -2px" }} />
          {" "}into{" "}
          <span style={{ position: "relative", display: "inline-block", paddingTop: "22px" }}>
            <img src={asset("/about/highlights.svg")} alt="" draggable={false} style={{ position: "absolute", top: 0, left: "-4px", width: "clamp(18px,1.8vw,24px)", pointerEvents: "none" }} />
            AI
          </span>
          {" "}— from whiteboards and research papers to models that actually{" "}
          <span style={{ display: "inline-block", border: "1px solid #a8a29e", padding: "1px 10px", borderRadius: 4, background: "rgba(255,255,255,0.6)" }}>ship and scale.</span>
        </p>
        <p style={{ textAlign: "center", maxWidth: 700, fontFamily: "var(--font-mono,monospace)", fontSize: "clamp(13px,1.4vw,17px)", color: "#57534e", lineHeight: 1.7, margin: 0 }}>
          <img src={asset("/about/star.svg")} alt="" draggable={false} style={{ display: "inline-block", width: "clamp(22px,2.2vw,30px)", verticalAlign: "middle", marginRight: 6 }} />
          <span style={{ display: "inline-block", border: "1px solid #a8a29e", padding: "1px 10px", borderRadius: 4, background: "rgba(255,255,255,0.6)" }}>I research, I build,</span>{" "}
          and I stay curious enough to never stop doing both.
        </p>
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN EXPORT
══════════════════════════════════════════════════════════ */
export function About() {
  const { lang } = useLang();
  const tr = t[lang].about;

  return (
    <section id="about" className="section-light" style={{ position: "relative", paddingTop: "clamp(4rem,8vw,6rem)", ...GRID }}>
      {/* Add CSS blink keyframe inline for terminal cursor */}
      <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>

      {/* Badge hangs from the top of the section padding space */}
      <Badge />

      {/* Scene */}
      <div style={{
        ...GRID,
        position: "relative",
        width: "100%",
        minHeight: "clamp(580px,60vw,740px)",
        paddingTop:    "clamp(8rem,12vw,11rem)",
        paddingBottom: "clamp(8rem,12vw,11rem)",
        overflowX: "hidden",
        overflowY: "visible",
      }}>
        <Vinyl />
        <RippedPaper />
        <Flower />
        <Ticket />
        <CollageAndCat />
        <Folder />
        <Terminal />
        <CenterName tagline={tr.tagline ?? "I RESEARCH · I BUILD · I CREATE"} />
      </div>

      {/* Sticky note section */}
      <StickyNoteSection bio={tr.bio} />
    </section>
  );
}
