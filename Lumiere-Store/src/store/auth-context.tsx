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
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
}

const AuthContext = React.createContext<AuthState | undefined>(undefined);

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

  const login = React.useCallback(async (email: string, password: string): Promise<AuthResult> => {
    try {
      // Fetch a fresh CSRF token from the server.
      const csrfRes = await fetch("/api/csrf", { cache: "no-store" });
      const csrfData = await csrfRes.json();
      const csrfToken = csrfData?.token ?? "";

      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-csrf-token": csrfToken },
        body: JSON.stringify({ email, password, _csrf: csrfToken }),
      });
      const data = await res.json();
      if (!res.ok) return { ok: false, error: data?.error || "Unable to sign in." };
      setUser(data.user);
      return { ok: true };
    } catch {
      return { ok: false, error: "Network error. Please try again." };
    }
  }, []);

  const signup = React.useCallback(
    async (name: string, email: string, password: string): Promise<AuthResult> => {
      try {
        // Fetch a fresh CSRF token from the server.
        const csrfRes = await fetch("/api/csrf", { cache: "no-store" });
        const csrfData = await csrfRes.json();
        const csrfToken = csrfData?.token ?? "";

        const res = await fetch("/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json", "x-csrf-token": csrfToken },
          body: JSON.stringify({ name, email, password, _csrf: csrfToken }),
        });
        const data = await res.json();
        if (!res.ok) return { ok: false, error: data?.error || "Unable to create your account." };
        setUser(data.user);
        return { ok: true };
      } catch {
        return { ok: false, error: "Network error. Please try again." };
      }
    },
    []
  );

  const logout = React.useCallback(async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch {
      // ignore
    }
    setUser(null);
  }, []);

  const value = React.useMemo<AuthState>(
    () => ({ user, loading, login, signup, logout, refresh }),
    [user, loading, login, signup, logout, refresh]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthState {
  const ctx = React.useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
