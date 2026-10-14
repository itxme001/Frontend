import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AccordionItem {
  q: string;
  a: string;
}

export function Accordion({ items, className }: { items: AccordionItem[]; className?: string }) {
  return (
    <div className={cn("divide-y divide-border overflow-hidden rounded-none border border-border bg-card", className)}>
      {items.map((item, i) => (
        <details key={item.q} className="group px-5 py-4" open={i === 0}>
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium text-foreground marker:content-none">
            <span>{item.q}</span>
            <ChevronDown
              className="h-4 w-4 shrink-0 text-gold-ink transition-transform duration-300 group-open:rotate-180"
              aria-hidden
            />
          </summary>
          <p className="mt-3 text-sm leading-relaxed text-slate-500">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
