"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { SERVICES } from "@/content/content";
import { FadeUp } from "@/components/ui/FadeUp";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function Services() {
  const [active, setActive] = useState(0);

  return (
    <section id="services" className="container-page py-24 md:py-40">
      <SectionHeader
        eyebrow="Services"
        heading={"Everything the\nspace needs."}
        lede="A single, accountable team for floors, finishes and the works behind the walls — carpet, tile, vinyl, LVT, raised floor, gypsum, paint, plaster, electrical and plumbing."
      />

      <div className="mt-16 grid gap-10 md:mt-24 md:grid-cols-12 md:gap-12">
        <div className="md:col-span-7">
          <ul className="divide-y divide-[--color-line]">
            {SERVICES.map((s, i) => (
              <FadeUp key={s.id} delay={i * 0.04} y={16}>
                <li
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className="group relative"
                >
                  <button
                    type="button"
                    className="flex w-full items-baseline justify-between gap-6 py-6 text-left transition-[transform,color] duration-500 md:py-8 group-hover:translate-x-2 md:group-hover:translate-x-3"
                    aria-label={`Preview ${s.title}`}
                  >
                    <span className="flex items-baseline gap-6">
                      <span className="font-mono text-xs tracking-[0.22em] text-[--color-muted] md:text-sm">
                        {s.index}
                      </span>
                      <span className="font-display text-3xl tracking-tight text-[--color-ink] md:text-5xl">
                        {s.title}
                      </span>
                    </span>
                    <span className="max-w-xs text-right text-xs text-[--color-muted] md:text-sm">
                      {s.blurb}
                    </span>
                  </button>
                  <span
                    className={
                      "pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-[--color-gold] transition-transform duration-700 ease-out group-hover:scale-x-100"
                    }
                    aria-hidden
                  />
                </li>
              </FadeUp>
            ))}
          </ul>
        </div>

        <div className="relative hidden md:col-span-5 md:block">
          <div className="sticky top-32 aspect-[4/5] overflow-hidden rounded-lg bg-[--color-bone-2]">
            <AnimatePresence mode="wait">
              <motion.div
                key={SERVICES[active].id}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src={SERVICES[active].image.src}
                  alt={SERVICES[active].image.alt}
                  fill
                  sizes="40vw"
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[--color-ink]/25 to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between p-6 text-[--color-bone]">
              <p className="font-display text-2xl tracking-tight">
                {SERVICES[active].title}
              </p>
              <p className="font-mono text-xs tracking-[0.22em] opacity-80">
                {SERVICES[active].index} / {SERVICES.length.toString().padStart(2, "0")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
