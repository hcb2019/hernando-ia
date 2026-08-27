import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter, Geist_Mono } from "next/font/google";
import ClientProviders from "@/components/providers/client-providers";
import { SITE, JSONLD } from "@/lib/seo";
import { WebVitals } from "@/components/ui/web-vitals";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#09090B",
};

export const metadata: Metadata = {
  title: {
    default: "Hernando.ia | Projetos com IA",
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  metadataBase: new URL(SITE.url),
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/icon-256.png", sizes: "256x256", type: "image/png" },
    ],
    apple: { url: "/icon-256.png", sizes: "256x256", type: "image/png" },
  },
  alternates: {
    canonical: SITE.url,
  },
  authors: [{ name: SITE.author.name, url: SITE.author.url }],
  creator: SITE.author.name,
  publisher: SITE.author.name,
  keywords: [...SITE.keywords],
  category: "Technology",
  openGraph: {
    title: "Hernando.ia | Projetos com IA",
    description: SITE.description,
    url: SITE.url,
    siteName: SITE.name,
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: `${SITE.url}${SITE.ogImage}`,
        width: 1200,
        height: 630,
        alt: "Hernando.ia — Projetos e IA na prática",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hernando.ia",
    description: SITE.description,
    images: [`${SITE.url}${SITE.ogImage}`],
    creator: SITE.twitterHandle,
    site: SITE.twitterHandle,
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
  verification: {
    google: "opKznzS2KsfYJVDfnvOS_EvEgY8XDlltdnhPopVFNzQ",
    other: {
      "msvalidate.01": "0C792F805EDE2AD7A9AF6D630C49B4CD",
    },
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
      <head>
        {/* Favicon — handled by Next.js app/icon.ico (auto-generated with cache hash) */}
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSONLD.website()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSONLD.person()) }}
        />
        {/* Preconnect to critical origins */}
        <link rel="preconnect" href="https://avatars.githubusercontent.com" />
        <link rel="dns-prefetch" href="https://github.com" />
      </head>
      <body className="min-h-full flex flex-col bg-[--background] text-[--foreground] relative overflow-x-hidden">
        {/* Noise texture — CSS-only on mobile for performance */}
        <div className="noise-overlay" aria-hidden="true" />
        <svg className="noise-svg hidden lg:block" aria-hidden="true" width="100%" height="100%">
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.5" numOctaves="2" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
        <ClientProviders>
          <WebVitals />
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
