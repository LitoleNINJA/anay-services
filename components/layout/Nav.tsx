"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { NAV_LINKS } from "@/content/content";
import { LinkButton } from "@/components/ui/Button";
import { DubaiClock } from "./DubaiClock";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-500",
        scrolled || open
          ? "bg-[--color-bone]/80 backdrop-blur-md border-b border-[--color-line]"
          : "bg-transparent border-b border-transparent",
      )}
    >
      <div className="container-page flex h-16 items-center justify-between md:h-20">
        <Link
          href="#top"
          className="font-display text-xl tracking-tight text-[--color-ink]"
          aria-label="Anay Technical Services — home"
          onClick={() => setOpen(false)}
        >
          anay<span className="text-[--color-gold]">.</span>
        </Link>

        <nav
          className="hidden items-center gap-8 md:flex"
          aria-label="Primary"
        >
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm tracking-tight text-[--color-ink]/80 transition-colors hover:text-[--color-ink]"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-5 md:flex">
          <DubaiClock />
          <LinkButton href="#contact" variant="primary" size="sm">
            Get a quote
          </LinkButton>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="relative z-[60] md:hidden p-2 -mr-2 text-[--color-ink]"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 top-0 z-40 bg-[--color-bone] md:hidden"
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
          >
            <div className="container-page flex h-full flex-col justify-between pt-24 pb-10">
              <ul className="flex flex-col gap-3">
                {NAV_LINKS.map((l, i) => (
                  <motion.li
                    key={l.href}
                    initial={reduced ? {} : { opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.08 + i * 0.05,
                      duration: 0.45,
                      ease: [0.25, 1, 0.5, 1],
                    }}
                  >
                    <Link
                      href={l.href}
                      className="font-display block text-5xl leading-tight tracking-tight text-[--color-ink]"
                      onClick={() => setOpen(false)}
                    >
                      {l.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <div className="flex flex-col gap-4">
                <DubaiClock />
                <LinkButton
                  href="#contact"
                  variant="primary"
                  size="lg"
                  className="self-start"
                  onClick={() => setOpen(false)}
                >
                  Get a quote
                </LinkButton>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
