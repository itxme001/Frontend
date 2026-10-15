import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { findAllUsers } from "@/lib/db";

export async function GET() {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const users = findAllUsers().map((u) => ({
    id: u.id,
    name: u.name,
    email: u.email,
    role: u.email === "admin@lumiere.com" ? "admin" : "user",
    createdAt: new Date(u.createdAt).toISOString(),
  }));
  return NextResponse.json({ users });
}
