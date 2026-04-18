"use client";

import { animate, useInView, useMotionValue, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export function Counter({
  to,
  suffix = "",
  duration = 1.6,
}: {
  to: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduced = useReducedMotion();
  const mv = useMotionValue(0);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setDisplay(to);
      return;
    }
    const controls = animate(mv, to, {
      duration,
      ease: [0.25, 1, 0.5, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to, duration, reduced, mv]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}
