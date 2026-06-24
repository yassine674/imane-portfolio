import type { Metadata } from "next";
import { Cormorant_Garamond, Bricolage_Grotesque, Red_Hat_Mono } from "next/font/google";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-display-var",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-serif-var",
  display: "swap",
});

/* Micro-labels — echoes the mono captions on microsoft.ai */
const redHatMono = Red_Hat_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono-var",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Imane MOUMOUN — AI & ML Engineer",
  description:
    "Portfolio of Imane MOUMOUN — engineering intelligent systems at the intersection of deep learning, computer vision, and edge AI. Currently AI Research Intern at Inria.",
  keywords: ["AI", "Machine Learning", "Computer Vision", "Edge AI", "PyTorch", "Deep Learning"],
  authors: [{ name: "Imane MOUMOUN", url: "https://github.com/imanemn127" }],
  openGraph: {
    title: "Imane MOUMOUN — AI & ML Engineer",
    description:
      "Building intelligent systems at the intersection of deep learning, computer vision, and edge AI.",
    type: "website",
    locale: "en_US",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bricolage.variable} ${cormorant.variable} ${redHatMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
