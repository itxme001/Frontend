"use client";

import * as React from "react";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  image: string;
  color?: string;
  size?: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  wishlist: string[];
  hydrated: boolean;
  addItem: (data: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  removeItem: (id: string, color?: string, size?: string) => void;
  updateQuantity: (id: string, quantity: number, color?: string, size?: string) => void;
  clearCart: () => void;
  total: number;
  subtotal: number;
  itemCount: number;
  toggleWishlist: (id: string) => void;
  isWishlisted: (id: string) => boolean;
}

const CART_KEY = "lumiere:cart:v1";
const WISH_KEY = "lumiere:wishlist:v1";

const CartContext = React.createContext<CartState | undefined>(undefined);

function sameLine(a: CartItem, id: string, color?: string, size?: string) {
  return a.id === id && a.color === color && a.size === size;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = React.useState<CartItem[]>([]);
  const [wishlist, setWishlist] = React.useState<string[]>([]);
  const [hydrated, setHydrated] = React.useState(false);

  // Hydrate from localStorage after mount (keeps SSR markup stable).
  React.useEffect(() => {
    try {
      const rawCart = window.localStorage.getItem(CART_KEY);
      if (rawCart) setItems(JSON.parse(rawCart));
      const rawWish = window.localStorage.getItem(WISH_KEY);
      if (rawWish) setWishlist(JSON.parse(rawWish));
    } catch {
      // ignore malformed storage
    }
    setHydrated(true);
  }, []);

  React.useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(CART_KEY, JSON.stringify(items));
    } catch {
      // ignore quota errors
    }
  }, [items, hydrated]);

  React.useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(WISH_KEY, JSON.stringify(wishlist));
    } catch {
      // ignore quota errors
    }
  }, [wishlist, hydrated]);

  const addItem = React.useCallback<CartState["addItem"]>((data) => {
    const quantity = data.quantity ?? 1;
    setItems((prev) => {
      const idx = prev.findIndex((item) => sameLine(item, data.id, data.color, data.size));
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], quantity: next[idx].quantity + quantity };
        return next;
      }
      return [...prev, { ...data, quantity }];
    });
  }, []);

  const removeItem = React.useCallback<CartState["removeItem"]>((id, color, size) => {
    setItems((prev) => prev.filter((item) => !sameLine(item, id, color, size)));
  }, []);

  const updateQuantity = React.useCallback<CartState["updateQuantity"]>(
    (id, quantity, color, size) => {
      setItems((prev) => {
        if (quantity <= 0) return prev.filter((item) => !sameLine(item, id, color, size));
        return prev.map((item) =>
          sameLine(item, id, color, size) ? { ...item, quantity } : item
        );
      });
    },
    []
  );

  const clearCart = React.useCallback(() => setItems([]), []);

  const toggleWishlist = React.useCallback((id: string) => {
    setWishlist((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }, []);

  const isWishlisted = React.useCallback((id: string) => wishlist.includes(id), [wishlist]);

  const subtotal = React.useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  );
  const itemCount = React.useMemo(
    () => items.reduce((count, item) => count + item.quantity, 0),
    [items]
  );

  const value = React.useMemo<CartState>(
    () => ({
      items,
      wishlist,
      hydrated,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      total: subtotal,
      subtotal,
      itemCount,
      toggleWishlist,
      isWishlisted,
    }),
    [items, wishlist, hydrated, addItem, removeItem, updateQuantity, clearCart, subtotal, itemCount, toggleWishlist, isWishlisted]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartState {
  const ctx = React.useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
