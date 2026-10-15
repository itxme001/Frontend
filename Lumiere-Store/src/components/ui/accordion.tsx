"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AccordionItem {
  q: string;
  a: string;
}

/**
 * Smoothly animated FAQ accordion.
 *
 * Backwards compatible with the previous `<Accordion items={...} />` API, but
 * built on Radix so the open/close is a real animated height transition, and
 * the trigger carries correct `aria-expanded` / `aria-controls` wiring.
 */
export function Accordion({
  items,
  className,
  defaultOpenFirst = true,
}: {
  items: AccordionItem[];
  className?: string;
  defaultOpenFirst?: boolean;
}) {
  return (
    <AccordionPrimitive.Root
      type="single"
      collapsible
      defaultValue={defaultOpenFirst ? "item-0" : undefined}
      className={cn("divide-y divide-border border border-border bg-card", className)}
    >
      {items.map((item, i) => (
        <AccordionPrimitive.Item key={item.q} value={`item-${i}`} className="group px-5">
          <AccordionPrimitive.Header className="flex">
            <AccordionPrimitive.Trigger
              className={cn(
                "flex flex-1 items-center justify-between gap-4 py-5 text-left text-sm font-medium text-foreground",
                "transition-colors hover:text-gold-ink",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
              )}
            >
              <span>{item.q}</span>
              <ChevronDown
                className="h-4 w-4 shrink-0 text-gold-ink transition-transform duration-500 [transition-timing-function:var(--ease-luxe)] group-data-[state=open]:rotate-180"
                aria-hidden
              />
            </AccordionPrimitive.Trigger>
          </AccordionPrimitive.Header>
          <AccordionPrimitive.Content
            className={cn(
              "overflow-hidden text-sm",
              "data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up"
            )}
          >
            <p className="pb-5 pr-8 leading-relaxed text-slate-500">{item.a}</p>
          </AccordionPrimitive.Content>
        </AccordionPrimitive.Item>
      ))}
    </AccordionPrimitive.Root>
  );
}

export { AccordionPrimitive };
