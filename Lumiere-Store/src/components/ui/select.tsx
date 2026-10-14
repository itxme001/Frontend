"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export function Select({ className, children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={cn(
        "block w-full rounded-none border border-border bg-card px-3 py-2.5 text-sm text-obsidian shadow-sm",
        "focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      {children}
    </select>
  );
}
