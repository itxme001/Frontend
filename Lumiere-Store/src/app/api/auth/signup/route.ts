import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  createUser,
  getSessionCookieOptions,
  signSession,
  SESSION_COOKIE,
  setCsrfCookie,
  verifyRequestCsrf,
} from "@/lib/auth";
import { signupLimiter, rateKey } from "@/lib/rate-limiter";

export async function POST(req: Request) {
  // Rate limit per IP.
  if (!signupLimiter.tryTake(rateKey(req))) {
    return NextResponse.json({ error: "Too many sign-up attempts. Please try again later." }, { status: 429 });
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

  const { name, email, password } = body as Record<string, unknown>;
  if (typeof name !== "string" || typeof email !== "string" || typeof password !== "string") {
    return NextResponse.json({ error: "Name, email and password are required." }, { status: 400 });
  }

  let result: Awaited<ReturnType<typeof createUser>>;
  try {
    result = await createUser({ name, email, password });
  } catch {
    // Database unreachable — a service problem, not a validation error.
    return NextResponse.json(
      { error: "We couldn't reach the store just now. Please try again in a moment." },
      { status: 503 }
    );
  }
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  const store = await cookies();
  store.set(SESSION_COOKIE, signSession(result.user!), getSessionCookieOptions());

  const res = NextResponse.json({ user: result.user }, { status: 201 });
  setCsrfCookie(res);
  return res;
}
