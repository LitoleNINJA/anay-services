"use client";

import { useLang } from "@/context/LanguageProvider";
import { Counter } from "@/components/ui/Counter";
import { FadeUp } from "@/components/ui/FadeUp";

export function Stats() {
  const { t } = useLang();
  const doubled = [...t.stats.logos, ...t.stats.logos];
  return (
    <section className="border-y border-[--color-line] bg-[--color-ink] text-[--color-bone]">
      <div className="container-page py-20 md:py-28">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4 md:gap-8">
          {t.stats.items.map((s, i) => (
            <FadeUp key={s.label} delay={i * 0.05}>
              <div>
                <p className="font-display text-5xl tracking-tight text-[--color-gold] md:text-7xl">
                  <Counter to={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-3 text-sm text-[--color-bone-2]/70">
                  {s.label}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>

        <div className="mt-16 border-t border-white/10 pt-10">
          <p className="text-center text-[11px] uppercase tracking-[0.22em] text-[--color-bone-2]/60">
            {t.stats.trustedBy}
          </p>
          <div className="mt-6 overflow-hidden">
            <div className="marquee-track gap-14 whitespace-nowrap">
              {doubled.map((name, i) => (
                <span
                  key={i}
                  className="font-display text-2xl tracking-tight text-[--color-bone-2]/50 md:text-3xl"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
