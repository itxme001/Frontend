import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 border font-medium tracking-[0.12em] uppercase whitespace-nowrap",
  {
    variants: {
      variant: {
        default: "border-transparent bg-foreground text-background",
        gold: "border-transparent bg-gold text-foreground",
        outline: "border-border bg-card text-slate-600",
        soft: "border-transparent bg-shell text-gold-ink",
        success: "border-transparent bg-emerald-700/10 text-emerald-800",
        warning: "border-transparent bg-amber-600/12 text-amber-800",
        danger: "border-transparent bg-red-700/10 text-red-800",
        info: "border-transparent bg-sky-700/10 text-sky-800",
      },
      size: {
        sm: "px-2 py-0.5 text-[10px]",
        md: "px-2.5 py-1 text-[10px]",
        lg: "px-3 py-1.5 text-[11px]",
      },
    },
    defaultVariants: { variant: "default", size: "md" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, size, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant, size }), className)} {...props} />;
}

export { badgeVariants };
