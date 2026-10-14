"use client";

import * as React from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/**
 * GSAP ScrollTrigger parallax.
 *
 * Runs inside `gsap.matchMedia` so it only activates when the user has *not*
 * asked for reduced motion — otherwise the element simply sits in its natural
 * position. The child is scaled slightly so translation never exposes an edge.
 */
export function Parallax({
  children,
  className,
  /** Positive moves the content up as you scroll down. 0.1 – 0.25 reads best. */
  speed = 0.14,
  scale = 1.12,
}: {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  scale?: number;
}) {
  const root = React.useRef<HTMLDivElement>(null);
  const inner = React.useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = inner.current;
      const trigger = root.current;
      if (!el || !trigger) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(el, { scale });
        gsap.fromTo(
          el,
          { yPercent: -speed * 100 },
          {
            yPercent: speed * 100,
            ease: "none",
            scrollTrigger: {
              trigger,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });

      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <div ref={root} className={className}>
      <div ref={inner} className="h-full w-full will-change-transform">
        {children}
      </div>
    </div>
  );
}
