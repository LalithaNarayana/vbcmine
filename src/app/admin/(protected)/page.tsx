"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Settings2,
  Info,
  Wifi,
  Briefcase,
  LayoutDashboard,
  ScrollText,
  ArrowUpRight,
  Users,
  Clock,
  CheckCircle2,
  CalendarDays,
  ArrowRight,
  UserCheck,
  IndianRupee,
} from "lucide-react";

const CARDS = [
  { label: "Site Settings", desc: "Branding, contact & SEO defaults", href: "/admin/settings", icon: Settings2 },
  { label: "About Page", desc: "Company story, mission & timeline", href: "/admin/about", icon: Info },
  { label: "Broadband Plans", desc: "Categories, durations & pricing", href: "/admin/plans", icon: Wifi },
  { label: "Business Services", desc: "ILL, MPLS, hosting & more", href: "/admin/services", icon: Briefcase },
  { label: "Home Page", desc: "Banners, offers & testimonials", href: "/admin/home/banners", icon: LayoutDashboard },
  { label: "Legal Pages", desc: "Privacy, terms & refund policy", href: "/admin/legal", icon: ScrollText },
];

interface SalesPlan {
  _id: string;
  name: string;
  speed: number;
  speedUnit: string;
}

interface SalesRequest {
  _id: string;
  name: string;
  mobile: string;
  address: string;
  landmark: string;
  plan: SalesPlan | null;
  status: "pending" | "assigned";
  accountId: string | null;
  createdAt: string;
}

interface DashboardStats {
  totalUsers: number;
  activeSubscriptions: number;
  revenueThisMonth: number;
}

function isToday(iso: string): boolean {
  const d = new Date(iso);
  const now = new Date();
  return (
    d.getFullYear() === now.getFullYear() &&
    d.getMonth() === now.getMonth() &&
    d.getDate() === now.getDate()
  );
}

function timeAgo(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export default function AdminDashboardPage() {
  const [requests, setRequests] = useState<SalesRequest[] | null>(null);
  const [dashboardStats, setDashboardStats] = useState<DashboardStats | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/connection-requests")
      .then((res) => (res.ok ? res.json() : []))
      .then((data: SalesRequest[]) => {
        if (!cancelled) setRequests(data);
      })
      .catch(() => {
        if (!cancelled) setRequests([]);
      });
    fetch("/api/admin/dashboard-stats")
      .then((res) => (res.ok ? res.json() : null))
      .then((data: DashboardStats | null) => {
        if (!cancelled) setDashboardStats(data);
      })
      .catch(() => {
        if (!cancelled) setDashboardStats(null);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const stats = useMemo(() => {
    const list = requests || [];
    return {
      total: list.length,
      pending: list.filter((r) => r.status === "pending").length,
      assigned: list.filter((r) => r.status === "assigned").length,
      today: list.filter((r) => isToday(r.createdAt)).length,
    };
  }, [requests]);

  const recent = useMemo(() => (requests || []).slice(0, 6), [requests]);
  const loading = requests === null;

  const STAT_CARDS = [
    { label: "Total Requests", value: stats.total, icon: Users, tone: "#14213D" },
    { label: "Pending", value: stats.pending, icon: Clock, tone: "#b54708" },
    { label: "Assigned / Active", value: stats.assigned, icon: CheckCircle2, tone: "#067647" },
    { label: "Requests Today", value: stats.today, icon: CalendarDays, tone: "#CC0000" },
  ];

  const ACCOUNT_STAT_CARDS = [
    { label: "Total Users", value: dashboardStats?.totalUsers, icon: Users, tone: "#14213D" },
    { label: "Active Subscriptions", value: dashboardStats?.activeSubscriptions, icon: UserCheck, tone: "#067647" },
    {
      label: "Revenue This Month",
      value: dashboardStats ? `₹${dashboardStats.revenueThisMonth.toLocaleString("en-IN")}` : undefined,
      icon: IndianRupee,
      tone: "#CC0000",
    },
  ];

  return (
    <div>
      <span className="badge-red">Control Panel</span>
      <h1 className="admin-page-title mt-3">Dashboard</h1>
      <p className="admin-page-subtitle mb-6">
        Welcome back. Here&apos;s what&apos;s happening with connection requests right now.
      </p>

      {/* Account-level summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {ACCOUNT_STAT_CARDS.map((s) => (
          <div key={s.label} className="admin-card p-5">
            <div className="flex items-center justify-between">
              <span
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ background: `${s.tone}14`, color: s.tone }}
              >
                <s.icon size={18} />
              </span>
            </div>
            <div className="mt-4 text-2xl font-bold text-gray-900">
              {s.value === undefined ? "—" : s.value}
            </div>
            <div className="text-xs text-gray-500 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Live request stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {STAT_CARDS.map((s) => (
          <div key={s.label} className="admin-card p-5">
            <div className="flex items-center justify-between">
              <span
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ background: `${s.tone}14`, color: s.tone }}
              >
                <s.icon size={18} />
              </span>
            </div>
            <div className="mt-4 text-2xl font-bold text-gray-900">
              {loading ? "—" : s.value}
            </div>
            <div className="text-xs text-gray-500 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Recent connection requests */}
      <div className="admin-card mb-8">
        <div className="admin-card-header flex items-center justify-between">
          <h2 className="admin-card-title">Recent Connection Requests</h2>
          <Link
            href="/admin/sales"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              fontSize: "12px",
              fontWeight: 600,
              color: "#CC0000",
              textDecoration: "none",
            }}
          >
            View all <ArrowRight size={13} />
          </Link>
        </div>
        <div className="admin-card-body" style={{ overflowX: "auto" }}>
          {loading ? (
            <p className="admin-page-subtitle">Loading…</p>
          ) : recent.length === 0 ? (
            <p className="admin-page-subtitle">No connection requests yet.</p>
          ) : (
            <table className="admin-table w-full text-left" style={{ borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th className="px-3 py-2">Customer Details</th>
                  <th className="px-3 py-2">Plan</th>
                  <th className="px-3 py-2">Requested</th>
                  <th className="px-3 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {recent.map((item) => (
                  <tr key={item._id} className="border-t border-gray-100">
                    <td className="px-3 py-3" style={{ minWidth: "220px" }}>
                      <div className="font-medium text-gray-900">{item.name}</div>
                      <div style={{ fontSize: "12px", color: "#667085", marginTop: "2px" }}>{item.mobile}</div>
                    </td>
                    <td className="px-3 py-3">
                      {item.plan ? `${item.plan.name} (${item.plan.speed} ${item.plan.speedUnit})` : "—"}
                    </td>
                    <td className="px-3 py-3" style={{ whiteSpace: "nowrap", color: "#667085", fontSize: "13px" }}>
                      {timeAgo(item.createdAt)}
                    </td>
                    <td className="px-3 py-3">
                      <span
                        style={{
                          display: "inline-block",
                          borderRadius: "999px",
                          padding: "3px 10px",
                          fontSize: "11px",
                          fontWeight: 600,
                          letterSpacing: "0.5px",
                          textTransform: "uppercase",
                          background: item.status === "assigned" ? "#ecfdf3" : "#fff4e5",
                          color: item.status === "assigned" ? "#067647" : "#b54708",
                        }}
                      >
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Content management shortcuts */}
      <h2 className="admin-card-title mb-3">Manage Site Content</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {CARDS.map((item) => (
          <a key={item.href} href={item.href} className="admin-card p-5 group block">
            <div className="flex items-start justify-between">
              <span className="w-10 h-10 rounded-lg flex items-center justify-center bg-red-50 text-red-600">
                <item.icon size={18} />
              </span>
              <ArrowUpRight
                size={16}
                className="text-gray-300 group-hover:text-red-500 transition"
              />
            </div>
            <div className="mt-4 text-sm font-semibold text-gray-900">{item.label}</div>
            <div className="text-xs text-gray-500 mt-1">{item.desc}</div>
          </a>
        ))}
      </div>
    </div>
  );
}
