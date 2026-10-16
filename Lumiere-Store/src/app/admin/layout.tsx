import { redirect } from "next/navigation";
import { getSessionUser, isAdminUser } from "@/lib/auth";

export const metadata = {
  title: "Admin · Lumière",
  robots: { index: false, follow: false },
};

/**
 * The guard below reads the session cookie, so this segment can never be
 * statically prerendered — opt it out of instant-navigation validation and
 * let it render on demand.
 */
export const instant = false;

/**
 * Second gate for the admin area — `src/middleware.ts` already stops
 * unauthorised requests with a real 307 before any markup exists, but this
 * layout re-checks with Node crypto so the guard holds even if middleware is
 * ever bypassed (direct function invocation, a matcher change, etc.).
 *
 * The client-side guard in `page.tsx` is a UX nicety only — it never decides
 * access on its own.
 */
export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await getSessionUser();

  // Not signed in at all → send to login with a return path.
  if (!user) redirect("/login?next=/admin");

  // Signed in but not an administrator → never render the admin UI.
  if (!isAdminUser(user)) redirect("/account");

  return <>{children}</>;
}
