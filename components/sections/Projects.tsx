"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { PROJECTS } from "@/content/content";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { cn } from "@/lib/cn";

const spanClass = {
  tall: "md:col-span-6 md:row-span-2 aspect-[3/4]",
  wide: "md:col-span-6 aspect-[16/10]",
  square: "md:col-span-6 aspect-[4/5]",
};

export function Projects() {
  return (
    <section id="work" className="container-page py-24 md:py-40">
      <SectionHeader
        eyebrow="Selected work"
        heading={"A small, careful\nbody of work."}
        lede="Residential, commercial, retail and hospitality across Dubai and Abu Dhabi. Select projects — a fuller portfolio available on request."
      />

      <div className="mt-16 grid grid-cols-1 gap-6 md:mt-24 md:grid-cols-12 md:gap-8">
        {PROJECTS.map((p, i) => (
          <motion.article
            key={p.title}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
              delay: (i % 2) * 0.08,
            }}
            className={cn(
              "group relative overflow-hidden rounded-lg bg-[--color-bone-2]",
              spanClass[p.span],
            )}
          >
            <Image
              src={p.image.src}
              alt={p.image.alt}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.06]"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[--color-ink]/70 via-[--color-ink]/10 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-95" />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6 text-[--color-bone] md:p-8">
              <div>
                <p className="text-[11px] uppercase tracking-[0.22em] text-[--color-bone-2]/80">
                  {p.category} · {p.location}
                </p>
                <h3 className="mt-3 font-display text-2xl tracking-tight md:text-3xl">
                  {p.title}
                </h3>
              </div>
              <ul className="hidden shrink-0 flex-wrap items-end justify-end gap-2 md:flex">
                {p.scope.map((s) => (
                  <li
                    key={s}
                    className="rounded-full border border-white/25 px-3 py-1 text-[11px] tracking-wide text-[--color-bone-2]/90 backdrop-blur-sm"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
