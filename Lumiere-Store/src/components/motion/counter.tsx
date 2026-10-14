"use client";

import * as React from "react";
import { useInView, useMotionValue, useReducedMotion, useSpring } from "motion/react";

/**
 * Counts up to `value` the first time it scrolls into view.
 *
 * Renders a static string immediately under reduced motion, and keeps the final
 * value in the DOM as soon as the animation settles so the number is always
 * readable and selectable.
 */
export function Counter({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  className,
}: {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();

  const fallback = `${prefix}${value.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })}${suffix}`;

  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { stiffness: 70, damping: 18, restDelta: 0.01 });
  const [display, setDisplay] = React.useState(fallback);

  React.useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setDisplay(fallback);
      return;
    }
    motionValue.set(value);
  }, [inView, reduce, value, motionValue, fallback]);

  React.useEffect(() => {
    if (reduce) return;
    const unsubscribe = spring.on("change", (latest) => {
      setDisplay(
        `${prefix}${latest.toLocaleString("en-US", {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        })}${suffix}`
      );
    });
    return () => unsubscribe();
  }, [spring, reduce, decimals, prefix, suffix]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
