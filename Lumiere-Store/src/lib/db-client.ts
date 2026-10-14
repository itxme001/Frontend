/**
 * Client-side order helpers — no node:fs dependency.
 *
 * These functions only touch localStorage so they can be safely imported
 * by "use client" components without breaking Turbopack / Vercel Edge.
 */

export interface StoredOrder {
  id: string;
  date: string;
  status: "paid" | "pending" | "demo";
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
    color?: string;
    size?: string;
  }>;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  email?: string;
  customerName?: string;
  stripeSessionId?: string;
}

const ORDERS_KEY = "lumiere:orders";
const PENDING_KEY = "lumiere:pending-order";

export function getOrders(): StoredOrder[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(ORDERS_KEY);
    return raw ? (JSON.parse(raw) as StoredOrder[]) : [];
  } catch {
    return [];
  }
}

export function saveOrder(order: StoredOrder): void {
  if (typeof window === "undefined") return;
  const orders = getOrders();
  const idx = orders.findIndex((o) => o.id === order.id);
  if (idx >= 0) {
    orders[idx] = order;
  } else {
    orders.unshift(order);
  }
  try {
    window.localStorage.setItem(ORDERS_KEY, JSON.stringify(orders.slice(0, 50)));
  } catch {
    // ignore quota errors
  }
}

export function setPendingOrder(order: StoredOrder): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(PENDING_KEY, JSON.stringify(order));
  } catch {}
}

export function takePendingOrder(): StoredOrder | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(PENDING_KEY);
    if (!raw) return null;
    window.localStorage.removeItem(PENDING_KEY);
    return JSON.parse(raw) as StoredOrder;
  } catch {
    return null;
  }
}
