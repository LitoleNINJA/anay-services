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
import { useLang } from "@/context/LanguageProvider";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { cn } from "@/lib/cn";

type MergedProject = {
  title: string;
  image: { src: string; alt: string };
  span: "tall" | "wide" | "square";
};

export function Projects() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { t } = useLang();
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

  const items: MergedProject[] = t.projects.items.map((p, i) => ({
    title: p.title,
    image: PROJECTS[i]?.image ?? PROJECTS[0].image,
    span: PROJECTS[i]?.span ?? "square",
  }));

  const left = items.filter((_, i) => i % 2 === 0);
  const right = items.filter((_, i) => i % 2 === 1);

  return (
    <section id="work" className="container-page py-20 md:py-40">
      <SectionHeader
        eyebrow={t.projects.eyebrow}
        heading={t.projects.heading}
        lede={t.projects.lede}
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
  project: MergedProject;
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
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-90" />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-44 backdrop-blur-xl md:h-52"
        style={{
          backgroundImage:
            "linear-gradient(to top, rgba(10,10,10,0.72), rgba(10,10,10,0))",
          maskImage:
            "linear-gradient(to top, black 55%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to top, black 55%, transparent 100%)",
        }}
        aria-hidden
      />
      <div className="absolute inset-x-0 bottom-0 p-6 text-white md:p-8">
        <h3
          className="font-display text-2xl tracking-tight md:text-3xl"
          style={{
            textShadow:
              "0 1px 2px rgba(0,0,0,0.6), 0 2px 14px rgba(0,0,0,0.4)",
          }}
        >
          {p.title}
        </h3>
      </div>
    </motion.article>
  );
}
