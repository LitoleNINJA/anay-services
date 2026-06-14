import type { Metadata, Viewport } from "next";
import { Fraunces, Inter, Cairo } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/Toaster";
import { Grain } from "@/components/ui/Grain";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import { LanguageProvider } from "@/context/LanguageProvider";
import { BUSINESS, buildJsonLd } from "@/lib/business";
import TRANSLATIONS from "@/content/translations";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["SOFT", "opsz"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.anayservices.com";

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
  width: "device-width",
  initialScale: 1,
};

const TITLE = "Flooring & Fit-Out Contractor in Dubai | Anay Interior";
const DESCRIPTION =
  "Dubai-based flooring & fit-out contractor — carpet, tile, vinyl, LVT, gypsum, paint, electrical & plumbing for homes, offices & retail across the UAE.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: TITLE,
    template: `%s | ${BUSINESS.name}`,
  },
  description: DESCRIPTION,
  applicationName: BUSINESS.name,
  authors: [{ name: BUSINESS.name, url: siteUrl }],
  creator: BUSINESS.name,
  publisher: BUSINESS.legalName,
  category: "Interior Fit-Out & Flooring",
  keywords: [
    "flooring Dubai",
    "fit out company Dubai",
    "interior fit out Dubai",
    "fit-out contractor UAE",
    "carpet installation Dubai",
    "LVT flooring Dubai",
    "tile contractor Dubai",
    "raised floor Dubai",
    "gypsum partition Dubai",
    "false ceiling Dubai",
    "painting services Dubai",
    "electrical contractor Dubai",
    "plumbing services Dubai",
    "civil works Dubai",
    "fit out Abu Dhabi",
    "flooring company UAE",
  ],
  alternates: { canonical: "/" },
  formatDetection: { email: false, address: false, telephone: true },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: BUSINESS.name,
    title: TITLE,
    description: DESCRIPTION,
    locale: "en_AE",
    alternateLocale: ["ar_AE"],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
  other: {
    "geo.region": "AE-DU",
    "geo.placename": "Dubai",
    "geo.position": "25.2048;55.2708",
    ICBM: "25.2048, 55.2708",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = buildJsonLd(siteUrl, {
    services: TRANSLATIONS.en.services.items.map((s) => ({
      title: s.title,
      blurb: s.blurb,
    })),
    faq: TRANSLATIONS.en.faq.items.map((f) => ({ q: f.q, a: f.a })),
  });
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} ${cairo.variable} h-full`}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link
          rel="dns-prefetch"
          href="https://images.unsplash.com"
        />
      </head>
      <body className="min-h-full bg-[--color-bone] text-[--color-ink] antialiased">
        <a
          href="#top"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-full focus:bg-[--color-ink] focus:px-4 focus:py-2 focus:text-sm focus:text-[--color-bone]"
        >
          Skip to content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <LanguageProvider>
          <SmoothScroll>
            <Nav />
            <main>{children}</main>
            <Footer />
          </SmoothScroll>
          <Grain />
          <Toaster />
        </LanguageProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
