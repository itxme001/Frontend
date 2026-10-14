/**
 * Email delivery via Resend.
 *
 * Wrap the send call in a fire-and-forget so checkout never blocks on
 * a transient email outage.
 */
import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

/** Send an order confirmation email. Returns true on success, false otherwise. */
export async function sendOrderConfirmation(params: {
  to: string;
  order: { id: string; total: number; currency: string; items: Array<{ name: string; quantity: number; price: number }> };
}): Promise<boolean> {
  if (!resend) return false;
  try {
    await resend.emails.send({
      from: "Lumière <orders@lumiere.store>",
      to: [params.to],
      subject: `Your Lumière order #${params.order.id}`,
      html: renderOrderEmail(params.order),
      text: renderOrderText(params.order),
    });
    return true;
  } catch {
    // Email failure must never block the purchase flow.
    return false;
  }
}

function renderOrderEmail(order: {
  id: string;
  total: number;
  currency: string;
  items: Array<{ name: string; quantity: number; price: number }>;
}): string {
  const rows = order.items
    .map(
      (i) => `
      <tr>
        <td style="padding:8px 0;border-bottom:1px solid #eee;font-size:14px;color:#333">${escapeHtml(i.name)}</td>
        <td style="padding:8px 0;border-bottom:1px solid #eee;font-size:14px;color:#666;text-align:center">${i.quantity}</td>
        <td style="padding:8px 0;border-bottom:1px solid #eee;font-size:14px;color:#666;text-align:right">${formatCurrency(i.price, order.currency)}</td>
      </tr>`
    )
    .join("");
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>Order Confirmation</title></head>
<body style="margin:0;padding:0;font-family:system-ui,sans-serif;background:#f5f5f5">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:580px;margin:40px auto;background:#fff;border-radius:8px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,.08)">
    <tr><td style="padding:32px 32px 24px;background:#0a0a0a;text-align:center">
      <h1 style="margin:0;color:#c8a44d;font-size:28px;letter-spacing:.12em;font-weight:400">LUMIÈRE</h1>
      <p style="margin:8px 0 0;color:#aaa;font-size:13px;letter-spacing:.08em">ORDER CONFIRMATION</p>
    </td></tr>
    <tr><td style="padding:32px">
      <p style="margin:0 0 16px;font-size:15px;color:#333">Thank you for your order, <strong>${escapeHtml(order.id)}</strong>.</p>
      <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px">
        <thead><tr style="background:#f9f9f9">
          <th style="padding:10px 8px;text-align:left;font-size:12px;text-transform:uppercase;letter-spacing:.08em;color:#888">Item</th>
          <th style="padding:10px 8px;text-align:center;font-size:12px;text-transform:uppercase;letter-spacing:.08em;color:#888">Qty</th>
          <th style="padding:10px 8px;text-align:right;font-size:12px;text-transform:uppercase;letter-spacing:.08em;color:#888">Price</th>
        </tr></thead>
        <tbody>${rows}</tbody>
      </table>
      <p style="margin:0;font-size:18px;font-weight:600;color:#0a0a0a">Total: ${formatCurrency(order.total, order.currency)}</p>
      <p style="margin:24px 0 0;font-size:13px;color:#888">A confirmation has been sent to your email. We will ship within 1–2 business days.</p>
    </td></tr>
    <tr><td style="padding:20px 32px;background:#fafafa;text-align:center;font-size:12px;color:#aaa">
      &copy; ${new Date().getFullYear()} Lumière. All rights reserved.
    </td></tr>
  </table>
</body>
</html>`;
}

function renderOrderText(order: { id: string; total: number; currency: string; items: Array<{ name: string; quantity: number; price: number }> }): string {
  const lines = order.items.map((i) => `  ${i.name} × ${i.quantity}  —  ${formatCurrency(i.price, order.currency)}`);
  return [
    `Lumière Order #${order.id}`,
    "",
    ...lines,
    "",
    `Total: ${formatCurrency(order.total, order.currency)}`,
    "",
    `Thank you for your order. We will ship within 1–2 business days.`,
  ].join("\n");
}

function formatCurrency(amount: number, currency: string): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(amount);
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
