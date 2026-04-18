"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { EASE_OUT_QUART } from "@/lib/motion";

export function FadeUp({
  children,
  delay = 0,
  y = 24,
  duration = 0.7,
  className,
  once = true,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}) {
  const reduced = useReducedMotion();
  const variants: Variants = reduced
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration, delay, ease: EASE_OUT_QUART },
        },
      };
  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-10% 0px" }}
    >
      {children}
    </motion.div>
  );
}
