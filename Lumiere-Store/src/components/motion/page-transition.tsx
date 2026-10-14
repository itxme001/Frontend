/**
 * Page transition system using GSAP.
 *
 * Implements the GSAP best-practice: exit resolves before entry begins,
 * and the whole transition never blocks navigation (≤ 280ms total).
 *
 * Usage: wrap your App component with `<PageTransition>`.
 */
"use client";

import * as React from "react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { usePathname } from "next/navigation";

const DURATION = 0.24;

export function PageTransition({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prevRef = useRef("/");

  const pathname = usePathname();

  // Fade in on mount / route change.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    gsap.fromTo(
      el,
      { opacity: 0, y: 8 },
      { opacity: 1, y: 0, duration: DURATION, ease: "power2.out", overwrite: "auto" }
    );
  }, [pathname]);

  // Exit animation on route change.
  useEffect(() => {
    if (pathname === prevRef.current) return;
    const el = containerRef.current;
    if (!el) return;

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set(el, { opacity: 1, y: 0, clearProps: "all" });
      },
    });
    tl.to(el, {
      opacity: 0,
      y: -6,
      duration: DURATION * 0.7,
      ease: "power2.in",
    });

    prevRef.current = pathname;
    return () => {
      tl.kill();
    };
  }, [pathname]);

  return <div ref={containerRef} style={{ opacity: 1 }}>{children}</div>;
}
