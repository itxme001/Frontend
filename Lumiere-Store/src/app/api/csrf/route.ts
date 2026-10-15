import { NextResponse } from "next/server";
import { getCsrfToken, CSRF_COOKIE } from "@/lib/auth";

/**
 * GET /api/csrf
 * Generates a signed CSRF token, returns it as JSON, AND sets it as an HttpOnly cookie.
 * The client reads the token from the JSON response and sends it back in requests.
 */
export async function GET() {
  const rawToken = getCsrfToken();

  const res = NextResponse.json({ token: rawToken });
  res.headers.set(
    "Set-Cookie",
    `${CSRF_COOKIE}=${rawToken}; Path=/; HttpOnly; SameSite=Lax${
      process.env.NODE_ENV === "production" ? "; Secure" : ""
    }`
  );
  return res;
}
