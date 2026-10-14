"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { CURRENCY_LIST } from "@/lib/currency";
import { useCurrency } from "@/store/currency-context";
import { cn } from "@/lib/utils";

/**
 * Display-currency picker. Prices in the catalogue are stored in USD and
 * converted for display only, so this is presented as a reading preference
 * rather than a change of the settlement currency.
 */
export function CurrencySwitcher({ className }: { className?: string }) {
  const { currency, setCurrency } = useCurrency();
  const labelId = React.useId();

  return (
    <div className={className}>
      <p id={labelId} className="label-xs mb-3 text-slate-500">
        Display currency
      </p>

      <div
        role="radiogroup"
        aria-labelledby={labelId}
        className="grid grid-cols-2 gap-2"
      >
        {CURRENCY_LIST.map((option) => {
          const active = option.code === currency;
          return (
            <button
              key={option.code}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => setCurrency(option.code)}
              className={cn(
                "flex items-center justify-between gap-2 rounded-lg border px-3 py-2 text-xs font-semibold transition-colors",
                active
                  ? "border-gold bg-gold/10 text-foreground"
                  : "border-border text-slate-500 hover:border-gold/60 hover:text-foreground"
              )}
            >
              <span className="truncate">{option.short}</span>
              {active ? <Check className="h-3.5 w-3.5 shrink-0 text-gold-ink" aria-hidden /> : null}
            </button>
          );
        })}
      </div>

      <p className="mt-3 text-[11px] leading-relaxed text-slate-500">
        Shown for reference in your chosen currency. Orders settle in USD at checkout.
      </p>
    </div>
  );
}
