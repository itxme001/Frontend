import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { findAllUsers } from "@/lib/db";

/**
 * GET /api/admin/users
 * Returns all users with their roles.
 * Admin-only endpoint.
 */
export async function GET() {
  const guard = await requireAdmin();
  if (!guard.ok) {
    return NextResponse.json({ error: guard.error }, { status: guard.status });
  }

  const allUsers = await findAllUsers();
  const users = allUsers.map((u) => ({
    id: u.id,
    name: u.name,
    email: u.email,
    role: u.role,
    createdAt: new Date(u.createdAt).toISOString(),
  }));
  return NextResponse.json({ users }, { headers: { "Cache-Control": "private, no-store" } });
}
