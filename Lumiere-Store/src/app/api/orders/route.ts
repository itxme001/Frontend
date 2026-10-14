/**
 * Server-side order API — fetches orders from the persistent store.
 *
 * GET /api/orders?email=xxx
 * Returns: { orders: StoredOrder[] }
 */
import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { listOrdersByEmail } from "@/lib/db";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email") ?? undefined;
  const user = await getSessionUser();

  // Only allow users to fetch their own orders (or admins with email param).
  if (email && (!user || user.email !== email)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const orders = listOrdersByEmail(email || user?.email);
  return NextResponse.json({ orders });
}
