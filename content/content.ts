import { BUSINESS } from "@/lib/business";

export const NAV_LINKS = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Approach", href: "#approach" },
  { label: "Contact", href: "#contact" },
] as const;

export const HERO = {
  eyebrow: BUSINESS.tagline,
  headingLines: ["Surfaces built", "with precision."],
  lede:
    "A Dubai-based fit-out and flooring studio delivering clean, considered finishes for homes, offices and retail across the Emirates.",
  primaryCta: { label: "Start a project", href: "#contact" },
  secondaryCta: { label: "View our work", href: "#work" },
  image: {
    src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80",
    alt: "Interior of a finished fit-out with warm wood flooring and minimal styling.",
  },
};

export const ABOUT = {
  eyebrow: "About",
  heading: "Built on detail,\nfinished with care.",
  body: [
    "For over a decade, Anay Technical Services has delivered end-to-end fit-out and flooring across the UAE — from private residences in Jumeirah to commercial floors in DIFC.",
    "We take a single-trade approach: our own crews handle flooring, gypsum, paint, plaster and MEP, so lines of responsibility stay clear and quality stays consistent.",
  ],
  pillars: [
    {
      title: "Precision",
      copy: "Site surveys, moisture tests, substrate prep. The finish is only as good as what's underneath.",
    },
    {
      title: "Materials",
      copy: "Sourced from trusted regional and European suppliers. Verified lot numbers, full traceability.",
    },
    {
      title: "Timelines",
      copy: "A planned programme with weekly milestones — no moving goalposts, no awkward surprises.",
    },
    {
      title: "Aftercare",
      copy: "A 12-month workmanship warranty and a named contact for the life of the project.",
    },
  ],
  images: [
    {
      src: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1400&q=80",
      alt: "Close-up of craftsman hands laying timber flooring.",
    },
    {
      src: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1400&q=80",
      alt: "Modern neutral interior with architectural detail.",
    },
    {
      src: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1400&q=80",
      alt: "Detail of a tiled bathroom floor in warm tones.",
    },
  ],
};

export type Service = {
  id: string;
  index: string;
  title: string;
  blurb: string;
  image: { src: string; alt: string };
};

export const SERVICES: Service[] = [
  {
    id: "carpet",
    index: "01",
    title: "Carpet",
    blurb:
      "Broadloom and tile carpet for offices, hospitality and residential — tensioned, seamed and detailed to spec.",
    image: {
      src: "https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?auto=format&fit=crop&w=1200&q=80",
      alt: "Detail of a plush neutral carpet.",
    },
  },
  {
    id: "tile",
    index: "02",
    title: "Tile",
    blurb:
      "Porcelain, ceramic, stone and marble — thin-bed, mortar-bed and levelled substrates for a flat, lasting floor.",
    image: {
      src: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
      alt: "Large-format tile floor in a neutral interior.",
    },
  },
  {
    id: "vinyl",
    index: "03",
    title: "Vinyl",
    blurb:
      "Homogeneous and heterogeneous sheet vinyl — welded seams, coved skirtings and hygienic finishes for clinics, schools and kitchens.",
    image: {
      src: "https://images.unsplash.com/photo-1615875605825-5eb9bb5d52ac?auto=format&fit=crop&w=1200&q=80",
      alt: "Sheet vinyl flooring in a clean interior.",
    },
  },
  {
    id: "lvt",
    index: "04",
    title: "LVT",
    blurb:
      "Glue-down and click LVT — warm, silent and hard-wearing. Commercial-grade planks in oak, walnut and stone looks.",
    image: {
      src: "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&w=1200&q=80",
      alt: "LVT plank flooring with warm tone.",
    },
  },
  {
    id: "raised-floor",
    index: "05",
    title: "Raised Floor",
    blurb:
      "Pedestal and stringer systems for data centres and trading floors — load-rated, levelled and finished to match.",
    image: {
      src: "https://images.unsplash.com/photo-1577412647305-991150c7d163?auto=format&fit=crop&w=1200&q=80",
      alt: "Raised office floor under construction.",
    },
  },
  {
    id: "gypsum",
    index: "06",
    title: "Gypsum",
    blurb:
      "Partitions, bulkheads and decorative ceilings — single and double-layer with acoustic, fire and moisture options.",
    image: {
      src: "https://images.unsplash.com/photo-1503174971373-b1f69850bded?auto=format&fit=crop&w=1200&q=80",
      alt: "Gypsum ceiling detail.",
    },
  },
  {
    id: "paint",
    index: "07",
    title: "Paint",
    blurb:
      "Low-VOC emulsions, lacquers and specialist finishes — prep-led, cleanly cut and inspected at every coat.",
    image: {
      src: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=1200&q=80",
      alt: "Painter rolling a fresh neutral wall.",
    },
  },
  {
    id: "plastering",
    index: "08",
    title: "Plastering",
    blurb:
      "Skim, float and sand, traditional lime and decorative Venetian finishes — flat walls ready for any paint or wallcovering.",
    image: {
      src: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=1200&q=80",
      alt: "Plasterer at work on a smooth wall.",
    },
  },
  {
    id: "electrical",
    index: "09",
    title: "Electrical",
    blurb:
      "DEWA-approved contractors for lighting, power and low-voltage — designed, installed, tested and handed over.",
    image: {
      src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=80",
      alt: "Electrician installing clean-line ceiling fixtures.",
    },
  },
  {
    id: "plumbing",
    index: "10",
    title: "Plumbing",
    blurb:
      "Hot and cold, drainage, pumps and fixtures — pressure-tested, concealed where it should be, serviceable where it counts.",
    image: {
      src: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80",
      alt: "Detail of plumbing fixtures in a finished bathroom.",
    },
  },
];

export const PROCESS = {
  eyebrow: "Approach",
  heading: "How we work.",
  steps: [
    {
      index: "01",
      title: "Consult",
      copy:
        "Free site walk, measurements and a conversation about brief, budget and timeline. No obligation.",
    },
    {
      index: "02",
      title: "Scope & Quote",
      copy:
        "A clear, itemised quotation — materials, labour, schedule and assumptions — in 3 to 5 working days.",
    },
    {
      index: "03",
      title: "Execute",
      copy:
        "In-house crews, daily site logs, weekly progress photos. You always know where the project stands.",
    },
    {
      index: "04",
      title: "Handover",
      copy:
        "Snag walk, care guide, and a 12-month workmanship warranty with a named contact for aftercare.",
    },
  ],
};

export type Project = {
  title: string;
  image: { src: string; alt: string };
  span: "tall" | "wide" | "square";
};

export const PROJECTS: Project[] = [
  {
    title: "Al Mahavi Camp, Abu Dhabi",
    image: {
      src: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80",
      alt: "Al Mahavi Camp, Abu Dhabi",
    },
    span: "tall",
  },
  {
    title: "Police Headquarters, Abu Dhabi",
    image: {
      src: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1600&q=80",
      alt: "Police Headquarters, Abu Dhabi",
    },
    span: "wide",
  },
  {
    title: "SO Hotel, Ras Al Khaimah",
    image: {
      src: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=80",
      alt: "SO Hotel, Ras Al Khaimah",
    },
    span: "square",
  },
  {
    title: "UAE Olympic Committee, Dubai",
    image: {
      src: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1600&q=80",
      alt: "UAE Olympic Committee, Dubai",
    },
    span: "tall",
  },
  {
    title: "DIFC, Dubai",
    image: {
      src: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=80",
      alt: "DIFC, Dubai",
    },
    span: "wide",
  },
  {
    title: "Villa, Emirates Hills",
    image: {
      src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80",
      alt: "Villa, Emirates Hills",
    },
    span: "square",
  },
  {
    title: "Villa, Jumeirah Bay",
    image: {
      src: "https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&w=1600&q=80",
      alt: "Villa, Jumeirah Bay",
    },
    span: "tall",
  },
];

export const STATS = [
  { value: 10, suffix: "+", label: "Years of practice" },
  { value: 250, suffix: "+", label: "Projects delivered" },
  { value: 40, suffix: "+", label: "Corporate clients" },
  { value: 7, suffix: "", label: "Emirates served" },
];

export const TRUSTED_BY = [
  "Emaar",
  "Meraas",
  "Nakheel",
  "Damac",
  "Aldar",
  "Majid Al Futtaim",
  "Dubai Holding",
  "RTA",
];

export const CONTACT = {
  eyebrow: "Contact",
  heading: "Start a project.",
  lede:
    "Tell us a little about your space and we'll be back within one business day with next steps.",
  detail: {
    addressLines: ["Al Quoz Industrial 3", "Dubai, United Arab Emirates"],
    email: BUSINESS.email,
    phone: BUSINESS.phone,
    phoneHref: BUSINESS.phoneHref,
    whatsappHref: BUSINESS.whatsappHref,
    hours: BUSINESS.hours.displayHours,
  },
};

export const FOOTER = {
  wordmark: "Anay",
  tagline: "Flooring & Fit-Out · UAE",
  columns: {
    company: [
      { label: "Work", href: "#work" },
      { label: "Approach", href: "#approach" },
      { label: "Contact", href: "#contact" },
    ],
    services: SERVICES.map((s) => ({ label: s.title, href: `#services` })),
    elsewhere: [
      { label: "Instagram", href: BUSINESS.social.instagram },
      { label: "LinkedIn", href: BUSINESS.social.linkedin },
      { label: "WhatsApp", href: BUSINESS.whatsappHref },
    ],
  },
};
