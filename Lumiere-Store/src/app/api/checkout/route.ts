import { NextResponse } from "next/server";
import { createCheckoutSession, isStripeConfigured, type CheckoutLineItem } from "@/lib/stripe";
import { getSessionUser } from "@/lib/auth";
import { products } from "@/data/products";


interface IncomingItem {
  id: string;
  quantity: number;
}

export async function POST(req: Request) {
  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    raw = null;
  }
  const body = (raw ?? {}) as Record<string, unknown>;
  const rawItems: IncomingItem[] = Array.isArray(body.items) ? (body.items as IncomingItem[]) : [];
  const customer = (body.customer ?? {}) as Record<string, string>;

  if (rawItems.length === 0) {
    return NextResponse.json({ error: "Your bag is empty." }, { status: 400 });
  }

  if (!isStripeConfigured()) {
    return NextResponse.json(
      {
        error:
          "Stripe is not configured yet. Add STRIPE_SECRET_KEY to your environment to accept real payments.",
      },
      { status: 503 }
    );
  }

  // Re-price every line from the trusted catalog (never trust client prices).
  const lineItems: CheckoutLineItem[] = [];
  for (const item of rawItems) {
    const product = products.find((p) => p.id === item.id);
    if (!product) continue;
    const quantity = Math.max(1, Math.min(99, Math.floor(Number(item.quantity) || 1)));
    lineItems.push({
      name: product.name,
      amount: product.price,
      quantity,
      image: product.heroImage ?? product.image,
    });
  }

  if (lineItems.length === 0) {
    return NextResponse.json({ error: "No valid items found in your bag." }, { status: 400 });
  }

  const user = await getSessionUser();
  const origin = req.headers.get("origin") || new URL(req.url).origin;
  const orderId = `LUM-${Date.now().toString(36).toUpperCase()}`;

  const result = await createCheckoutSession({
    items: lineItems,
    customer: { ...customer, email: (customer.email as string | undefined) || user?.email },
    orderId,
    successUrl: `${origin}/checkout/success?order_id=${encodeURIComponent(orderId)}`,
    cancelUrl: `${origin}/checkout/cancel`,
  });

  if ("error" in result) {
    return NextResponse.json({ error: result.error }, { status: 502 });
  }

  return NextResponse.json({ url: result.url, orderId });
}
