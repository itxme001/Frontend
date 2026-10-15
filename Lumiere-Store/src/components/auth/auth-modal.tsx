"use client";

import * as React from "react";
import Link from "next/link";
import { X, Mail, Lock, Eye, EyeOff, Loader2, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/store/auth-context";
import { useToast } from "@/components/ui/toast";

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

  const router = useRouter();
  const { login, signup } = useAuth();
  const { toast } = useToast();

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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (mode === "signup") {
      if (password.length < 6) {
        setError("Password must be at least 6 characters.");
        return;
      }
      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
      }
      if (name.trim().length < 2) {
        setError("Please enter your full name.");
        return;
      }
    }
    if (!email.trim() || !password.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);

    try {
      let result;
      if (mode === "login") {
        result = await login(email.trim(), password);
      } else {
        result = await signup(name.trim(), email.trim(), password);
      }

      if (!result.ok) {
        const msg = result.error?.toLowerCase() ?? "";
        if (msg.includes("already exists") || msg.includes("email")) {
          setError("An account with this email already exists. Try signing in.");
        } else if (msg.includes("incorrect") || msg.includes("password")) {
          setError("Invalid email or password. Please try again.");
        } else {
          setError(result.error ?? "Something went wrong. Please try again.");
        }
        return;
      }

      setSuccess(true);
      toast({
        title: mode === "login" ? "Welcome back" : "Welcome to Lumière",
        description: mode === "login" ? "You are now signed in." : "Your account is ready.",
        variant: "success",
      });

      setTimeout(() => {
        onClose();
        router.push("/account");
      }, 900);
    } catch (err) {
      console.error("Auth error:", err);
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

  if (!open) return null;

  const showName = mode === "signup";
  const showConfirm = mode === "signup";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Background */}
      <div className="absolute inset-0 bg-[#080808]">
        <div className="absolute top-[-15%] left-[-8%] w-[500px] h-[500px] rounded-full bg-amber-700/15 blur-[120px]" />
        <div className="absolute bottom-[-15%] right-[-8%] w-[400px] h-[400px] rounded-full bg-amber-600/10 blur-[100px]" />
        <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-amber-500/5 blur-[80px]" />
      </div>

      <div className="relative w-full max-w-sm">
        {/* Outer glow border */}
        <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-amber-400/30 via-amber-600/10 to-transparent opacity-60" />

        <div className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-2xl shadow-[0_25px_80px_-20px_rgba(0,0,0,0.8)]">
          {/* Top gold line */}
          <div className="h-px w-full bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />

          {/* Close */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-white/40 transition-all hover:border-amber-500/40 hover:text-amber-400 hover:bg-amber-500/10"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="px-8 py-10">
            {/* Logo */}
            <div className="mb-10 text-center">
              <Link href="/" onClick={onClose} className="inline-block">
                <span className="font-serif text-2xl font-medium tracking-[0.22em] text-white">
                  LUM
                  <span className="text-amber-400">I</span>
                  ÈRE
                </span>
              </Link>
              <div className="mt-3 flex items-center justify-center gap-2">
                <div className="h-px w-8 bg-white/15" />
                <Sparkles className="h-3 w-3 text-amber-500/60" />
                <div className="h-px w-8 bg-white/15" />
              </div>
            </div>

            {/* Header */}
            <div className="mb-8 text-center">
              <h1 className="font-serif text-[2.25rem] leading-tight text-white">
                {mode === "login" ? "Welcome\nBack" : "Create\nAccount"}
              </h1>
              <p className="mt-3 text-sm text-white/45 leading-relaxed">
                {mode === "login"
                  ? "Sign in to access your account and orders"
                  : "Join the Lumière circle"}
              </p>
            </div>

            {/* Success state */}
            {success ? (
              <div className="py-10 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-amber-500/30 bg-amber-500/20">
                  <Sparkles className="h-8 w-8 text-amber-400" />
                </div>
                <p className="font-serif text-xl text-white">
                  {mode === "login" ? "Welcome back" : "Welcome to Lumière"}
                </p>
                <p className="mt-2 text-sm text-white/40">Redirecting to your account…</p>
              </div>
            ) : (
              <>
                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Full Name (signup) */}
                  <div
                    className={showName
                      ? "max-h-24 opacity-100 transition-all duration-300"
                      : "max-h-0 opacity-0 overflow-hidden transition-all duration-300"
                    }
                  >
                    <label className="mb-1.5 block text-xs font-medium text-white/60 uppercase tracking-widest">
                      Full Name
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/25" aria-hidden />
                      <Input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                        className="h-12 border-white/10 bg-white/5 pl-11 pr-4 text-white placeholder:text-white/25 focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 rounded-lg"
                        autoComplete="name"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-white/60 uppercase tracking-widest">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/25" aria-hidden />
                      <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="h-12 border-white/10 bg-white/5 pl-11 pr-4 text-white placeholder:text-white/25 focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 rounded-lg"
                        required
                        autoComplete="email"
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-white/60 uppercase tracking-widest">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/25" aria-hidden />
                      <Input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="h-12 border-white/10 bg-white/5 pl-11 pr-11 text-white placeholder:text-white/25 focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 rounded-lg"
                        required
                        autoComplete={mode === "login" ? "current-password" : "new-password"}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/60 transition-colors"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    {mode === "signup" && (
                      <p className="mt-1.5 text-xs text-white/25">Minimum 6 characters</p>
                    )}
                  </div>

                  {/* Confirm Password (signup) */}
                  <div
                    className={showConfirm
                      ? "max-h-24 opacity-100 transition-all duration-300"
                      : "max-h-0 opacity-0 overflow-hidden transition-all duration-300"
                    }
                  >
                    <label className="mb-1.5 block text-xs font-medium text-white/60 uppercase tracking-widest">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/25" aria-hidden />
                      <Input
                        type={showPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••"
                        className="h-12 border-white/10 bg-white/5 pl-11 pr-4 text-white placeholder:text-white/25 focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 rounded-lg"
                        required
                      />
                    </div>
                  </div>

                  {/* Error */}
                  {error && (
                    <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                      {error}
                    </div>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="group relative mt-2 w-full overflow-hidden rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 py-3.5 text-sm font-semibold uppercase tracking-[0.16em] text-obsidian transition-all hover:from-amber-400 hover:to-amber-500 hover:shadow-[0_0_40px_-10px_rgba(245,158,11,0.5)] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="flex items-center justify-center gap-2">
                      {loading ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          {mode === "login" ? "Signing In…" : "Creating Account…"}
                        </>
                      ) : mode === "login" ? (
                        "Sign In"
                      ) : (
                        "Create Account"
                      )}
                    </span>
                  </button>
                </form>

                {/* Divider */}
                <div className="my-7 flex items-center gap-3">
                  <div className="flex-1 h-px bg-white/10" />
                  <span className="text-xs text-white/25 uppercase tracking-widest">or</span>
                  <div className="flex-1 h-px bg-white/10" />
                </div>

                {/* Toggle */}
                <p className="text-center text-sm text-white/40">
                  {mode === "login" ? "New to Lumière? " : "Already a member? "}
                  <button
                    type="button"
                    onClick={switchMode}
                    className="font-medium text-amber-400 hover:text-amber-300 transition-colors underline underline-offset-4"
                  >
                    {mode === "login" ? "Create an account" : "Sign in instead"}
                  </button>
                </p>

                {/* Footer */}
                <p className="mt-6 text-center text-xs text-white/20">
                  By continuing, you agree to our{" "}
                  <Link href="/contact" onClick={onClose} className="text-white/40 hover:text-white/60 underline">
                    Terms
                  </Link>{" "}
                  and{" "}
                  <Link href="/contact" onClick={onClose} className="text-white/40 hover:text-white/60 underline">
                    Privacy
                  </Link>
                </p>
              </>
            )}
          </div>

          {/* Bottom gold line */}
          <div className="h-px w-full bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
        </div>

        {/* Corner accents */}
        <div className="absolute -top-3 -left-3 h-6 w-6 border-l border-t border-amber-500/30 rounded-tl-lg" />
        <div className="absolute -top-3 -right-3 h-6 w-6 border-r border-t border-amber-500/30 rounded-tr-lg" />
        <div className="absolute -bottom-3 -left-3 h-6 w-6 border-l border-b border-amber-500/30 rounded-bl-lg" />
        <div className="absolute -bottom-3 -right-3 h-6 w-6 border-r border-b border-amber-500/30 rounded-br-lg" />
      </div>
    </div>
  );
}
