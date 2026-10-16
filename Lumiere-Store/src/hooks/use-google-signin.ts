"use client";

import * as React from "react";

/**
 * Google Identity Services (One Tap) loader.
 *
 * Loads the GIS script exactly once for the whole app, initialises it against
 * our Client ID, and exposes a `prompt()` that a custom-styled button can call.
 * If One Tap is unavailable or the user dismisses it, `renderFallback()` paints
 * Google's own branded button into a container so sign-in always remains
 * possible.
 */

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string;
            callback: (resp: { credential?: string }) => void;
          }) => void;
          prompt: (notification?: (msg: PromptNotification) => void) => void;
          renderButton: (
            parent: HTMLElement,
            options: {
              theme?: string;
              size?: string;
              shape?: string;
              width?: number;
              locale?: string;
              text?: string;
            }
          ) => void;
          disableAutoSelect: () => void;
        };
      };
    };
  }
}

export interface PromptNotification {
  isNotDisplayed?: () => boolean;
  isSkippedMoment?: () => boolean;
  isDismissedMoment?: () => boolean;
}

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? "";

let scriptPromise: Promise<void> | null = null;

function loadGis(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.google?.accounts?.id) return Promise.resolve();

  if (!scriptPromise) {
    scriptPromise = new Promise<void>((resolve, reject) => {
      const existing = document.querySelector<HTMLScriptElement>(
        'script[src="https://accounts.google.com/gsi/client"]'
      );
      if (existing) {
        existing.addEventListener("load", () => resolve(), { once: true });
        existing.addEventListener("error", () => reject(new Error("GIS load failed")), { once: true });
        return;
      }
      const el = document.createElement("script");
      el.src = "https://accounts.google.com/gsi/client";
      el.async = true;
      el.defer = true;
      el.onload = () => resolve();
      el.onerror = () => reject(new Error("GIS load failed"));
      document.head.appendChild(el);
    });
    // Never let a failed load poison the cache — allow a retry.
    scriptPromise.catch(() => {
      scriptPromise = null;
    });
  }
  return scriptPromise;
}

export interface GoogleSignIn {
  /** True once the Client ID is configured and GIS finished initialising. */
  ready: boolean;
  /** False when `NEXT_PUBLIC_GOOGLE_CLIENT_ID` is missing entirely. */
  configured: boolean;
  /** Human-readable load failure, or null. */
  error: string | null;
  /** Opens One Tap. Returns false when GIS is not ready yet. */
  prompt: () => boolean;
  /** Paints Google's official button into `el` as a fallback. */
  renderFallback: (el: HTMLElement | null) => void;
}

export function useGoogleSignIn(onCredential: (credential: string) => void): GoogleSignIn {
  // Keep the latest handler readable from GIS callbacks without re-initialising.
  const callbackRef = React.useRef(onCredential);
  React.useEffect(() => {
    callbackRef.current = onCredential;
  }, [onCredential]);

  const [ready, setReady] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const initializedRef = React.useRef(false);

  React.useEffect(() => {
    if (!GOOGLE_CLIENT_ID) return;
    let cancelled = false;

    loadGis()
      .then(() => {
        if (cancelled || initializedRef.current) return;
        const gapi = window.google?.accounts?.id;
        if (!gapi) return;
        gapi.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: (resp) => {
            if (resp.credential) callbackRef.current(resp.credential);
          },
        });
        initializedRef.current = true;
        setReady(true);
      })
      .catch(() => {
        if (!cancelled) setError("Google Sign-In could not be loaded. Try refreshing the page.");
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const prompt = React.useCallback((): boolean => {
    const gapi = window.google?.accounts?.id;
    if (!gapi || !initializedRef.current) return false;
    gapi.prompt();
    return true;
  }, []);

  const renderFallback = React.useCallback((el: HTMLElement | null) => {
    const gapi = window.google?.accounts?.id;
    if (!el || !gapi || !initializedRef.current || el.childElementCount > 0) return;
    try {
      gapi.renderButton(el, {
        theme: "outline",
        size: "large",
        shape: "rectangular",
        width: 300,
        locale: "en",
        text: "continue_with",
      });
    } catch {
      // Rendering is best-effort — the primary button still works.
    }
  }, []);

  return { ready, configured: Boolean(GOOGLE_CLIENT_ID), error, prompt, renderFallback };
}
