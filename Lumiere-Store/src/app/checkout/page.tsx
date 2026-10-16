"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Lock, ShoppingBag, Truck, CreditCard, Banknote } from "lucide-react";
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

type PaymentMethod = "cod" | "card" | "bank";

export default function CheckoutPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { user } = useAuth();
  const { items, subtotal, clearCart, hydrated } = useCart();
  const { format } = useCurrency();

  const [form, setForm] = React.useState(EMPTY_FORM);
  const [paymentMethod, setPaymentMethod] = React.useState<PaymentMethod>("cod");
  const [processing, setProcessing] = React.useState(false);
  const [error, setError] = React.useState("");

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
      customerName: `${form.firstName} ${form.lastName}`.trim(),
    };
  }

  function validateForm(): string {
    if (!form.firstName || !form.lastName || !form.email || !form.address || !form.city || !form.zip) {
      return "Please complete all required shipping fields.";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      return "Please enter a valid email address.";
    }
    if (!form.phone || form.phone.length < 10) {
      return "Please enter a valid phone number for delivery.";
    }
    return "";
  }

  async function placeCODOrder() {
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setProcessing(true);
    setError("");

    try {
      const orderId = `LUM-${Date.now().toString(36).toUpperCase()}`;
      const order = buildOrder("pending", orderId);

      // Save to localStorage for immediate display
      setPendingOrder(order);
      dbSaveOrder(order);

      // Try to save to server (MongoDB)
      try {
        const csrfRes = await fetch("/api/csrf", { cache: "no-store" });
        const csrfToken = csrfRes.ok ? (await csrfRes.json() as { token: string }).token : "";

        await fetch("/api/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json", "x-csrf-token": csrfToken },
          body: JSON.stringify({ ...order, _csrf: csrfToken }),
        });
      } catch {
        // Server save failed — order still in localStorage
      }

      clearCart();
      toast({
        title: "Order placed!",
        description: "Pay cash on delivery. We'll call to confirm.",
        variant: "success",
      });
      router.push(`/checkout/success?order_id=${orderId}&cod=1`);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setProcessing(false);
    }
  }

  function placeCardOrder() {
    setError("Online card payments are not available yet. Please choose Cash on Delivery or Bank Transfer.");
  }

  function placeBankTransferOrder() {
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }
    setProcessing(true);
    setError("");

    const orderId = `LUM-${Date.now().toString(36).toUpperCase()}`;
    const order = buildOrder("pending", orderId);
    setPendingOrder(order);
    dbSaveOrder(order);
    clearCart();
    toast({
      title: "Order placed!",
      description: "Complete payment via bank transfer. Details sent to your email.",
      variant: "success",
    });
    router.push(`/checkout/success?order_id=${orderId}&bank=1`);
    setProcessing(false);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (paymentMethod === "cod") placeCODOrder();
    else if (paymentMethod === "card") placeCardOrder();
    else placeBankTransferOrder();
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
          onSubmit={handleSubmit}
          className="rounded-none border border-border bg-card p-6 sm:p-8"
        >
          <h2 className="font-serif text-xl text-obsidian">Shipping Details</h2>

          {error && (
            <div className="mt-4 rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              <p>{error}</p>
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
              <Input type="tel" required value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="0300 1234567" />
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

          {/* Payment Method */}
          <div className="mt-8">
            <h3 className="font-serif text-lg text-obsidian">Payment Method</h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <button
                type="button"
                onClick={() => setPaymentMethod("cod")}
                className={`flex flex-col items-center gap-2 rounded-lg border-2 p-4 text-center transition-all ${
                  paymentMethod === "cod"
                    ? "border-gold bg-gold/5 shadow-sm"
                    : "border-border hover:border-gold/40"
                }`}
                aria-pressed={paymentMethod === "cod"}
              >
                <Truck className="h-6 w-6 text-gold-ink" aria-hidden />
                <span className="text-sm font-medium text-obsidian">Cash on Delivery</span>
                <span className="text-[11px] text-slate-400">Pay when your order arrives</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod("card")}
                className={`flex flex-col items-center gap-2 rounded-lg border-2 p-4 text-center transition-all ${
                  paymentMethod === "card"
                    ? "border-gold bg-gold/5 shadow-sm"
                    : "border-border hover:border-gold/40"
                }`}
                aria-pressed={paymentMethod === "card"}
              >
                <CreditCard className="h-6 w-6 text-gold-ink" aria-hidden />
                <span className="text-sm font-medium text-obsidian">Debit / Credit Card</span>
                <span className="text-[11px] text-slate-400">Visa, Mastercard</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod("bank")}
                className={`flex flex-col items-center gap-2 rounded-lg border-2 p-4 text-center transition-all ${
                  paymentMethod === "bank"
                    ? "border-gold bg-gold/5 shadow-sm"
                    : "border-border hover:border-gold/40"
                }`}
                aria-pressed={paymentMethod === "bank"}
              >
                <Banknote className="h-6 w-6 text-gold-ink" aria-hidden />
                <span className="text-sm font-medium text-obsidian">Bank Transfer</span>
                <span className="text-[11px] text-slate-400">Direct bank deposit</span>
              </button>
            </div>
          </div>

          <Button type="submit" variant="primary" className="mt-6 w-full" disabled={processing}>
            {processing
              ? "Processing…"
              : paymentMethod === "cod"
                ? `Place Order — ${format(total)}`
                : paymentMethod === "card"
                  ? "Pay by Card"
                  : "Place Order — Bank Transfer"}
          </Button>
          <p className="mt-3 text-center text-xs text-slate-400">
            <Lock className="-mt-px mr-1 inline h-3.5 w-3.5" aria-hidden />
            {paymentMethod === "cod"
              ? "Pay cash when your order is delivered. We'll call to confirm."
              : paymentMethod === "card"
                ? "Your card details are encrypted and secure."
                : "Bank transfer details will be shown on the next page."}
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
