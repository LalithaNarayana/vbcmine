"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronsLeft, ChevronsRight } from "lucide-react";

const NAV_GROUPS = [
  {
    label: "General",
    items: [
      { label: "Dashboard", href: "/admin" },
      { label: "Settings", href: "/admin/settings" },
      { label: "Section Titles", href: "/admin/content/section-headings" },
    ],
  },
  {
    label: "About Page",
    items: [
      { label: "Content", href: "/admin/about" },
      { label: "Stats (Red Band)", href: "/admin/about/stats" },
      { label: "Success Story Timeline", href: "/admin/about/timeline" },
    ],
  },
  {
    label: "Broadband Plans",
    items: [
      { label: "Categories", href: "/admin/plans/categories" },
      { label: "Durations", href: "/admin/plans/durations" },
      { label: "Bullet Points", href: "/admin/plans/bullets" },
      { label: "Plans", href: "/admin/plans" },
    ],
  },
  {
    label: "Business",
    items: [{ label: "Services", href: "/admin/services" }],
  },
  {
    label: "Connections",
    items: [
      { label: "Master Settings", href: "/admin/master" },
      { label: "Sales", href: "/admin/sales" },
    ],
  },
  {
    label: "Home Page",
    items: [
      { label: "Banners", href: "/admin/home/banners" },
      { label: "What We Offer", href: "/admin/home/offer-cards" },
      { label: "Plans Section", href: "/admin/home/plans-section" },
      { label: "Why Choose Us", href: "/admin/home/why-choose" },
      { label: "Testimonials", href: "/admin/home/testimonials" },
      { label: "Clients", href: "/admin/home/clients" },
      { label: "CTA Band", href: "/admin/home/cta-band" },
    ],
  },
  {
    label: "Legal",
    items: [{ label: "Privacy / Terms / Refund", href: "/admin/legal" }],
  },
  {
    label: "Contact",
    items: [
      { label: "Sales Enquiry Cities", href: "/admin/contact/cities" },
    ],
  },
  {
    label: "FAQ",
    items: [{ label: "Questions & Answers", href: "/admin/faq" }],
  },
];

const COLLAPSE_KEY = "admin-sidebar-collapsed";

export default function AdminSidebar() {
  const pathname = usePathname();
  const [favicon, setFavicon] = useState("");
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((json) => setFavicon(json?.favicon || ""))
      .catch(() => {});

    const stored = typeof window !== "undefined" ? window.localStorage.getItem(COLLAPSE_KEY) : null;
    if (stored === "1") setCollapsed(true);
  }, []);

  function toggleCollapsed() {
    setCollapsed((prev) => {
      const next = !prev;
      if (typeof window !== "undefined") {
        window.localStorage.setItem(COLLAPSE_KEY, next ? "1" : "0");
      }
      return next;
    });
  }

  return (
    <aside className={`admin-sidebar hidden md:block ${collapsed ? "collapsed" : ""}`}>
      <div className="admin-sidebar-brand">
        <div className="admin-sidebar-brand-mark">
          {favicon ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={favicon} alt="VBC" style={{ width: "100%", height: "100%", objectFit: "contain", borderRadius: 8 }} />
          ) : (
            "VB"
          )}
        </div>
        {!collapsed && (
          <div className="admin-sidebar-brand-text-wrap">
            <div className="admin-sidebar-brand-text">VBC Admin</div>
            <div className="admin-sidebar-brand-sub">Control Panel</div>
          </div>
        )}
        <button
          type="button"
          onClick={toggleCollapsed}
          className="admin-sidebar-collapse-btn"
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronsRight size={22} /> : <ChevronsLeft size={22} />}
        </button>
      </div>

      <nav className="py-4 space-y-5">
        {NAV_GROUPS.map((group) => (
          <div key={group.label} className="admin-nav-group">
            {!collapsed && <p className="admin-nav-group-label">{group.label}</p>}
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`admin-nav-link ${active ? "active" : ""}`}
                    title={collapsed ? item.label : undefined}
                  >
                    <span className="admin-nav-dot" />
                    {!collapsed && <span className="admin-nav-link-text">{item.label}</span>}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}
