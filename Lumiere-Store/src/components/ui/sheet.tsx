"use client";

import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useFocusTrap } from "@/hooks/use-focus-trap";

export interface SheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  side?: "left" | "right";
  title: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  /** Extra classes for the panel (e.g. width overrides). */
  className?: string;
}

/**
 * Accessible slide-out panel.
 *
 * - `role="dialog"` + `aria-modal` + labelled/described by the header
 * - focus is trapped while open and restored on close (see `useFocusTrap`)
 * - Escape closes, the backdrop closes, body scroll is locked
 * - the panel is kept mounted so the exit transition can play, but is marked
 *   `inert` while closed so it stays out of the tab order and a11y tree
 */
export function Sheet({
  open,
  onOpenChange,
  side = "left",
  title,
  description,
  children,
  footer,
  className,
}: SheetProps) {
  const panelRef = useFocusTrap<HTMLDivElement>(open);
  const titleId = React.useId();
  const descriptionId = React.useId();

  React.useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.stopPropagation();
        onOpenChange(false);
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onOpenChange]);

  React.useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <div className="fixed inset-0 z-[70] lg:hidden" inert={!open}>
      <div
        onClick={() => onOpenChange(false)}
        aria-hidden
        className={cn(
          "absolute inset-0 bg-obsidian/60 transition-opacity duration-300",
          open ? "opacity-100" : "opacity-0"
        )}
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descriptionId : undefined}
        tabIndex={-1}
        className={cn(
          "absolute inset-y-0 flex w-[min(23rem,88vw)] flex-col bg-card shadow-2xl outline-none",
          "transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]",
          side === "left" ? "left-0" : "right-0",
          open
            ? "translate-x-0"
            : side === "left"
              ? "-translate-x-full"
              : "translate-x-full",
          className
        )}
      >
        <header className="flex items-start justify-between gap-4 border-b border-border px-5 py-4">
          <div className="min-w-0">
            <h2 id={titleId} className="font-serif text-lg text-foreground">
              {title}
            </h2>
            {description ? (
              <p id={descriptionId} className="mt-0.5 text-xs text-slate-500">
                {description}
              </p>
            ) : null}
          </div>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            aria-label="Close menu"
            className="-mr-1 shrink-0 rounded-full p-2 text-slate-500 transition-colors hover:bg-mist hover:text-foreground"
          >
            <X className="h-5 w-5" aria-hidden />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-5">{children}</div>

        {footer ? <div className="border-t border-border px-5 py-4">{footer}</div> : null}
      </div>
    </div>
  );
}
