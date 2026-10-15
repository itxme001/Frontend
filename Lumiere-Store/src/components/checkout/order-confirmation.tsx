"use client";

import * as React from "react";
import Link from "next/link";
import { CircleCheck } from "lucide-react";
import { useCart } from "@/store/cart-store";
import { Button } from "@/components/ui/button";
import { useCurrency } from "@/store/currency-context";
import { saveOrder as dbSaveOrder, type StoredOrder, setPendingOrder, takePendingOrder, getOrders } from "@/lib/db-client";

export function OrderConfirmation({ orderId }: { orderId: string }) {
  const { clearCart, hydrated } = useCart();
  const { format } = useCurrency();
  const [order, setOrder] = React.useState<StoredOrder | null>(null);
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    // First try the one-shot pending order from checkout
    const pending = takePendingOrder();
    if (pending) {
      const paid: StoredOrder = { ...pending, id: orderId || pending.id, status: "paid" };
      dbSaveOrder(paid);
      setOrder(paid);
      clearCart();
    } else {
      // Fallback: look up the order by ID from saved orders (handles page refresh)
      const orders = getOrders();
      const found = orders.find((o) => o.id === orderId);
      if (found) {
        setOrder(found);
      }
    }
    setReady(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId]);

  return (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6">
      <CircleCheck className="mx-auto h-16 w-16 text-emerald-500" aria-hidden />
      <h1 className="mt-5 font-serif text-4xl text-obsidian">Thank You for Your Order</h1>
      <p className="mt-3 text-slate-500">
        Your order has been confirmed and a receipt is on its way to your inbox.
      </p>
      <p className="mt-3 font-mono text-sm font-semibold tracking-wide text-gold-ink">Order {orderId}</p>

      {ready && order && (
        <div className="mt-8 rounded-none border border-border bg-silk p-6 text-left">
          <h2 className="mb-4 font-serif text-lg text-obsidian">Order Summary</h2>
          <ul className="space-y-2">
            {order.items.map((item, idx) => (
              <li key={`${item.id}-${idx}`} className="flex justify-between text-sm text-slate-500">
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span>{format(item.price * item.quantity)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex justify-between border-t border-border pt-4 font-semibold text-obsidian">
            <span>Total</span>
            <span className="font-serif text-gold-ink">{format(order.total)}</span>
          </div>
        </div>
      )}

      {!hydrated && <div className="skeleton mx-auto mt-8 h-40 max-w-md rounded-none" />}

      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <Button asChild variant="primary" className="w-full sm:w-auto">
          <Link href="/shop">
            Continue Shopping
          </Link>
        </Button>
        <Button asChild variant="outline" className="w-full sm:w-auto">
          <Link href="/account">
            View My Orders
          </Link>
        </Button>
      </div>
    </div>
  );
}
