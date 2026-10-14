"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Lock, Package } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/store/auth-context";
import { useCart } from "@/store/cart-store";
import { useToast } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";
import { useCurrency } from "@/store/currency-context";
import { products } from "@/data/products";
import { listOrdersByEmail } from "@/lib/db";

export default function AccountPage() {
  const router = useRouter();
  const { user, loading, logout } = useAuth();
  const { wishlist, toggleWishlist, addItem, itemCount, subtotal } = useCart();
  const { toast } = useToast();
  const { format } = useCurrency();
  const [orders, setOrders] = React.useState<Array<{ id: string; date: string; status: string; total: number; items: Array<{ id: string; name: string; quantity: number; price: number; image: string }> }>>([]);
  const [loadingOrders, setLoadingOrders] = React.useState(false);

  React.useEffect(() => {
    if (!user?.email) return;
    setLoadingOrders(true);
    fetch(`/api/orders?email=${encodeURIComponent(user.email)}`)
      .then((r) => r.json())
      .then((data) => setOrders(data?.orders ?? []))
      .catch(() => setOrders([]))
      .finally(() => setLoadingOrders(false));
  }, [user]);

  if (loading) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6">
        <div className="skeleton h-10 w-64 rounded-none" />
        <div className="skeleton mt-6 h-40 rounded-none" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center sm:px-6">
        <Lock className="mx-auto h-12 w-12 text-gold-ink" aria-hidden />
        <h1 className="mt-4 font-serif text-3xl text-obsidian">You&apos;re not signed in</h1>
        <p className="mt-2 text-slate-500">
          Sign in to track your orders, view your wishlist and enjoy faster checkout.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild variant="primary" className="w-full sm:w-auto">
            <Link href="/login">Sign In</Link>
          </Button>
          <Button asChild variant="outline" className="w-full sm:w-auto">
            <Link href="/signup">Create Account</Link>
          </Button>
        </div>
      </div>
    );
  }

  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  async function handleLogout() {
    await logout();
    toast({ title: "Signed out", description: "You have been logged out securely.", variant: "info" });
    router.push("/");
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <header className="mb-8">
        <span className="label-xs">My Account</span>
        <h1 className="mt-2 font-serif text-4xl text-obsidian">Welcome, {user.name.split(" ")[0]}</h1>
      </header>

      <div className="grid gap-8 lg:grid-cols-[280px_1fr] lg:items-start">
        <aside className="border border-border bg-silk p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold text-[10px] font-bold text-obsidian">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="truncate font-semibold text-obsidian">{user.name}</p>
              <p className="truncate text-xs text-slate-500">{user.email}</p>
            </div>
          </div>

          <dl className="mt-6 space-y-2 text-sm">
            <div className="flex justify-between text-slate-500">
              <dt>Bag items</dt>
              <dd className="text-obsidian">{itemCount}</dd>
            </div>
            <div className="flex justify-between text-slate-500">
              <dt>Bag total</dt>
              <dd className="text-obsidian">{format(subtotal)}</dd>
            </div>
            <div className="flex justify-between text-slate-500">
              <dt>Wishlist</dt>
              <dd className="text-obsidian">{wishlist.length}</dd>
            </div>
          </dl>

          <div className="mt-6 space-y-2">
            <Button asChild variant="outline" className="w-full">
              <Link href="/shop" className="block">Continue Shopping</Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link href="/cart" className="block">View My Bag</Link>
            </Button>
            <Button variant="ghost" className="w-full text-red-600 hover:bg-red-50" onClick={handleLogout}>
              Sign Out
            </Button>
          </div>
        </aside>

        <div className="space-y-10">
          <section>
            <h2 className="mb-4 font-serif text-2xl text-obsidian">Order History</h2>
            {loadingOrders ? (
              <div className="skeleton h-32 rounded-none" />
            ) : orders.length === 0 ? (
              <div className="border border-border bg-card py-14 text-center text-slate-500">
                <Package className="mx-auto h-10 w-10 text-gold-ink" aria-hidden />
                <p className="mt-3">No orders yet. Your purchases will appear here.</p>
                <Button asChild variant="primary" className="mt-5">
                  <Link href="/shop">Shop Now</Link>
                </Button>
              </div>
            ) : (
              <ul className="space-y-4">
                {orders.map((order) => (
                  <li key={order.id} className="border border-border bg-card p-5">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="font-mono text-sm font-semibold text-obsidian">{order.id}</p>
                      <span className="rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-emerald-600">
                        {order.status}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-slate-400">
                      {new Date(order.date).toLocaleString()}
                    </p>
                    <ul className="mt-3 space-y-1">
                      {order.items.map((item, idx: number) => (
                        <li key={`${item.id}-${idx}`} className="flex justify-between text-sm text-slate-500">
                          <span>{item.name} × {item.quantity}</span>
                          <span>{format(item.price * item.quantity)}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-3 flex justify-between border-t border-border pt-3 font-semibold text-obsidian">
                      <span>Total</span>
                      <span className="font-serif text-gold-ink">{format(order.total)}</span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section>
            <h2 className="mb-4 font-serif text-2xl text-obsidian">My Wishlist</h2>
            {wishlistProducts.length === 0 ? (
              <div className="border border-border bg-card py-12 text-center text-slate-500">
                Tap the heart on any product to save it here.
              </div>
            ) : (
              <ul className="grid gap-4 sm:grid-cols-2">
                {wishlistProducts.map((product) => (
                  <li key={product.id} className="flex gap-3 border border-border bg-card p-3">
                    <Image
                      src={product.heroImage ?? product.image}
                      alt=""
                      width={80}
                      height={96}
                      className="h-24 w-20 object-cover"
                      unoptimized
                    />
                    <div className="flex min-w-0 flex-1 flex-col">
                      <p className="truncate font-serif text-obsidian">{product.name}</p>
                      <p className="text-sm font-semibold text-gold-ink">{format(product.price)}</p>
                      <div className="mt-auto flex gap-2 pt-2">
                        <Button
                          size="sm"
                          variant="primary"
                          onClick={() => {
                            addItem({
                              id: product.id,
                              name: product.name,
                              price: product.price,
                              category: product.category,
                              image: product.heroImage ?? product.image,
                            });
                            toast({ title: "Added to bag", description: product.name, variant: "success" });
                          }}
                        >
                          Add to Bag
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => toggleWishlist(product.id)}>
                          Remove
                        </Button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}


