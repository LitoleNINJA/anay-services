"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { LinkButton } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/Magnetic";
import { LanguageToggle } from "@/components/ui/LanguageToggle";
import { useLang } from "@/context/LanguageProvider";
import { DubaiClock } from "./DubaiClock";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();
  const { t } = useLang();

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
          className="flex items-center"
          aria-label="Anay Interior — home"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/logo_bg_removed.png"
            alt="Anay Interior — We design, you deserve"
            width={1536}
            height={1024}
            priority
            className="h-14 w-auto md:h-20"
          />
        </Link>

        <nav
          className="hidden items-center gap-8 md:flex"
          aria-label="Primary"
        >
          {t.nav.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm tracking-tight text-[--color-ink]/80 transition-colors hover:text-[--color-ink]"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <DubaiClock />
          <LanguageToggle />
          <Magnetic strength={0.35}>
            <LinkButton href="#contact" variant="primary" size="sm">
              {t.cta.getQuote}
            </LinkButton>
          </Magnetic>
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <LanguageToggle />
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="relative z-[60] p-2 -mr-2 text-[--color-ink]"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-drawer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.25, 1, 0.5, 1] }}
            className="md:hidden"
            style={{
              position: "fixed",
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              backgroundColor: "#F7F5F0",
              zIndex: 45,
            }}
          >
            <div
              className="container-page flex h-full flex-col justify-between pt-24 pb-10"
              style={{ backgroundColor: "#F7F5F0" }}
            >
              <ul className="flex flex-col gap-3">
                {t.nav.map((l, i) => (
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
                      className="font-display block text-5xl leading-tight tracking-tight"
                      style={{ color: "#0A0A0A" }}
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
                  {t.cta.getQuote}
                </LinkButton>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
