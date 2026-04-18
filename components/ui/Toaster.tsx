"use client";

import { Toaster as Sonner } from "sonner";

export function Toaster() {
  return (
    <Sonner
      theme="light"
      position="bottom-right"
      toastOptions={{
        classNames: {
          toast:
            "!bg-[--color-ink] !text-[--color-bone] !border-[--color-line-strong] !rounded-xl !font-sans",
          title: "!text-[--color-bone] !font-medium",
          description: "!text-[--color-bone-2]/80",
          success: "!bg-[--color-ink]",
          error: "!bg-[--color-ink]",
        },
      }}
    />
  );
}
