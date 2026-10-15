"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/store/auth-context";
import { useToast } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Package,
  Users,
  ShoppingBag,
  TrendingUp,
  Search,
  Eye,
  Trash2,
  RefreshCw,
  Download,
  Plus,
  Edit3,
  X,
  Check,
  ChevronDown,
  Filter,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { products as defaultProducts, type Product } from "@/data/products";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

// ─── Types ───────────────────────────────────────────────────────────
interface DbOrder {
  id: string;
  date: string;
  status: "paid" | "pending" | "demo";
  total: number;
  email: string;
  customerName?: string;
  items: Array<{ name: string; quantity: number; price: number; image: string }>;
}

interface DbUser {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  createdAt: string;
}

interface DbProduct extends Product {}

type Tab = "dashboard" | "products" | "orders" | "users";
type ProductMode = "list" | "add" | "edit";

// ─── Helpers ─────────────────────────────────────────────────────────
function fmt(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);
}

function fmtDate(d: string) {
  return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

// ─── Main Page ───────────────────────────────────────────────────────
export default function AdminPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const { toast } = useToast();

  const [activeTab, setActiveTab] = React.useState<Tab>("dashboard");
  const [orders, setOrders] = React.useState<DbOrder[]>([]);
  const [users, setUsers] = React.useState<DbUser[]>([]);
  const [dbProducts, setDbProducts] = React.useState<DbProduct[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [searchQuery, setSearchQuery] = React.useState("");

  // Product editing state
  const [productMode, setProductMode] = React.useState<ProductMode>("list");
  const [editingProduct, setEditingProduct] = React.useState<Partial<DbProduct> | null>(null);
  const [productForm, setProductForm] = React.useState<Partial<DbProduct>>({});
  const [savingProduct, setSavingProduct] = React.useState(false);

  // ── Auth guard ──
  React.useEffect(() => {
    if (authLoading) return;
    if (!user) {
      router.push("/login");
      return;
    }
    // Check admin — server-side check happens in API
  }, [user, authLoading, router]);

  // ── Fetch all data ──
  React.useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const [ordersRes, usersRes, productsRes] = await Promise.all([
          fetch("/api/admin/orders"),
          fetch("/api/admin/users"),
          fetch("/api/admin/products"),
        ]);
        const ordersData = await ordersRes.json();
        const usersData = await usersRes.json();
        const productsData = await productsRes.json();
        setOrders(ordersData.orders || []);
        setUsers(usersData.users || []);
        setDbProducts(productsData.products || []);
      } catch {
        // Fallback to default products for demo
        setDbProducts(defaultProducts);
        setOrders(generateMockOrders());
        setUsers(generateMockUsers());
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // ── Stats ──
  const stats = React.useMemo(() => {
    const paidOrders = orders.filter((o) => o.status === "paid");
    return {
      totalRevenue: paidOrders.reduce((s, o) => s + o.total, 0),
      totalOrders: orders.length,
      totalUsers: users.length,
      avgOrderValue: orders.length > 0 ? orders.reduce((s, o) => s + o.total, 0) / orders.length : 0,
      totalProducts: dbProducts.length,
      lowStock: dbProducts.filter((p) => p.stock < 10).length,
    };
  }, [orders, users, dbProducts]);

  const filteredOrders = orders.filter(
    (o) =>
      o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // ── Product CRUD ──
  function openAddProduct() {
    setEditingProduct(null);
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

  function openEditProduct(p: DbProduct) {
    setEditingProduct(p);
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
      if (productMode === "add") {
        const res = await fetch("/api/admin/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(productForm),
        });
        const data = await res.json();
        if (res.ok) {
          setDbProducts((prev) => [...prev, data.product]);
          toast({ title: "Product added", description: data.product.name, variant: "success" });
        } else {
          toast({ title: "Failed", description: data.error, variant: "error" });
        }
      } else {
        const res = await fetch("/api/admin/products", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(productForm),
        });
        const data = await res.json();
        if (res.ok) {
          setDbProducts((prev) => prev.map((p) => (p.id === data.product.id ? data.product : p)));
          toast({ title: "Product updated", description: data.product.name, variant: "success" });
        } else {
          toast({ title: "Failed", description: data.error, variant: "error" });
        }
      }
      setProductMode("list");
      setEditingProduct(null);
    } finally {
      setSavingProduct(false);
    }
  }

  async function deleteProduct(id: string) {
    if (!confirm("Delete this product?")) return;
    await fetch(`/api/admin/products?id=${id}`, { method: "DELETE" });
    setDbProducts((prev) => prev.filter((p) => p.id !== id));
    toast({ title: "Product deleted", variant: "info" });
  }

  // ── Loading screen ──
  if (authLoading || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950">
        <RefreshCw className="h-8 w-8 animate-spin text-gold" />
      </div>
    );
  }

  // ── Product form modal ──
  if (productMode !== "list") {
    return (
      <ProductForm
        product={editingProduct}
        form={productForm}
        setForm={setProductForm}
        onSave={saveProduct}
        onCancel={() => { setProductMode("list"); setEditingProduct(null); }}
        saving={savingProduct}
        mode={productMode}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-900/80 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="font-serif text-lg font-medium tracking-[0.2em] text-white">
                LUM<span className="text-gold">I</span>ÈRE
              </span>
              <span className="rounded-full bg-gold/20 px-3 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-gold">
                Admin
              </span>
            </div>

            <nav className="hidden md:flex items-center gap-1">
              {(["dashboard", "products", "orders", "users"] as Tab[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "px-4 py-1.5 text-sm font-medium transition-colors rounded-full",
                    activeTab === tab
                      ? "bg-gold/20 text-gold"
                      : "text-white/60 hover:text-white hover:bg-white/5"
                  )}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <Link href="/" target="_blank">
                <Button variant="ghost" size="sm" className="text-white/70 hover:text-white h-8 text-xs">
                  View Site
                </Button>
              </Link>
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push("/account")}
                className="h-8 text-xs border-white/20 text-white hover:bg-white/10"
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile tabs */}
      <div className="md:hidden flex border-b border-white/10 overflow-x-auto">
        {(["dashboard", "products", "orders", "users"] as Tab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "flex-1 px-4 py-3 text-xs font-semibold uppercase tracking-wider transition-colors whitespace-nowrap",
              activeTab === tab
                ? "border-b-2 border-gold text-gold"
                : "text-white/50 hover:text-white"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* ── Dashboard ── */}
        {activeTab === "dashboard" && (
          <div className="space-y-8">
            <div>
              <h1 className="text-2xl font-serif text-white">Dashboard</h1>
              <p className="mt-1 text-sm text-white/50">Overview of your store performance</p>
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              <StatCard icon={ShoppingBag} label="Total Revenue" value={fmt(stats.totalRevenue)} sub="+12% vs last month" color="text-emerald-400" />
              <StatCard icon={Package} label="Total Orders" value={stats.totalOrders.toString()} sub={`${orders.filter(o => o.status === 'paid').length} paid`} color="text-blue-400" />
              <StatCard icon={Users} label="Total Users" value={stats.totalUsers.toString()} sub={`${users.filter(u => u.role === 'admin').length} admins`} color="text-purple-400" />
              <StatCard icon={TrendingUp} label="Avg Order Value" value={fmt(stats.avgOrderValue)} sub={`${stats.totalProducts} products`} color="text-gold" />
            </div>

            {/* Quick actions */}
            <div className="grid gap-4 lg:grid-cols-3">
              <QuickAction
                title="Add New Product"
                description="Create a new product listing"
                icon={Plus}
                onClick={() => setActiveTab("products")}
              />
              <QuickAction
                title="View Orders"
                description={`${orders.length} orders to manage`}
                icon={ShoppingBag}
                onClick={() => setActiveTab("orders")}
              />
              <QuickAction
                title="Manage Users"
                description={`${users.length} registered users`}
                icon={Users}
                onClick={() => setActiveTab("users")}
              />
            </div>

            {/* Recent orders */}
            <div className="rounded-xl border border-white/10 bg-slate-900/50">
              <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
                <h2 className="font-medium text-white">Recent Orders</h2>
                <button onClick={() => setActiveTab("orders")} className="text-xs text-gold hover:underline">
                  View all
                </button>
              </div>
              <div className="divide-y divide-white/5">
                {orders.slice(0, 5).map((order) => (
                  <div key={order.id} className="flex items-center justify-between px-6 py-3">
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-xs text-white/60">{order.id.slice(-6)}</span>
                      <div>
                        <p className="text-sm text-white">{order.email}</p>
                        <p className="text-xs text-white/40">{fmtDate(order.date)}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-white">{fmt(order.total)}</p>
                      <span className={cn(
                        "text-[10px] uppercase tracking-wider",
                        order.status === "paid" ? "text-emerald-400" :
                        order.status === "pending" ? "text-yellow-400" : "text-blue-400"
                      )}>{order.status}</span>
                    </div>
                  </div>
                ))}
                {orders.length === 0 && (
                  <div className="py-12 text-center text-sm text-white/40">No orders yet</div>
                )}
              </div>
            </div>

            {/* Analytics Charts */}
            <RevenueChart orders={orders} />

            {/* Top products */}
            <TopProductsView orders={orders} />
          </div>
        )}

        {/* ── Products ── */}
        {activeTab === "products" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-serif text-white">Products</h1>
                <p className="mt-1 text-sm text-white/50">{dbProducts.length} products in catalog</p>
              </div>
              <button
                onClick={openAddProduct}
                className="inline-flex items-center gap-2 rounded-lg bg-gold px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-obsidian transition-all hover:bg-gold-light hover:shadow-[0_0_20px_-5px_rgba(184,148,46,0.5)]"
              >
                <Plus className="h-4 w-4" />
                Add Product
              </button>
            </div>

            <div className="rounded-xl border border-white/10 bg-slate-900/50 overflow-hidden">
              <div className="border-b border-white/10 px-6 py-3 flex items-center gap-3">
                <Search className="h-4 w-4 text-white/30" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-transparent text-sm text-white placeholder:text-white/30 outline-none"
                />
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10 text-left text-white/50 text-xs uppercase tracking-wider">
                      <th className="px-6 py-3">Product</th>
                      <th className="px-4 py-3">Category</th>
                      <th className="px-4 py-3">Price</th>
                      <th className="px-4 py-3">Stock</th>
                      <th className="px-4 py-3">Rating</th>
                      <th className="px-6 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {dbProducts
                      .filter((p) =>
                        !searchQuery ||
                        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        p.category.toLowerCase().includes(searchQuery.toLowerCase())
                      )
                      .map((p) => (
                        <tr key={p.id} className="group hover:bg-white/5">
                          <td className="px-6 py-3">
                            <div className="flex items-center gap-3">
                              <ImageThumb src={p.image} alt={p.name} />
                              <div>
                                <p className="font-medium text-white">{p.name}</p>
                                <p className="text-xs text-white/40">{p.slug}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs text-white/70">
                              {p.category}
                            </span>
                          </td>
                          <td className="px-4 py-3 font-medium text-gold">{fmt(p.price)}</td>
                          <td className="px-4 py-3">
                            <span className={cn(
                              "text-xs",
                              p.stock === 0 ? "text-red-400" : p.stock < 10 ? "text-yellow-400" : "text-white/70"
                            )}>
                              {p.stock} left
                            </span>
                          </td>
                          <td className="px-4 py-3 text-white/60">
                            {p.rating} ({p.reviews})
                          </td>
                          <td className="px-6 py-3">
                            <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button
                                onClick={() => openEditProduct(p)}
                                className="rounded p-1.5 text-white/60 hover:bg-gold/20 hover:text-gold transition-colors"
                                title="Edit"
                              >
                                <Edit3 className="h-3.5 w-3.5" />
                              </button>
                              <button
                                onClick={() => deleteProduct(p.id)}
                                className="rounded p-1.5 text-white/60 hover:bg-red-500/20 hover:text-red-400 transition-colors"
                                title="Delete"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ── Orders ── */}
        {activeTab === "orders" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-serif text-white">Orders</h1>
                <p className="mt-1 text-sm text-white/50">{orders.length} total orders</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
                  <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search orders..."
                    className="border-white/10 bg-white/5 pl-10 text-white placeholder:text-white/30 w-64"
                  />
                </div>
                <button className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2 text-xs font-medium text-white/70 hover:bg-white/5">
                  <Download className="h-3.5 w-3.5" />
                  Export
                </button>
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-slate-900/50 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10 text-left text-white/50 text-xs uppercase tracking-wider">
                      <th className="px-6 py-3">Order ID</th>
                      <th className="px-4 py-3">Date</th>
                      <th className="px-4 py-3">Customer</th>
                      <th className="px-4 py-3">Items</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3">Total</th>
                      <th className="px-6 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredOrders.map((order) => (
                      <tr key={order.id} className="group hover:bg-white/5">
                        <td className="px-6 py-3 font-mono text-xs text-white/60">{order.id}</td>
                        <td className="px-4 py-3 text-white/60">{fmtDate(order.date)}</td>
                        <td className="px-4 py-3">
                          <div>
                            <p className="text-white">{order.customerName || order.email}</p>
                            <p className="text-xs text-white/40">{order.email}</p>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-white/60">{order.items.length} items</td>
                        <td className="px-4 py-3">
                          <span className={cn(
                            "rounded-full px-2.5 py-0.5 text-xs font-medium",
                            order.status === "paid" ? "bg-emerald-500/20 text-emerald-400" :
                            order.status === "pending" ? "bg-yellow-500/20 text-yellow-400" :
                            "bg-blue-500/20 text-blue-400"
                          )}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 font-medium text-white">{fmt(order.total)}</td>
                        <td className="px-6 py-3">
                          <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="rounded p-1.5 text-white/60 hover:bg-white/10 hover:text-white transition-colors">
                              <Eye className="h-3.5 w-3.5" />
                            </button>
                            <button className="rounded p-1.5 text-white/60 hover:bg-red-500/20 hover:text-red-400 transition-colors">
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {filteredOrders.length === 0 && (
                      <tr>
                        <td colSpan={7} className="py-12 text-center text-sm text-white/40">
                          No orders found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ── Users ── */}
        {activeTab === "users" && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-serif text-white">Users</h1>
              <p className="mt-1 text-sm text-white/50">{users.length} registered users</p>
            </div>

            <div className="rounded-xl border border-white/10 bg-slate-900/50 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10 text-left text-white/50 text-xs uppercase tracking-wider">
                      <th className="px-6 py-3">Name</th>
                      <th className="px-4 py-3">Email</th>
                      <th className="px-4 py-3">Role</th>
                      <th className="px-4 py-3">Joined</th>
                      <th className="px-6 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {users.map((u) => (
                      <tr key={u.id} className="group hover:bg-white/5">
                        <td className="px-6 py-3 font-medium text-white">{u.name}</td>
                        <td className="px-4 py-3 text-white/60">{u.email}</td>
                        <td className="px-4 py-3">
                          <span className={cn(
                            "rounded-full px-2.5 py-0.5 text-xs font-medium",
                            u.role === "admin" ? "bg-gold/20 text-gold" : "bg-white/10 text-white/60"
                          )}>
                            {u.role}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-white/60">{fmtDate(u.createdAt)}</td>
                        <td className="px-6 py-3">
                          <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="rounded p-1.5 text-white/60 hover:bg-white/10 hover:text-white transition-colors">
                              <Eye className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {users.length === 0 && (
                      <tr>
                        <td colSpan={5} className="py-12 text-center text-sm text-white/40">
                          No users registered yet
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

// ─── Sub-components ──────────────────────────────────────────────────

function StatCard({
  icon: Icon,
  label,
  value,
  sub,
  color,
}: {
  icon: any;
  label: string;
  value: string;
  sub: string;
  color: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-slate-900/50 p-5">
      <div className="flex items-center justify-between">
        <div className={cn("rounded-lg p-2", color.replace("text-", "bg-").replace("400", "400/20"))}>
          <Icon className={cn("h-5 w-5", color)} />
        </div>
      </div>
      <p className="mt-4 text-2xl font-semibold text-white">{value}</p>
      <p className="mt-0.5 text-xs text-white/50">{label}</p>
      <p className="mt-1 text-xs text-white/30">{sub}</p>
    </div>
  );
}

function QuickAction({
  title,
  description,
  icon: Icon,
  onClick,
}: {
  title: string;
  description: string;
  icon: any;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-4 rounded-xl border border-white/10 bg-slate-900/50 p-5 text-left transition-all hover:border-gold/40 hover:bg-slate-800/50"
    >
      <div className="rounded-lg bg-gold/20 p-3">
        <Icon className="h-5 w-5 text-gold" />
      </div>
      <div>
        <p className="font-medium text-white">{title}</p>
        <p className="text-sm text-white/50">{description}</p>
      </div>
    </button>
  );
}

function ImageThumb({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="h-10 w-10 shrink-0 overflow-hidden rounded bg-white/10">
      <img src={src} alt={alt} className="h-full w-full object-cover" />
    </div>
  );
}

function TopProductsView({ orders }: { orders: DbOrder[] }) {
  const top = React.useMemo(() => {
    const map = new Map<string, number>();
    orders.forEach((o) => {
      o.items.forEach((item) => {
        map.set(item.name, (map.get(item.name) ?? 0) + item.quantity);
      });
    });
    return [...map.entries()].sort(([, a], [, b]) => b - a).slice(0, 5);
  }, [orders]);

  if (top.length === 0) return null;

  return (
    <div className="rounded-xl border border-white/10 bg-slate-900/50 p-6">
      <h2 className="mb-4 font-medium text-white">Top Selling Products</h2>
      <div className="space-y-3">
        {top.map(([name, qty], i) => (
          <div key={name} className="flex items-center gap-4">
            <span className="font-mono text-xs text-white/30 w-6">#{i + 1}</span>
            <div className="flex-1 min-w-0">
              <p className="truncate text-sm text-white/80">{name}</p>
            </div>
            <span className="text-sm font-medium text-gold">{qty} sold</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function RevenueChart({ orders }: { orders: DbOrder[] }) {
  const chartData = React.useMemo(() => {
    const m: Record<string, number> = {};
    orders.filter((o) => o.status === "paid").forEach((o) => {
      const d = new Date(o.date);
      const key = d.toLocaleString("en-US", { month: "short", year: "2-digit" });
      m[key] = (m[key] || 0) + o.total;
    });
    return Object.entries(m)
      .sort(([a], [b]) => a.localeCompare(b))
      .slice(-6)
      .map(([label, value]) => ({ label, value }));
  }, [orders]);

  const categoryData = React.useMemo(() => {
    const counts: Record<string, number> = {};
    orders.forEach((o) => {
      o.items.forEach((item) => {
        // Infer category from product name — simplified heuristic
        counts["Sales"] = (counts["Sales"] || 0) + item.quantity;
      });
    });
    return [{ name: "Total Items Sold", value: Object.values(counts)[0] ?? 0 }];
  }, [orders]);

  if (orders.length === 0) {
    return (
      <div className="rounded-xl border border-white/10 bg-slate-900/50 p-6">
        <h2 className="mb-4 font-medium text-white">Revenue Overview</h2>
        <p className="text-sm text-white/30">No order data yet. Revenue will appear here once orders come in.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Bar chart */}
      <div className="rounded-xl border border-white/10 bg-slate-900/50 p-6">
        <h2 className="mb-4 font-medium text-white">Revenue (Last 6 Months)</h2>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={chartData} margin={{ top: 8, right: 12, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
            <XAxis dataKey="label" tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis
              tickFormatter={(v: number) => `$${v >= 1000 ? `${(v / 1000).toFixed(1)}k` : v}`}
              tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{ backgroundColor: "#1e293b", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, fontSize: 13 }}
              labelStyle={{ color: "rgba(255,255,255,0.6)", marginBottom: 4 }}
              formatter={(value) => [`$${Number(value).toLocaleString()}`, "Revenue"]}
            />
            <Bar dataKey="value" fill="#c5a059" radius={[4, 4, 0, 0]} barSize={32} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Category distribution */}
      <div className="rounded-xl border border-white/10 bg-slate-900/50 p-6">
        <h2 className="mb-4 font-medium text-white">Orders by Status</h2>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={[
                { name: "Paid", value: orders.filter((o) => o.status === "paid").length },
                { name: "Pending", value: orders.filter((o) => o.status === "pending").length },
                { name: "Demo", value: orders.filter((o) => o.status === "demo").length },
              ]}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={80}
              paddingAngle={4}
              dataKey="value"
            >
              {[0, 1, 2].map((i) => (
                <Cell key={`cell-${i}`} fill={i === 0 ? "#22c55e" : i === 1 ? "#eab308" : "#3b82f6"} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ backgroundColor: "#1e293b", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8 }}
              formatter={(value, name) => [`${Number(value)} orders`, name as string]}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="mt-3 flex justify-center gap-5 text-xs text-white/50">
          <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-emerald-500" /> Paid ({orders.filter(o => o.status === 'paid').length})</span>
          <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-yellow-500" /> Pending ({orders.filter(o => o.status === 'pending').length})</span>
          <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-blue-500" /> Demo ({orders.filter(o => o.status === 'demo').length})</span>
        </div>
      </div>
    </div>
  );
}

// ─── Product Form Modal ──────────────────────────────────────────────
function ProductForm({
  product,
  form,
  setForm,
  onSave,
  onCancel,
  saving,
  mode,
}: {
  product: Partial<DbProduct> | null;
  form: Partial<DbProduct>;
  setForm: React.Dispatch<React.SetStateAction<Partial<DbProduct>>>;
  onSave: () => void;
  onCancel: () => void;
  saving: boolean;
  mode: "add" | "edit";
}) {
  const update = (field: string, value: any) => setForm((prev) => ({ ...prev, [field]: value }));

  // Auto-generate slug from name
  React.useEffect(() => {
    if (mode === "add" && form.name && !form.slug) {
      update("slug", form.name.toLowerCase().replace(/\s+/g, "-"));
    }
  }, [form.name]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 bg-slate-900">
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between border-b border-white/10 bg-slate-900 px-6 py-4">
          <h2 className="text-lg font-serif text-white">
            {mode === "add" ? "Add New Product" : "Edit Product"}
          </h2>
          <button onClick={onCancel} className="rounded-full p-1.5 text-white/50 hover:bg-white/10 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <div className="p-6 space-y-5">
          {/* Name & Slug */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-white/60">Product Name *</label>
              <Input
                value={form.name ?? ""}
                onChange={(e) => update("name", e.target.value)}
                placeholder="e.g. Silk Charmeuse Blouse"
                className="border-white/10 bg-white/5 text-white placeholder:text-white/30"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-white/60">Slug</label>
              <Input
                value={form.slug ?? ""}
                onChange={(e) => update("slug", e.target.value)}
                placeholder="silk-charmeuse-blouse"
                className="border-white/10 bg-white/5 text-white placeholder:text-white/30"
              />
            </div>
          </div>

          {/* Category & Price */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-white/60">Category</label>
              <select
                value={form.category ?? "apparel"}
                onChange={(e) => update("category", e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white outline-none focus:border-gold/60"
              >
                <option value="apparel">Apparel</option>
                <option value="accessories">Accessories</option>
                <option value="living">Living</option>
                <option value="fragrance">Fragrance</option>
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-white/60">Price ($) *</label>
              <Input
                type="number"
                value={form.price ?? 0}
                onChange={(e) => update("price", Number(e.target.value))}
                placeholder="0.00"
                className="border-white/10 bg-white/5 text-white placeholder:text-white/30"
              />
            </div>
          </div>

          {/* Original Price & Stock */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-white/60">Original Price ($)</label>
              <Input
                type="number"
                value={form.originalPrice ?? ""}
                onChange={(e) => update("originalPrice", e.target.value ? Number(e.target.value) : null)}
                placeholder="Optional"
                className="border-white/10 bg-white/5 text-white placeholder:text-white/30"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-white/60">Stock</label>
              <Input
                type="number"
                value={form.stock ?? 0}
                onChange={(e) => update("stock", Number(e.target.value))}
                className="border-white/10 bg-white/5 text-white placeholder:text-white/30"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-white/60">Rating (1-5)</label>
              <Input
                type="number"
                min={0}
                max={5}
                step={0.1}
                value={form.rating ?? 0}
                onChange={(e) => update("rating", Number(e.target.value))}
                className="border-white/10 bg-white/5 text-white placeholder:text-white/30"
              />
            </div>
          </div>

          {/* Image URL */}
          <div>
            <label className="mb-1.5 block text-xs font-medium text-white/60">Image URL</label>
            <Input
              value={form.image ?? ""}
              onChange={(e) => update("image", e.target.value)}
              placeholder="/photos/products/your-image.webp"
              className="border-white/10 bg-white/5 text-white placeholder:text-white/30"
            />
            <p className="mt-1 text-[10px] text-white/30">Use paths like /photos/products/product-name-1.webp</p>
          </div>

          {/* Material & Description */}
          <div>
            <label className="mb-1.5 block text-xs font-medium text-white/60">Material</label>
            <Input
              value={form.material ?? ""}
              onChange={(e) => update("material", e.target.value)}
              placeholder="e.g. Italian silk"
              className="border-white/10 bg-white/5 text-white placeholder:text-white/30"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-white/60">Description</label>
            <textarea
              value={form.description ?? ""}
              onChange={(e) => update("description", e.target.value)}
              rows={3}
              placeholder="Product description..."
              className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder:text-white/30 outline-none focus:border-gold/60 resize-none"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="mb-1.5 block text-xs font-medium text-white/60">Tags (comma separated)</label>
            <Input
              value={(form.tags ?? []).join(", ")}
              onChange={(e) => update("tags", e.target.value.split(",").map((t) => t.trim()).filter(Boolean))}
              placeholder="Silk, Evening, Luxury"
              className="border-white/10 bg-white/5 text-white placeholder:text-white/30"
            />
          </div>

          {/* Toggles */}
          <div className="flex gap-6">
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                checked={form.isNew ?? false}
                onChange={(e) => update("isNew", e.target.checked)}
                className="h-4 w-4 rounded border-white/20 bg-white/5 text-gold accent-gold"
              />
              <span className="text-sm text-white/70">New Arrival</span>
            </label>
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                checked={form.isFeatured ?? false}
                onChange={(e) => update("isFeatured", e.target.checked)}
                className="h-4 w-4 rounded border-white/20 bg-white/5 text-gold accent-gold"
              />
              <span className="text-sm text-white/70">Featured</span>
            </label>
          </div>

          {/* Preview */}
          <div className="rounded-lg border border-white/10 bg-white/5 p-4">
            <p className="mb-3 text-xs font-medium text-white/40 uppercase tracking-wider">Preview</p>
            <div className="flex gap-4">
              <div className="h-20 w-16 overflow-hidden rounded bg-white/10">
                {form.image && (
                  <img src={form.image} alt="" className="h-full w-full object-cover" />
                )}
              </div>
              <div>
                <p className="font-serif text-white">{form.name || "Product Name"}</p>
                <p className="text-sm text-gold">{form.price ? fmt(form.price) : "$0"}</p>
                <p className="text-xs text-white/40">{form.category}</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              onClick={onCancel}
              className="rounded-lg border border-white/10 px-5 py-2.5 text-sm font-medium text-white/70 hover:bg-white/5"
            >
              Cancel
            </button>
            <button
              onClick={onSave}
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-lg bg-gold px-5 py-2.5 text-sm font-semibold text-obsidian transition-all hover:bg-gold-light disabled:opacity-50"
            >
              {saving ? (
                <RefreshCw className="h-4 w-4 animate-spin" />
              ) : (
                <Check className="h-4 w-4" />
              )}
              {mode === "add" ? "Add Product" : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Mock data fallbacks ─────────────────────────────────────────────
function generateMockOrders(): DbOrder[] {
  return Array.from({ length: 12 }, (_, i) => ({
    id: `LUM-${Date.now().toString(36).toUpperCase()}-${i}`,
    date: new Date(Date.now() - Math.random() * 60 * 24 * 60 * 60 * 1000).toISOString(),
    status: (["paid", "pending", "demo"] as const)[Math.floor(Math.random() * 3)],
    total: Math.random() * 1500 + 100,
    email: `customer${i}@example.com`,
    items: [{ name: "Sample Product", quantity: 1, price: 150, image: "" }],
  }));
}

function generateMockUsers(): DbUser[] {
  return Array.from({ length: 8 }, (_, i) => ({
    id: `user-${i}`,
    name: `Customer ${i + 1}`,
    email: `customer${i + 1}@example.com`,
    role: i === 0 ? "admin" : "user",
    createdAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
  }));
}
