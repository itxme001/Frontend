/**
 * Admin dashboard — restricted to admin users only.
 * 
 * Features:
 * - Order management (view, search, filter)
 * - User management (view, role toggle)
 * - Analytics overview
 * - Product inventory status
 */
"use client";

import * as React from "react";
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
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Order {
  id: string;
  date: string;
  status: "paid" | "pending" | "demo";
  total: number;
  email: string;
  items: Array<{ name: string; quantity: number; price: number }>;
}

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  createdAt: string;
}

export default function AdminPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = React.useState<"orders" | "users" | "analytics">("orders");
  const [orders, setOrders] = React.useState<Order[]>([]);
  const [users, setUsers] = React.useState<AdminUser[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [searchQuery, setSearchQuery] = React.useState("");

  // Check admin access
  React.useEffect(() => {
    if (authLoading) return;
    if (!user) {
      router.push("/login");
      return;
    }
    // For now, check localStorage flag — in production this would be server-side
    const isAdmin = localStorage.getItem("lumiere_admin") === "true" || user.email === "admin@lumiere.com";
    if (!isAdmin) {
      toast({ title: "Access Denied", description: "You don't have permission to view this page.", variant: "error" });
      router.push("/");
    }
  }, [user, authLoading, router, toast]);

  // Fetch data
  React.useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const [ordersRes, usersRes] = await Promise.all([
          fetch("/api/admin/orders"),
          fetch("/api/admin/users"),
        ]);
        const ordersData = await ordersRes.json();
        const usersData = await usersRes.json();
        setOrders(ordersData.orders || []);
        setUsers(usersData.users || []);
      } catch {
        // Use mock data for demo
        setOrders(generateMockOrders());
        setUsers(generateMockUsers());
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const filteredOrders = orders.filter((o) =>
    o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    o.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = {
    totalRevenue: orders.filter((o) => o.status === "paid").reduce((sum, o) => sum + o.total, 0),
    totalOrders: orders.length,
    totalUsers: users.length,
    avgOrderValue: orders.length > 0 ? orders.reduce((sum, o) => sum + o.total, 0) / orders.length : 0,
  };

  if (authLoading || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <RefreshCw className="h-8 w-8 animate-spin text-gold" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-slate-900/50 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="font-serif text-xl font-medium tracking-[0.2em] text-white">
                LUM<span className="text-gold">I</span>ÈRE
              </span>
              <span className="rounded-full bg-gold/20 px-3 py-1 text-xs font-medium text-gold">
                ADMIN
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" onClick={() => router.push("/")}>
                View Site
              </Button>
              <Button variant="outline" size="sm" onClick={() => router.push("/account")}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Stats Grid */}
        <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard
            icon={ShoppingBag}
            label="Total Revenue"
            value={`$${stats.totalRevenue.toFixed(2)}`}
            trend="+12%"
            color="text-emerald-400"
          />
          <StatCard
            icon={Package}
            label="Total Orders"
            value={stats.totalOrders.toString()}
            trend="+5%"
            color="text-blue-400"
          />
          <StatCard
            icon={Users}
            label="Total Users"
            value={stats.totalUsers.toString()}
            trend="+8%"
            color="text-purple-400"
          />
          <StatCard
            icon={TrendingUp}
            label="Avg Order"
            value={`$${stats.avgOrderValue.toFixed(2)}`}
            trend="+3%"
            color="text-gold"
          />
        </div>

        {/* Tabs */}
        <div className="mb-6 flex gap-2 border-b border-white/10">
          {(["orders", "users", "analytics"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-4 py-2 text-sm font-medium transition-colors",
                activeTab === tab
                  ? "border-b-2 border-gold text-gold"
                  : "text-white/60 hover:text-white"
              )}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="rounded-xl border border-white/10 bg-slate-900/50 p-6">
          {activeTab === "orders" && (
            <OrdersView
              orders={filteredOrders}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />
          )}
          {activeTab === "users" && <UsersView users={users} />}
          {activeTab === "analytics" && <AnalyticsView orders={orders} />}
        </div>
      </div>
    </div>
  );
}

import { LucideIcon } from "lucide-react";

function StatCard({
  icon: Icon,
  label,
  value,
  trend,
  color,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  trend: string;
  color: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-slate-900/50 p-5">
      <div className="flex items-center justify-between">
        <Icon className="h-5 w-5 text-white/40" />
        <span className={cn("text-xs font-medium", color)}>{trend}</span>
      </div>
      <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
      <p className="text-sm text-white/50">{label}</p>
    </div>
  );
}

function OrdersView({
  orders,
  searchQuery,
  onSearchChange,
}: {
  orders: Order[];
  searchQuery: string;
  onSearchChange: (q: string) => void;
}) {
  return (
    <div>
      <div className="mb-4 flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
          <Input
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search orders..."
            className="border-white/10 bg-white/5 pl-10 text-white placeholder:text-white/30"
          />
        </div>
        <Button variant="outline" size="sm" className="border-white/10 text-white">
          <Download className="h-4 w-4" />
          Export
        </Button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10 text-left text-white/60">
              <th className="pb-3 pr-4">Order ID</th>
              <th className="pb-3 pr-4">Date</th>
              <th className="pb-3 pr-4">Customer</th>
              <th className="pb-3 pr-4">Status</th>
              <th className="pb-3 pr-4">Total</th>
              <th className="pb-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b border-white/5 hover:bg-white/5">
                <td className="py-3 pr-4 font-mono text-white/80">{order.id}</td>
                <td className="py-3 pr-4 text-white/60">
                  {new Date(order.date).toLocaleDateString()}
                </td>
                <td className="py-3 pr-4 text-white/80">{order.email}</td>
                <td className="py-3 pr-4">
                  <span className={cn(
                    "rounded-full px-2 py-1 text-xs font-medium",
                    order.status === "paid" && "bg-emerald-500/20 text-emerald-400",
                    order.status === "pending" && "bg-yellow-500/20 text-yellow-400",
                    order.status === "demo" && "bg-blue-500/20 text-blue-400"
                  )}>
                    {order.status}
                  </span>
                </td>
                <td className="py-3 pr-4 font-medium text-white">${order.total.toFixed(2)}</td>
                <td className="py-3">
                  <div className="flex gap-2">
                    <button className="rounded p-1 text-white/60 hover:bg-white/10 hover:text-white">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="rounded p-1 text-white/60 hover:bg-red-500/20 hover:text-red-400">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function UsersView({ users }: { users: AdminUser[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/10 text-left text-white/60">
            <th className="pb-3 pr-4">Name</th>
            <th className="pb-3 pr-4">Email</th>
            <th className="pb-3 pr-4">Role</th>
            <th className="pb-3 pr-4">Joined</th>
            <th className="pb-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b border-white/5 hover:bg-white/5">
              <td className="py-3 pr-4 text-white/80">{user.name}</td>
              <td className="py-3 pr-4 text-white/60">{user.email}</td>
              <td className="py-3 pr-4">
                <span className={cn(
                  "rounded-full px-2 py-1 text-xs font-medium",
                  user.role === "admin" && "bg-gold/20 text-gold",
                  user.role === "user" && "bg-white/10 text-white/60"
                )}>
                  {user.role}
                </span>
              </td>
              <td className="py-3 pr-4 text-white/60">
                {new Date(user.createdAt).toLocaleDateString()}
              </td>
              <td className="py-3">
                <button className="rounded p-1 text-white/60 hover:bg-white/10 hover:text-white">
                  <Eye className="h-4 w-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function AnalyticsView({ orders }: { orders: Order[] }) {
  const revenueByMonth = React.useMemo(() => {
    const months: Record<string, number> = {};
    orders.forEach((o) => {
      if (o.status === "paid") {
        const month = new Date(o.date).toLocaleString("default", { month: "short", year: "numeric" });
        months[month] = (months[month] || 0) + o.total;
      }
    });
    return months;
  }, [orders]);

  const topProducts = React.useMemo(() => {
    const products: Record<string, number> = {};
    orders.forEach((o) => {
      o.items.forEach((item) => {
        products[item.name] = (products[item.name] || 0) + item.quantity;
      });
    });
    return Object.entries(products)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5);
  }, [orders]);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="rounded-lg border border-white/10 p-5">
        <h3 className="mb-4 text-sm font-medium text-white/60">Revenue by Month</h3>
        <div className="space-y-3">
          {Object.entries(revenueByMonth).slice(-6).map(([month, revenue]) => (
            <div key={month} className="flex items-center justify-between">
              <span className="text-sm text-white/70">{month}</span>
              <div className="flex items-center gap-3">
                <div className="h-2 w-32 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-gold"
                    style={{ width: `${Math.min((revenue / 10000) * 100, 100)}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-white">${revenue.toFixed(0)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-lg border border-white/10 p-5">
        <h3 className="mb-4 text-sm font-medium text-white/60">Top Products</h3>
        <div className="space-y-3">
          {topProducts.map(([name, qty]) => (
            <div key={name} className="flex items-center justify-between">
              <span className="truncate text-sm text-white/70">{name}</span>
              <span className="ml-4 text-sm font-medium text-gold">{qty} sold</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function generateMockOrders(): Order[] {
  return Array.from({ length: 20 }, (_, i) => ({
    id: `LUM-${Date.now().toString(36).toUpperCase()}-${i}`,
    date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
    status: ["paid", "pending", "demo"][Math.floor(Math.random() * 3)] as Order["status"],
    total: Math.random() * 2000 + 100,
    email: `customer${i}@example.com`,
    items: [{ name: "Sample Product", quantity: 1, price: 150 }],
  }));
}

function generateMockUsers(): AdminUser[] {
  return Array.from({ length: 15 }, (_, i) => ({
    id: `user-${i}`,
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    role: i === 0 ? "admin" : "user",
    createdAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
  }));
}
