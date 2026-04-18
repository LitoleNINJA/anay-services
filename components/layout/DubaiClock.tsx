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

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] uppercase text-[--color-muted]",
        className,
      )}
      aria-label={`Dubai local time ${time}, ${open ? "open now" : "closed"}`}
    >
      <span
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          open ? "bg-[--color-gold]" : "bg-[--color-muted]",
        )}
        aria-hidden
      />
      DXB · {time}
    </span>
  );
}
