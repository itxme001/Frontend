"use client";

import * as React from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

/**
 * Pinned horizontal rail driven by vertical scroll (GSAP ScrollTrigger).
 *
 * Guardrails from the motion guidance:
 * - only one pinned section per page
 * - desktop + no-reduced-motion only (`gsap.matchMedia`)
 * - `invalidateOnRefresh` so the distance recalculates on resize / font load
 * - below the breakpoint it degrades to a plain horizontal scroller
 */
export function HorizontalRail({
  children,
  className,
  header,
}: {
  children: React.ReactNode;
  className?: string;
  header?: React.ReactNode;
}) {
  const root = React.useRef<HTMLDivElement>(null);
  const track = React.useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = root.current;
      const rail = track.current;
      if (!section || !rail) return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const distance = () => Math.max(rail.scrollWidth - window.innerWidth + 96, 0);

        const tween = gsap.to(rail, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${distance()}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // Fonts changing metrics would leave the pin distance stale.
        if (document.fonts?.ready) {
          document.fonts.ready.then(() => ScrollTrigger.refresh());
        }

        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
          gsap.set(rail, { clearProps: "transform" });
        };
      });

      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section ref={root} className={cn("relative overflow-hidden", className)}>
      {header ? <div className="mx-auto max-w-7xl px-4 sm:px-6">{header}</div> : null}

      {/* Mobile: native horizontal scroll. Desktop: GSAP translates the track. */}
      <div className="overflow-x-auto overscroll-x-contain pb-2 lg:overflow-x-visible lg:pb-0">
        <div
          ref={track}
          className="flex w-max gap-5 px-4 will-change-transform sm:px-6 lg:gap-7 lg:px-8"
        >
          {children}
        </div>
      </div>
    </section>
  );
}
