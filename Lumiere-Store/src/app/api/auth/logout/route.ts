import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { SESSION_COOKIE, verifyRequestCsrf, setCsrfCookie } from "@/lib/auth";

export async function POST(req: Request) {
  const csrfCheck = await verifyRequestCsrf(req);
  if (!csrfCheck.ok) {
    return NextResponse.json({ error: csrfCheck.error }, { status: 403 });
  }

  const store = await cookies();
  store.set(SESSION_COOKIE, "", { path: "/", maxAge: 0 });

  const res = NextResponse.json({ ok: true });
  // Clear the CSRF cookie too.
  res.headers.set("Set-Cookie", `${SESSION_COOKIE}=; Path=/; Max-Age=0; HttpOnly${process.env.NODE_ENV === "production" ? "; Secure" : ""}`);
  setCsrfCookie(res);
  return res;
}
