"use client";

import * as React from "react";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
}

interface AuthResult {
  ok: boolean;
  error?: string;
}

interface AuthState {
  user: AuthUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<AuthResult>;
  signup: (name: string, email: string, password: string) => Promise<AuthResult>;
  loginWithGoogle: (idToken: string) => Promise<AuthResult>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
}

const AuthContext = React.createContext<AuthState | undefined>(undefined);

/** Normalise whatever the server sent into something the UI can render. */
function messageFrom(data: unknown, fallback: string): string {
  if (data && typeof data === "object" && "error" in data) {
    const err = (data as { error?: unknown }).error;
    if (typeof err === "string" && err.trim()) return err;
  }
  return fallback;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<AuthUser | null>(null);
  const [loading, setLoading] = React.useState(true);

  const refresh = React.useCallback(async () => {
    try {
      const res = await fetch("/api/auth/me", { cache: "no-store" });
      const data = await res.json();
      setUser(data?.user ?? null);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    void refresh();
  }, [refresh]);

  /** POST a JSON body to an auth route, returning a UI-ready result. */
  const post = React.useCallback(
    async (url: string, body: Record<string, unknown>, fallback: string): Promise<AuthResult> => {
      try {
        const res = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        let data: unknown = null;
        try {
          data = await res.json();
        } catch {
          // non-JSON response (e.g. a 500 HTML page)
        }
        if (!res.ok) return { ok: false, error: messageFrom(data, fallback) };
        const nextUser = (data as { user?: AuthUser })?.user ?? null;
        if (nextUser) setUser(nextUser);
        return { ok: true };
      } catch {
        return { ok: false, error: "We couldn't reach the server. Check your connection and try again." };
      }
    },
    []
  );

  const login = React.useCallback(
    (email: string, password: string) =>
      post("/api/auth/login", { email, password }, "Those details don't match our records."),
    [post]
  );

  const signup = React.useCallback(
    (name: string, email: string, password: string) =>
      post("/api/auth/signup", { name, email, password }, "We couldn't create your account."),
    [post]
  );

  const loginWithGoogle = React.useCallback(
    (idToken: string) =>
      post("/api/auth/google", { id_token: idToken }, "Google sign-in failed. Please try again."),
    [post]
  );

  const logout = React.useCallback(async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch {
      // ignore — we clear local state regardless
    }
    setUser(null);
  }, []);

  const value = React.useMemo<AuthState>(
    () => ({ user, loading, login, signup, loginWithGoogle, logout, refresh }),
    [user, loading, login, signup, loginWithGoogle, logout, refresh]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthState {
  const ctx = React.useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
