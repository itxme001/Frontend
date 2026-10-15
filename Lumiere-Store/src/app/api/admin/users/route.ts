import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { findAllUsers } from "@/lib/db";

/**
 * GET /api/admin/users
 * Returns all users with their roles.
 * Admin-only endpoint.
 */
export async function GET() {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // Check admin access
  const allUsers = findAllUsers();
  const isAdmin = allUsers.some((u) => u.email === user.email && u.email === "admin@lumiere.com");
  if (!isAdmin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const users = allUsers.map((u) => ({
    id: u.id,
    name: u.name,
    email: u.email,
    role: u.email === "admin@lumiere.com" ? "admin" : "user",
    createdAt: new Date(u.createdAt).toISOString(),
  }));
  return NextResponse.json({ users });
}
