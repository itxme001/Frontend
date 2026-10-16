import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { findUserByEmail } from "@/lib/db";

const NO_STORE = { "Cache-Control": "private, no-store" };

export async function GET() {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ user: null }, { headers: NO_STORE });

  // Sessions issued before the role field existed carry no role. Read the
  // authoritative value from the database so the client's `isAdmin` matches
  // what the server will actually allow.
  let role = user.role;
  if (!role) {
    try {
      const record = await findUserByEmail(user.email);
      role = record?.role ?? "user";
    } catch {
      role = "user";
    }
  }

  return NextResponse.json(
    { user: { id: user.id, name: user.name, email: user.email, role } },
    { headers: NO_STORE }
  );
}
