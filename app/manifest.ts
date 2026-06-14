import type { MetadataRoute } from "next";
import { BUSINESS } from "@/lib/business";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${BUSINESS.name} — Flooring & Fit-Out, Dubai`,
    short_name: BUSINESS.name,
    description: BUSINESS.description,
    start_url: "/",
    display: "standalone",
    background_color: "#F7F5F0",
    theme_color: "#0A0A0A",
    lang: "en",
    dir: "ltr",
    categories: ["business", "construction", "home services"],
    icons: [
      { src: "/icon", sizes: "any", type: "image/png" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
