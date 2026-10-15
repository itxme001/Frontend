"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ResetPage() {
  const [email, setEmail] = React.useState("");
  const [status, setStatus] = React.useState<"idle" | "loading" | "success" | "error">("idle");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/auth/reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="mx-auto max-w-md px-4 py-20">
      <h1 className="font-serif text-3xl text-obsidian">Reset Password</h1>
      <p className="mt-3 text-slate-500">Enter your email to receive a password reset link.</p>
      {status === "success" ? (
        <div className="mt-6 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
          If an account exists for {email}, a reset link is on its way.
        </div>
      ) : (
        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <Input
            type="email"
            required
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {status === "error" && (
            <p className="text-sm text-red-600">Something went wrong. Please try again.</p>
          )}
          <Button type="submit" variant="primary" className="w-full" disabled={status === "loading"}>
            {status === "loading" ? "Sending…" : "Send Reset Link"}
          </Button>
        </form>
      )}
    </div>
  );
}
