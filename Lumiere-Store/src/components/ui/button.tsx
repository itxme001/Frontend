"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type Variant = "default" | "primary" | "secondary" | "ghost" | "outline";
type Size = "sm" | "md" | "lg" | "icon";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  /** Render the child element (e.g. a Link) with button styling instead of a <button>. */
  asChild?: boolean;
}

const VARIANTS: Record<Variant, string> = {
  default: "bg-obsidian text-silk hover:bg-obsidian-light",
  primary: "bg-gold text-obsidian hover:bg-gold-dark",
  secondary: "bg-mist text-foreground border border-border hover:bg-border/60",
  ghost: "bg-transparent text-foreground hover:bg-mist",
  outline: "bg-transparent text-foreground border border-obsidian hover:bg-obsidian hover:text-silk",
};

const SIZES: Record<Size, string> = {
  sm: "h-9 px-4 text-xs",
  md: "h-11 px-6 text-sm",
  lg: "h-12 px-8 text-sm",
  icon: "h-10 w-10",
};

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-none font-medium tracking-wide " +
  "transition-colors duration-200 disabled:pointer-events-none disabled:opacity-50 " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2";

export function Button({
  variant = "default",
  size = "md",
  className,
  asChild = false,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(BASE, VARIANTS[variant], SIZES[size], className);

  if (asChild && React.isValidElement(children)) {
    const child = children as React.ReactElement<{ className?: string }>;
    return React.cloneElement(child, {
      className: cn(classes, child.props.className),
    });
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
