"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";

/**
 * Thin gold reading-progress bar pinned to the very top of the viewport.
 * Uses a spring so it tracks the scrollbar without stuttering.
 */
export function ScrollProgress() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001,
  });

  if (reduce) return null;

  return (
    <motion.div
      aria-hidden
      data-progress
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[90] h-0.5 origin-left bg-gold"
    />
  );
}
