import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingProps {
  value: number;
  count?: number;
  className?: string;
  starClassName?: string;
}

export function Rating({ value, count, className, starClassName = "h-3.5 w-3.5" }: RatingProps) {
  const filled = Math.round(value);
  return (
    <div
      className={cn("flex items-center gap-1.5", className)}
      aria-label={`Rated ${value} out of 5${count ? ` from ${count} reviews` : ""}`}
    >
      <span className="flex text-gold-ink" aria-hidden>
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            className={starClassName}
            fill={i <= filled ? "currentColor" : "none"}
            strokeWidth={1.6}
          />
        ))}
      </span>
      {count !== undefined && (
        <span className="text-xs text-slate-500" aria-hidden>
          ({count})
        </span>
      )}
    </div>
  );
}
