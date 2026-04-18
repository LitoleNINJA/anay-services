"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ABOUT } from "@/content/content";
import { FadeUp } from "@/components/ui/FadeUp";
import { RevealTextInView } from "@/components/ui/RevealText";

export function About() {
  return (
    <section id="about" className="container-page py-24 md:py-40">
      <div className="grid gap-16 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-5">
          <div className="md:sticky md:top-32">
            <FadeUp>
              <p className="mb-6 flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-[--color-muted]">
                <span className="h-px w-8 bg-[--color-gold]" aria-hidden />
                {ABOUT.eyebrow}
              </p>
            </FadeUp>
            <RevealTextInView
              lines={ABOUT.heading.split("\n")}
              as="h2"
              className="text-[--color-ink] text-4xl tracking-[-0.02em] md:text-6xl"
            />
            <div className="mt-8 space-y-5 text-lg leading-relaxed text-[--color-muted]">
              {ABOUT.body.map((p, i) => (
                <FadeUp key={i} delay={0.1 + i * 0.05}>
                  <p>{p}</p>
                </FadeUp>
              ))}
            </div>

            <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-8">
              {ABOUT.pillars.map((p, i) => (
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
          <div className="flex flex-col gap-8 md:gap-20">
            {ABOUT.images.map((img, i) => (
              <motion.div
                key={img.src}
                initial={{ opacity: 0, y: 48, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-15% 0px" }}
                transition={{
                  duration: 1,
                  ease: [0.16, 1, 0.3, 1],
                  delay: i === 0 ? 0 : 0.05,
                }}
                className={
                  "relative w-full overflow-hidden rounded-lg " +
                  (i === 0
                    ? "aspect-[4/5] md:ml-10"
                    : i === 1
                      ? "aspect-[5/4] md:mr-14"
                      : "aspect-[4/5] md:ml-20")
                }
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
