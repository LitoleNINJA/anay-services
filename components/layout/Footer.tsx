"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { FOOTER, CONTACT } from "@/content/content";
import { BUSINESS } from "@/lib/business";

export function Footer() {
  const reduced = useReducedMotion();
  const year = new Date().getFullYear();
  return (
    <footer className="relative mt-24 overflow-hidden bg-[--color-ink] text-[--color-bone]">
      <div className="container-page pt-24 pb-12">
        <div className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="text-sm text-[--color-bone-2]/70">
              {FOOTER.tagline}
            </p>
            <p className="mt-6 max-w-sm text-lg leading-relaxed">
              Cleanly finished, built to last. We design and deliver floors and
              fit-outs that stand up to real use.
            </p>
            <address className="mt-8 not-italic text-sm leading-relaxed text-[--color-bone-2]/70">
              {CONTACT.detail.addressLines.map((l) => (
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
              >
                {BUSINESS.phone}
              </a>
            </address>
          </div>

          <div className="md:col-span-2">
            <FooterColTitle>Company</FooterColTitle>
            <FooterColList items={FOOTER.columns.company} />
          </div>
          <div className="md:col-span-3">
            <FooterColTitle>Services</FooterColTitle>
            <FooterColList items={FOOTER.columns.services.slice(0, 10)} />
          </div>
          <div className="md:col-span-2">
            <FooterColTitle>Elsewhere</FooterColTitle>
            <FooterColList items={FOOTER.columns.elsewhere} external />
          </div>
        </div>

        <div className="mt-20">
          <motion.p
            className="font-display leading-[0.82] text-[clamp(5rem,18vw,15rem)] tracking-[-0.04em]"
            initial={reduced ? {} : { clipPath: "inset(100% 0 0 0)" }}
            whileInView={{ clipPath: "inset(0% 0 0 0)" }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          >
            {FOOTER.wordmark}
            <span className="text-[--color-gold]">.</span>
          </motion.p>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-8 text-xs text-[--color-bone-2]/60 md:flex-row md:items-center md:justify-between">
          <p>© {year} {BUSINESS.legalName}. All rights reserved.</p>
          <p>Made with care in Dubai.</p>
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
