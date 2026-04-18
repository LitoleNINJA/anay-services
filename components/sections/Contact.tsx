import { CONTACT } from "@/content/content";
import { ContactForm } from "@/components/forms/ContactForm";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FadeUp } from "@/components/ui/FadeUp";

export function Contact() {
  return (
    <section id="contact" className="container-page py-24 md:py-40">
      <div className="grid gap-16 md:grid-cols-12 md:gap-12">
        <div className="md:col-span-5">
          <SectionHeader
            eyebrow={CONTACT.eyebrow}
            heading={CONTACT.heading}
            lede={CONTACT.lede}
          />

          <dl className="mt-12 space-y-6 text-sm">
            <FadeUp delay={0.05}>
              <Detail label="Studio">
                {CONTACT.detail.addressLines.map((l) => (
                  <span key={l} className="block">
                    {l}
                  </span>
                ))}
              </Detail>
            </FadeUp>
            <FadeUp delay={0.1}>
              <Detail label="Email">
                <a
                  href={`mailto:${CONTACT.detail.email}`}
                  className="underline-offset-4 hover:underline"
                >
                  {CONTACT.detail.email}
                </a>
              </Detail>
            </FadeUp>
            <FadeUp delay={0.15}>
              <Detail label="Phone">
                <a
                  href={CONTACT.detail.phoneHref}
                  className="underline-offset-4 hover:underline"
                >
                  {CONTACT.detail.phone}
                </a>
                {" · "}
                <a
                  href={CONTACT.detail.whatsappHref}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="underline-offset-4 hover:underline"
                >
                  WhatsApp
                </a>
              </Detail>
            </FadeUp>
            <FadeUp delay={0.2}>
              <Detail label="Hours">{CONTACT.detail.hours}</Detail>
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
    <div className="grid grid-cols-[7rem_1fr] gap-6 border-t border-[--color-line] pt-5">
      <dt className="text-[11px] uppercase tracking-[0.22em] text-[--color-muted]">
        {label}
      </dt>
      <dd className="text-[--color-ink]">{children}</dd>
    </div>
  );
}
