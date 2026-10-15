import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { findAllOrders } from "@/lib/db";

export async function GET() {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const orders = findAllOrders();
  return NextResponse.json({ orders });
}
