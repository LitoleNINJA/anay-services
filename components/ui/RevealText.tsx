"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";
import { maskLineChild, maskLineParent } from "@/lib/motion";

export function RevealText({
  lines,
  as: As = "h1",
  className,
  lineClassName,
  delay = 0,
}: {
  lines: string[];
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
  className?: string;
  lineClassName?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  const Tag = As as "h1";
  return (
    <Tag className={cn("font-display leading-[0.95]", className)}>
      <motion.span
        className="block"
        initial="hidden"
        animate="visible"
        variants={
          reduced
            ? undefined
            : {
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.08,
                    delayChildren: delay,
                  },
                },
              }
        }
      >
        {lines.map((line, i) => (
          <span
            key={i}
            className={cn(
              "relative block overflow-hidden pb-[0.12em]",
              lineClassName,
            )}
          >
            {reduced ? (
              <span className="block">{line}</span>
            ) : (
              <motion.span className="block will-change-transform" variants={maskLineChild}>
                {line}
              </motion.span>
            )}
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}

export function RevealTextInView({
  lines,
  as: As = "h2",
  className,
  lineClassName,
}: {
  lines: string[];
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
  className?: string;
  lineClassName?: string;
}) {
  const reduced = useReducedMotion();
  const Tag = As as "h2";
  return (
    <Tag className={cn("font-display leading-[0.95]", className)}>
      <motion.span
        className="block"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10% 0px" }}
        variants={reduced ? undefined : maskLineParent}
      >
        {lines.map((line, i) => (
          <span
            key={i}
            className={cn(
              "relative block overflow-hidden pb-[0.12em]",
              lineClassName,
            )}
          >
            {reduced ? (
              <span className="block">{line}</span>
            ) : (
              <motion.span className="block will-change-transform" variants={maskLineChild}>
                {line}
              </motion.span>
            )}
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
