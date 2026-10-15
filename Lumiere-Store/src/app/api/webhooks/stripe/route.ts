/**
 * Stripe webhook handler — uses explicit casts for Stripe API surfaces that
 * vary across SDK versions. Each `any` is annotated with the shape we expect.
 *
 * POST /api/webhooks/stripe
 */
import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { saveOrder, type StoredOrder, type OrderItem } from "@/lib/db";
import { sendOrderConfirmation } from "@/lib/email";

interface StripeSessionMetadata {
  orderId?: string;
  [key: string]: string | undefined;
}

interface StripeLineItemPrice {
  unit_amount?: number;
  product_data?: {
    name?: string;
    images?: string[];
  };
}

interface StripeLineItem {
  id: string;
  quantity: number;
  price: StripeLineItemPrice;
}

interface StripeShippingCost {
  shipping_rate_data?: {
    fixed_amount?: { amount?: number };
  };
}

interface StripeTotalDetailsTax {
  amount?: number;
}

interface StripeTotalDetails {
  tax?: StripeTotalDetailsTax;
}

interface StripeSession {
  id: string;
  client_reference_id?: string;
  metadata: StripeSessionMetadata;
  currency: string;
  customer_email: string | null;
  amount_total?: number;
  shipping_cost?: StripeShippingCost;
  total_details?: StripeTotalDetails;
  [key: string]: unknown;
}

async function getStripe(): Promise<Stripe> {
  const mod = await import("stripe");
  return new mod.default(process.env.STRIPE_SECRET_KEY ?? "", {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    apiVersion: "2024-12-18.acacia" as any,
  });
}

const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET ?? "";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature") ?? "";

  let stripe: Stripe;
  try {
    stripe = await getStripe();
  } catch {
    return NextResponse.json({ error: "Stripe not configured" }, { status: 500 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, WEBHOOK_SECRET);
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const session = event.data.object as any as StripeSession;
    const orderId = String(session.client_reference_id ?? session.metadata?.orderId ?? "");
    if (!orderId) return NextResponse.json({ received: true });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let lineItems: StripeLineItem[] = [];
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const liRes = await stripe.checkout.sessions.listLineItems(session.id);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      lineItems = liRes.data as any as StripeLineItem[];
    } catch {
      // Missing items — save shell order.
    }

    const currency = String(session.currency ?? "usd");

    const subtotal =
      lineItems.reduce<number>((sum, item) => {
        const unit = Number(item.price?.unit_amount ?? 0);
        const qty = Number(item.quantity ?? 1);
        return sum + unit * qty;
      }, 0) / 100;

    const shippingRaw = session.shipping_cost?.shipping_rate_data?.fixed_amount;
    const shipping = Number(shippingRaw?.amount ?? 0) / 100;

    const taxRaw = session.total_details?.tax?.amount;
    const tax = Number(taxRaw ?? 0) / 100;

    const total = Number(session.amount_total ?? (subtotal + shipping + tax) * 100) / 100;

    const items: OrderItem[] = lineItems.map((item) => ({
      id: item.id,
      name: item.price?.product_data?.name ?? "Product",
      price: Number(item.price?.unit_amount ?? 0) / 100,
      quantity: Number(item.quantity ?? 1),
      image: item.price?.product_data?.images?.[0] ?? "",
    }));

    const order: StoredOrder = {
      id: orderId,
      date: new Date().toISOString(),
      status: "paid",
      items,
      subtotal,
      shipping,
      tax,
      total,
      email: String(session.customer_email ?? ""),
      stripeSessionId: session.id,
    };

    await saveOrder(order);

    if (order.email) {
      void sendOrderConfirmation({
        to: order.email,
        order: { id: order.id, total, currency, items: order.items },
      });
    }
  }

  return NextResponse.json({ received: true });
}
