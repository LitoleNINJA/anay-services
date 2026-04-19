"use client";

import { motion } from "framer-motion";
import { useLang } from "@/context/LanguageProvider";
import { cn } from "@/lib/cn";

const SLOT_W = 44; // px
const INK = "#0A0A0A";
const BONE = "#F7F5F0";
const MUTED = "#8A8680";

export function LanguageToggle({ className }: { className?: string }) {
  const { lang, setLang } = useLang();
  const isAr = lang === "ar";

  return (
    <div
      role="group"
      aria-label="Language"
      dir="ltr"
      className={cn(
        "relative inline-flex h-9 items-center rounded-full border p-1 backdrop-blur-sm",
        className,
      )}
      style={{
        borderColor: "rgba(10,10,10,0.22)",
        backgroundColor: "rgba(247,245,240,0.7)",
      }}
    >
      <motion.span
        aria-hidden
        className="absolute top-1 bottom-1 left-1 rounded-full"
        style={{ width: SLOT_W, backgroundColor: INK }}
        initial={false}
        animate={{ x: isAr ? SLOT_W : 0 }}
        transition={{ type: "spring", stiffness: 380, damping: 32, mass: 0.6 }}
      />
      <button
        type="button"
        onClick={() => setLang("en")}
        aria-pressed={!isAr}
        className="relative z-10 flex h-7 items-center justify-center rounded-full font-mono text-[11px] font-medium tracking-[0.18em] uppercase transition-colors duration-200 cursor-pointer"
        style={{
          width: SLOT_W,
          color: !isAr ? BONE : MUTED,
        }}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLang("ar")}
        aria-pressed={isAr}
        className="relative z-10 flex h-7 items-center justify-center rounded-full text-[15px] leading-none transition-colors duration-200 cursor-pointer"
        style={{
          width: SLOT_W,
          color: isAr ? BONE : MUTED,
          fontFamily: "var(--font-cairo, sans-serif)",
        }}
      >
        ع
      </button>
    </div>
  );
}
