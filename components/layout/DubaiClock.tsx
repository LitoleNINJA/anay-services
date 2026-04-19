"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { BUSINESS, isOpenNow } from "@/lib/business";

export function DubaiClock({ className }: { className?: string }) {
  const [time, setTime] = useState<string>("");
  const [open, setOpen] = useState<boolean | null>(null);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(
        new Intl.DateTimeFormat("en-GB", {
          timeZone: BUSINESS.hours.timezone,
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }).format(now),
      );
      setOpen(isOpenNow(now));
    };
    update();
    const id = setInterval(update, 30_000);
    return () => clearInterval(id);
  }, []);

  if (!time) {
    return <span className={cn("inline-block h-5 w-24", className)} aria-hidden />;
  }

  const label = open
    ? "Dubai time, office open now"
    : "Dubai time, office closed";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 text-[11px] tracking-[0.2em] uppercase",
        className,
      )}
      aria-label={`${label} — ${time}`}
      dir="ltr"
    >
      <span
        className="relative inline-flex h-1.5 w-1.5 shrink-0"
        aria-hidden
      >
        {open && (
          <span className="absolute inset-0 rounded-full bg-[--color-gold] opacity-75 animate-ping" />
        )}
        <span
          className={cn(
            "relative inline-block h-1.5 w-1.5 rounded-full",
            open ? "bg-[--color-gold]" : "bg-[--color-muted]",
          )}
        />
      </span>
      <span className="font-mono text-[--color-ink]/70">DXB</span>
      <span className="text-[--color-line-strong]" aria-hidden>
        ·
      </span>
      <span className="font-mono tabular-nums text-[--color-ink]">{time}</span>
    </span>
  );
}
