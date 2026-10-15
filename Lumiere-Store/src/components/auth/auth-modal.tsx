"use client";

import * as React from "react";
import Link from "next/link";
import { X, Mail, Lock, Eye, EyeOff, Loader2, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/store/auth-context";
import { useToast } from "@/components/ui/toast";

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: { client_id: string; callback: (resp: { credential: string }) => void }) => void;
          prompt: (notification?: (msg: { isDislaied?: boolean }) => void) => void;
          renderButton: (parent: HTMLElement, options: { theme?: string; size?: string; shape?: string; width?: number; locale?: string }) => void;
          disableAutoSelect: () => void;
        };
      };
    };
  }
}

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
  const formRef = React.useRef<HTMLFormElement>(null);
  const googleBtnRef = React.useRef<HTMLDivElement>(null);
  // Keep a ref to the latest handleGoogleResponse so onClick can use it
  const googleResponseRef = React.useRef<((resp: { credential: string }) => void) | null>(null);

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

  // Load Google Identity Services and render button
  React.useEffect(() => {
    if (!open || !mounted || !GOOGLE_CLIENT_ID) return;

    const loadAndRender = () => {
      if (!googleBtnRef.current || !window.google?.accounts?.id) return;

      // Store callback in ref for use in onClick
      const handleResp = (resp: { credential: string }) => {
        if (resp.credential) handleGoogleTokenDirect(resp.credential);
      };
      googleResponseRef.current = handleResp;

      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleResp,
      });
      window.google.accounts.id.renderButton(googleBtnRef.current, {
        theme: "outline",
        size: "large",
        shape: "rectangular",
        width: 320,
        locale: "en",
      });
    };

    if (window.google?.accounts?.id) {
      loadAndRender();
    } else {
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      script.onload = loadAndRender;
      script.onerror = () => {};
      document.head.appendChild(script);
    }

    return () => { window.google?.accounts.id.disableAutoSelect(); };
  }, [open, mounted]);

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
    const gapi = window.google?.accounts?.id;
    if (!gapi) return;
    gapi.prompt((notification: { isDislaied?: boolean }) => {
      if (notification?.isDislaied) return;
      gapi.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: (resp) => { if (resp.credential) handleGoogleTokenDirect(resp.credential); },
      });
      gapi.prompt();
    });
  }

  if (!open) return null;

  const showName = mode === "signup";
  const showConfirm = mode === "signup";
  const hasGoogle = mounted && !!GOOGLE_CLIENT_ID;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Rich dark background */}
      <div className="absolute inset-0 bg-[#050505]">
        <div className="absolute top-[-10%] left-[-5%] w-[700px] h-[700px] rounded-full bg-amber-800/10 blur-[150px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-amber-600/8 blur-[120px]" />
        <div className="absolute top-[30%] left-[50%] -translate-x-1/2 w-[300px] h-[300px] rounded-full bg-amber-500/4 blur-[100px]" />
        <div className="absolute inset-0 opacity-[0.015]"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)", backgroundSize: "60px 60px" }}
        />
      </div>

      <div className="relative w-full max-w-sm">
        {/* Gold glow border */}
        <div className="absolute -inset-px rounded-3xl bg-gradient-to-b from-amber-400/35 via-amber-600/12 to-transparent opacity-70" />

        <div className="relative rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-3xl shadow-[0_40px_100px_-30px_rgba(0,0,0,0.9),0_0_60px_-15px_rgba(180,140,40,0.06)]">
          {/* Top gold line */}
          <div className="h-px w-full bg-gradient-to-r from-transparent via-amber-400/50 to-transparent" />

          {/* Close */}
          <button
            onClick={onClose}
            className="absolute right-5 top-5 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-white/40 transition-all hover:border-amber-400/40 hover:bg-amber-400/10 hover:text-amber-300"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
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
              <h1 className="font-serif text-[2.1rem] leading-[1.1] text-white">
                {mode === "login" ? "Welcome\nBack" : "Create\nAccount"}
              </h1>
              <p className="mt-2.5 text-sm text-white/40 leading-relaxed">
                {mode === "login" ? "Sign in to access your account and orders" : "Join the Lumière circle"}
              </p>
            </div>

            {/* Success */}
            {success ? (
              <div className="py-10 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-amber-400/30 bg-amber-400/15 shadow-[0_0_40px_-10px_rgba(245,158,11,0.3)]">
                  <Sparkles className="h-8 w-8 text-amber-400" />
                </div>
                <p className="font-serif text-xl text-white">{mode === "login" ? "Welcome back" : "Welcome to Lumière"}</p>
                <p className="mt-2 text-sm text-white/40">Redirecting to your account…</p>
              </div>
            ) : (
              <>
                {/* ── Google Sign-In ── */}
                {hasGoogle ? (
                  <button
                    type="button"
                    onClick={triggerGoogleSignIn}
                    disabled={googleLoading}
                    className="group relative flex w-full items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/5 py-3.5 text-sm font-medium text-white/80 transition-all hover:bg-white/10 hover:border-white/20 disabled:opacity-50 mb-5"
                  >
                    {googleLoading ? (
                      <Loader2 className="h-5 w-5 animate-spin text-amber-400" />
                    ) : (
                      <>
                        <svg className="h-5 w-5" viewBox="0 0 24 24">
                          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                        </svg>
                        Continue with Google
                      </>
                    )}
                  </button>
                ) : (
                  hasGoogle === false && mounted && !GOOGLE_CLIENT_ID ? (
                    <div className="mb-5 rounded-xl border border-white/5 bg-white/3 px-4 py-4 text-center">
                      <p className="text-xs text-white/30">
                        Google Sign-In is not configured.<br/>
                        Set <code className="bg-white/10 px-1 rounded">NEXT_PUBLIC_GOOGLE_CLIENT_ID</code> in your environment.
                      </p>
                    </div>
                  ) : null
                )}

                {/* Divider */}
                <div className="my-5 flex items-center gap-3">
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent to-white/15" />
                  <span className="text-xs text-white/25 uppercase tracking-[0.2em]">or</span>
                  <div className="flex-1 h-px bg-gradient-to-l from-transparent to-white/15" />
                </div>

                {/* Form */}
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-3.5">
                  {/* Full Name (signup) */}
                  <div className={`overflow-hidden transition-all duration-300 ease-out ${showName ? "max-h-28 opacity-100" : "max-h-0 opacity-0"}`}>
                    <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.16em] text-white/50">Full Name</label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20" aria-hidden />
                      <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe"
                        className="h-11.5 border-white/10 bg-white/5 pl-10 pr-4 text-white placeholder:text-white/20 focus:border-amber-500/40 focus:ring-1 focus:ring-amber-500/15 rounded-xl" autoComplete="name" />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.16em] text-white/50">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20" aria-hidden />
                      <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com"
                        className="h-11.5 border-white/10 bg-white/5 pl-10 pr-4 text-white placeholder:text-white/20 focus:border-amber-500/40 focus:ring-1 focus:ring-amber-500/15 rounded-xl"
                        required autoComplete="email" />
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.16em] text-white/50">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20" aria-hidden />
                      <Input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••"
                        className="h-11.5 border-white/10 bg-white/5 pl-10 pr-11 text-white placeholder:text-white/20 focus:border-amber-500/40 focus:ring-1 focus:ring-amber-500/15 rounded-xl"
                        required autoComplete={mode === "login" ? "current-password" : "new-password"} />
                      <button type="button" onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/20 hover:text-white/50 transition-colors"
                        aria-label={showPassword ? "Hide password" : "Show password"}>
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    {mode === "signup" && <p className="mt-1 text-xs text-white/20">Minimum 6 characters</p>}
                    {mode === "login" && (
                      <p className="mt-1 text-xs"><button type="button" className="text-white/25 hover:text-amber-400 transition-colors">Forgot password?</button></p>
                    )}
                  </div>

                  {/* Confirm Password (signup) */}
                  <div className={`overflow-hidden transition-all duration-300 ease-out ${showConfirm ? "max-h-28 opacity-100" : "max-h-0 opacity-0"}`}>
                    <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.16em] text-white/50">Confirm Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20" aria-hidden />
                      <Input type={showPassword ? "text" : "password"} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="••••••••"
                        className="h-11.5 border-white/10 bg-white/5 pl-10 pr-4 text-white placeholder:text-white/20 focus:border-amber-500/40 focus:ring-1 focus:ring-amber-500/15 rounded-xl"
                        required />
                    </div>
                  </div>

                  {/* Error */}
                  {error && (
                    <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">{error}</div>
                  )}

                  {/* Submit */}
                  <button type="submit" disabled={loading}
                    className="group relative mt-1 w-full overflow-hidden rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 py-3.5 text-sm font-semibold uppercase tracking-[0.16em] text-obsidian transition-all hover:from-amber-400 hover:to-amber-500 hover:shadow-[0_0_50px_-10px_rgba(245,158,11,0.5)] disabled:opacity-50 disabled:cursor-not-allowed">
                    <span className="flex items-center justify-center gap-2">
                      {loading ? <><Loader2 className="h-4 w-4 animate-spin" />{mode === "login" ? "Signing In…" : "Creating Account…"}</>
                        : mode === "login" ? "Sign In" : "Create Account"}
                    </span>
                  </button>
                </form>

                {/* Toggle */}
                <p className="mt-6 text-center text-sm text-white/35">
                  {mode === "login" ? "New to Lumière? " : "Already a member? "}
                  <button type="button" onClick={switchMode}
                    className="font-medium text-amber-400 hover:text-amber-300 transition-colors underline underline-offset-4">
                    {mode === "login" ? "Create an account" : "Sign in instead"}
                  </button>
                </p>

                {/* Footer */}
                <p className="mt-5 text-center text-[11px] text-white/15">
                  By continuing, you agree to our{" "}
                  <Link href="/contact" onClick={onClose} className="text-white/30 hover:text-white/50 underline">Terms</Link>
                  {" "}and{" "}
                  <Link href="/contact" onClick={onClose} className="text-white/30 hover:text-white/50 underline">Privacy</Link>
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
