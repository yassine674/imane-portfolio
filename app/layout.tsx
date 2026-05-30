import type { Metadata } from "next"
import { Bebas_Neue, Space_Grotesk, Syne, DM_Serif_Display, Geist_Mono } from "next/font/google"
import "./globals.css"
import { SmoothScroll } from "@/components/layout/SmoothScroll"
import { CursorFollower } from "@/components/layout/CursorFollower"
import { Preloader } from "@/components/layout/Preloader"
import { ScrollProgress } from "@/components/layout/ScrollProgress"
import { FloatingSocial } from "@/components/layout/FloatingSocial"

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
})

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
})

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
})

const dmSerifDisplay = DM_Serif_Display({
  variable: "--font-dm-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Imane MOUMOUN · AI & ML Engineer",
  description:
    "Portfolio of Imane MOUMOUN, AI & ML Engineering student at Mines Saint-Étienne. Specializing in deep learning, computer vision, and edge AI systems.",
  keywords: [
    "AI", "ML", "Machine Learning", "Deep Learning", "Computer Vision",
    "Edge AI", "PyTorch", "TensorFlow", "Mines Saint-Étienne",
  ],
  authors: [{ name: "Imane MOUMOUN" }],
  openGraph: {
    title: "Imane MOUMOUN · AI & ML Engineer",
    description: "Building intelligent systems at the intersection of deep learning, computer vision, and edge AI.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${spaceGrotesk.variable} ${syne.variable} ${dmSerifDisplay.variable} ${geistMono.variable} h-full`}
      suppressHydrationWarning
    >
      <head />
      <body className="min-h-full antialiased grain scanlines">
        <SmoothScroll>
          <ScrollProgress />
          <Preloader />
          <CursorFollower />
          <FloatingSocial />
          {children}
        </SmoothScroll>
      </body>
    </html>
  )
}
