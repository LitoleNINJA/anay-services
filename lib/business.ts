export const BUSINESS = {
  name: "Anay Interior",
  legalName: "Anay Technical Services Co. L.L.C",
  tagline: "We design, you deserve.",
  description:
    "Premium flooring, finishing and technical fit-out services across the UAE. Carpet, tile, vinyl, LVT, raised floor, gypsum, paint, plaster and MEP.",
  email: "info@anayservices.com",
  phone: "+971 56 853 2328",
  phoneHref: "tel:+971568532328",
  whatsappHref: "https://wa.me/971568532328",
  address: {
    street: "",
    city: "Dubai",
    region: "Dubai",
    postalCode: "P.O. Box 44320",
    country: "AE",
  },
  areaServed: [
    "Dubai",
    "Abu Dhabi",
    "Sharjah",
    "Ajman",
    "Fujairah",
    "Ras Al Khaimah",
    "Umm Al Quwain",
  ],
  social: {
    instagram: "https://instagram.com/",
    linkedin: "https://linkedin.com/",
  },
  hours: {
    openDays: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
    openTime: "08:00",
    closeTime: "18:00",
    timezone: "Asia/Dubai",
    displayHours: "Sat – Thu · 08:00 – 18:00",
  },
} as const;

export function isOpenNow(date: Date = new Date()) {
  const fmt = new Intl.DateTimeFormat("en-US", {
    timeZone: BUSINESS.hours.timezone,
    hour: "2-digit",
    minute: "2-digit",
    weekday: "long",
    hour12: false,
  });
  const parts = fmt.formatToParts(date);
  const weekday = parts.find((p) => p.type === "weekday")?.value ?? "";
  const hour = parseInt(parts.find((p) => p.type === "hour")?.value ?? "0", 10);
  const minute = parseInt(parts.find((p) => p.type === "minute")?.value ?? "0", 10);
  if (!(BUSINESS.hours.openDays as readonly string[]).includes(weekday)) return false;
  const minutes = hour * 60 + minute;
  const [oh, om] = BUSINESS.hours.openTime.split(":").map(Number);
  const [ch, cm] = BUSINESS.hours.closeTime.split(":").map(Number);
  return minutes >= oh * 60 + om && minutes < ch * 60 + cm;
}

// Approx. Dubai coordinates (Al Quoz / business-bay belt).
const GEO = { latitude: 25.2048, longitude: 55.2708 };

const SERVICE_CATALOG = [
  "Civil works (plastering, wall tiling, engraving)",
  "Flooring (carpet, tile, vinyl, LVT, raised floor, wood)",
  "Painting",
  "Electrical fittings & fixtures",
  "Plumbing & sanitary installation",
  "Gypsum false ceilings & light partitions",
];

type ServiceInput = { title: string; blurb: string };
type FaqInput = { q: string; a: string };

/**
 * Builds a single schema.org @graph: the business entity, the website,
 * one Service node per offering, and (optionally) a FAQPage. Rendered
 * server-side so search engines see it in the static HTML.
 */
export function buildJsonLd(
  siteUrl: string,
  opts: { services?: ServiceInput[]; faq?: FaqInput[] } = {},
) {
  const businessId = `${siteUrl}/#business`;
  const websiteId = `${siteUrl}/#website`;

  const areaServed = BUSINESS.areaServed.map((a) => ({
    "@type": "City",
    name: a,
  }));

  const business = {
    "@type": "HomeAndConstructionBusiness",
    "@id": businessId,
    name: BUSINESS.name,
    legalName: BUSINESS.legalName,
    description: BUSINESS.description,
    slogan: BUSINESS.tagline,
    url: siteUrl,
    telephone: BUSINESS.phone,
    email: BUSINESS.email,
    priceRange: "$$",
    currenciesAccepted: "AED",
    paymentAccepted: "Cash, Bank Transfer, Cheque",
    knowsLanguage: ["en", "ar"],
    image: `${siteUrl}/opengraph-image`,
    logo: `${siteUrl}/new_logo_bg_removed.png`,
    address: {
      "@type": "PostalAddress",
      ...(BUSINESS.address.street
        ? { streetAddress: BUSINESS.address.street }
        : {}),
      addressLocality: BUSINESS.address.city,
      addressRegion: BUSINESS.address.region,
      ...(BUSINESS.address.postalCode
        ? { postalCode: BUSINESS.address.postalCode }
        : {}),
      addressCountry: BUSINESS.address.country,
    },
    geo: { "@type": "GeoCoordinates", ...GEO },
    areaServed,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: BUSINESS.phone,
      email: BUSINESS.email,
      contactType: "customer service",
      areaServed: "AE",
      availableLanguage: ["en", "ar"],
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: BUSINESS.hours.openDays,
        opens: BUSINESS.hours.openTime,
        closes: BUSINESS.hours.closeTime,
      },
    ],
    sameAs: [BUSINESS.social.instagram, BUSINESS.social.linkedin],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Fit-Out Services",
      itemListElement: SERVICE_CATALOG.map((name) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name },
      })),
    },
  };

  const website = {
    "@type": "WebSite",
    "@id": websiteId,
    url: siteUrl,
    name: BUSINESS.name,
    inLanguage: ["en", "ar"],
    publisher: { "@id": businessId },
  };

  const serviceNodes = (opts.services ?? []).map((s, i) => ({
    "@type": "Service",
    "@id": `${siteUrl}/#service-${i + 1}`,
    name: `${s.title} — Dubai & UAE`,
    serviceType: s.title,
    description: s.blurb,
    provider: { "@id": businessId },
    areaServed,
  }));

  const faqNode =
    opts.faq && opts.faq.length
      ? [
          {
            "@type": "FAQPage",
            "@id": `${siteUrl}/#faq`,
            mainEntity: opts.faq.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          },
        ]
      : [];

  return {
    "@context": "https://schema.org",
    "@graph": [business, website, ...serviceNodes, ...faqNode],
  };
}
