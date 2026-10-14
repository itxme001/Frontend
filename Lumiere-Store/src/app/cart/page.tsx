"use client";

import Link from "next/link";
import Image from "next/image";
import { Lock, Minus, Plus, ShoppingBag } from "lucide-react";
import { useCart } from "@/store/cart-store";
import { Button } from "@/components/ui/button";
import { useCurrency } from "@/store/currency-context";

const FREE_SHIPPING_THRESHOLD = 300;
const SHIPPING_FLAT = 15;
const TAX_RATE = 0.08;

export default function CartPage() {
  const { items, updateQuantity, removeItem, clearCart, subtotal, itemCount, hydrated } = useCart();
  const { format } = useCurrency();

  const shipping = subtotal > 0 && subtotal < FREE_SHIPPING_THRESHOLD ? SHIPPING_FLAT : 0;
  const tax = subtotal * TAX_RATE;
  const total = subtotal + shipping + tax;
  const remaining = Math.max(FREE_SHIPPING_THRESHOLD - subtotal, 0);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-ink">Checkout</span>
          <h1 className="mt-2 font-serif text-4xl text-obsidian">Your Shopping Bag</h1>
        </div>
        <Link href="/shop" className="text-sm font-medium text-slate-500 underline hover:text-obsidian">
          Continue shopping
        </Link>
      </header>

      {!hydrated ? (
        <div className="grid gap-4">
          <div className="skeleton h-28 rounded-none" />
          <div className="skeleton h-28 rounded-none" />
        </div>
      ) : items.length === 0 ? (
        <div className="rounded-none border border-border bg-silk py-20 text-center">
          <ShoppingBag className="mx-auto h-12 w-12 text-gold-ink" aria-hidden />
          <h2 className="mt-4 font-serif text-2xl text-obsidian">Your bag is empty</h2>
          <p className="mt-2 text-slate-500">Looks like you haven&apos;t added anything yet.</p>
          <Button asChild variant="primary" className="mt-6">
            <Link href="/shop">
              Start Shopping
            </Link>
          </Button>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-[1.7fr_1fr] lg:items-start">
          <div className="rounded-none border border-border bg-card p-2 sm:p-4">
            <ul>
              {items.map((item) => (
                <li
                  key={`${item.id}-${item.color ?? ""}-${item.size ?? ""}`}
                  className="flex gap-4 border-b border-border p-4 last:border-b-0"
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={96}
                    height={112}
                    className="h-28 w-24 rounded-lg object-cover"
                    unoptimized
                  />
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex justify-between gap-3">
                      <div className="min-w-0">
                        <h3 className="font-serif text-lg text-obsidian">{item.name}</h3>
                        <p className="text-xs uppercase tracking-wide text-slate-400">{item.category}</p>
                        {(item.color || item.size) && (
                          <p className="mt-1 text-sm text-slate-500">
                            {[item.color, item.size].filter(Boolean).join(" · ")}
                          </p>
                        )}
                      </div>
                      <span className="font-semibold text-gold-ink">{format(item.price * item.quantity)}</span>
                    </div>
                    <div className="mt-auto flex items-center justify-between pt-3">
                      <div className="inline-flex items-center rounded-full border border-border">
                        <button
                          type="button"
                          aria-label="Decrease quantity"
                          onClick={() => updateQuantity(item.id, item.quantity - 1, item.color, item.size)}
                          className="h-9 w-9 transition-colors hover:text-gold-ink"
                        >
                          <Minus className="h-4 w-4" aria-hidden />
                        </button>
                        <span className="min-w-[32px] text-center text-sm">{item.quantity}</span>
                        <button
                          type="button"
                          aria-label="Increase quantity"
                          onClick={() => updateQuantity(item.id, item.quantity + 1, item.color, item.size)}
                          className="h-9 w-9 transition-colors hover:text-gold-ink"
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
            <div className="flex justify-end p-3">
              <button
                type="button"
                onClick={clearCart}
                className="text-xs text-slate-400 underline hover:text-red-500"
              >
                Clear bag
              </button>
            </div>
          </div>

          <aside className="rounded-none border border-border bg-silk p-6">
            <h2 className="font-serif text-xl text-obsidian">Order Summary</h2>

            {remaining > 0 && (
              <div className="mt-4 rounded-lg bg-card p-3 text-xs text-slate-500">
                Add <strong className="text-gold-ink">{format(remaining)}</strong> more to unlock free
                express shipping.
              </div>
            )}

            <dl className="mt-5 space-y-2 text-sm">
              <div className="flex justify-between text-slate-500">
                <dt>Items ({itemCount})</dt>
                <dd>{format(subtotal)}</dd>
              </div>
              <div className="flex justify-between text-slate-500">
                <dt>Shipping</dt>
                <dd>{shipping === 0 ? "Free" : format(shipping)}</dd>
              </div>
              <div className="flex justify-between text-slate-500">
                <dt>Tax (8%)</dt>
                <dd>{format(tax)}</dd>
              </div>
              <div className="mt-3 flex justify-between border-t border-border pt-4 text-lg font-semibold text-obsidian">
                <dt>Total</dt>
                <dd className="font-serif text-gold-ink">{format(total)}</dd>
              </div>
            </dl>

            <Button asChild variant="primary" className="mt-6 w-full">
              <Link href="/checkout">
                Proceed to Checkout
              </Link>
            </Button>
            <p className="mt-3 text-center text-xs text-slate-400">
              <Lock className="-mt-px mr-1 inline h-3.5 w-3.5" aria-hidden /> Secure 256-bit encrypted checkout
            </p>
          </aside>
        </div>
      )}
    </div>
  );
}
