import {
  Settings2,
  Info,
  Wifi,
  Briefcase,
  LayoutDashboard,
  ScrollText,
  ArrowUpRight,
} from "lucide-react";

const CARDS = [
  { label: "Site Settings", desc: "Branding, contact & SEO defaults", href: "/admin/settings", icon: Settings2 },
  { label: "About Page", desc: "Company story, mission & timeline", href: "/admin/about", icon: Info },
  { label: "Broadband Plans", desc: "Categories, durations & pricing", href: "/admin/plans", icon: Wifi },
  { label: "Business Services", desc: "ILL, MPLS, hosting & more", href: "/admin/services", icon: Briefcase },
  { label: "Home Page", desc: "Banners, offers & testimonials", href: "/admin/home/banners", icon: LayoutDashboard },
  { label: "Legal Pages", desc: "Privacy, terms & refund policy", href: "/admin/legal", icon: ScrollText },
];

export default function AdminDashboardPage() {
  return (
    <div>
      <span className="badge-red">Control Panel</span>
      <h1 className="admin-page-title mt-3">Dashboard</h1>
      <p className="admin-page-subtitle mb-6">
        Welcome back. Use the sidebar or the cards below to manage every section of the site.
      </p>

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
