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
import { BUSINESS, buildLocalBusinessJsonLd } from "@/lib/business";

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
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.anayinterior.com";

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${BUSINESS.name} — Flooring & Fit-Out · UAE`,
    template: `%s — ${BUSINESS.name}`,
  },
  description: BUSINESS.description,
  keywords: [
    "flooring Dubai",
    "fit-out UAE",
    "carpet installation Dubai",
    "LVT installer UAE",
    "tile contractor Dubai",
    "raised floor Dubai",
    "gypsum partition Dubai",
    "painting Dubai",
    "plastering Dubai",
    "MEP contractor UAE",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: BUSINESS.name,
    title: `${BUSINESS.name} — Flooring & Fit-Out · UAE`,
    description: BUSINESS.description,
    locale: "en_AE",
  },
  twitter: {
    card: "summary_large_image",
    title: BUSINESS.name,
    description: BUSINESS.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = buildLocalBusinessJsonLd(siteUrl);
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} ${cairo.variable} h-full`}
      suppressHydrationWarning
    >
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
