"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { HERO } from "@/content/content";
import { useLang } from "@/context/LanguageProvider";
import { RevealText } from "@/components/ui/RevealText";
import { LinkButton } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/Magnetic";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { t, lang } = useLang();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", reduced ? "0%" : "22%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, reduced ? 1 : 1.12]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative isolate overflow-hidden pt-20 pb-10 md:flex md:min-h-[100svh] md:items-end md:pt-28 md:pb-24"
    >
      <div className="container-page relative z-10 grid w-full grid-cols-1 items-end gap-8 md:grid-cols-12 md:gap-12">
        <div className="md:col-span-7">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1], delay: 0.1 }}
            className="mb-5 flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-[--color-muted] md:mb-8"
          >
            <span className="h-px w-10 bg-[--color-gold]" aria-hidden />
            {t.hero.eyebrow}
          </motion.p>

          <RevealText
            key={lang}
            lines={t.hero.headingLines}
            as="p"
            className="text-[--color-ink] text-[clamp(2.75rem,9vw,8rem)] tracking-[-0.03em]"
            delay={0.15}
          />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1], delay: 0.9 }}
            className="mt-5 max-w-xl text-base leading-relaxed text-[--color-muted] md:mt-8 md:text-lg"
          >
            {t.hero.lede}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1], delay: 1.05 }}
            className="mt-7 flex flex-wrap items-center gap-3 md:mt-10"
          >
            <Magnetic strength={0.32}>
              <LinkButton
                href={t.hero.primaryCta.href}
                variant="primary"
                size="lg"
              >
                {t.hero.primaryCta.label}
                <ArrowUpRight size={16} strokeWidth={1.6} />
              </LinkButton>
            </Magnetic>
            <LinkButton
              href={t.hero.secondaryCta.href}
              variant="outline"
              size="lg"
            >
              {t.hero.secondaryCta.label}
            </LinkButton>
          </motion.div>
        </div>

        <div className="md:col-span-5">
          <motion.div
            initial={{ opacity: 0, scale: reduced ? 1 : 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="relative aspect-[5/3] overflow-hidden rounded-lg md:aspect-[3/4]"
          >
            <motion.div style={{ y, scale }} className="absolute inset-0">
              <Image
                src={HERO.image.src}
                alt={HERO.image.alt}
                fill
                priority
                sizes="(min-width: 768px) 40vw, 100vw"
                className="object-cover"
              />
            </motion.div>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[--color-ink]/15 via-transparent to-transparent" />
          </motion.div>
        </div>
      </div>

      <Link
        href="#about"
        aria-label="Scroll to next section"
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 items-center gap-2 text-xs uppercase tracking-[0.22em] text-[--color-muted] transition-colors hover:text-[--color-ink] md:flex"
      >
        <motion.span
          aria-hidden
          initial={{ y: 0 }}
          animate={reduced ? {} : { y: [0, 6, 0] }}
          transition={{ duration: 1.8, ease: "easeInOut", repeat: Infinity }}
          className="inline-flex"
        >
          <ArrowDown size={14} strokeWidth={1.5} />
        </motion.span>
        Scroll
      </Link>
    </section>
  );
}
