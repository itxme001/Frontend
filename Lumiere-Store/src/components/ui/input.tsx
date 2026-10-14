"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  function Input({ className, ...props }, ref) {
    return (
      <input
        ref={ref}
        className={cn(
          "block w-full rounded-none border border-border bg-card px-3 py-2.5 text-sm text-obsidian shadow-sm",
          "placeholder:text-slate-400 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      />
    );
  }
);
