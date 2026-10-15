"use client";

/**
 * Lumière Admin — professional operations dashboard.
 *
 * A full admin shell: dark sidebar navigation, a sticky top bar and a clean
 * warm-white content canvas. Every figure is derived from the real
 * /api/admin/* endpoints — there is no mock data anywhere in this file.
 */

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/store/auth-context";
import { useToast } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { CATEGORY_LABELS, type Product } from "@/data/products";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Settings as SettingsIcon,
  Search,
  Bell,
  Menu,
  X,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Plus,
  Pencil,
  Trash2,
  Eye,
  Store,
  RefreshCw,
  AlertTriangle,
  Inbox,
  LogOut,
  ExternalLink,
  CalendarDays,
  Box,
  ChevronRight,
  Check,
  type LucideIcon,
} from "lucide-react";

// ──────────────────────────────────────────────────────────────────────────
// Types
// ──────────────────────────────────────────────────────────────────────────

type OrderStatus = "paid" | "pending" | "demo";

interface AdminOrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  color?: string;
  size?: string;
}

interface AdminOrder {
  id: string;
  date: string;
  status: OrderStatus;
  items: AdminOrderItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  email?: string;
  customerName?: string;
  stripeSessionId?: string;
}

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  createdAt: string;
}

type Tab = "dashboard" | "products" | "orders" | "users" | "settings";
type FetchState = "loading" | "success" | "error";
type ProductMode = "list" | "add" | "edit";

interface Trend {
  value: number | null; // null → not enough history
  current: number;
  previous: number;
}

// ──────────────────────────────────────────────────────────────────────────
// Helpers
// ──────────────────────────────────────────────────────────────────────────

const USD = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

function fmt(n: number) {
  return USD.format(n);
}

function fmtCompact(n: number) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(1)}k`;
  return `$${n.toFixed(0)}`;
}

function fmtDate(d: string) {
  const date = new Date(d);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function fmtDateTime(d: string) {
  const date = new Date(d);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function monthKey(d: string) {
  const date = new Date(d);
  if (Number.isNaN(date.getTime())) return "";
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

/** Percentage change between two periods. null when the baseline is zero. */
function pctChange(current: number, previous: number): number | null {
  if (previous === 0) return current === 0 ? 0 : null;
  return ((current - previous) / previous) * 100;
}

/** The last six calendar months, ascending, each with a short label. */
function useLastSixMonths() {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  return React.useMemo(() => {
    if (!mounted) return [] as { key: string; label: string }[];
    const now = new Date();
    const out: { key: string; label: string }[] = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      out.push({
        key: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`,
        label: d.toLocaleString("en-US", { month: "short" }),
      });
    }
    return out;
  }, [mounted]);
}

// ──────────────────────────────────────────────────────────────────────────
// Page
// ──────────────────────────────────────────────────────────────────────────

export default function AdminPage() {
  const router = useRouter();
  const { user, loading: authLoading, isAdmin, logout } = useAuth();
  const { toast } = useToast();
  const months = useLastSixMonths();

  const [activeTab, setActiveTab] = React.useState<Tab>("dashboard");
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");

  const [orders, setOrders] = React.useState<AdminOrder[]>([]);
  const [users, setUsers] = React.useState<AdminUser[]>([]);
  const [products, setProducts] = React.useState<Product[]>([]);
  const [fetchState, setFetchState] = React.useState<FetchState>("loading");
  const [error, setError] = React.useState<string | null>(null);

  // ── Auth guard ──
  React.useEffect(() => {
    if (authLoading) return;
    if (!user) {
      router.push("/login");
      return;
    }
    if (!isAdmin) {
      toast({
        title: "Access Denied",
        description: "Only administrators can access this page.",
        variant: "error",
      });
      router.push("/account");
    }
  }, [user, authLoading, isAdmin, router, toast]);

  // ── Data loading (real endpoints, no fallbacks) ──
  const load = React.useCallback(async () => {
    setFetchState("loading");
    setError(null);
    try {
      const [ordersRes, usersRes, productsRes] = await Promise.all([
        fetch("/api/admin/orders", { cache: "no-store" }),
        fetch("/api/admin/users", { cache: "no-store" }),
        fetch("/api/admin/products", { cache: "no-store" }),
      ]);

      const ordersData = await safeJson(ordersRes);
      const usersData = await safeJson(usersRes);
      const productsData = await safeJson(productsRes);

      if (!ordersRes.ok)
        throw new Error(errorFrom(ordersData, `Orders request failed (${ordersRes.status})`));
      if (!usersRes.ok)
        throw new Error(errorFrom(usersData, `Users request failed (${usersRes.status})`));
      if (!productsRes.ok)
        throw new Error(errorFrom(productsData, `Products request failed (${productsRes.status})`));
      if (!ordersData || !usersData || !productsData) {
        throw new Error("The admin API returned an unexpected response.");
      }

      setOrders(Array.isArray(ordersData.orders) ? (ordersData.orders as AdminOrder[]) : []);
      setUsers(Array.isArray(usersData.users) ? (usersData.users as AdminUser[]) : []);
      setProducts(Array.isArray(productsData.products) ? (productsData.products as Product[]) : []);
      setFetchState("success");
    } catch (err) {
      setFetchState("error");
      setError(err instanceof Error ? err.message : "We couldn't load the store data.");
    }
  }, []);

  React.useEffect(() => {
    // Initial data fetch — intentionally the one synchronous trigger for this screen.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void load();
  }, [load]);

  const loading = authLoading || fetchState === "loading";

  // ── Derived analytics ──
  const analytics = React.useMemo(() => buildAnalytics(orders, users, products, months), [
    orders,
    users,
    products,
    months,
  ]);

  // ── Product CRUD ──
  const [productMode, setProductMode] = React.useState<ProductMode>("list");
  const [productForm, setProductForm] = React.useState<Partial<Product>>({});
  const [savingProduct, setSavingProduct] = React.useState(false);

  function openAddProduct() {
    setProductForm({
      name: "",
      slug: "",
      category: "apparel",
      price: 0,
      originalPrice: null,
      image: "",
      heroImage: "",
      images: [],
      colors: [],
      sizes: [],
      stock: 0,
      material: "",
      rating: 0,
      reviews: 0,
      description: "",
      tags: [],
      isNew: false,
      isFeatured: false,
    });
    setProductMode("add");
  }

  function openEditProduct(p: Product) {
    setProductForm({ ...p });
    setProductMode("edit");
  }

  async function saveProduct() {
    if (!productForm.name || !productForm.price) {
      toast({ title: "Missing fields", description: "Name and price are required.", variant: "error" });
      return;
    }
    setSavingProduct(true);
    try {
      const res = await fetch("/api/admin/products", {
        method: productMode === "add" ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productForm),
      });
      const data = await safeJson(res);
      if (!res.ok) {
        toast({ title: "Couldn't save", description: errorFrom(data, "The server rejected the request."), variant: "error" });
        return;
      }
      if (!data) {
        toast({ title: "Couldn't save", description: "The server returned an empty response.", variant: "error" });
        return;
      }
      const saved = data.product as Product;
      setProducts((prev) =>
        productMode === "add"
          ? [...prev, saved]
          : prev.map((p) => (p.id === saved.id ? saved : p))
      );
      setProductMode("list");
      toast({
        title: productMode === "add" ? "Product added" : "Product updated",
        description: saved.name,
        variant: "success",
      });
    } catch {
      toast({ title: "Couldn't save", description: "Network error — please try again.", variant: "error" });
    } finally {
      setSavingProduct(false);
    }
  }

  async function deleteProduct(id: string) {
    try {
      const res = await fetch(`/api/admin/products?id=${encodeURIComponent(id)}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await safeJson(res);
        toast({ title: "Couldn't delete", description: errorFrom(data, "The server rejected the request."), variant: "error" });
        return;
      }
      setProducts((prev) => prev.filter((p) => p.id !== id));
      toast({ title: "Product deleted", variant: "info" });
    } catch {
      toast({ title: "Couldn't delete", description: "Network error — please try again.", variant: "error" });
    }
  }

  // ── Confirm dialog (shared by destructive actions) ──
  const [confirm, setConfirm] = React.useState<{
    title: string;
    message: string;
    action: () => void;
  } | null>(null);

  // ── Order detail ──
  const [viewingOrder, setViewingOrder] = React.useState<AdminOrder | null>(null);

  const adminName = user?.name || "Administrator";
  const pendingCount = analytics.statusCounts.pending;

  // ── Render ──

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <RefreshCw className="h-8 w-8 animate-spin text-gold" aria-hidden />
        <span className="sr-only">Loading…</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-obsidian">
      <Sidebar
        activeTab={activeTab}
        onNavigate={(tab) => {
          setActiveTab(tab);
          setSidebarOpen(false);
        }}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        adminName={adminName}
        onLogout={async () => {
          await logout();
          router.push("/");
        }}
      />

      {/* Mobile scrim */}
      {sidebarOpen && (
        <button
          aria-label="Close navigation"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-obsidian/60 backdrop-blur-sm lg:hidden"
        />
      )}

      <div className="lg:pl-64">
        <TopBar
          activeTab={activeTab}
          adminName={adminName}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          pendingCount={pendingCount}
          onOpenSidebar={() => setSidebarOpen(true)}
          onOpenNotifications={() => setActiveTab("orders")}
        />

        <main className="mx-auto w-full max-w-[1400px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          {fetchState === "error" && !loading ? (
            <ErrorState message={error} onRetry={() => void load()} />
          ) : activeTab === "dashboard" ? (
            <DashboardView
              loading={loading}
              users={users}
              analytics={analytics}
              onNavigate={setActiveTab}
            />
          ) : activeTab === "products" ? (
            <ProductsView
              loading={loading}
              products={products}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onAdd={openAddProduct}
              onEdit={openEditProduct}
              onDelete={(p) =>
                setConfirm({
                  title: "Delete product?",
                  message: `“${p.name}” will be removed from the catalogue. This cannot be undone.`,
                  action: () => void deleteProduct(p.id),
                })
              }
            />
          ) : activeTab === "orders" ? (
            <OrdersView
              loading={loading}
              orders={orders}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onView={setViewingOrder}
              onDelete={(o) =>
                setConfirm({
                  title: "Delete order?",
                  message: `Order ${o.id} will be removed.`,
                  action: () =>
                    toast({
                      title: "Not supported",
                      description: "The orders API does not expose a delete endpoint.",
                      variant: "error",
                    }),
                })
              }
            />
          ) : activeTab === "users" ? (
            <UsersView
              loading={loading}
              users={users}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />
          ) : (
            <SettingsView />
          )}
        </main>
      </div>

      {/* Product form modal */}
      {productMode !== "list" && (
        <ProductFormModal
          mode={productMode}
          form={productForm}
          setForm={setProductForm}
          onSave={() => void saveProduct()}
          onCancel={() => setProductMode("list")}
          saving={savingProduct}
        />
      )}

      {/* Order detail modal */}
      {viewingOrder && (
        <OrderDetailModal order={viewingOrder} onClose={() => setViewingOrder(null)} />
      )}

      {/* Confirm dialog */}
      {confirm && (
        <ConfirmDialog
          title={confirm.title}
          message={confirm.message}
          onCancel={() => setConfirm(null)}
          onConfirm={() => {
            confirm.action();
            setConfirm(null);
          }}
        />
      )}
    </div>
  );
}

async function safeJson(res: Response): Promise<Record<string, unknown> | null> {
  try {
    return (await res.json()) as Record<string, unknown> | null;
  } catch {
    return null;
  }
}

function errorFrom(data: Record<string, unknown> | null, fallback: string): string {
  const err = data?.error;
  return typeof err === "string" && err.trim() ? err : fallback;
}

// ──────────────────────────────────────────────────────────────────────────
// Analytics
// ──────────────────────────────────────────────────────────────────────────

interface Analytics {
  totalRevenue: number;
  totalOrders: number;
  totalUsers: number;
  avgOrderValue: number;
  paidOrders: number;
  statusCounts: Record<OrderStatus, number>;
  revenueTrend: Trend;
  ordersTrend: Trend;
  usersTrend: Trend;
  aovTrend: Trend;
  revenueByMonth: { label: string; value: number }[];
  statusData: { name: string; value: number; color: string }[];
  topProducts: { name: string; qty: number; revenue: number }[];
  recentOrders: AdminOrder[];
  categoryData: { label: string; count: number; pct: number }[];
  totalProducts: number;
  lowStock: number;
}

function buildAnalytics(
  orders: AdminOrder[],
  users: AdminUser[],
  products: Product[],
  months: { key: string; label: string }[]
): Analytics {
  const paid = orders.filter((o) => o.status === "paid");

  const totalRevenue = paid.reduce((s, o) => s + o.total, 0);
  const avgOrderValue = paid.length > 0 ? totalRevenue / paid.length : 0;

  const statusCounts: Record<OrderStatus, number> = {
    paid: orders.filter((o) => o.status === "paid").length,
    pending: orders.filter((o) => o.status === "pending").length,
    demo: orders.filter((o) => o.status === "demo").length,
  };

  // ── Monthly series (last six months) ──
  const revenueByMonthKey = new Map<string, number>();
  const aovSumKey = new Map<string, number>();
  const aovCountKey = new Map<string, number>();
  const ordersByMonthKey = new Map<string, number>();
  const usersByMonthKey = new Map<string, number>();

  for (const o of orders) {
    const k = monthKey(o.date);
    if (!k) continue;
    ordersByMonthKey.set(k, (ordersByMonthKey.get(k) ?? 0) + 1);
    if (o.status === "paid") {
      revenueByMonthKey.set(k, (revenueByMonthKey.get(k) ?? 0) + o.total);
      aovSumKey.set(k, (aovSumKey.get(k) ?? 0) + o.total);
      aovCountKey.set(k, (aovCountKey.get(k) ?? 0) + 1);
    }
  }
  for (const u of users) {
    const k = monthKey(u.createdAt);
    if (k) usersByMonthKey.set(k, (usersByMonthKey.get(k) ?? 0) + 1);
  }

  const revenueByMonth = months.map((m) => ({ label: m.label, value: revenueByMonthKey.get(m.key) ?? 0 }));
  const revenueSeries = revenueByMonth.map((d) => d.value);
  const ordersSeries = months.map((m) => ordersByMonthKey.get(m.key) ?? 0);
  const usersSeries = months.map((m) => usersByMonthKey.get(m.key) ?? 0);
  const aovSeries = months.map((m) => {
    const count = aovCountKey.get(m.key) ?? 0;
    const sum = aovSumKey.get(m.key) ?? 0;
    return count > 0 ? sum / count : 0;
  });

  const last = months.length - 1;
  const prev = months.length - 2;
  const revenueTrend: Trend = {
    current: revenueSeries[last],
    previous: revenueSeries[prev],
    value: pctChange(revenueSeries[last], revenueSeries[prev]),
  };
  const ordersTrend: Trend = {
    current: ordersSeries[last],
    previous: ordersSeries[prev],
    value: pctChange(ordersSeries[last], ordersSeries[prev]),
  };
  const usersTrend: Trend = {
    current: usersSeries[last],
    previous: usersSeries[prev],
    value: pctChange(usersSeries[last], usersSeries[prev]),
  };
  const aovTrend: Trend = {
    current: aovSeries[last],
    previous: aovSeries[prev],
    value: pctChange(aovSeries[last], aovSeries[prev]),
  };

  // ── Status pie ──
  const statusData = [
    { name: "Paid", value: statusCounts.paid, color: "#10b981" },
    { name: "Pending", value: statusCounts.pending, color: "#f59e0b" },
    { name: "Demo", value: statusCounts.demo, color: "#94a3b8" },
  ].filter((d) => d.value > 0);

  // ── Top products (derived from real order line items) ──
  const productMap = new Map<string, { name: string; qty: number; revenue: number }>();
  for (const o of orders) {
    for (const item of o.items) {
      const cur = productMap.get(item.name) ?? { name: item.name, qty: 0, revenue: 0 };
      cur.qty += item.quantity;
      cur.revenue += item.quantity * item.price;
      productMap.set(item.name, cur);
    }
  }
  const topProducts = [...productMap.values()].sort((a, b) => b.qty - a.qty).slice(0, 5);

  // ── Recent orders (API already returns newest first) ──
  const recentOrders = orders.slice(0, 5);

  // ── Category distribution (catalogue) ──
  const categoryCount = new Map<string, number>();
  for (const p of products) {
    categoryCount.set(p.category, (categoryCount.get(p.category) ?? 0) + 1);
  }
  const totalProducts = products.length;
  const categoryData = [...categoryCount.entries()]
    .map(([cat, count]) => ({
      label: CATEGORY_LABELS[cat as keyof typeof CATEGORY_LABELS] ?? cat,
      count,
      pct: totalProducts > 0 ? Math.round((count / totalProducts) * 100) : 0,
    }))
    .sort((a, b) => b.count - a.count);

  return {
    totalRevenue,
    totalOrders: orders.length,
    totalUsers: users.length,
    avgOrderValue,
    paidOrders: paid.length,
    statusCounts,
    revenueTrend,
    ordersTrend,
    usersTrend,
    aovTrend,
    revenueByMonth,
    statusData,
    topProducts,
    recentOrders,
    categoryData,
    totalProducts,
    lowStock: products.filter((p) => p.stock < 10).length,
  };
}

// ──────────────────────────────────────────────────────────────────────────
// Shell: Sidebar
// ──────────────────────────────────────────────────────────────────────────

const NAV_ITEMS: { id: Tab; label: string; icon: LucideIcon }[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "products", label: "Products", icon: Package },
  { id: "orders", label: "Orders", icon: ShoppingCart },
  { id: "users", label: "Users", icon: Users },
  { id: "settings", label: "Settings", icon: SettingsIcon },
];

function Sidebar({
  activeTab,
  onNavigate,
  open,
  onClose,
  adminName,
  onLogout,
}: {
  activeTab: Tab;
  onNavigate: (tab: Tab) => void;
  open: boolean;
  onClose: () => void;
  adminName: string;
  onLogout: () => void;
}) {
  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-white/5 bg-obsidian text-slate-300",
        "transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
        open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}
      aria-label="Admin navigation"
    >
      {/* Brand */}
      <div className="flex items-center justify-between gap-3 border-b border-white/5 px-6 py-6">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/40 bg-gold/10">
            <Store className="h-4 w-4 text-gold" aria-hidden />
          </span>
          <span className="font-serif text-lg tracking-[0.28em] text-white">
            LUM<span className="text-gold">I</span>ÈRE
          </span>
        </Link>
        <button
          onClick={onClose}
          className="rounded-md p-1.5 text-slate-400 hover:bg-white/5 hover:text-white lg:hidden"
          aria-label="Close navigation"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-5">
        <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500">
          Manage
        </p>
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const active = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={cn(
                "group relative flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                active ? "bg-gold/15 text-gold" : "text-slate-400 hover:bg-white/5 hover:text-white"
              )}
              aria-current={active ? "page" : undefined}
            >
              <span
                className={cn(
                  "absolute left-0 top-1/2 h-6 w-0.5 -translate-y-1/2 rounded-full bg-gold transition-opacity",
                  active ? "opacity-100" : "opacity-0"
                )}
              />
              <Icon className="h-[18px] w-[18px] shrink-0" aria-hidden />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Footer / account */}
      <div className="border-t border-white/5 p-4">
        <div className="flex items-center gap-3 rounded-lg bg-white/5 p-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold/20 text-xs font-semibold text-gold">
            {initials(adminName)}
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-white">{adminName}</p>
            <p className="text-[11px] text-slate-500">Store administrator</p>
          </div>
          <button
            onClick={onLogout}
            className="rounded-md p-1.5 text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
            title="Sign out"
            aria-label="Sign out"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}

// ──────────────────────────────────────────────────────────────────────────
// Shell: Top bar
// ──────────────────────────────────────────────────────────────────────────

function TopBar({
  activeTab,
  adminName,
  searchQuery,
  onSearchChange,
  pendingCount,
  onOpenSidebar,
  onOpenNotifications,
}: {
  activeTab: Tab;
  adminName: string;
  searchQuery: string;
  onSearchChange: (v: string) => void;
  pendingCount: number;
  onOpenSidebar: () => void;
  onOpenNotifications: () => void;
}) {
  const titles: Record<Tab, string> = {
    dashboard: "Dashboard",
    products: "Products",
    orders: "Orders",
    users: "Users",
    settings: "Settings",
  };
  const showSearch = activeTab !== "dashboard" && activeTab !== "settings";

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-[1400px] items-center gap-3 px-4 sm:px-6 lg:px-8">
        <button
          onClick={onOpenSidebar}
          className="rounded-md p-2 text-obsidian hover:bg-shell lg:hidden"
          aria-label="Open navigation"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="min-w-0">
          <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.18em] text-gold-ink">
            <span className="hidden sm:inline">Lumière</span>
            <ChevronRight className="hidden h-3 w-3 sm:inline" aria-hidden />
            <span>{titles[activeTab]}</span>
          </div>
          <h1 className="truncate font-serif text-lg leading-tight text-obsidian">
            {titles[activeTab]}
          </h1>
        </div>

        <div className="flex-1" />

        {showSearch && (
          <div className="relative hidden w-64 sm:block md:w-80">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={`Search ${titles[activeTab].toLowerCase()}…`}
              className="h-10 border-border bg-card pl-10 text-obsidian"
              aria-label={`Search ${titles[activeTab].toLowerCase()}`}
            />
          </div>
        )}

        <button
          onClick={onOpenNotifications}
          className="relative rounded-full border border-border bg-card p-2.5 text-obsidian transition-colors hover:border-gold/50 hover:text-gold-ink"
          aria-label={`Notifications${pendingCount > 0 ? `, ${pendingCount} pending orders` : ""}`}
        >
          <Bell className="h-[18px] w-[18px]" />
          {pendingCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-gold px-1 text-[10px] font-bold text-obsidian">
              {pendingCount}
            </span>
          )}
        </button>

        <Link
          href="/"
          target="_blank"
          className="hidden items-center gap-1.5 rounded-full border border-border bg-card px-4 py-2 text-xs font-medium text-obsidian transition-colors hover:border-gold/50 hover:text-gold-ink md:inline-flex"
        >
          View store
          <ExternalLink className="h-3.5 w-3.5" aria-hidden />
        </Link>

        <div className="hidden items-center gap-2.5 border-l border-border pl-3 sm:flex">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-obsidian text-xs font-semibold text-gold">
            {initials(adminName)}
          </span>
          <div className="hidden leading-tight xl:block">
            <p className="text-sm font-medium text-obsidian">{adminName}</p>
            <p className="text-[11px] text-slate-500">Admin</p>
          </div>
        </div>
      </div>

      {/* Mobile search row */}
      {showSearch && (
        <div className="border-t border-border px-4 py-2.5 sm:hidden">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={`Search ${titles[activeTab].toLowerCase()}…`}
              className="h-10 border-border bg-card pl-10 text-obsidian"
              aria-label={`Search ${titles[activeTab].toLowerCase()}`}
            />
          </div>
        </div>
      )}
    </header>
  );
}

// ──────────────────────────────────────────────────────────────────────────
// Dashboard
// ──────────────────────────────────────────────────────────────────────────

function DashboardView({
  loading,
  users,
  analytics,
  onNavigate,
}: {
  loading: boolean;
  users: AdminUser[];
  analytics: Analytics;
  onNavigate: (tab: Tab) => void;
}) {
  const revenueHasData = analytics.revenueByMonth.some((d) => d.value > 0);
  const statusHasData = analytics.statusData.length > 0;

  return (
    <div className="space-y-6">
      {/* Heading */}
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="font-serif text-2xl text-obsidian sm:text-3xl">Store overview</h2>
          <p className="mt-1 text-sm text-slate-500">
            Live performance across revenue, orders and customers.
          </p>
        </div>
        <p className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-gold-ink">
          <CalendarDays className="h-3.5 w-3.5" aria-hidden />
          Last 6 months
        </p>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          loading={loading}
          icon={DollarSign}
          label="Total Revenue"
          value={fmt(analytics.totalRevenue)}
          sub={`${analytics.paidOrders} paid orders`}
          trend={analytics.revenueTrend}
          accent="gold"
        />
        <StatCard
          loading={loading}
          icon={ShoppingCart}
          label="Total Orders"
          value={analytics.totalOrders.toLocaleString()}
          sub={`${analytics.statusCounts.pending} pending`}
          trend={analytics.ordersTrend}
          accent="green"
        />
        <StatCard
          loading={loading}
          icon={Users}
          label="Total Users"
          value={analytics.totalUsers.toLocaleString()}
          sub={`${users.filter((u) => u.role === "admin").length} administrators`}
          trend={analytics.usersTrend}
          accent="slate"
        />
        <StatCard
          loading={loading}
          icon={TrendingUp}
          label="Avg Order Value"
          value={fmt(analytics.avgOrderValue)}
          sub={`${analytics.totalProducts} products listed`}
          trend={analytics.aovTrend}
          accent="bronze"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-5">
        {/* Revenue bar chart */}
        <section className="elevated rounded-2xl p-5 sm:p-6 xl:col-span-3">
          <div className="mb-5 flex items-center justify-between gap-3">
            <div>
              <h3 className="font-serif text-lg text-obsidian">Revenue</h3>
              <p className="text-xs text-slate-500">Monthly paid-order revenue</p>
            </div>
            <span className="rounded-full bg-gold/10 px-3 py-1 text-xs font-semibold text-gold-ink">
              {fmt(analytics.totalRevenue)} total
            </span>
          </div>
          {loading ? (
            <Skeleton className="h-64 w-full rounded-xl" />
          ) : !revenueHasData ? (
            <ChartEmpty message="No paid revenue yet. Monthly figures will appear once orders come in." />
          ) : (
            <ResponsiveContainer width="100%" height={256}>
              <BarChart data={analytics.revenueByMonth} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e6dfd1" vertical={false} />
                <XAxis
                  dataKey="label"
                  tick={{ fill: "#7d7466", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tickFormatter={(v: number) => fmtCompact(v)}
                  tick={{ fill: "#7d7466", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  width={56}
                />
                <Tooltip cursor={{ fill: "rgba(197,160,89,0.10)" }} content={<BarTooltip />} />
                <Bar dataKey="value" radius={[6, 6, 0, 0]} fill="#c5a059" maxBarSize={40} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </section>

        {/* Order status pie */}
        <section className="elevated rounded-2xl p-5 sm:p-6 xl:col-span-2">
          <div className="mb-5">
            <h3 className="font-serif text-lg text-obsidian">Order status</h3>
            <p className="text-xs text-slate-500">Distribution across all orders</p>
          </div>
          {loading ? (
            <Skeleton className="h-64 w-full rounded-xl" />
          ) : !statusHasData ? (
            <ChartEmpty message="No orders yet. Status distribution will appear once orders come in." />
          ) : (
            <>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={analytics.statusData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={54}
                    outerRadius={82}
                    paddingAngle={4}
                    strokeWidth={0}
                  >
                    {analytics.statusData.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<PieTooltip />} />
                </PieChart>
              </ResponsiveContainer>
              <ul className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-slate-600">
                {analytics.statusData.map((d) => (
                  <li key={d.name} className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                    {d.name}
                    <span className="font-semibold text-obsidian">{d.value}</span>
                  </li>
                ))}
              </ul>
            </>
          )}
        </section>
      </div>

      {/* Bottom row: top products / recent orders / categories */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Top products */}
        <section className="elevated rounded-2xl p-5 sm:p-6">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="font-serif text-lg text-obsidian">Top products</h3>
              <p className="text-xs text-slate-500">Best sellers by units sold</p>
            </div>
            <button
              onClick={() => onNavigate("products")}
              className="text-xs font-medium text-gold-ink hover:underline"
            >
              View all
            </button>
          </div>
          {loading ? (
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-9 w-full rounded-lg" />
              ))}
            </div>
          ) : analytics.topProducts.length === 0 ? (
            <ChartEmpty message="No product sales recorded yet." />
          ) : (
            <ol className="space-y-3">
              {analytics.topProducts.map((p, i) => (
                <li key={p.name} className="flex items-center gap-3">
                  <span
                    className={cn(
                      "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold",
                      i === 0 ? "bg-gold text-obsidian" : "bg-shell text-slate-500"
                    )}
                  >
                    {i + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-obsidian">{p.name}</p>
                    <p className="text-[11px] text-slate-500">{fmt(p.revenue)} lifetime</p>
                  </div>
                  <span className="text-sm font-semibold text-gold-ink">{p.qty} sold</span>
                </li>
              ))}
            </ol>
          )}
        </section>

        {/* Recent orders */}
        <section className="elevated rounded-2xl p-5 sm:p-6">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="font-serif text-lg text-obsidian">Recent orders</h3>
              <p className="text-xs text-slate-500">Latest five transactions</p>
            </div>
            <button
              onClick={() => onNavigate("orders")}
              className="text-xs font-medium text-gold-ink hover:underline"
            >
              View all
            </button>
          </div>
          {loading ? (
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-9 w-full rounded-lg" />
              ))}
            </div>
          ) : analytics.recentOrders.length === 0 ? (
            <ChartEmpty message="No orders have been placed yet." />
          ) : (
            <ul className="space-y-3">
              {analytics.recentOrders.map((o) => (
                <li key={o.id} className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-obsidian">
                      {o.customerName || o.email || "Guest"}
                    </p>
                    <p className="truncate text-[11px] text-slate-500">
                      {o.id} · {fmtDate(o.date)}
                    </p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-sm font-semibold text-obsidian">{fmt(o.total)}</p>
                    <StatusBadge status={o.status} />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Category breakdown */}
        <section className="elevated rounded-2xl p-5 sm:p-6">
          <div className="mb-4">
            <h3 className="font-serif text-lg text-obsidian">Category mix</h3>
            <p className="text-xs text-slate-500">Catalogue distribution</p>
          </div>
          {loading ? (
            <div className="space-y-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-8 w-full rounded-lg" />
              ))}
            </div>
          ) : analytics.categoryData.length === 0 ? (
            <ChartEmpty message="No products in the catalogue yet." />
          ) : (
            <ul className="space-y-4">
              {analytics.categoryData.map((c) => (
                <li key={c.label}>
                  <div className="mb-1.5 flex items-center justify-between text-xs">
                    <span className="font-medium text-obsidian">{c.label}</span>
                    <span className="text-slate-500">
                      {c.count} items · {c.pct}%
                    </span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-shell">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-gold to-gold-light transition-[width] duration-700"
                      style={{ width: `${c.pct}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────
// Products
// ──────────────────────────────────────────────────────────────────────────

function ProductsView({
  loading,
  products,
  searchQuery,
  onSearchChange,
  onAdd,
  onEdit,
  onDelete,
}: {
  loading: boolean;
  products: Product[];
  searchQuery: string;
  onSearchChange: (v: string) => void;
  onAdd: () => void;
  onEdit: (p: Product) => void;
  onDelete: (p: Product) => void;
}) {
  const q = searchQuery.trim().toLowerCase();
  const filtered = products.filter(
    (p) =>
      !q ||
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.slug.toLowerCase().includes(q)
  );

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="font-serif text-2xl text-obsidian sm:text-3xl">Products</h2>
          <p className="mt-1 text-sm text-slate-500">
            {products.length} items in the catalogue · {products.filter((p) => p.stock < 10).length} low on stock
          </p>
        </div>
        <Button variant="primary" size="sm" onClick={onAdd}>
          <Plus className="h-4 w-4" aria-hidden />
          Add Product
        </Button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-card">
        <div className="flex flex-wrap items-center gap-3 border-b border-border px-4 py-3 sm:px-5">
          <div className="relative w-full sm:w-72">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search by name, category or slug…"
              className="h-10 border-border bg-card pl-10 text-obsidian"
              aria-label="Search products"
            />
          </div>
          <span className="ml-auto text-xs text-slate-500">
            {filtered.length} of {products.length} shown
          </span>
        </div>

        {loading ? (
          <div className="divide-y divide-border">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4 px-5 py-4">
                <Skeleton className="h-12 w-12 rounded-lg" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="h-3 w-1/5" />
                </div>
                <Skeleton className="hidden h-4 w-16 sm:block" />
                <Skeleton className="h-4 w-16" />
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <EmptyState
            icon={Package}
            title={searchQuery ? "No products match your search" : "No products yet"}
            description={
              searchQuery
                ? "Try a different name, category or slug."
                : "Add your first product to start building the catalogue."
            }
            action={
              !searchQuery ? (
                <Button variant="primary" size="sm" onClick={onAdd}>
                  <Plus className="h-4 w-4" aria-hidden />
                  Add Product
                </Button>
              ) : undefined
            }
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-sm">
              <thead>
                <tr className="border-b border-border text-left text-[11px] uppercase tracking-[0.14em] text-slate-500">
                  <th className="px-5 py-3 font-medium">Product</th>
                  <th className="px-4 py-3 font-medium">Category</th>
                  <th className="px-4 py-3 font-medium">Price</th>
                  <th className="px-4 py-3 font-medium">Stock</th>
                  <th className="px-4 py-3 font-medium">Rating</th>
                  <th className="px-5 py-3 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((p) => (
                  <tr key={p.id} className="group transition-colors hover:bg-shell/60">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <ProductThumb src={p.image} alt={p.name} />
                        <div className="min-w-0">
                          <p className="truncate font-medium text-obsidian">{p.name}</p>
                          <p className="truncate text-xs text-slate-500">/{p.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="rounded-full border border-border bg-shell px-2.5 py-0.5 text-xs text-slate-600">
                        {CATEGORY_LABELS[p.category] ?? p.category}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-medium text-obsidian">{fmt(p.price)}</td>
                    <td className="px-4 py-3">
                      <span
                        className={cn(
                          "text-xs font-medium",
                          p.stock === 0
                            ? "text-red-600"
                            : p.stock < 10
                              ? "text-amber-600"
                              : "text-slate-600"
                        )}
                      >
                        {p.stock} left
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      {p.rating.toFixed(1)} <span className="text-slate-400">({p.reviews})</span>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex justify-end gap-1 opacity-100 transition-opacity lg:opacity-0 lg:group-hover:opacity-100">
                        <button
                          onClick={() => onEdit(p)}
                          className="rounded-md p-2 text-slate-500 transition-colors hover:bg-gold/10 hover:text-gold-ink"
                          title="Edit product"
                          aria-label={`Edit ${p.name}`}
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => onDelete(p)}
                          className="rounded-md p-2 text-slate-500 transition-colors hover:bg-red-500/10 hover:text-red-600"
                          title="Delete product"
                          aria-label={`Delete ${p.name}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────
// Orders
// ──────────────────────────────────────────────────────────────────────────

function OrdersView({
  loading,
  orders,
  searchQuery,
  onSearchChange,
  onView,
  onDelete,
}: {
  loading: boolean;
  orders: AdminOrder[];
  searchQuery: string;
  onSearchChange: (v: string) => void;
  onView: (o: AdminOrder) => void;
  onDelete: (o: AdminOrder) => void;
}) {
  const q = searchQuery.trim().toLowerCase();
  const filtered = orders.filter(
    (o) =>
      !q ||
      o.id.toLowerCase().includes(q) ||
      (o.email ?? "").toLowerCase().includes(q) ||
      (o.customerName ?? "").toLowerCase().includes(q)
  );

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="font-serif text-2xl text-obsidian sm:text-3xl">Orders</h2>
          <p className="mt-1 text-sm text-slate-500">
            {orders.length} orders · {orders.filter((o) => o.status === "pending").length} awaiting fulfilment
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span className="hidden sm:inline">Search by order ID, email or customer</span>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-card">
        <div className="flex flex-wrap items-center gap-3 border-b border-border px-4 py-3 sm:px-5">
          <div className="relative w-full sm:w-72">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search orders…"
              className="h-10 border-border bg-card pl-10 text-obsidian"
              aria-label="Search orders"
            />
          </div>
          <span className="ml-auto text-xs text-slate-500">
            {filtered.length} of {orders.length} shown
          </span>
        </div>

        {loading ? (
          <div className="divide-y divide-border">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4 px-5 py-4">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 flex-1" />
                <Skeleton className="h-6 w-16 rounded-full" />
                <Skeleton className="h-4 w-20" />
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <EmptyState
            icon={ShoppingCart}
            title={searchQuery ? "No orders match your search" : "No orders yet"}
            description={
              searchQuery
                ? "Try a different order ID, email or customer name."
                : "Orders will appear here as soon as customers check out."
            }
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[820px] text-sm">
              <thead>
                <tr className="border-b border-border text-left text-[11px] uppercase tracking-[0.14em] text-slate-500">
                  <th className="px-5 py-3 font-medium">Order ID</th>
                  <th className="px-4 py-3 font-medium">Date</th>
                  <th className="px-4 py-3 font-medium">Customer</th>
                  <th className="px-4 py-3 font-medium">Items</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Total</th>
                  <th className="px-5 py-3 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((o) => (
                  <tr key={o.id} className="group transition-colors hover:bg-shell/60">
                    <td className="px-5 py-3 font-mono text-xs text-slate-600">{o.id}</td>
                    <td className="px-4 py-3 text-slate-600">{fmtDate(o.date)}</td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-obsidian">{o.customerName || "Guest"}</p>
                      <p className="truncate text-xs text-slate-500">{o.email || "—"}</p>
                    </td>
                    <td className="px-4 py-3 text-slate-600">{o.items.length}</td>
                    <td className="px-4 py-3">
                      <StatusBadge status={o.status} />
                    </td>
                    <td className="px-4 py-3 font-semibold text-obsidian">{fmt(o.total)}</td>
                    <td className="px-5 py-3">
                      <div className="flex justify-end gap-1 opacity-100 transition-opacity lg:opacity-0 lg:group-hover:opacity-100">
                        <button
                          onClick={() => onView(o)}
                          className="rounded-md p-2 text-slate-500 transition-colors hover:bg-gold/10 hover:text-gold-ink"
                          title="View order"
                          aria-label={`View order ${o.id}`}
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => onDelete(o)}
                          className="rounded-md p-2 text-slate-500 transition-colors hover:bg-red-500/10 hover:text-red-600"
                          title="Delete order"
                          aria-label={`Delete order ${o.id}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────
// Users
// ──────────────────────────────────────────────────────────────────────────

function UsersView({
  loading,
  users,
  searchQuery,
  onSearchChange,
}: {
  loading: boolean;
  users: AdminUser[];
  searchQuery: string;
  onSearchChange: (v: string) => void;
}) {
  const q = searchQuery.trim().toLowerCase();
  const filtered = users.filter(
    (u) =>
      !q ||
      u.name.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q) ||
      u.role.toLowerCase().includes(q) ||
      u.id.toLowerCase().includes(q)
  );

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="font-serif text-2xl text-obsidian sm:text-3xl">Users</h2>
          <p className="mt-1 text-sm text-slate-500">
            {users.length} registered accounts · {users.filter((u) => u.role === "admin").length} administrators
          </p>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-card">
        <div className="flex flex-wrap items-center gap-3 border-b border-border px-4 py-3 sm:px-5">
          <div className="relative w-full sm:w-72">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search users…"
              className="h-10 border-border bg-card pl-10 text-obsidian"
              aria-label="Search users"
            />
          </div>
          <span className="ml-auto text-xs text-slate-500">
            {filtered.length} of {users.length} shown
          </span>
        </div>

        {loading ? (
          <div className="divide-y divide-border">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4 px-5 py-4">
                <Skeleton className="h-9 w-9 rounded-full" />
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 flex-1" />
                <Skeleton className="h-6 w-16 rounded-full" />
                <Skeleton className="h-4 w-24" />
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <EmptyState
            icon={Users}
            title={searchQuery ? "No users match your search" : "No users yet"}
            description={
              searchQuery
                ? "Try a different name, email or role."
                : "Registered customers will appear here."
            }
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-sm">
              <thead>
                <tr className="border-b border-border text-left text-[11px] uppercase tracking-[0.14em] text-slate-500">
                  <th className="px-5 py-3 font-medium">User</th>
                  <th className="px-4 py-3 font-medium">Email</th>
                  <th className="px-4 py-3 font-medium">Role</th>
                  <th className="px-4 py-3 font-medium">Joined</th>
                  <th className="px-5 py-3 text-right font-medium">ID</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((u) => (
                  <tr key={u.id} className="transition-colors hover:bg-shell/60">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-obsidian text-xs font-semibold text-gold">
                          {initials(u.name)}
                        </span>
                        <span className="font-medium text-obsidian">{u.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-600">{u.email}</td>
                    <td className="px-4 py-3">
                      <span
                        className={cn(
                          "rounded-full px-2.5 py-0.5 text-xs font-medium",
                          u.role === "admin"
                            ? "bg-gold/15 text-gold-ink"
                            : "bg-shell text-slate-600"
                        )}
                      >
                        {u.role}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-600">{fmtDate(u.createdAt)}</td>
                    <td className="px-5 py-3 text-right font-mono text-xs text-slate-400">{u.id}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────
// Settings
// ──────────────────────────────────────────────────────────────────────────

const SETTINGS_KEY = "lumiere:admin-settings";

interface StoreSettings {
  storeName: string;
  contactEmail: string;
  currency: string;
  orderAlerts: boolean;
}

const DEFAULT_SETTINGS: StoreSettings = {
  storeName: "Lumière",
  contactEmail: "hello@lumiere.store",
  currency: "USD",
  orderAlerts: true,
};

function SettingsView() {
  const { toast } = useToast();
  const [form, setForm] = React.useState<StoreSettings>(DEFAULT_SETTINGS);
  const [hydrated, setHydrated] = React.useState(false);
  const [saving, setSaving] = React.useState(false);

  React.useEffect(() => {
    try {
      const raw = window.localStorage.getItem(SETTINGS_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (raw) setForm({ ...DEFAULT_SETTINGS, ...JSON.parse(raw) });
    } catch {
      // ignore malformed storage
    } finally {
      setHydrated(true);
    }
  }, []);

  function update<K extends keyof StoreSettings>(key: K, value: StoreSettings[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function save() {
    setSaving(true);
    try {
      window.localStorage.setItem(SETTINGS_KEY, JSON.stringify(form));
      toast({ title: "Settings saved", description: "Your store preferences have been updated.", variant: "success" });
    } catch {
      toast({ title: "Couldn't save", description: "Your browser blocked local storage.", variant: "error" });
    } finally {
      setSaving(false);
    }
  }

  if (!hydrated) {
    return (
      <div className="space-y-5">
        <Skeleton className="h-9 w-48" />
        <div className="elevated rounded-2xl p-6">
          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-full" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-serif text-2xl text-obsidian sm:text-3xl">Settings</h2>
        <p className="mt-1 text-sm text-slate-500">General store preferences.</p>
      </div>

      <div className="elevated max-w-2xl rounded-2xl p-5 sm:p-7">
        <div className="space-y-6">
          <Field label="Store name" htmlFor="storeName">
            <Input
              id="storeName"
              value={form.storeName}
              onChange={(e) => update("storeName", e.target.value)}
              placeholder="Lumière"
              className="border-border bg-card text-obsidian"
            />
          </Field>

          <Field label="Contact email" htmlFor="contactEmail">
            <Input
              id="contactEmail"
              type="email"
              value={form.contactEmail}
              onChange={(e) => update("contactEmail", e.target.value)}
              placeholder="hello@lumiere.store"
              className="border-border bg-card text-obsidian"
            />
          </Field>

          <Field label="Currency" htmlFor="currency">
            <select
              id="currency"
              value={form.currency}
              onChange={(e) => update("currency", e.target.value)}
              className="block w-full rounded-md border border-border bg-card px-3 py-2.5 text-sm text-obsidian outline-none transition-colors focus:border-gold focus:ring-2 focus:ring-gold/30"
            >
              <option value="USD">USD — US Dollar</option>
              <option value="EUR">EUR — Euro</option>
              <option value="GBP">GBP — British Pound</option>
              <option value="AED">AED — UAE Dirham</option>
            </select>
          </Field>

          <label className="flex cursor-pointer items-center justify-between gap-4 rounded-lg border border-border bg-shell/60 px-4 py-3">
            <div>
              <p className="text-sm font-medium text-obsidian">Order notifications</p>
              <p className="text-xs text-slate-500">Highlight pending orders in the admin top bar.</p>
            </div>
            <input
              type="checkbox"
              checked={form.orderAlerts}
              onChange={(e) => update("orderAlerts", e.target.checked)}
              className="h-5 w-5 accent-gold"
            />
          </label>
        </div>

        <div className="mt-8 flex items-center justify-end gap-3 border-t border-border pt-5">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setForm(DEFAULT_SETTINGS)}
          >
            Reset
          </Button>
          <Button variant="primary" size="sm" onClick={save} disabled={saving}>
            {saving ? <RefreshCw className="h-4 w-4 animate-spin" aria-hidden /> : <Check className="h-4 w-4" aria-hidden />}
            Save changes
          </Button>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
        {label}
      </label>
      {children}
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────
// Shared UI
// ──────────────────────────────────────────────────────────────────────────

function StatCard({
  icon: Icon,
  label,
  value,
  sub,
  trend,
  accent,
  loading,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  sub: string;
  trend: Trend;
  accent: "gold" | "green" | "slate" | "bronze";
  loading: boolean;
}) {
  const ACCENTS: Record<string, { chip: string; icon: string }> = {
    gold: { chip: "bg-gold/12", icon: "text-gold-ink" },
    green: { chip: "bg-emerald-500/12", icon: "text-emerald-700" },
    slate: { chip: "bg-slate-500/12", icon: "text-slate-700" },
    bronze: { chip: "bg-amber-500/15", icon: "text-amber-700" },
  };
  const a = ACCENTS[accent];
  const up = trend.value !== null && trend.value >= 0;
  const neutral = trend.value === null;

  return (
    <div className="elevated rounded-2xl p-5">
      {loading ? (
        <>
          <Skeleton className="h-10 w-10 rounded-xl" />
          <Skeleton className="mt-4 h-7 w-24" />
          <Skeleton className="mt-2 h-3 w-32" />
          <Skeleton className="mt-2 h-3 w-20" />
        </>
      ) : (
        <>
          <div className="flex items-start justify-between gap-3">
            <span className={cn("flex h-10 w-10 items-center justify-center rounded-xl", a.chip)}>
              <Icon className={cn("h-5 w-5", a.icon)} aria-hidden />
            </span>
            {!neutral && (
              <span
                className={cn(
                  "flex items-center gap-1 rounded-full px-2 py-1 text-[11px] font-semibold",
                  up ? "bg-emerald-500/10 text-emerald-700" : "bg-red-500/10 text-red-600"
                )}
              >
                {up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                {Math.abs(trend.value as number).toFixed(0)}%
              </span>
            )}
          </div>
          <p className="mt-4 font-serif text-2xl leading-none text-obsidian sm:text-[26px]">{value}</p>
          <p className="mt-1.5 text-sm font-medium text-obsidian/80">{label}</p>
          <p className="mt-1 text-xs text-slate-500">
            {neutral ? "No prior period to compare" : sub}
          </p>
        </>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: OrderStatus }) {
  const styles: Record<OrderStatus, string> = {
    paid: "bg-emerald-500/10 text-emerald-700 border-emerald-500/30",
    pending: "bg-amber-500/10 text-amber-700 border-amber-500/30",
    demo: "bg-slate-500/10 text-slate-600 border-slate-500/30",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize",
        styles[status]
      )}
    >
      {status}
    </span>
  );
}

function ProductThumb({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg border border-border bg-shell">
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} className="h-full w-full object-cover" />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-slate-400">
          <Box className="h-5 w-5" aria-hidden />
        </div>
      )}
    </div>
  );
}

function ChartEmpty({ message }: { message: string }) {
  return (
    <div className="flex h-56 flex-col items-center justify-center rounded-xl border border-dashed border-border bg-shell/50 px-6 text-center">
      <Inbox className="h-7 w-7 text-slate-400" aria-hidden />
      <p className="mt-3 max-w-sm text-sm text-slate-500">{message}</p>
    </div>
  );
}

function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-shell text-slate-500">
        <Icon className="h-7 w-7" aria-hidden />
      </span>
      <h3 className="mt-5 font-serif text-xl text-obsidian">{title}</h3>
      <p className="mt-2 max-w-sm text-sm text-slate-500">{description}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}

function ErrorState({ message, onRetry }: { message: string | null; onRetry: () => void }) {
  return (
    <div className="elevated mx-auto mt-10 max-w-lg rounded-2xl p-8 text-center">
      <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-500/10 text-red-600">
        <AlertTriangle className="h-7 w-7" aria-hidden />
      </span>
      <h2 className="mt-5 font-serif text-2xl text-obsidian">Could not load store data</h2>
      <p className="mt-2 text-sm text-slate-500">
        {message ?? "The admin API returned an unexpected response."}
      </p>
      <p className="mt-1 text-xs text-slate-400">
        Make sure that you are signed in as an administrator and the API is reachable.
      </p>
      <Button variant="primary" size="sm" className="mt-6" onClick={onRetry}>
        <RefreshCw className="h-4 w-4" aria-hidden />
        Try again
      </Button>
    </div>
  );
}

function ConfirmDialog({
  title,
  message,
  onConfirm,
  onCancel,
}: {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-obsidian/60 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-2xl">
        <h3 className="font-serif text-xl text-obsidian">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-500">{message}</p>
        <div className="mt-6 flex justify-end gap-3">
          <Button variant="outline" size="sm" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="destructive" size="sm" onClick={onConfirm}>
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────
// Chart tooltips (custom, brand-styled, version-safe)
// ──────────────────────────────────────────────────────────────────────────

interface TooltipPayloadItem {
  value?: number | string;
  name?: string;
  payload?: { color?: string };
}

function BarTooltip({ active, payload, label }: { active?: boolean; payload?: TooltipPayloadItem[]; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-border bg-card px-3.5 py-2.5 shadow-xl">
      <p className="text-[11px] uppercase tracking-[0.14em] text-slate-500">{label}</p>
      <p className="mt-1 font-serif text-lg text-obsidian">{fmt(Number(payload[0].value))}</p>
      <p className="text-xs text-slate-500">Revenue</p>
    </div>
  );
}

function PieTooltip({ active, payload }: { active?: boolean; payload?: TooltipPayloadItem[] }) {
  if (!active || !payload?.length) return null;
  const item = payload[0];
  return (
    <div className="rounded-lg border border-border bg-card px-3.5 py-2.5 shadow-xl">
      <p className="flex items-center gap-2 text-sm text-obsidian">
        <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.payload?.color }} />
        {item.name}
      </p>
      <p className="mt-1 text-xs text-slate-500">{item.value} orders</p>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────
// Product form modal
// ──────────────────────────────────────────────────────────────────────────

function ProductFormModal({
  mode,
  form,
  setForm,
  onSave,
  onCancel,
  saving,
}: {
  mode: ProductMode;
  form: Partial<Product>;
  setForm: React.Dispatch<React.SetStateAction<Partial<Product>>>;
  onSave: () => void;
  onCancel: () => void;
  saving: boolean;
}) {
  const update = (field: string, value: unknown) =>
    setForm((prev) => ({ ...prev, [field]: value }) as Partial<Product>);

  React.useEffect(() => {
    if (mode === "add" && form.name && !form.slug) {
      update("slug", form.name.toLowerCase().replace(/\s+/g, "-"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.name]);

  const inputCls = "border-border bg-card text-obsidian";
  const labelCls = "mb-1.5 block text-xs font-semibold uppercase tracking-[0.14em] text-slate-500";

  return (
    <div
      className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto bg-obsidian/60 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={mode === "add" ? "Add product" : "Edit product"}
    >
      <div className="my-8 w-full max-w-2xl rounded-2xl border border-border bg-card shadow-2xl">
        <div className="sticky top-0 z-10 flex items-center justify-between rounded-t-2xl border-b border-border bg-card px-6 py-4">
          <h2 className="font-serif text-xl text-obsidian">
            {mode === "add" ? "Add New Product" : "Edit Product"}
          </h2>
          <button
            onClick={onCancel}
            className="rounded-full p-1.5 text-slate-500 transition-colors hover:bg-shell hover:text-obsidian"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-5 p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelCls} htmlFor="pf-name">Product name *</label>
              <Input
                id="pf-name"
                value={form.name ?? ""}
                onChange={(e) => update("name", e.target.value)}
                placeholder="Silk Charmeuse Blouse"
                className={inputCls}
              />
            </div>
            <div>
              <label className={labelCls} htmlFor="pf-slug">Slug</label>
              <Input
                id="pf-slug"
                value={form.slug ?? ""}
                onChange={(e) => update("slug", e.target.value)}
                placeholder="silk-charmeuse-blouse"
                className={inputCls}
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelCls} htmlFor="pf-category">Category</label>
              <select
                id="pf-category"
                value={form.category ?? "apparel"}
                onChange={(e) => update("category", e.target.value)}
                className="block w-full rounded-md border border-border bg-card px-3 py-2.5 text-sm text-obsidian outline-none focus:border-gold focus:ring-2 focus:ring-gold/30"
              >
                {Object.entries(CATEGORY_LABELS).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelCls} htmlFor="pf-price">Price ($) *</label>
              <Input
                id="pf-price"
                type="number"
                value={form.price ?? 0}
                onChange={(e) => update("price", Number(e.target.value))}
                className={inputCls}
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className={labelCls} htmlFor="pf-original">Original price ($)</label>
              <Input
                id="pf-original"
                type="number"
                value={form.originalPrice ?? ""}
                onChange={(e) => update("originalPrice", e.target.value ? Number(e.target.value) : null)}
                placeholder="Optional"
                className={inputCls}
              />
            </div>
            <div>
              <label className={labelCls} htmlFor="pf-stock">Stock</label>
              <Input
                id="pf-stock"
                type="number"
                value={form.stock ?? 0}
                onChange={(e) => update("stock", Number(e.target.value))}
                className={inputCls}
              />
            </div>
            <div>
              <label className={labelCls} htmlFor="pf-rating">Rating (0–5)</label>
              <Input
                id="pf-rating"
                type="number"
                min={0}
                max={5}
                step={0.1}
                value={form.rating ?? 0}
                onChange={(e) => update("rating", Number(e.target.value))}
                className={inputCls}
              />
            </div>
          </div>

          <div>
            <label className={labelCls} htmlFor="pf-image">Image URL</label>
            <Input
              id="pf-image"
              value={form.image ?? ""}
              onChange={(e) => update("image", e.target.value)}
              placeholder="/photos/products/your-image.webp"
              className={inputCls}
            />
          </div>

          <div>
            <label className={labelCls} htmlFor="pf-material">Material</label>
            <Input
              id="pf-material"
              value={form.material ?? ""}
              onChange={(e) => update("material", e.target.value)}
              placeholder="Italian silk"
              className={inputCls}
            />
          </div>

          <div>
            <label className={labelCls} htmlFor="pf-description">Description</label>
            <textarea
              id="pf-description"
              value={form.description ?? ""}
              onChange={(e) => update("description", e.target.value)}
              rows={3}
              placeholder="Product description…"
              className="block w-full resize-none rounded-md border border-border bg-card px-3 py-2.5 text-sm text-obsidian outline-none focus:border-gold focus:ring-2 focus:ring-gold/30"
            />
          </div>

          <div>
            <label className={labelCls} htmlFor="pf-tags">Tags (comma separated)</label>
            <Input
              id="pf-tags"
              value={(form.tags ?? []).join(", ")}
              onChange={(e) =>
                update("tags", e.target.value.split(",").map((t) => t.trim()).filter(Boolean))
              }
              placeholder="Silk, Evening, Luxury"
              className={inputCls}
            />
          </div>

          <div className="flex flex-wrap gap-6">
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                checked={form.isNew ?? false}
                onChange={(e) => update("isNew", e.target.checked)}
                className="h-4 w-4 accent-gold"
              />
              <span className="text-sm text-slate-600">New arrival</span>
            </label>
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                checked={form.isFeatured ?? false}
                onChange={(e) => update("isFeatured", e.target.checked)}
                className="h-4 w-4 accent-gold"
              />
              <span className="text-sm text-slate-600">Featured</span>
            </label>
          </div>

          <div className="rounded-xl border border-border bg-shell/60 p-4">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">Preview</p>
            <div className="flex gap-4">
              <div className="h-20 w-16 shrink-0 overflow-hidden rounded-lg border border-border bg-card">
                {form.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={form.image} alt="" className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-slate-300">
                    <Box className="h-6 w-6" aria-hidden />
                  </div>
                )}
              </div>
              <div>
                <p className="font-serif text-lg text-obsidian">{form.name || "Product name"}</p>
                <p className="text-sm font-medium text-gold-ink">{form.price ? fmt(form.price) : "$0"}</p>
                <p className="text-xs text-slate-500">
                  {CATEGORY_LABELS[(form.category as keyof typeof CATEGORY_LABELS) ?? "apparel"]}
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 border-t border-border pt-5">
            <Button variant="outline" size="sm" onClick={onCancel}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={onSave} disabled={saving}>
              {saving ? (
                <RefreshCw className="h-4 w-4 animate-spin" aria-hidden />
              ) : (
                <Check className="h-4 w-4" aria-hidden />
              )}
              {mode === "add" ? "Add product" : "Save changes"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────
// Order detail modal
// ──────────────────────────────────────────────────────────────────────────

function OrderDetailModal({ order, onClose }: { order: AdminOrder; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto bg-obsidian/60 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={`Order ${order.id}`}
    >
      <div className="my-8 w-full max-w-2xl rounded-2xl border border-border bg-card shadow-2xl">
        <div className="flex items-start justify-between gap-4 border-b border-border px-6 py-4">
          <div>
            <p className="font-mono text-xs text-slate-500">{order.id}</p>
            <h2 className="mt-1 font-serif text-xl text-obsidian">
              {order.customerName || "Guest order"}
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <StatusBadge status={order.status} />
            <button
              onClick={onClose}
              className="rounded-full p-1.5 text-slate-500 transition-colors hover:bg-shell hover:text-obsidian"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="space-y-6 p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <Detail label="Placed" value={fmtDateTime(order.date)} />
            <Detail label="Email" value={order.email || "—"} />
            <Detail label="Payment" value={order.stripeSessionId ? "Stripe" : "—"} mono={!!order.stripeSessionId} />
            <Detail label="Items" value={String(order.items.length)} />
          </div>

          <div>
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
              Line items
            </p>
            <div className="overflow-hidden rounded-xl border border-border">
              <table className="w-full text-sm">
                <tbody className="divide-y divide-border">
                  {order.items.map((item, i) => (
                    <tr key={`${item.id}-${i}`}>
                      <td className="px-4 py-3">
                        <p className="font-medium text-obsidian">{item.name}</p>
                        {(item.color || item.size) && (
                          <p className="text-xs text-slate-500">
                            {[item.color, item.size].filter(Boolean).join(" · ")}
                          </p>
                        )}
                      </td>
                      <td className="px-4 py-3 text-right text-slate-600">×{item.quantity}</td>
                      <td className="px-4 py-3 text-right font-medium text-obsidian">
                        {fmt(item.price * item.quantity)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <dl className="space-y-2 rounded-xl border border-border bg-shell/60 p-4 text-sm">
            <Row label="Subtotal" value={fmt(order.subtotal)} />
            <Row label="Shipping" value={fmt(order.shipping)} />
            <Row label="Tax" value={fmt(order.tax)} />
            <div className="mt-1 flex items-center justify-between border-t border-border pt-3">
              <dt className="font-semibold text-obsidian">Total</dt>
              <dd className="font-serif text-lg text-obsidian">{fmt(order.total)}</dd>
            </div>
          </dl>

          <div className="flex justify-end">
            <Button variant="outline" size="sm" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Detail({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">{label}</p>
      <p className={cn("mt-1 text-sm text-obsidian", mono && "font-mono text-xs")}>{value}</p>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-slate-500">{label}</dt>
      <dd className="font-medium text-obsidian">{value}</dd>
    </div>
  );
}
