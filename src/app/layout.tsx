import type { Metadata } from "next";
import { Cormorant_Garamond, Bricolage_Grotesque, Red_Hat_Mono, Dancing_Script, Caveat } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n";

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

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-handwriting",
  display: "swap",
});

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-script",
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
  title: "Imane Moumoun — Portfolio",
  description:
    "Portfolio of Imane MOUMOUN — engineering intelligent systems at the intersection of deep learning, computer vision, and edge AI. Currently AI Research Intern at Inria.",
  keywords: ["AI", "Machine Learning", "Computer Vision", "Edge AI", "PyTorch", "Deep Learning"],
  authors: [{ name: "Imane MOUMOUN", url: "https://github.com/imanemn127" }],
  openGraph: {
    title: "Imane Moumoun — Portfolio",
    description:
      "Building intelligent systems at the intersection of deep learning, computer vision, and edge AI.",
    type: "website",
    locale: "en_US",
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: "/imane-portfolio/favicon.svg", type: "image/svg+xml" },
      { url: "/imane-portfolio/favicon.ico", type: "image/x-icon" },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bricolage.variable} ${cormorant.variable} ${redHatMono.variable} ${dancingScript.variable} ${caveat.variable}`}>
      <body className={`${dancingScript.variable} ${caveat.variable}`}><LanguageProvider>{children}</LanguageProvider></body>
    </html>
  );
}
