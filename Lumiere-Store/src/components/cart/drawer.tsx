"use client";

import * as React from "react";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, X } from "lucide-react";
import { useCart } from "@/store/cart-store";
import { Button } from "@/components/ui/button";
import { useCurrency } from "@/store/currency-context";

interface CartDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const FREE_SHIPPING_THRESHOLD = 300;

export function CartDrawer({ open, onOpenChange }: CartDrawerProps) {
  const { items, removeItem, updateQuantity, subtotal, itemCount, clearCart } = useCart();
  const { format } = useCurrency();

  React.useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onOpenChange(false);
    }
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onOpenChange]);

  const progress = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const remaining = Math.max(FREE_SHIPPING_THRESHOLD - subtotal, 0);

  return (
    <>
      <div
        onClick={() => onOpenChange(false)}
        aria-hidden={!open}
        className={`fixed inset-0 z-50 bg-black/50 transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Shopping bag"
        className={`fixed right-0 top-0 z-50 flex h-full w-[min(430px,100%)] flex-col bg-card shadow-2xl transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <header className="flex items-center justify-between border-b border-border p-5">
          <h2 className="font-serif text-xl text-obsidian">
            Your Bag <span className="ml-1 text-sm text-slate-400">({itemCount})</span>
          </h2>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            aria-label="Close bag"
            className="rounded-full p-1 text-2xl leading-none text-slate-400 transition-colors hover:text-obsidian"
          >
            <X className="h-5 w-5" aria-hidden />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-5">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center text-slate-500">
              <ShoppingBag className="mb-3 h-10 w-10 text-gold-ink" aria-hidden />
              <p>Your bag is empty.</p>
              <Button asChild variant="outline" className="mt-5">
                <Link href="/shop" onClick={() => onOpenChange(false)}>
                  Start Shopping
                </Link>
              </Button>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => (
                <li
                  key={`${item.id}-${item.color ?? ""}-${item.size ?? ""}`}
                  className="flex gap-3 border-b border-border pb-4"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-24 w-20 rounded-md object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-obsidian">{item.name}</p>
                    {(item.color || item.size) && (
                      <p className="mt-0.5 text-xs text-slate-500">
                        {[item.color, item.size].filter(Boolean).join(" · ")}
                      </p>
                    )}
                    <p className="mt-1 text-sm font-semibold text-gold-ink">
                      {format(item.price)}
                    </p>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="inline-flex items-center rounded-full border border-border">
                        <button
                          type="button"
                          aria-label="Decrease quantity"
                          onClick={() => updateQuantity(item.id, item.quantity - 1, item.color, item.size)}
                          className="h-8 w-8 transition-colors hover:text-gold-ink"
                        >
                          <Minus className="h-4 w-4" aria-hidden />
                        </button>
                        <span className="min-w-[28px] text-center text-sm">{item.quantity}</span>
                        <button
                          type="button"
                          aria-label="Increase quantity"
                          onClick={() => updateQuantity(item.id, item.quantity + 1, item.color, item.size)}
                          className="h-8 w-8 transition-colors hover:text-gold-ink"
                        >
                          <Plus className="h-4 w-4" aria-hidden />
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.id, item.color, item.size)}
                        className="text-xs text-slate-400 underline transition-colors hover:text-red-500"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <footer className="border-t border-border bg-silk p-5">
            <div className="mb-3">
              <div className="mb-1.5 flex justify-between text-xs text-slate-500">
                <span>{remaining === 0 ? "You unlocked free shipping" : `Add ${format(remaining)} for free shipping`}</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-border">
                <div className="h-full rounded-full bg-gold transition-all" style={{ width: `${progress}%` }} />
              </div>
            </div>

            <div className="flex justify-between text-sm text-slate-500">
              <span>Subtotal</span>
              <span>{format(subtotal)}</span>
            </div>
            <div className="mt-1 flex justify-between text-lg font-semibold text-obsidian">
              <span>Total</span>
              <span>{format(subtotal)}</span>
            </div>

            <Button asChild variant="primary" className="w-full">
              <Link href="/checkout" onClick={() => onOpenChange(false)} className="mt-4 block">
                Checkout
              </Link>
            </Button>
            <div className="mt-2 flex gap-2">
              <Button asChild variant="outline" className="w-full">
                <Link href="/cart" onClick={() => onOpenChange(false)} className="flex-1">
                  View Bag
                </Link>
              </Button>
              <Button variant="ghost" onClick={clearCart} className="flex-1">
                Clear
              </Button>
            </div>
          </footer>
        )}
      </aside>
    </>
  );
}
