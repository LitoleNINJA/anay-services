"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { ABOUT } from "@/content/content";
import { useLang } from "@/context/LanguageProvider";
import { FadeUp } from "@/components/ui/FadeUp";
import { RevealTextInView } from "@/components/ui/RevealText";

export function About() {
  const { t, lang } = useLang();
  const a = t.about;
  return (
    <section id="about" className="container-page py-20 md:py-40">
      <div className="grid gap-12 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-5">
          <div className="md:sticky md:top-32">
            <FadeUp>
              <p className="mb-6 flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-[--color-muted]">
                <span className="h-px w-8 bg-[--color-gold]" aria-hidden />
                {a.eyebrow}
              </p>
            </FadeUp>
            <RevealTextInView
              key={lang + "-heading"}
              lines={a.heading.split("\n")}
              as="h2"
              className="text-[--color-ink] text-4xl tracking-[-0.02em] md:text-6xl"
            />
            <div className="mt-8 space-y-5 text-lg leading-relaxed text-[--color-muted]">
              {a.body.map((p, i) => (
                <FadeUp key={i} delay={0.1 + i * 0.05}>
                  <p>{p}</p>
                </FadeUp>
              ))}
            </div>

            <dl className="mt-10 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2 sm:gap-y-8 md:mt-12">
              {a.pillars.map((p, i) => (
                <FadeUp key={p.title} delay={0.2 + i * 0.05}>
                  <div>
                    <dt className="font-display text-xl tracking-tight text-[--color-ink]">
                      {p.title}
                    </dt>
                    <dd className="mt-2 text-sm leading-relaxed text-[--color-muted]">
                      {p.copy}
                    </dd>
                  </div>
                </FadeUp>
              ))}
            </dl>
          </div>
        </div>

        <div className="md:col-span-7">
          <div className="flex flex-col gap-8 md:gap-24">
            {ABOUT.images.map((img, i) => (
              <ParallaxImage
                key={img.src}
                src={img.src}
                alt={img.alt}
                offset={i}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ParallaxImage({
  src,
  alt,
  offset,
}: {
  src: string;
  alt: string;
  offset: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [reduced ? 0 : 40, reduced ? 0 : -60],
  );
  const scale = useTransform(scrollYProgress, [0, 1], [1, reduced ? 1 : 1.08]);

  const wrapper =
    offset === 0
      ? "aspect-[4/5] md:ml-10"
      : offset === 1
        ? "aspect-[5/4] md:mr-14"
        : "aspect-[4/5] md:ml-20";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 48, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-15% 0px" }}
      transition={{
        duration: 1,
        ease: [0.16, 1, 0.3, 1],
        delay: offset === 0 ? 0 : 0.05,
      }}
      className={`relative w-full overflow-hidden rounded-lg will-change-transform ${wrapper}`}
    >
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover"
        />
      </motion.div>
    </motion.div>
  );
}
