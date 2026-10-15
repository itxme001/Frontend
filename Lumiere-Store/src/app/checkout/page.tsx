"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Lock, ShoppingBag } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCart } from "@/store/cart-store";
import { useAuth } from "@/store/auth-context";
import { useToast } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { useCurrency } from "@/store/currency-context";
import { saveOrder as dbSaveOrder, setPendingOrder, type StoredOrder } from "@/lib/db-client";

const FREE_SHIPPING_THRESHOLD = 300;
const SHIPPING_FLAT = 15;
const TAX_RATE = 0.08;

const EMPTY_FORM = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  zip: "",
  country: "Pakistan",
};

export default function CheckoutPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { user } = useAuth();
  const { items, subtotal, clearCart, hydrated } = useCart();
  const { format } = useCurrency();

  const [form, setForm] = React.useState(EMPTY_FORM);
  const [processing, setProcessing] = React.useState(false);
  const [error, setError] = React.useState("");
  const [stripeUnavailable, setStripeUnavailable] = React.useState(false);

  React.useEffect(() => {
    if (user) {
      setForm((prev) => ({
        ...prev,
        email: prev.email || user.email,
        firstName: prev.firstName || user.name.split(" ")[0] || "",
        lastName: prev.lastName || user.name.split(" ").slice(1).join(" "),
      }));
    }
  }, [user]);

  const shipping = subtotal > 0 && subtotal < FREE_SHIPPING_THRESHOLD ? SHIPPING_FLAT : 0;
  const tax = subtotal * TAX_RATE;
  const total = subtotal + shipping + tax;

  function update(key: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function buildOrder(status: StoredOrder["status"], id: string): StoredOrder {
    return {
      id,
      date: new Date().toISOString(),
      status,
      items: items.map((i) => ({
        id: i.id,
        name: i.name,
        price: i.price,
        quantity: i.quantity,
        image: i.image,
        color: i.color,
        size: i.size,
      })),
      subtotal,
      shipping,
      tax,
      total,
      email: form.email || user?.email,
    };
  }

  async function placeOrder() {
    setError("");
    if (!form.firstName || !form.lastName || !form.email || !form.address || !form.city || !form.zip) {
      setError("Please complete all required shipping fields.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setProcessing(true);
    try {
      // Fetch a fresh CSRF token from the server.
      const csrfRes = await fetch("/api/csrf", { cache: "no-store" });
      const csrfToken = csrfRes.ok ? (await csrfRes.json() as { token: string }).token : "";

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-csrf-token": csrfToken },
        body: JSON.stringify({
          items: items.map((i) => ({ id: i.id, quantity: i.quantity })),
          customer: form,
          _csrf: csrfToken,
        }),
      });
      const data = await res.json();

      if (res.ok && data.url) {
        const orderId = data.orderId || `LUM-${Date.now().toString(36).toUpperCase()}`;
        setPendingOrder(buildOrder("pending", orderId));
        window.location.href = data.url as string;
        return;
      }

      if (res.status === 503) {
        setStripeUnavailable(true);
        setError(data?.error || "Stripe is not configured.");
        setProcessing(false);
        return;
      }

      setError(data?.error || "We couldn't start checkout. Please try again.");
      setProcessing(false);
    } catch {
      setError("Network error. Please check your connection and try again.");
      setProcessing(false);
    }
  }

  function placeDemoOrder() {
    const orderId = `DEMO-${Date.now().toString(36).toUpperCase()}`;
        dbSaveOrder(buildOrder("demo", orderId));
    clearCart();
    toast({
      title: "Demo order placed",
      description: "Configure STRIPE_SECRET_KEY to accept real payments.",
      variant: "info",
    });
    router.push(`/checkout/success?order_id=${orderId}&demo=1`);
  }

  if (hydrated && items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6">
        <ShoppingBag className="mx-auto h-12 w-12 text-gold-ink" aria-hidden />
        <h1 className="mt-4 font-serif text-3xl text-obsidian">Your bag is empty</h1>
        <p className="mt-2 text-slate-500">Add a few pieces before checking out.</p>
        <Button asChild variant="primary" className="mt-6">
          <Link href="/shop">
            Browse the collection
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <header className="mb-8 text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-ink">Secure Order</span>
        <h1 className="mt-2 font-serif text-4xl text-obsidian">Checkout</h1>
      </header>

      <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr] lg:items-start">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            placeOrder();
          }}
          className="rounded-none border border-border bg-card p-6 sm:p-8"
        >
          <h2 className="font-serif text-xl text-obsidian">Shipping Details</h2>

          {error && (
            <div className="mt-4 rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              <p>{error}</p>
              {stripeUnavailable && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="mt-3 border-red-300 text-red-700 hover:bg-red-600 hover:text-white"
                  onClick={placeDemoOrder}
                >
                  Continue in demo mode
                </Button>
              )}
            </div>
          )}

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">First name</label>
              <Input required value={form.firstName} onChange={(e) => update("firstName", e.target.value)} />
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">Last name</label>
              <Input required value={form.lastName} onChange={(e) => update("lastName", e.target.value)} />
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">Email</label>
              <Input type="email" required value={form.email} onChange={(e) => update("email", e.target.value)} />
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">Phone</label>
              <Input type="tel" required value={form.phone} onChange={(e) => update("phone", e.target.value)} />
            </div>
          </div>

          <div className="mt-4">
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">Street address</label>
            <Input required value={form.address} onChange={(e) => update("address", e.target.value)} />
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">City</label>
              <Input required value={form.city} onChange={(e) => update("city", e.target.value)} />
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">Postal code</label>
              <Input required value={form.zip} onChange={(e) => update("zip", e.target.value)} />
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">Country</label>
              <Select value={form.country} onChange={(e) => update("country", e.target.value)}>
                {["Pakistan", "United Arab Emirates", "United Kingdom", "United States", "Germany", "France"].map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </Select>
            </div>
          </div>

          <Button type="submit" variant="primary" className="mt-6 w-full" disabled={processing}>
            {processing ? "Redirecting to secure payment…" : "Pay Securely with Stripe"}
          </Button>
          <p className="mt-3 text-center text-xs text-slate-400">
            <Lock className="-mt-px mr-1 inline h-3.5 w-3.5" aria-hidden /> You will be redirected to Stripe&apos;s encrypted payment page.
          </p>
        </form>

        <aside className="rounded-none border border-border bg-silk p-6">
          <h2 className="font-serif text-xl text-obsidian">Order Summary</h2>
          <ul className="mt-4 space-y-3">
            {items.map((item) => (
              <li key={`${item.id}-${item.color ?? ""}-${item.size ?? ""}`} className="flex items-center gap-3 text-sm">
                <Image
                  src={item.image}
                  alt=""
                  width={44}
                  height={56}
                  className="h-14 w-11 rounded object-cover"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-obsidian">{item.name}</p>
                  <p className="text-xs text-slate-400">Qty {item.quantity}</p>
                </div>
                <span className="text-slate-500">{format(item.price * item.quantity)}</span>
              </li>
            ))}
          </ul>

          <dl className="mt-5 space-y-2 border-t border-border pt-4 text-sm">
            <div className="flex justify-between text-slate-500">
              <dt>Subtotal</dt>
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
            <div className="flex justify-between border-t border-border pt-4 text-lg font-semibold text-obsidian">
              <dt>Total</dt>
              <dd className="font-serif text-gold-ink">{format(total)}</dd>
            </div>
          </dl>
        </aside>
      </div>
    </div>
  );
}
