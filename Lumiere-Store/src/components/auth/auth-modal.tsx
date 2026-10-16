"use client";

import * as React from "react";
import Link from "next/link";
import { X, Mail, Lock, Eye, EyeOff, Loader2, Sparkles, UserRound } from "lucide-react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/store/auth-context";
import { useToast } from "@/components/ui/toast";
import { useGoogleSignIn } from "@/hooks/use-google-signin";

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? "";

export function AuthModal({
  open,
  onClose,
  initialMode = "login",
}: {
  open: boolean;
  onClose: () => void;
  initialMode?: "login" | "signup";
}) {
  const [mode, setMode] = React.useState<"login" | "signup">(initialMode);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState(false);
  const [googleLoading, setGoogleLoading] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  const router = useRouter();
  const { login, signup } = useAuth();
  const { toast } = useToast();
  const dialogRef = React.useRef<HTMLDivElement>(null);
  const titleId = React.useId();
  const googleFallbackRef = React.useRef<HTMLDivElement>(null);
  const [googleFallback, setGoogleFallback] = React.useState(false);

  // Shared GIS loader — initialise once, then One Tap from our own button.
  const google = useGoogleSignIn(handleGoogleTokenDirect);

  React.useEffect(() => { setMounted(true); }, []);

  React.useEffect(() => {
    if (open) {
      setMode(initialMode);
      setEmail("");
      setPassword("");
      setName("");
      setConfirmPassword("");
      setError("");
      setSuccess(false);
      setShowPassword(false);
    }
  }, [open, initialMode]);

  // Lock background scroll + close on Escape while the dialog is open.
  React.useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  async function handleGoogleTokenDirect(idToken: string) {
    setGoogleLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id_token: idToken }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Google sign-in failed. Please try again.");
        return;
      }
      setSuccess(true);
      toast({ title: "Welcome to Lumière", description: "Signed in with Google.", variant: "success" });
      setTimeout(() => { onClose(); router.push("/account"); }, 900);
    } catch {
      setError("Connection error. Please check your network and try again.");
    } finally {
      setGoogleLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (mode === "signup") {
      if (password.length < 6) { setError("Password must be at least 6 characters."); return; }
      if (password !== confirmPassword) { setError("Passwords do not match."); return; }
      if (name.trim().length < 2) { setError("Please enter your full name."); return; }
    }
    if (!email.trim() || !password.trim()) { setError("Please fill in all fields."); return; }

    setLoading(true);
    try {
      let result;
      if (mode === "login") result = await login(email.trim(), password);
      else result = await signup(name.trim(), email.trim(), password);

      if (!result.ok) {
        const msg = result.error?.toLowerCase() ?? "";
        if (msg.includes("already exists")) setError("An account with this email already exists. Try signing in.");
        else if (msg.includes("incorrect") || msg.includes("password")) setError("Invalid email or password.");
        else setError(result.error ?? "Something went wrong. Please try again.");
        return;
      }
      setSuccess(true);
      toast({
        title: mode === "login" ? "Welcome back" : "Welcome to Lumière",
        description: mode === "login" ? "You are now signed in." : "Your account is ready.",
        variant: "success",
      });
      setTimeout(() => { onClose(); router.push("/account"); }, 900);
    } catch {
      setError("Connection error. Please check your network and try again.");
    } finally {
      setLoading(false);
    }
  }

  function switchMode() {
    setMode(mode === "login" ? "signup" : "login");
    setError("");
    setSuccess(false);
  }

  function triggerGoogleSignIn() {
    if (googleLoading) return;
    if (!google.ready) {
      setGoogleFallback(true);
      return;
    }
    // One Tap can be unavailable (incognito, previously dismissed). Paint
    // Google's own button rather than leaving the visitor with a dead click.
    if (!google.prompt()) setGoogleFallback(true);
  }

  React.useEffect(() => {
    if (googleFallback) google.renderFallback(googleFallbackRef.current);
  }, [googleFallback, google]);

  if (!open) return null;

  const showName = mode === "signup";
  const showConfirm = mode === "signup";
  const hasGoogle = mounted && !!GOOGLE_CLIENT_ID;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Rich dark background */}
      <div className="absolute inset-0 bg-[#050505]" aria-hidden>
        <div className="absolute top-[-10%] left-[-5%] w-[700px] h-[700px] rounded-full bg-amber-800/10 blur-[150px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-amber-600/8 blur-[120px]" />
        <div className="absolute top-[30%] left-[50%] -translate-x-1/2 w-[300px] h-[300px] rounded-full bg-amber-500/4 blur-[100px]" />
        <div className="absolute inset-0 opacity-[0.015]"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)", backgroundSize: "60px 60px" }}
        />
      </div>

      <div className="relative w-full max-w-sm">
        {/* Gold glow border */}
        <div className="absolute -inset-px rounded-3xl bg-gradient-to-b from-amber-400/35 via-amber-600/12 to-transparent opacity-70" aria-hidden />

        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          className="relative rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-3xl shadow-[0_40px_100px_-30px_rgba(0,0,0,0.9),0_0_60px_-15px_rgba(180,140,40,0.06)]"
        >
          {/* Top gold line */}
          <div className="h-px w-full bg-gradient-to-r from-transparent via-amber-400/50 to-transparent" aria-hidden />

          {/* Close */}
          <button
            type="button"
            onClick={onClose}
            className="absolute right-5 top-5 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-white/50 transition-all hover:border-amber-400/40 hover:bg-amber-400/10 hover:text-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60"
            aria-label="Close dialog"
          >
            <X className="h-4 w-4" aria-hidden />
          </button>

          <div className="px-8 py-10">
            {/* Logo */}
            <div className="mb-9 text-center">
              <Link href="/" onClick={onClose} className="inline-block">
                <span className="font-serif text-[1.65rem] font-medium tracking-[0.24em] text-white">
                  LUM<span className="text-amber-400">I</span>ÈRE
                </span>
              </Link>
              <div className="mt-2.5 flex items-center justify-center gap-2">
                <div className="h-px w-10 bg-gradient-to-r from-transparent to-white/20" />
                <Sparkles className="h-3 w-3 text-amber-500/50" />
                <div className="h-px w-10 bg-gradient-to-l from-transparent to-white/20" />
              </div>
            </div>

            {/* Header */}
            <div className="mb-7 text-center">
              <h1
                id={titleId}
                className="whitespace-pre-line font-serif text-[2.1rem] leading-[1.1] text-white"
              >
                {mode === "login" ? "Welcome\nBack" : "Create\nAccount"}
              </h1>
              <p className="mt-2.5 text-sm leading-relaxed text-white/70">
                {mode === "login" ? "Sign in to access your account and orders" : "Join the Lumière circle"}
              </p>
            </div>

            {/* Success */}
            {success ? (
              <div className="py-10 text-center" role="status">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-amber-400/30 bg-amber-400/15 shadow-[0_0_40px_-10px_rgba(245,158,11,0.3)]">
                  <Sparkles className="h-8 w-8 text-amber-400" aria-hidden />
                </div>
                <p className="font-serif text-xl text-white">{mode === "login" ? "Welcome back" : "Welcome to Lumière"}</p>
                <p className="mt-2 text-sm text-white/70">Redirecting to your account…</p>
              </div>
            ) : (
              <>
                {/* ── Google Sign-In ── */}
                {hasGoogle ? (
                  <div className="mb-5">
                    <button
                      type="button"
                      onClick={triggerGoogleSignIn}
                      disabled={googleLoading}
                      className="group relative flex w-full items-center justify-center gap-3 rounded-xl border border-white/15 bg-white/5 py-3.5 text-sm font-medium text-white/85 transition-all hover:border-white/30 hover:bg-white/10 disabled:opacity-50"
                    >
                      {googleLoading ? (
                        <Loader2 className="h-5 w-5 animate-spin text-amber-400" aria-hidden />
                      ) : (
                        <>
                          <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden>
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                          </svg>
                          Continue with Google
                        </>
                      )}
                    </button>

                    {/* One Tap fallback: Google's own branded button */}
                    {googleFallback && (
                      <div className="mt-3 rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-center">
                        <p className="mb-2 text-[11px] uppercase tracking-[0.16em] text-white/55">
                          Or choose your Google account
                        </p>
                        <div ref={googleFallbackRef} className="flex justify-center" />
                      </div>
                    )}
                  </div>
                ) : (
                  hasGoogle === false && mounted && !GOOGLE_CLIENT_ID ? (
                    <div className="mb-5 rounded-xl border border-white/10 bg-white/5 px-4 py-4 text-center">
                      <p className="text-xs text-white/70">
                        Google Sign-In is not configured.<br/>
                        Set <code className="rounded bg-white/10 px-1">NEXT_PUBLIC_GOOGLE_CLIENT_ID</code> in your environment.
                      </p>
                    </div>
                  ) : null
                )}

                {/* Divider */}
                <div className="my-5 flex items-center gap-3">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/25" />
                  <span className="text-xs uppercase tracking-[0.2em] text-white/60">or</span>
                  <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/25" />
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-3.5" noValidate>
                  {/* Full Name (signup) — only mounted while it is in use, so a
                      hidden required input can never block the login submit. */}
                  {showName && (
                    <div>
                      <label htmlFor="auth-name" className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.16em] text-white/60">Full Name</label>
                      <div className="relative">
                        <UserRound className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/45" aria-hidden />
                        <Input id="auth-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe"
                          className="h-11.5 rounded-xl border-white/15 bg-white/5 pl-10 pr-4 text-white placeholder:text-white/40 focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20" autoComplete="name" />
                      </div>
                    </div>
                  )}

                  {/* Email */}
                  <div>
                    <label htmlFor="auth-email" className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.16em] text-white/60">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/45" aria-hidden />
                      <Input id="auth-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com"
                        className="h-11.5 rounded-xl border-white/15 bg-white/5 pl-10 pr-4 text-white placeholder:text-white/40 focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20"
                        required autoComplete="email" inputMode="email" />
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <label htmlFor="auth-password" className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.16em] text-white/60">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/45" aria-hidden />
                      <Input id="auth-password" type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••"
                        className="h-11.5 rounded-xl border-white/15 bg-white/5 pl-10 pr-11 text-white placeholder:text-white/40 focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20"
                        required autoComplete={mode === "login" ? "current-password" : "new-password"} />
                      <button type="button" onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/45 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60 rounded"
                        aria-label={showPassword ? "Hide password" : "Show password"} aria-pressed={showPassword}>
                        {showPassword ? <EyeOff className="h-4 w-4" aria-hidden /> : <Eye className="h-4 w-4" aria-hidden />}
                      </button>
                    </div>
                    {mode === "signup" && <p className="mt-1 text-xs text-white/55">Minimum 6 characters</p>}
                    {mode === "login" && (
                      <p className="mt-1.5 text-xs">
                        <Link href="/reset" onClick={onClose}
                          className="text-white/55 underline-offset-4 transition-colors hover:text-amber-400 hover:underline">
                          Forgot password?
                        </Link>
                      </p>
                    )}
                  </div>

                  {/* Confirm Password (signup only) */}
                  {showConfirm && (
                    <div>
                      <label htmlFor="auth-confirm" className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.16em] text-white/60">Confirm Password</label>
                      <div className="relative">
                        <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/45" aria-hidden />
                        <Input id="auth-confirm" type={showPassword ? "text" : "password"} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="••••••••"
                          className="h-11.5 rounded-xl border-white/15 bg-white/5 pl-10 pr-4 text-white placeholder:text-white/40 focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20"
                          required autoComplete="new-password" />
                      </div>
                    </div>
                  )}

                  {/* Error */}
                  {error && (
                    <div role="alert" className="rounded-xl border border-red-500/30 bg-red-500/15 px-4 py-3 text-sm text-red-200">{error}</div>
                  )}

                  {/* Submit */}
                  <button type="submit" disabled={loading}
                    aria-busy={loading}
                    className="group relative mt-1 w-full overflow-hidden rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 py-3.5 text-sm font-semibold uppercase tracking-[0.16em] text-obsidian transition-all hover:from-amber-400 hover:to-amber-500 hover:shadow-[0_0_50px_-10px_rgba(245,158,11,0.5)] disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505]">
                    <span className="flex items-center justify-center gap-2">
                      {loading ? <><Loader2 className="h-4 w-4 animate-spin" aria-hidden />{mode === "login" ? "Signing In…" : "Creating Account…"}</>
                        : mode === "login" ? "Sign In" : "Create Account"}
                    </span>
                  </button>
                </form>

                {/* Toggle */}
                <p className="mt-6 text-center text-sm text-white/70">
                  {mode === "login" ? "New to Lumière? " : "Already a member? "}
                  <button type="button" onClick={switchMode}
                    className="font-medium text-amber-400 underline underline-offset-4 transition-colors hover:text-amber-300">
                    {mode === "login" ? "Create an account" : "Sign in instead"}
                  </button>
                </p>

                {/* Footer */}
                <p className="mt-5 text-center text-[11px] leading-relaxed text-white/55">
                  By continuing, you agree to our{" "}
                  <Link href="/contact" onClick={onClose} className="text-white/75 underline underline-offset-2 hover:text-amber-300">Terms</Link>
                  {" "}and{" "}
                  <Link href="/contact" onClick={onClose} className="text-white/75 underline underline-offset-2 hover:text-amber-300">Privacy</Link>
                </p>
              </>
            )}
          </div>

          {/* Bottom gold line */}
          <div className="h-px w-full bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
        </div>

        {/* Corner accents */}
        <div className="absolute -top-2.5 -left-2.5 h-5 w-5 border-l border-t border-amber-500/35 rounded-tl-xl" />
        <div className="absolute -top-2.5 -right-2.5 h-5 w-5 border-r border-t border-amber-500/35 rounded-tr-xl" />
        <div className="absolute -bottom-2.5 -left-2.5 h-5 w-5 border-l border-b border-amber-500/35 rounded-bl-xl" />
        <div className="absolute -bottom-2.5 -right-2.5 h-5 w-5 border-r border-b border-amber-500/35 rounded-br-xl" />
      </div>
    </div>
  );
}
