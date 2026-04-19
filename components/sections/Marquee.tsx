"use client";

import { useLang } from "@/context/LanguageProvider";

export function Marquee() {
  const { t } = useLang();
  const items = t.services.items.map((s) => s.title);
  const doubled = [...items, ...items];
  return (
    <section
      aria-hidden
      className="relative overflow-hidden border-y border-[--color-line] bg-[--color-bone] py-10"
    >
      <div className="marquee-track gap-12 whitespace-nowrap">
        {doubled.map((label, i) => (
          <span
            key={i}
            className="font-display flex items-center gap-12 text-[clamp(2.5rem,6vw,5rem)] leading-none tracking-[-0.02em] text-[--color-ink]"
          >
            <span>{label}</span>
            <span className="text-[--color-gold]" aria-hidden>
              ✦
            </span>
          </span>
        ))}
      </div>
    </section>
  );
}
