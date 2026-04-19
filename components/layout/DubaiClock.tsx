"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { BUSINESS, isOpenNow } from "@/lib/business";

const GOLD = "#C8A96A";
const MUTED = "#8A8680";
const INK = "#0A0A0A";

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
          <span
            className="absolute inset-0 rounded-full animate-ping"
            style={{ backgroundColor: GOLD, opacity: 0.7 }}
          />
        )}
        <span
          className="relative inline-block h-1.5 w-1.5 rounded-full"
          style={{ backgroundColor: open ? GOLD : MUTED }}
        />
      </span>
      <span className="font-mono" style={{ color: `${INK}B3` /* 70% */ }}>
        DXB
      </span>
      <span aria-hidden style={{ color: "rgba(10,10,10,0.25)" }}>
        ·
      </span>
      <span
        className="font-mono tabular-nums"
        style={{ color: INK }}
      >
        {time}
      </span>
    </span>
  );
}
