"use client";

import * as React from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/**
 * Premium smooth scroll with GSAP ScrollTrigger integration.
 *
 * Upgraded from basic Lenis:
 * - Better easing curve (cubic bezier for luxury feel)
 * - Proper cleanup on unmount
 * - Anchor link glide support
 * - Reduced motion respected
 */
export function SmoothScroll() {
  const lenisRef = React.useRef<Lenis | null>(null);

  React.useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.85,
      touchMultiplier: 1.8,
      infinite: false,
    });

    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Glide for anchor links
    const onClick = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement | null)?.closest?.('a[href^="#"]');
      if (!anchor) return;
      const id = anchor.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      event.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: -100, duration: 1.4 });
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      gsap.ticker.remove(raf);
      lenis.destroy();
      lenisRef.current = null;
      gsap.ticker.lagSmoothing(500, 33);
    };
  }, []);

  return null;
}

/**
 * Scroll progress bar — thin gold line at top showing how far you've scrolled.
 */
export function ScrollProgress() {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) return;

    ScrollTrigger.create({
      trigger: "body",
      start: "top top",
      end: "bottom bottom",
      scrub: 0.3,
      onUpdate: (self) => {
        if (ref.current) {
          ref.current.style.width = `${self.progress * 100}%`;
        }
      },
    });
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="fixed top-0 left-0 h-px bg-gradient-to-r from-gold via-gold-light to-gold z-50 transition-none"
      style={{ width: "0%" }}
    />
  );
}
