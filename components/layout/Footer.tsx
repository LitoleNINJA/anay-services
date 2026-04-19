"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useLang } from "@/context/LanguageProvider";
import { BUSINESS } from "@/lib/business";

export function Footer() {
  const reduced = useReducedMotion();
  const { t } = useLang();
  const year = new Date().getFullYear();

  const addressLines = [
    "274 IDS Group, Al Karama",
    "Dubai, U.A.E. · P.O. Box 44320",
  ];

  const companyLinks = t.nav
    .filter((n) => n.href !== "#services")
    .map((n) => ({ label: n.label, href: n.href }));

  const serviceLinks = t.services.items.map((s) => ({
    label: s.title,
    href: "#services",
  }));

  const elsewhereLinks = [
    { label: "Instagram", href: BUSINESS.social.instagram },
    { label: "LinkedIn", href: BUSINESS.social.linkedin },
    { label: t.contact.labels.whatsapp, href: BUSINESS.whatsappHref },
  ];

  return (
    <footer className="relative overflow-hidden bg-[--color-ink] text-[--color-bone]">
      <div className="container-page pt-16 pb-10 md:pt-24 md:pb-12">
        <div className="grid gap-10 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-5">
            <p className="text-sm text-[--color-bone-2]/70">{t.footer.tagline}</p>
            <p className="mt-6 max-w-sm text-lg leading-relaxed">
              {t.footer.intro}
            </p>
            <address className="mt-8 not-italic text-sm leading-relaxed text-[--color-bone-2]/70">
              {addressLines.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
              <a
                href={`mailto:${BUSINESS.email}`}
                className="mt-3 inline-block text-[--color-bone] underline-offset-4 hover:underline"
              >
                {BUSINESS.email}
              </a>
              <br />
              <a
                href={BUSINESS.phoneHref}
                className="text-[--color-bone] underline-offset-4 hover:underline"
                dir="ltr"
              >
                {BUSINESS.phone}
              </a>
            </address>
          </div>

          <div className="md:col-span-2">
            <FooterColTitle>{t.footer.columns.company}</FooterColTitle>
            <FooterColList items={companyLinks} />
          </div>
          <div className="md:col-span-3">
            <FooterColTitle>{t.footer.columns.services}</FooterColTitle>
            <FooterColList items={serviceLinks} />
          </div>
          <div className="md:col-span-2">
            <FooterColTitle>{t.footer.columns.elsewhere}</FooterColTitle>
            <FooterColList items={elsewhereLinks} external />
          </div>
        </div>

        <div className="mt-14 md:mt-20">
          <motion.p
            className="font-display leading-[0.9] text-[clamp(5rem,18vw,15rem)] tracking-[-0.04em] pb-[0.18em]"
            initial={reduced ? {} : { clipPath: "inset(100% 0 0 0)" }}
            whileInView={{ clipPath: "inset(0% 0 0 0)" }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          >
            Anay<span className="text-[--color-gold]">.</span>
          </motion.p>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-8 text-xs text-[--color-bone-2]/60 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {BUSINESS.legalName}. {t.footer.rights}
          </p>
          <p>{t.footer.madeIn}</p>
        </div>
      </div>
    </footer>
  );
}

function FooterColTitle({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] uppercase tracking-[0.22em] text-[--color-bone-2]/50">
      {children}
    </p>
  );
}

function FooterColList({
  items,
  external,
}: {
  items: readonly { label: string; href: string }[];
  external?: boolean;
}) {
  return (
    <ul className="mt-6 space-y-3 text-sm">
      {items.map((i) => (
        <li key={i.label}>
          {external ? (
            <a
              href={i.href}
              target="_blank"
              rel="noreferrer noopener"
              className="text-[--color-bone]/80 transition-colors hover:text-[--color-gold]"
            >
              {i.label}
            </a>
          ) : (
            <Link
              href={i.href}
              className="text-[--color-bone]/80 transition-colors hover:text-[--color-gold]"
            >
              {i.label}
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
}
