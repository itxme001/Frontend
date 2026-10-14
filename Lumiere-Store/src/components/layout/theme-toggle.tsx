"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "lumiere-theme";

/** Shared light/dark switch. Renders as an icon button or a labelled row. */
export function ThemeToggle({
  className,
  withLabel = false,
}: {
  className?: string;
  withLabel?: boolean;
}) {
  const [dark, setDark] = React.useState(false);

  React.useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = stored ? stored === "dark" : prefersDark;
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  function toggle() {
    setDark((prev) => {
      const next = !prev;
      document.documentElement.classList.toggle("dark", next);
      window.localStorage.setItem(STORAGE_KEY, next ? "dark" : "light");
      return next;
    });
  }

  const label = dark ? "Switch to light mode" : "Switch to dark mode";

  if (withLabel) {
    return (
      <button
        type="button"
        onClick={toggle}
        aria-label={label}
        aria-pressed={dark}
        className={cn(
          "flex w-full items-center justify-between rounded-lg border border-border px-3 py-2.5 text-sm text-foreground transition-colors hover:border-gold/60",
          className
        )}
      >
        <span className="flex items-center gap-2">
          {dark ? (
            <Sun className="h-4 w-4 text-gold-ink" aria-hidden />
          ) : (
            <Moon className="h-4 w-4 text-gold-ink" aria-hidden />
          )}
          {dark ? "Light mode" : "Dark mode"}
        </span>
        <span
          aria-hidden
          className={cn(
            "relative inline-block h-5 w-9 rounded-full transition-colors",
            dark ? "bg-gold" : "bg-border"
          )}
        >
          <span
            className={cn(
              "absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-transform",
              dark ? "translate-x-4" : "translate-x-0.5"
            )}
          />
        </span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      aria-pressed={dark}
      className={cn(
        "rounded-full p-2.5 text-slate-500 transition-colors hover:bg-mist hover:text-foreground",
        className
      )}
    >
      {dark ? <Sun className="h-5 w-5" aria-hidden /> : <Moon className="h-5 w-5" aria-hidden />}
    </button>
  );
}
