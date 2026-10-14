"use client";

import * as React from "react";
import {
  BASE_CURRENCY,
  formatMoney,
  isCurrencyCode,
  type CurrencyCode,
} from "@/lib/currency";

const STORAGE_KEY = "lumiere-currency";

interface CurrencyState {
  currency: CurrencyCode;
  setCurrency: (code: CurrencyCode) => void;
  /** Format a base-currency (USD) amount for display. */
  format: (usdAmount: number) => string;
}

const CurrencyContext = React.createContext<CurrencyState | undefined>(undefined);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = React.useState<CurrencyCode>(BASE_CURRENCY);

  React.useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (isCurrencyCode(stored)) setCurrencyState(stored);
    } catch {
      // ignore unavailable storage
    }
  }, []);

  const setCurrency = React.useCallback((code: CurrencyCode) => {
    setCurrencyState(code);
    try {
      window.localStorage.setItem(STORAGE_KEY, code);
    } catch {
      // ignore quota / privacy-mode errors
    }
  }, []);

  const format = React.useCallback(
    (usdAmount: number) => formatMoney(usdAmount, currency),
    [currency]
  );

  const value = React.useMemo<CurrencyState>(
    () => ({ currency, setCurrency, format }),
    [currency, setCurrency, format]
  );

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
}

export function useCurrency(): CurrencyState {
  const ctx = React.useContext(CurrencyContext);
  if (!ctx) throw new Error("useCurrency must be used within a CurrencyProvider");
  return ctx;
}
