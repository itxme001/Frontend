import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  getSessionCookieOptions,
  signSession,
  SESSION_COOKIE,
  verifyGoogleToken,
  upsertGoogleUser,
} from "@/lib/auth";

/**
 * POST /api/auth/google
 * Exchanges a Google ID token for a Lumière session.
 *
 * Request body:
 *   { id_token: string }  — Google ID token from Google Identity Services
 */
export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { id_token } = body as Record<string, unknown>;
  if (typeof id_token !== "string" || id_token.length < 10) {
    return NextResponse.json({ error: "Google ID token is required." }, { status: 400 });
  }

  // Verify the Google ID token
  const googleInfo = await verifyGoogleToken(id_token);
  if (!googleInfo) {
    return NextResponse.json({ error: "Invalid Google token. Please try signing in again." }, { status: 401 });
  }

  // Find or create user
  const user = await upsertGoogleUser(googleInfo);

  // Set session cookie
  const store = await cookies();
  store.set(SESSION_COOKIE, signSession(user), getSessionCookieOptions());

  return NextResponse.json({ user });
}
