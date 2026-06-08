import type { Metadata } from "next";
import { Space_Grotesk, Inter, Geist_Mono } from "next/font/google";
import ClientProviders from "@/components/providers/client-providers";
import { SITE, JSONLD } from "@/lib/seo";
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
  title: {
    default: "Hernando.ia | AI Engineer & Entrepreneur",
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  metadataBase: new URL(SITE.url),
  alternates: {
    canonical: SITE.url,
    languages: {
      pt: SITE.url,
      en: `${SITE.url}?lang=en`,
      es: `${SITE.url}?lang=es`,
    },
  },
  authors: [{ name: SITE.author.name, url: SITE.author.url }],
  creator: SITE.author.name,
  publisher: SITE.author.name,
  keywords: [...SITE.keywords],
  category: "Technology",
  openGraph: {
    title: "Hernando.ia | AI Engineer & Entrepreneur",
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
        alt: "Hernando.ia — AI Engineer & Entrepreneur",
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
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSONLD.website()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSONLD.person()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product",
              name: "Pacote de Skills para Claude Code — Desenvolvedor Brasileiro",
              description:
                "20 skills profissionais em português para Claude Code. Debugging, TDD, arquitetura, code review — metodologia de engenharia de software para agentes de IA.",
              url: "https://hernandoia.com/produtos/claude-code-skills",
              offers: {
                "@type": "Offer",
                price: "147",
                priceCurrency: "BRL",
                availability: "https://schema.org/InStock",
                url: "https://hernandoia.com/produtos/claude-code-skills",
              },
              image: "https://hernandoia.com/api/og?title=Pacote+de+Skills+Claude+Code",
              brand: {
                "@type": "Brand",
                name: "Hernando.ia",
              },
            }),
          }}
        />
        {/* Preconnect to critical origins */}
        <link rel="preconnect" href="https://avatars.githubusercontent.com" />
        <link rel="dns-prefetch" href="https://github.com" />
      </head>
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
