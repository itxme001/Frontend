import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { findAllOrders } from "@/lib/db";

/** Admin-only: every customer's orders contain names, emails and addresses. */
export async function GET() {
  const guard = await requireAdmin();
  if (!guard.ok) {
    return NextResponse.json({ error: guard.error }, { status: guard.status });
  }

  const orders = await findAllOrders();
  return NextResponse.json({ orders }, { headers: { "Cache-Control": "private, no-store" } });
}
