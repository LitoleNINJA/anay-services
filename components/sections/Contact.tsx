"use client";

import { useLang } from "@/context/LanguageProvider";
import { BUSINESS } from "@/lib/business";
import { ContactForm } from "@/components/forms/ContactForm";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FadeUp } from "@/components/ui/FadeUp";

export function Contact() {
  const { t } = useLang();
  const c = t.contact;

  const addressLines = ["Dubai, U.A.E. · P.O. Box 44320"];

  return (
    <section id="contact" className="container-page py-20 md:py-32">
      <div className="grid gap-12 md:grid-cols-12 md:gap-12">
        <div className="md:col-span-5">
          <SectionHeader
            eyebrow={c.eyebrow}
            heading={c.heading}
            lede={c.lede}
          />

          <dl className="mt-12 space-y-6 text-sm">
            <FadeUp delay={0.05}>
              <Detail label={c.labels.studio}>
                {addressLines.map((l) => (
                  <span key={l} className="block">
                    {l}
                  </span>
                ))}
              </Detail>
            </FadeUp>
            <FadeUp delay={0.1}>
              <Detail label={c.labels.email}>
                <a
                  href={`mailto:${BUSINESS.email}`}
                  className="underline-offset-4 hover:underline"
                >
                  {BUSINESS.email}
                </a>
              </Detail>
            </FadeUp>
            <FadeUp delay={0.15}>
              <Detail label={c.labels.phone}>
                <a
                  href={BUSINESS.phoneHref}
                  className="underline-offset-4 hover:underline"
                  dir="ltr"
                >
                  {BUSINESS.phone}
                </a>
                {" · "}
                <a
                  href={BUSINESS.whatsappHref}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="underline-offset-4 hover:underline"
                >
                  {c.labels.whatsapp}
                </a>
              </Detail>
            </FadeUp>
            <FadeUp delay={0.2}>
              <Detail label={c.labels.hours}>{BUSINESS.hours.displayHours}</Detail>
            </FadeUp>
          </dl>
        </div>

        <div className="md:col-span-7">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}

function Detail({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-[5rem_1fr] gap-4 border-t border-[--color-line] pt-5 md:grid-cols-[7rem_1fr] md:gap-6">
      <dt className="text-[11px] uppercase tracking-[0.22em] text-[--color-muted]">
        {label}
      </dt>
      <dd className="text-[--color-ink]">{children}</dd>
    </div>
  );
}
