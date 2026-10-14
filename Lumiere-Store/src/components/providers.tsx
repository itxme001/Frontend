"use client";

import * as React from "react";
import { ToastProvider } from "@/components/ui/toast";
import { AuthProvider } from "@/store/auth-context";
import { CartProvider } from "@/store/cart-store";
import { CurrencyProvider } from "@/store/currency-context";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <CurrencyProvider>
        <AuthProvider>
          <CartProvider>{children}</CartProvider>
        </AuthProvider>
      </CurrencyProvider>
    </ToastProvider>
  );
}
