"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, ShoppingBag, X, Trash2, ArrowRight } from "lucide-react";
import { useCart } from "@/store/cart-store";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCurrency } from "@/store/currency-context";
import { Skeleton } from "@/components/ui/skeleton";

const FREE_SHIPPING_THRESHOLD = 300;

interface CartDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CartDrawer({ open, onOpenChange }: CartDrawerProps) {
  const { items, removeItem, updateQuantity, subtotal, itemCount, clearCart, wishlist } = useCart();
  const { format } = useCurrency();
  const closeBtnRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    if (!open) return;

    // Focus the close button when drawer opens
    closeBtnRef.current?.focus();

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onOpenChange(false);
        return;
      }
      if (e.key !== "Tab") return;

      // Focus trap: cycle through focusable elements within the drawer
      const drawer = document.querySelector('[role="dialog"][aria-label="Shopping bag"]');
      if (!drawer) return;

      const focusable = drawer.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onOpenChange]);

  const progress = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const remaining = Math.max(FREE_SHIPPING_THRESHOLD - subtotal, 0);

  return (
    <>
      <div
        onClick={() => onOpenChange(false)}
        aria-hidden={!open}
        className={`fixed inset-0 z-50 bg-foreground/40 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Shopping bag"
        className={`fixed right-0 top-0 z-50 flex h-full w-[min(480px,100vw)] flex-col border-l border-border bg-card shadow-[0_0_80px_-30px_rgba(17,17,17,0.4)] transition-transform duration-500 [transition-timing-function:var(--ease-luxe)] ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <header className="flex shrink-0 items-center justify-between border-b border-border px-6 py-5">
          <div className="flex items-center gap-2">
            <h2 className="font-serif text-xl text-foreground">Your Bag</h2>
            {itemCount > 0 && (
              <Badge variant="soft" size="sm" className="ml-1">
                {itemCount} item{itemCount !== 1 ? "s" : ""}
              </Badge>
            )}
          </div>
          <button
            ref={closeBtnRef}
            type="button"
            onClick={() => onOpenChange(false)}
            aria-label="Close bag"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-slate-400 transition-colors hover:border-gold hover:text-gold-ink"
          >
            <X className="h-4 w-4" aria-hidden />
          </button>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-shell">
                <ShoppingBag className="h-7 w-7 text-gold-ink" aria-hidden />
              </div>
              <div>
                <p className="font-serif text-lg text-foreground">Your bag is empty</p>
                <p className="mt-1 text-sm text-slate-500">Discover our curated collection.</p>
              </div>
              <Button asChild variant="primary" className="rounded-lg">
                <Link href="/shop" onClick={() => onOpenChange(false)}>
                  Start Shopping
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
                </Link>
              </Button>
            </div>
          ) : (
            <ul className="space-y-5">
              {items.map((item) => (
                <li key={`${item.id}-${item.color ?? ""}-${item.size ?? ""}`} className="flex gap-4">
                  <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-md bg-shell">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="truncate font-serif text-sm text-foreground">{item.name}</p>
                        {(item.color || item.size) && (
                          <p className="mt-0.5 text-xs text-slate-400">
                            {[item.color, item.size].filter(Boolean).join(" · ")}
                          </p>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.id, item.color, item.size)}
                        aria-label={`Remove ${item.name}`}
                        className="shrink-0 p-1 text-slate-400 transition-colors hover:text-red-600"
                      >
                        <Trash2 className="h-3.5 w-3.5" aria-hidden />
                      </button>
                    </div>
                    <div className="mt-3 flex items-end justify-between">
                      <div className="inline-flex items-center rounded-full border border-border">
                        <button
                          type="button"
                          aria-label="Decrease quantity"
                          onClick={() => updateQuantity(item.id, item.quantity - 1, item.color, item.size)}
                          className="flex h-7 w-7 items-center justify-center transition-colors hover:text-gold-ink"
                        >
                          <Minus className="h-3 w-3" aria-hidden />
                        </button>
                        <span className="min-w-[24px] text-center text-sm tabular-nums">{item.quantity}</span>
                        <button
                          type="button"
                          aria-label="Increase quantity"
                          onClick={() => updateQuantity(item.id, item.quantity + 1, item.color, item.size)}
                          className="flex h-7 w-7 items-center justify-center transition-colors hover:text-gold-ink"
                        >
                          <Plus className="h-3 w-3" aria-hidden />
                        </button>
                      </div>
                      <p className="text-sm font-semibold text-gold-ink">{format(item.price * item.quantity)}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <footer className="border-t border-border bg-silk px-6 py-5 space-y-4">
            {/* Free shipping progress bar */}
            <div>
              <div className="mb-1.5 flex items-center justify-between text-xs">
                {remaining > 0 ? (
                  <>
                    <span className="text-slate-500">
                      Add <span className="font-semibold text-gold-ink">{format(remaining)}</span> for free shipping
                    </span>
                    <span className="font-medium text-gold-ink">{Math.round(progress)}%</span>
                  </>
                ) : (
                  <span className="flex items-center gap-1.5 text-emerald-700">
                    <span>✓</span> Free express shipping unlocked
                  </span>
                )}
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-border">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-gold to-gold-light transition-all duration-700 [transition-timing-function:var(--ease-luxe)]"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-border pt-4">
              <span className="text-sm text-slate-500">Subtotal</span>
              <span className="font-serif text-xl text-foreground">{format(subtotal)}</span>
            </div>

            <Button asChild variant="primary" className="w-full rounded-lg">
              <Link href="/checkout" onClick={() => onOpenChange(false)}>
                Checkout
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
              </Link>
            </Button>

            <div className="flex gap-2">
              <Button asChild variant="outline" className="flex-1 rounded-lg" onClick={() => onOpenChange(false)}>
                <Link href="/cart">View Bag</Link>
              </Button>
              <Button
                variant="ghost"
                className="rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-600"
                onClick={clearCart}
              >
                Clear
              </Button>
            </div>
          </footer>
        )}
      </aside>
    </>
  );
}
