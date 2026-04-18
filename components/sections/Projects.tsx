"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { PROJECTS } from "@/content/content";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { cn } from "@/lib/cn";

export function Projects() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const yLeft = useTransform(
    scrollYProgress,
    [0, 1],
    [reduced ? 0 : 40, reduced ? 0 : -80],
  );
  const yRight = useTransform(
    scrollYProgress,
    [0, 1],
    [reduced ? 0 : -40, reduced ? 0 : 80],
  );

  const left = PROJECTS.filter((_, i) => i % 2 === 0);
  const right = PROJECTS.filter((_, i) => i % 2 === 1);

  return (
    <section id="work" className="container-page py-24 md:py-40">
      <SectionHeader
        eyebrow="Selected work"
        heading={"A small, careful\nbody of work."}
        lede="Residential, commercial, retail and hospitality across Dubai and Abu Dhabi. Select projects — a fuller portfolio available on request."
      />

      <div ref={ref} className="mt-16 md:mt-24">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          <motion.div
            style={{ y: yLeft }}
            className="flex flex-col gap-6 md:gap-10 will-change-transform"
          >
            {left.map((p, i) => (
              <ProjectCard key={p.title} project={p} index={i * 2} />
            ))}
          </motion.div>
          <motion.div
            style={{ y: yRight }}
            className="flex flex-col gap-6 md:mt-24 md:gap-10 will-change-transform"
          >
            {right.map((p, i) => (
              <ProjectCard key={p.title} project={p} index={i * 2 + 1} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  project: p,
  index,
}: {
  project: (typeof PROJECTS)[number];
  index: number;
}) {
  const aspect =
    p.span === "tall"
      ? "aspect-[3/4]"
      : p.span === "wide"
        ? "aspect-[5/4]"
        : "aspect-[4/5]";

  return (
    <motion.article
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1],
        delay: (index % 2) * 0.06,
      }}
      className={cn(
        "group relative overflow-hidden rounded-lg bg-[--color-bone-2]",
        aspect,
      )}
    >
      <Image
        src={p.image.src}
        alt={p.image.alt}
        fill
        sizes="(min-width: 768px) 46vw, 100vw"
        className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.06]"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[--color-ink]/75 via-[--color-ink]/10 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-95" />
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 text-[--color-bone] md:p-8">
        <div className="min-w-0">
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
  );
}
