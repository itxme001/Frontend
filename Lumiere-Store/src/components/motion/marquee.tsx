"use client";

import * as React from "react";
import { Pause, Play } from "lucide-react";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Auto-scrolling ticker with the controls the guidance requires: an explicit
 * play/pause button, plus pause on hover and on keyboard focus. Under reduced
 * motion it becomes a static, horizontally scrollable list instead of moving.
 */
export function Marquee({
  children,
  className,
  trackClassName,
}: {
  children: React.ReactNode;
  className?: string;
  trackClassName?: string;
}) {
  const reduce = useReducedMotion();
  const [paused, setPaused] = React.useState(false);
  const [engaged, setEngaged] = React.useState(false);

  if (reduce) {
    return (
      <div className={cn("overflow-x-auto overscroll-x-contain", className)}>
        <div className={cn("flex w-max", trackClassName)}>{children}</div>
      </div>
    );
  }

  const isPaused = paused || engaged;

  return (
    <div
      className={cn("group relative overflow-hidden", className)}
      onMouseEnter={() => setEngaged(true)}
      onMouseLeave={() => setEngaged(false)}
      onFocusCapture={() => setEngaged(true)}
      onBlurCapture={() => setEngaged(false)}
    >
      <div
        className={cn("marquee-track", trackClassName)}
        style={{ animationPlayState: isPaused ? "paused" : "running" }}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden>
          {children}
        </div>
      </div>

      <button
        type="button"
        onClick={() => setPaused((value) => !value)}
        aria-pressed={paused}
        aria-label={paused ? "Resume the scrolling list" : "Pause the scrolling list"}
        className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full border border-border bg-card/90 p-1.5 text-slate-500 opacity-0 backdrop-blur transition-opacity hover:text-foreground focus-visible:opacity-100 group-hover:opacity-100"
      >
        {paused ? (
          <Play className="h-3.5 w-3.5" aria-hidden />
        ) : (
          <Pause className="h-3.5 w-3.5" aria-hidden />
        )}
      </button>
    </div>
  );
}
