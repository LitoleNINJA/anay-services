"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Plus } from "lucide-react";
import { useLang } from "@/context/LanguageProvider";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FadeUp } from "@/components/ui/FadeUp";
import { cn } from "@/lib/cn";

export function FAQ() {
  const { t } = useLang();
  const [open, setOpen] = useState<number | null>(0);
  const reduced = useReducedMotion();

  return (
    <section
      id="faq"
      className="border-t border-[--color-line] bg-[--color-bone-2]/40"
    >
      <div className="container-page py-20 md:py-32">
        <div className="grid gap-12 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-5">
            <div className="md:sticky md:top-32">
              <SectionHeader
                eyebrow={t.faq.eyebrow}
                heading={t.faq.heading}
                lede={t.faq.lede}
              />
            </div>
          </div>

          <div className="md:col-span-7">
            <ul className="border-t border-[--color-line]">
              {t.faq.items.map((item, i) => {
                const isOpen = open === i;
                return (
                  <FadeUp key={item.q} delay={i * 0.04} y={14}>
                    <li className="border-b border-[--color-line]">
                      <h3>
                        <button
                          type="button"
                          onClick={() => setOpen(isOpen ? null : i)}
                          aria-expanded={isOpen}
                          className="flex w-full cursor-pointer items-start justify-between gap-6 py-6 text-left"
                        >
                          <span className="font-display text-xl tracking-tight text-[--color-ink] md:text-2xl">
                            {item.q}
                          </span>
                          <span
                            className={cn(
                              "mt-1 shrink-0 transition-transform duration-300",
                              isOpen && "rotate-45",
                            )}
                            aria-hidden
                          >
                            <Plus size={20} strokeWidth={1.6} />
                          </span>
                        </button>
                      </h3>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
                            animate={
                              reduced
                                ? { opacity: 1 }
                                : { height: "auto", opacity: 1 }
                            }
                            exit={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
                            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                            className="overflow-hidden"
                          >
                            <p className="max-w-xl pb-7 pr-10 text-[15px] leading-relaxed text-[--color-muted] md:text-base">
                              {item.a}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </li>
                  </FadeUp>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
