/**
 * Minimal Stripe Checkout integration over the REST API.
 * Avoids a hard dependency on the stripe SDK while staying fully compatible.
 */

export interface CheckoutLineItem {
  name: string;
  amount: number; // major units, e.g. 19.99
  quantity: number;
  image?: string;
}

export interface CustomerDetails {
  email?: string;
  name?: string;
  address?: string;
  city?: string;
  zip?: string;
  country?: string;
  phone?: string;
}

export function isStripeConfigured(): boolean {
  return Boolean(process.env.STRIPE_SECRET_KEY);
}

function toCents(amount: number): number {
  return Math.round(amount * 100);
}

export async function createCheckoutSession(params: {
  items: CheckoutLineItem[];
  customer: CustomerDetails;
  successUrl: string;
  cancelUrl: string;
  orderId: string;
  shippingAmount?: number;
}): Promise<{ url: string } | { error: string }> {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    return { error: "Stripe is not configured. Set STRIPE_SECRET_KEY in your environment." };
  }
  if (!params.items.length) {
    return { error: "Your cart is empty." };
  }

  const body = new URLSearchParams();
  body.set("mode", "payment");
  body.set("success_url", params.successUrl);
  body.set("cancel_url", params.cancelUrl);
  body.set("client_reference_id", params.orderId);
  body.set("metadata[orderId]", params.orderId);

  if (params.customer.email) body.set("customer_email", params.customer.email);

  params.items.forEach((item, i) => {
    body.set(`line_items[${i}][quantity]`, String(Math.max(1, Math.floor(item.quantity))));
    body.set(`line_items[${i}][price_data][currency]`, (process.env.STRIPE_CURRENCY || "usd").toLowerCase());
    body.set(`line_items[${i}][price_data][unit_amount]`, String(toCents(item.amount)));
    body.set(`line_items[${i}][price_data][product_data][name]`, item.name.slice(0, 250));
  });

  if (params.shippingAmount && params.shippingAmount > 0) {
    body.set("shipping_options[0][shipping_rate_data][type]", "fixed_amount");
    body.set("shipping_options[0][shipping_rate_data][fixed_amount][amount]", String(toCents(params.shippingAmount)));
    body.set("shipping_options[0][shipping_rate_data][fixed_amount][currency]", (process.env.STRIPE_CURRENCY || "usd").toLowerCase());
    body.set("shipping_options[0][shipping_rate_data][display_name]", "Express Shipping");
  }

  try {
    const res = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body,
      cache: "no-store",
    });

    const data = await res.json();
    if (!res.ok) {
      return { error: data?.error?.message || "Stripe rejected the checkout request." };
    }
    if (!data?.url) {
      return { error: "Stripe did not return a checkout URL." };
    }
    return { url: data.url as string };
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Unable to reach Stripe." };
  }
}
