"use client";

import * as React from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { DURATION, EASE_OUT_EXPO, REVEAL_Y, STAGGER, VIEWPORT } from "@/lib/motion";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------
   Reveal — a single element fades/rises into view once.
   Renders plainly (no animation) when the user prefers reduced motion, so the
   final readable state is immediate.
------------------------------------------------------------------------- */
export function Reveal({
  children,
  className,
  delay = 0,
  y = REVEAL_Y,
  once = true,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
  as?: "div" | "section" | "li" | "article" | "figure";
}) {
  const reduce = useReducedMotion();
  const Comp = motion[as];

  if (reduce) {
    const Plain = as;
    return <Plain className={className}>{children}</Plain>;
  }

  return (
    <Comp
      data-anim
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ ...VIEWPORT, once }}
      transition={{ duration: DURATION.base, ease: EASE_OUT_EXPO, delay }}
    >
      {children}
    </Comp>
  );
}

/* -------------------------------------------------------------------------
   Stagger — parent that sequences its <StaggerItem> children.
------------------------------------------------------------------------- */
const container = (stagger: number, delay: number): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren: delay } },
});

export function Stagger({
  children,
  className,
  stagger = STAGGER,
  delay = 0,
  once = true,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  once?: boolean;
}) {
  const reduce = useReducedMotion();

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      data-anim
      className={className}
      variants={container(stagger, delay)}
      initial="hidden"
      whileInView="show"
      viewport={{ ...VIEWPORT, once }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  y = REVEAL_Y,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  y?: number;
  as?: "div" | "li" | "article" | "figure";
}) {
  const Comp = motion[as];

  const variants: Variants = {
    hidden: { opacity: 0, y },
    show: { opacity: 1, y: 0, transition: { duration: DURATION.base, ease: EASE_OUT_EXPO } },
  };

  return (
    <Comp data-anim className={className} variants={variants}>
      {children}
    </Comp>
  );
}

/* -------------------------------------------------------------------------
   MaskReveal — editorial line reveal. The text stays one accessible text node;
   only the wrapping mask moves, so screen readers and crawlers see plain copy.
------------------------------------------------------------------------- */
export function MaskReveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();

  if (reduce) return <span className={cn("block", className)}>{children}</span>;

  return (
    <span className={cn("block overflow-hidden", className)}>
      <motion.span
        data-anim
        className="block"
        initial={{ y: "105%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 0.85, ease: EASE_OUT_EXPO, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}
