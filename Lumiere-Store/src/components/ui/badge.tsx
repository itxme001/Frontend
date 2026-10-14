"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export function Badge({ className, children, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-border bg-white/90 px-2.5 py-0.5 text-xs font-semibold text-obsidian backdrop-blur",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
