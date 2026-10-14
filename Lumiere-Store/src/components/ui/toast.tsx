"use client";

import * as React from "react";

export type ToastVariant = "default" | "success" | "error" | "info";

export interface ToastInput {
  title: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
}

interface ToastItem extends ToastInput {
  id: number;
}

interface ToastContextValue {
  toast: (input: ToastInput) => void;
}

const ToastContext = React.createContext<ToastContextValue | undefined>(undefined);

const VARIANT_STYLES: Record<ToastVariant, string> = {
  default: "border-l-slate-400",
  success: "border-l-emerald-500",
  error: "border-l-red-500",
  info: "border-l-gold",
};

const VARIANT_ICONS: Record<ToastVariant, string> = {
  default: "\u2139",
  success: "\u2713",
  error: "!",
  info: "\u2139",
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = React.useState<ToastItem[]>([]);

  const dismiss = React.useCallback((id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const toast = React.useCallback(
    (input: ToastInput) => {
      const id = Date.now() + Math.random();
      setItems((prev) => [...prev, { ...input, id }]);
      const duration = input.duration ?? 3800;
      setTimeout(() => dismiss(id), duration);
    },
    [dismiss]
  );

  const value = React.useMemo(() => ({ toast }), [toast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        aria-live="polite"
        className="pointer-events-none fixed bottom-5 right-5 z-[100] flex w-[min(92vw,360px)] flex-col gap-3"
      >
        {items.map((item) => {
          const variant = item.variant ?? "default";
          return (
            <div
              key={item.id}
              className={`animate-fade-up pointer-events-auto flex items-start gap-3 rounded-md border border-border border-l-4 bg-card p-4 shadow-xl ${VARIANT_STYLES[variant]}`}
            >
              <span className="text-sm leading-6 text-slate-500">{VARIANT_ICONS[variant]}</span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-obsidian">{item.title}</p>
                {item.description ? (
                  <p className="mt-0.5 text-xs text-slate-500">{item.description}</p>
                ) : null}
              </div>
              <button
                type="button"
                onClick={() => dismiss(item.id)}
                aria-label="Dismiss notification"
                className="text-slate-400 transition-colors hover:text-obsidian"
              >
                &times;
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const ctx = React.useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within a ToastProvider");
  return ctx;
}
