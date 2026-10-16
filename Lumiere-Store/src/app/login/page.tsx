"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowLeft,
  Loader2,
  Lock,
  Mail,
  Eye,
  EyeOff,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { AuthModal } from "@/components/auth/auth-modal";
import { AuthLayout } from "@/components/auth/auth-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useAuth } from "@/store/auth-context";
import { useToast } from "@/components/ui/toast";
import { useGoogleSignIn } from "@/hooks/use-google-signin";
import { loginSchema, type LoginValues } from "@/lib/validation";

/**
 * Reads `?next=` without `useSearchParams`, which would force the whole route
 * into a Suspense boundary for no benefit. Only same-origin absolute paths are
 * honoured so a crafted link can't bounce you off-site.
 */
function readNextPath(): string {
  if (typeof window === "undefined") return "/account";
  const raw = new URLSearchParams(window.location.search).get("next");
  if (raw && raw.startsWith("/") && !raw.startsWith("//")) return raw;
  return "/account";
}

const GOOGLE_SVG = (
  <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden>
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    />
  </svg>
);

export default function LoginPage() {
  const router = useRouter();
  const { login, loginWithGoogle, loading } = useAuth();
  const { toast } = useToast();
  const [modalOpen, setModalOpen] = React.useState(false);
  const [nextPath, setNextPath] = React.useState("/account");
  const [googleBusy, setGoogleBusy] = React.useState(false);
  const fallbackBtnRef = React.useRef<HTMLDivElement>(null);
  const [showGoogleFallback, setShowGoogleFallback] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  React.useEffect(() => {
    setNextPath(readNextPath());
  }, []);

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  async function finishLogin() {
    toast({ title: "Welcome back", description: "Signed in successfully.", variant: "success" });
    router.replace(nextPath);
    router.refresh();
  }

  async function onSubmit(values: LoginValues) {
    const result = await login(values.email, values.password);
    if (!result.ok) {
      toast({ title: "Sign-in failed", description: result.error, variant: "error" });
      return;
    }
    await finishLogin();
  }

  /** Handles a Google ID token however it arrived (One Tap or fallback button). */
  async function handleGoogleToken(idToken: string) {
    setGoogleBusy(true);
    try {
      const result = await loginWithGoogle(idToken);
      if (!result.ok) {
        toast({ title: "Google sign-in failed", description: result.error, variant: "error" });
        return;
      }
      await finishLogin();
    } finally {
      setGoogleBusy(false);
    }
  }

  const google = useGoogleSignIn(handleGoogleToken);

  function handleGoogleClick() {
    if (googleBusy) return;
    if (!google.configured) {
      setModalOpen(true);
      return;
    }
    if (!google.ready) {
      setShowGoogleFallback(true);
      return;
    }
    const opened = google.prompt();
    // One Tap can be blocked (incognito, prior dismissal). Paint Google's own
    // button so the visitor is never left with a dead click.
    if (!opened) setShowGoogleFallback(true);
  }

  React.useEffect(() => {
    if (showGoogleFallback) google.renderFallback(fallbackBtnRef.current);
  }, [showGoogleFallback, google]);

  return (
    <AuthLayout
      title="Sign In"
      subtitle="Access your account, track orders, and manage your wishlist."
      footer={
        <p className="text-sm text-slate-500">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="font-semibold text-gold-ink underline underline-offset-4 hover:text-gold-dark"
          >
            Create one
          </Link>
        </p>
      }
    >
      <div className="space-y-4">
        {/* Back to store */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.16em] text-slate-400 transition-colors hover:text-gold-ink"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
          Back to the store
        </Link>

        {/* Google */}
        <div>
          <Button
            type="button"
            variant="outline"
            className="h-12 w-full gap-3 rounded-lg border-border text-foreground hover:bg-shell"
            onClick={handleGoogleClick}
            disabled={googleBusy}
          >
            {googleBusy ? (
              <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
            ) : (
              GOOGLE_SVG
            )}
            {googleBusy ? "Signing in…" : "Continue with Google"}
          </Button>

          {google.error && (
            <p className="mt-2 text-xs text-red-600" role="alert">
              {google.error}
            </p>
          )}

          {showGoogleFallback && (
            <div className="mt-3 rounded-lg border border-border bg-shell px-3 py-3 text-center">
              <p className="mb-2 text-[11px] uppercase tracking-[0.14em] text-slate-400">
                Or choose your Google account
              </p>
              <div ref={fallbackBtnRef} className="flex justify-center" />
            </div>
          )}
        </div>

        <div className="my-5 flex items-center gap-3">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs uppercase tracking-widest text-slate-400">or</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" noValidate>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail
                        className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                        aria-hidden
                      />
                      <Input
                        {...field}
                        type="email"
                        autoComplete="email"
                        inputMode="email"
                        placeholder="you@example.com"
                        className="h-11 rounded-lg border-border bg-card pl-10 focus:border-gold/50 focus:ring-gold/20"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-baseline justify-between gap-3">
                    <FormLabel>Password</FormLabel>
                    <Link
                      href="/reset"
                      className="text-xs text-slate-400 underline-offset-4 transition-colors hover:text-gold-ink hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <FormControl>
                    <div className="relative">
                      <Lock
                        className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                        aria-hidden
                      />
                      <Input
                        {...field}
                        type={showPassword ? "text" : "password"}
                        autoComplete="current-password"
                        placeholder="••••••••"
                        className="h-11 rounded-lg border-border bg-card pl-10 pr-11 focus:border-gold/50 focus:ring-gold/20"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((v) => !v)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        aria-pressed={showPassword}
                        className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 text-slate-400 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/40"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" aria-hidden />
                        ) : (
                          <Eye className="h-4 w-4" aria-hidden />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              variant="primary"
              disabled={loading || form.formState.isSubmitting}
              className="h-12 w-full rounded-lg"
              aria-busy={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> Signing In…
                </>
              ) : (
                <>
                  <UserRound className="h-4 w-4" aria-hidden /> Sign In
                </>
              )}
            </Button>
          </form>
        </Form>

        {/* Trust strip */}
        <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 border-t border-border pt-4 text-[11px] uppercase tracking-[0.12em] text-slate-400">
          <li className="inline-flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-gold-ink" aria-hidden />
            Encrypted session
          </li>
          <li className="inline-flex items-center gap-1.5">
            <Lock className="h-3.5 w-3.5 text-gold-ink" aria-hidden />
            We never store your password in plain text
          </li>
        </ul>
      </div>

      <AuthModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        initialMode="login"
      />
    </AuthLayout>
  );
}
