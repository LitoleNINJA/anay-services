"use client";

import { motion } from "framer-motion";
import { useLang } from "@/context/LanguageProvider";
import { cn } from "@/lib/cn";

export function LanguageToggle({ className }: { className?: string }) {
  const { lang, setLang } = useLang();
  const isAr = lang === "ar";

  return (
    <button
      type="button"
      onClick={() => setLang(isAr ? "en" : "ar")}
      aria-label={
        isAr ? "Switch to English" : "التبديل إلى اللغة العربية"
      }
      className={cn(
        "relative inline-flex h-8 items-center rounded-full border border-[--color-line-strong] bg-[--color-bone]/50 p-0.5 text-[11px] tracking-[0.18em] uppercase transition-colors hover:border-[--color-ink]",
        className,
      )}
    >
      <span className="relative z-10 flex w-8 items-center justify-center font-mono text-[--color-ink]">
        EN
      </span>
      <span
        className="relative z-10 flex w-8 items-center justify-center font-sans text-[14px] text-[--color-ink]"
        style={{ fontFeatureSettings: '"ss01"' }}
      >
        ع
      </span>
      <motion.span
        aria-hidden
        className="absolute inset-y-0.5 w-8 rounded-full bg-[--color-gold]"
        initial={false}
        animate={{ x: isAr ? 32 : 0 }}
        transition={{ type: "spring", stiffness: 320, damping: 28 }}
      />
    </button>
  );
}
