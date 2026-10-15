"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium tracking-[0.08em] uppercase " +
    "transition-[background-color,color,border-color,box-shadow,transform] duration-300 " +
    "[transition-timing-function:var(--ease-luxe)] " +
    "disabled:pointer-events-none disabled:opacity-45 " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background " +
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        /* Deep matte charcoal — the house default */
        default:
          "bg-foreground text-background hover:bg-gold-ink hover:shadow-[0_10px_30px_-14px_rgba(128,98,38,0.7)]",
        /* Champagne gold — reserved for the single most important action on a screen */
        primary:
          "bg-gold text-foreground hover:bg-gold-light hover:shadow-[0_10px_30px_-14px_rgba(197,160,89,0.8)]",
        secondary: "bg-shell text-foreground border border-border hover:bg-border/70",
        outline:
          "bg-transparent text-foreground border border-foreground/25 hover:border-foreground hover:bg-foreground hover:text-background",
        ghost: "bg-transparent text-foreground hover:bg-shell",
        link: "bg-transparent text-gold-ink underline-offset-4 hover:underline p-0 h-auto",
        destructive: "bg-red-700 text-white hover:bg-red-800",
      },
      size: {
        sm: "h-9 px-4 text-[11px]",
        md: "h-11 px-6 text-xs",
        lg: "h-13 px-8 text-xs",
        icon: "h-10 w-10 p-0",
      },
    },
    defaultVariants: { variant: "default", size: "md" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Render the child element (e.g. a Link) with button styling instead of a <button>. */
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant, size, asChild = false, ...props },
  ref
) {
  const Comp = asChild ? Slot : "button";
  return <Comp ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />;
});

export { buttonVariants };
