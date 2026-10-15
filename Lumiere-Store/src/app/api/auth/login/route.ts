import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  authenticate,
  getSessionCookieOptions,
  signSession,
  SESSION_COOKIE,
  setCsrfCookie,
  verifyRequestCsrf,
} from "@/lib/auth";
import { loginLimiter, rateKey } from "@/lib/rate-limiter";

export async function POST(req: Request) {
  // Rate limit per IP before doing any work.
  if (!loginLimiter.tryTake(rateKey(req))) {
    return NextResponse.json({ error: "Too many login attempts. Please try again later." }, { status: 429 });
  }

  // CSRF verification.
  const csrfCheck = await verifyRequestCsrf(req);
  if (!csrfCheck.ok) {
    return NextResponse.json({ error: csrfCheck.error }, { status: 403 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { email, password } = body as Record<string, unknown>;
  if (typeof email !== "string" || typeof password !== "string") {
    return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
  }

  const user = await authenticate(email, password);
  if (!user) {
    // Generic message — don't leak whether the email exists.
    return NextResponse.json({ error: "Incorrect email or password." }, { status: 401 });
  }

  const store = await cookies();
  store.set(SESSION_COOKIE, signSession(user), getSessionCookieOptions());

  // Issue a fresh CSRF token for the next page view.
  const res = NextResponse.json({ user });
  setCsrfCookie(res);
  return res;
}
