"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { PROCESS } from "@/content/content";
import { FadeUp } from "@/components/ui/FadeUp";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const lineScaleY = useTransform(scrollYProgress, [0.05, 0.95], [0, 1]);

  return (
    <section
      id="approach"
      className="relative border-t border-[--color-line] bg-[--color-bone-2]/40"
    >
      <div className="container-page py-24 md:py-40">
        <SectionHeader
          eyebrow={PROCESS.eyebrow}
          heading={PROCESS.heading}
          lede="A clear, repeatable programme — small enough to stay personal, disciplined enough to run on schedule."
        />

        <div ref={ref} className="relative mt-16 md:mt-24">
          <motion.span
            aria-hidden
            style={{ scaleY: lineScaleY }}
            className="absolute left-6 top-0 h-full w-px origin-top bg-[--color-gold] md:left-[calc(50%-0.5px)]"
          />
          <ol className="relative space-y-16 md:space-y-28">
            {PROCESS.steps.map((step, i) => (
              <li
                key={step.index}
                className={
                  "relative grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-20 " +
                  (i % 2 === 1 ? "md:[&>*:first-child]:order-2" : "")
                }
              >
                <FadeUp delay={0}>
                  <p
                    aria-hidden
                    className="font-display text-stroke text-stroke-gold pl-16 text-[clamp(6rem,14vw,12rem)] leading-[0.85] tracking-[-0.04em] md:pl-0"
                  >
                    {step.index}
                  </p>
                </FadeUp>

                <FadeUp delay={0.1}>
                  <div className="pl-16 md:pl-0">
                    <h3 className="font-display text-3xl tracking-tight text-[--color-ink] md:text-5xl">
                      {step.title}
                    </h3>
                    <p className="mt-4 max-w-md text-base leading-relaxed text-[--color-muted] md:text-lg">
                      {step.copy}
                    </p>
                  </div>
                </FadeUp>

                <span
                  className="absolute left-6 top-2 h-3 w-3 -translate-x-1/2 rounded-full bg-[--color-gold] md:left-[calc(50%-1.5px)]"
                  aria-hidden
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
