import type { Metadata } from "next";
import { Space_Grotesk, Inter, Geist_Mono } from "next/font/google";
import ClientProviders from "@/components/providers/client-providers";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hernando.ia | AI Engineer & Entrepreneur",
  description:
    "Portfolio, blog e cerebro digital de Hernando — engenheiro de IA, empreendedor e criador. Conhecimento especifico, alavancagem e responsabilidade.",
  openGraph: {
    title: "Hernando.ia",
    description: "AI Engineer & Entrepreneur — Cerebro Digital",
    url: "https://hernando.ia",
    siteName: "Hernando.ia",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hernando.ia",
    description: "AI Engineer & Entrepreneur — Cerebro Digital",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      className={`${spaceGrotesk.variable} ${inter.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[--background] text-[--foreground] relative">
        {/* Noise texture overlay */}
        <svg className="noise-overlay" aria-hidden="true" width="100%" height="100%">
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
        <ClientProviders>
        {children}
        </ClientProviders>
      </body>
    </html>
  );
}
