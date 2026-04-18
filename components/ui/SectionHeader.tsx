import { cn } from "@/lib/cn";
import { FadeUp } from "./FadeUp";

export function SectionHeader({
  eyebrow,
  heading,
  lede,
  align = "left",
  className,
}: {
  eyebrow?: string;
  heading: string;
  lede?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-4xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <FadeUp>
          <p className="mb-6 flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-[--color-muted]">
            <span className="h-px w-8 bg-[--color-gold]" aria-hidden="true" />
            {eyebrow}
          </p>
        </FadeUp>
      )}
      <FadeUp delay={0.05}>
        <h2 className="font-display text-4xl leading-[1.02] tracking-tight text-[--color-ink] md:text-6xl">
          {heading.split("\n").map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
        </h2>
      </FadeUp>
      {lede && (
        <FadeUp delay={0.1}>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[--color-muted]">
            {lede}
          </p>
        </FadeUp>
      )}
    </div>
  );
}
