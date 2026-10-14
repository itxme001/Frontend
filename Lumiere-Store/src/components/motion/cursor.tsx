"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

/**
 * Premium cursor — inspired by gsap.com / motion.design
 *
 * Two layers:
 * 1. Dot — follows pointer instantly
 * 2. Ring — smooth spring follow, scales up on interactive elements
 */
export function Cursor() {
  const reduce = React.useMemo(() => {
    if (typeof window === "undefined") return true;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  const [enabled, setEnabled] = React.useState(false);
  const [hovering, setHovering] = React.useState(false);
  const [visible, setVisible] = React.useState(false);

  const x = useMotionValue(-500);
  const y = useMotionValue(-500);
  const ringX = useSpring(x, { stiffness: 180, damping: 18, mass: 0.3 });
  const ringY = useSpring(y, { stiffness: 180, damping: 18, mass: 0.3 });

  React.useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    setEnabled(fine.matches && !reduce);
  }, [reduce]);

  React.useEffect(() => {
    if (!enabled) {
      document.documentElement.removeAttribute("data-cursor");
      return;
    }
    document.documentElement.setAttribute("data-cursor", "on");

    const onMove = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      setVisible(true);
      const target = event.target as HTMLElement | null;
      setHovering(
        Boolean(target?.closest?.("a, button, input, select, textarea, summary, [data-cursor='hover'], .magnetic"))
      );
    };
    const onLeave = () => setVisible(false);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      document.documentElement.removeAttribute("data-cursor");
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.span
        aria-hidden
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-gold pointer-events-none z-[9999] mix-blend-difference"
        style={{ x, y, opacity: visible ? 1 : 0 }}
      />
      <motion.span
        aria-hidden
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-gold/60 pointer-events-none z-[9998] mix-blend-difference"
        style={{ x: ringX, y: ringY, scale: hovering ? 2.2 : 1, opacity: visible ? (hovering ? 0.8 : 0.4) : 0 }}
      />
    </>
  );
}

/**
 * Magnetic button — subtle pull toward cursor on hover.
 * Use on CTAs and important links.
 */
export function Magnetic({
  children,
  strength = 0.35,
  className = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { strength?: number }) {
  const ref = React.useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 200, damping: 20, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 200, damping: 20, mass: 0.5 });

  function onPointerMove(e: React.PointerEvent) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * strength);
    y.set((e.clientY - centerY) * strength);
  }

  function onPointerLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <button
      ref={ref}
      className={className}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      style={{ "--magnetic-x": springX, "--magnetic-y": springY } as React.CSSProperties}
      {...props}
    >
      {children}
    </button>
  );
}
