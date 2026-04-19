"use client";

import { motion } from "framer-motion";
import { useLang } from "@/context/LanguageProvider";
import { cn } from "@/lib/cn";

const SLOT_W = 44; // px

export function LanguageToggle({ className }: { className?: string }) {
  const { lang, setLang } = useLang();
  const isAr = lang === "ar";

  return (
    <div
      role="group"
      aria-label="Language"
      dir="ltr"
      className={cn(
        "relative inline-flex h-9 items-center rounded-full border border-[--color-line-strong] bg-[--color-bone]/70 p-1 backdrop-blur-sm shadow-[0_1px_0_rgba(10,10,10,0.04)]",
        className,
      )}
    >
      <motion.span
        aria-hidden
        className="absolute top-1 bottom-1 left-1 rounded-full bg-[--color-ink]"
        style={{ width: SLOT_W }}
        initial={false}
        animate={{ x: isAr ? SLOT_W : 0 }}
        transition={{ type: "spring", stiffness: 380, damping: 32, mass: 0.6 }}
      />
      <button
        type="button"
        onClick={() => setLang("en")}
        aria-pressed={!isAr}
        className={cn(
          "relative z-10 flex h-7 items-center justify-center rounded-full font-mono text-[11px] font-medium tracking-[0.18em] uppercase transition-colors duration-200",
          !isAr
            ? "text-[--color-bone]"
            : "text-[--color-muted] hover:text-[--color-ink]",
        )}
        style={{ width: SLOT_W }}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLang("ar")}
        aria-pressed={isAr}
        className={cn(
          "relative z-10 flex h-7 items-center justify-center rounded-full text-[15px] leading-none transition-colors duration-200",
          isAr
            ? "text-[--color-bone]"
            : "text-[--color-muted] hover:text-[--color-ink]",
        )}
        style={{
          width: SLOT_W,
          fontFamily: "var(--font-cairo, sans-serif)",
        }}
      >
        ع
      </button>
    </div>
  );
}
