import { NextResponse } from "next/server";
import { getCsrfToken } from "@/lib/auth";

/** GET /api/csrf — returns a fresh CSRF token for the client. */
export async function GET() {
  const token = getCsrfToken();
  return NextResponse.json({ token });
}
