# Imane MOUMOUN — Portfolio · Claude Guide

Personal AI/ML engineering portfolio.
**Live:** https://yassine674.github.io/imane-portfolio/
**Repo:** https://github.com/yassine674/imane-portfolio

---

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16, App Router, `output: "export"` (static site) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 + inline `style={{}}` for dynamic values |
| Animation | Framer Motion (enter/scroll reveals) · GSAP (timeline scrub) |
| Email | Resend API — `/api/send` route handler |
| Deployment | GitHub Actions → GitHub Pages on every push to `main` |

---

## Commands

```bash
npm run dev      # dev server → http://localhost:3000
npm run build    # static export → /out directory
```

Deploy is automatic: push to `main` → `.github/workflows/deploy.yml` builds and uploads `out/` to GitHub Pages.

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          Root layout: 5 fonts, metadata, LanguageProvider wrapper
│   ├── page.tsx            Page entry: Preloader + Header + all sections (below-fold lazy)
│   ├── globals.css         OKLCH design tokens, CSS reset, keyframe animations
│   ├── icon.svg            Favicon — black in light mode, white in dark (CSS media query)
│   └── api/send/route.ts   Contact form POST handler (Resend)
│
├── components/
│   ├── layout/
│   │   ├── Header.tsx          Sticky nav + EN/FR language toggle
│   │   ├── Preloader.tsx       Word-cycling preloader, slides up on complete
│   │   ├── CurveDivider.tsx    SVG wave shape between dark/light section transitions
│   │   ├── ScrollProgress.tsx  Thin progress bar at top of page
│   │   └── MagneticButton.tsx  Magnetic hover effect wrapper component
│   │
│   ├── sections/
│   │   ├── Hero.tsx        Full-screen collage: floating cards, terminal, vinyl, folder
│   │   ├── About.tsx       Sticky note + bio text on light grid background
│   │   ├── Experience.tsx  Vertical timeline with GSAP scroll-scrub animation
│   │   └── Contact.tsx     Email form (Resend) + social cards overlay (LinkedIn, GitHub, email)
│   │
│   └── ui/
│       ├── AliceScrollStory.tsx        Horizontal text reveal on scroll ("SELECTED WORKS")
│       ├── ScrollingFeatureShowcase.tsx Project cards with scroll-linked animation
│       ├── ContactCards.tsx            GitHub contribution graph + social link cards
│       ├── GoogleGeminiEffect.tsx      Animated SVG paths (Contact section background)
│       ├── Timeline.tsx                Reusable vertical timeline component
│       ├── YanCursor.tsx               Custom dot cursor that follows mouse
│       ├── LanguageSwitcher.tsx        EN ↔ FR toggle button
│       ├── Starfield.tsx               Particle starfield for dark sections
│       └── PopoverForm.tsx             Animated popover form wrapper
│
└── lib/
    ├── asset.ts         asset(path) — prepends basePath for GitHub Pages compatibility
    ├── i18n.tsx         LanguageProvider, useLang() hook, re-exports t from translations
    └── translations.ts  ALL page copy in EN and FR — single source of truth
```

---

## Two Patterns Every File Uses

### 1. Image paths — always use `asset()`

Plain `<img>` tags don't get Next.js's `basePath` prepended. Use the helper:

```tsx
import { asset } from "@/lib/asset"
<img src={asset("/about/photo.png")} />       // ✓
<img src="/about/photo.png" />                 // ✗ — breaks on GitHub Pages
```

### 2. Text — always use translations

All copy lives in `src/lib/translations.ts`. Never hardcode strings in components.

```tsx
import { useLang, t } from "@/lib/i18n"
const { lang } = useLang()
const tr = t[lang].contact    // pick the section namespace
// then use tr.formTitle, tr.sendButton, etc.
```

---

## Common Tasks

### Update any text / bio / copy
Edit `src/lib/translations.ts` — both `en` and `fr` blocks. Every key must exist in both languages.

### Add an experience or education entry
1. Add entry to `t.en.experience.entries` and `t.fr.experience.entries` in `translations.ts`
2. Add the key to the `useTimeline()` array in `src/components/sections/Experience.tsx`

### Add a project card
1. Add descriptions to `t.en.projects.descriptions[]` and `t.fr.projects.descriptions[]`
2. Add card data to the projects array in `src/components/ui/ScrollingFeatureShowcase.tsx`
3. Drop the project image in `public/project/` (recommended: 800×500 JPG)

### Change the profile photo
Uses `https://github.com/imanemn127.png` (GitHub avatar). Change the username in:
- `src/components/sections/Hero.tsx` (badge card)
- `src/components/sections/Contact.tsx` (LinkedIn card, GitHub card, form avatar)

### Change section order
Edit the JSX in `src/app/page.tsx`. Keep below-fold sections as `dynamic()` imports.

---

## Deployment & Environment

**Env variables** (`.env.local`, never commit):
```
RESEND_API_KEY=re_...        # from resend.com → API Keys
CONTACT_EMAIL=you@email.com  # where contact form emails go
```

**Note on API route:** `/api/send` is a Next.js Route Handler. In the static export it's excluded from `out/` — for the contact form to work in production it needs a separate serverless deployment (Vercel, Netlify function, etc.) or a third-party form service.

**basePath:** `/imane-portfolio` — set in `next.config.ts`. If you rename the GitHub repo, update `basePath` there and in the GitHub Pages settings.

---

## Known Issues & Quirks

### Encoding corruption
Pasting from Word/macOS Pages introduces smart quotes (`'` `'`) and curly dashes that visually look correct but break JSX parsing or render as `Â·`, `â€"`, `Ã‰`. Fix with Python byte-replacement:
```python
with open("file.tsx", "rb") as f: content = f.read()
content = content.replace(b"\xc3\x82\xc2\xb7", b"\xc2\xb7")  # Â· → ·
content = content.replace(b"\xc3\xa2\xe2\x82\xac\xe2\x80\x9c", b"\xe2\x80\x93")  # â€" → –
with open("file.tsx", "wb") as f: f.write(content)
```
Always use straight single quotes `'` in TSX/JS, not curly quotes.

### Scrollbar layout shift
`scrollbar-gutter: stable` is on `html` in `globals.css`. Safari ignores it but Safari uses overlay scrollbars so no shift occurs there. Chrome/Firefox on Windows: gutter is always reserved.

### Grid background
Hero and About both use a 56px grid. `background-attachment: fixed` makes them share one coordinate system so the grid is seamless at the section boundary.

### Performance
`cat-dance.gif` in the Hero is 2.9MB. It's above the fold so can't be lazy-loaded. Converting to WebM/MP4 video would reduce it ~90%.

---

## Config Files (all required, cannot be moved from root)

| File | Purpose |
|---|---|
| `next.config.ts` | basePath, static export, image config |
| `postcss.config.mjs` | Tailwind CSS v4 PostCSS processing |
| `tsconfig.json` | TypeScript compiler options + path aliases (`@/*`) |
| `package.json` | Dependencies and npm scripts |
| `.github/workflows/deploy.yml` | GitHub Actions — build + deploy to Pages |
