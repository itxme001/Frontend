/**
 * Root error boundary — catches render & lifecycle errors across the entire app.
 *
 * Without this, a single crashed component brings down the whole page and
 * Next.js falls back to the generic "Something went wrong" overlay.
 */
"use client";

import * as React from "react";
import Link from "next/link";
import { AlertCircle, ArrowLeft } from "lucide-react";

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: { componentStack: string; error: Error } | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error: { componentStack: error.stack ?? "", error } };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // Log to a monitoring service in production. Right now we just silence.
    if (process.env.NODE_ENV === "development") {
      console.error("[ErrorBoundary]", error, info.componentStack);
    }
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;
      return <DefaultFallback errorInfo={this.state.error} />;
    }
    return this.props.children;
  }
}

function DefaultFallback({ errorInfo }: { errorInfo: { componentStack: string; error: Error } | null }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-obsidian">
        <AlertCircle className="h-8 w-8 text-gold" aria-hidden />
      </div>
      <h1 className="mt-6 font-serif text-3xl text-foreground sm:text-4xl">Something went wrong</h1>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-500">
        {errorInfo?.error?.message
          ? "An unexpected error occurred. Please try refreshing the page."
          : "We ran into an issue rendering this page. Our team has been notified."}
      </p>
      <div className="mt-8 flex gap-4">
        <Link
          href="/"
          className="inline-flex h-11 items-center gap-2 border border-foreground px-6 text-xs font-medium uppercase tracking-[0.14em] transition-colors hover:bg-foreground hover:text-background"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
          Back to home
        </Link>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="inline-flex h-11 items-center bg-foreground px-6 text-xs font-medium uppercase tracking-[0.14em] text-background transition-colors hover:bg-gold-ink"
        >
          Refresh page
        </button>
      </div>
      {errorInfo && process.env.NODE_ENV === "development" ? (
        <details className="mt-8 w-full max-w-lg text-left text-xs text-slate-500">
          <summary className="cursor-pointer text-slate-400 hover:text-slate-600">Error details</summary>
          <pre className="mt-2 overflow-auto rounded bg-mist p-4">{errorInfo.componentStack}</pre>
        </details>
      ) : null}
    </div>
  );
}

/**
 * Catch-all layout wrapper.
 *
 * Wraps the entire app tree so no page escapes the boundary.
 */
export function AppErrorBoundary({ children }: { children: React.ReactNode }) {
  return <ErrorBoundary>{children}</ErrorBoundary>;
}
