export const BUSINESS = {
  name: "Anay Technical Services",
  legalName: "Anay Technical Services LLC",
  tagline: "Flooring & Fit-Out · UAE",
  description:
    "Premium flooring, finishing and technical fit-out services across the UAE. Carpet, tile, vinyl, LVT, raised floor, gypsum, paint, plaster and MEP.",
  email: "info@anayservices.com",
  phone: "+971 50 000 0000",
  phoneHref: "tel:+971500000000",
  whatsappHref: "https://wa.me/971500000000",
  address: {
    street: "Al Quoz Industrial 3",
    city: "Dubai",
    region: "Dubai",
    postalCode: "",
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

export function buildLocalBusinessJsonLd(siteUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: BUSINESS.name,
    legalName: BUSINESS.legalName,
    description: BUSINESS.description,
    url: siteUrl,
    telephone: BUSINESS.phone,
    email: BUSINESS.email,
    priceRange: "$$",
    image: `${siteUrl}/opengraph-image`,
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS.address.street,
      addressLocality: BUSINESS.address.city,
      addressRegion: BUSINESS.address.region,
      addressCountry: BUSINESS.address.country,
    },
    areaServed: BUSINESS.areaServed.map((a) => ({ "@type": "City", name: a })),
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
      name: "Flooring & Fit-Out Services",
      itemListElement: [
        "Carpet installation",
        "Tile installation",
        "Vinyl flooring",
        "LVT flooring",
        "Raised floor systems",
        "Gypsum partitions & ceilings",
        "Painting",
        "Plastering",
        "Electrical works",
        "Plumbing works",
      ].map((name) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name },
      })),
    },
  } as const;
}
