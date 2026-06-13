"use client";
import Link from "next/link";
import { Wifi, CreditCard, Bell, User, RefreshCw, FileText, Headphones, ChevronRight, AlertTriangle, BarChart2, ArrowUpCircle, Clock } from "lucide-react";

const transactions = [
  { id: "TXN001", date: "01 Jun 2025", plan: "100 Mbps – Internet+OTT", amount: "₹799", status: "Success" },
  { id: "TXN002", date: "01 May 2025", plan: "100 Mbps – Internet+OTT", amount: "₹799", status: "Success" },
  { id: "TXN003", date: "01 Apr 2025", plan: "50 Mbps – Only Internet", amount: "₹599", status: "Success" },
  { id: "TXN004", date: "01 Mar 2025", plan: "50 Mbps – Only Internet", amount: "₹599", status: "Success" },
];

export default function DashboardPage() {
  const daysLeft = 14;
  const expiryDate = "25 Jun 2025";
  const usedGB = 312;
  const totalGB = 1000;
  const usedPct = Math.round((usedGB / totalGB) * 100);

  return (
    <div style={{ paddingTop: "0px", background: "#f0f2f5", minHeight: "100vh" }}>
      {/* Top Bar */}
      <div style={{ background: "#0D0D0D", borderBottom: "1px solid rgba(204,0,0,0.15)", padding: "20px 24px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "12px", color: "#ffffff", letterSpacing: "1px", textTransform: "uppercase" }}>Welcome back</div>
            <h1 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "28px", letterSpacing: "2px", color: "#E8E8E8" }}>RAVI KUMAR</h1>
          </div>
          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <button style={{ background: "none", border: "none", color: "#ffffff", cursor: "pointer", position: "relative" }}>
              <Bell size={20} />
              <span style={{ position: "absolute", top: "-2px", right: "-2px", width: "8px", height: "8px", background: "#CC0000", borderRadius: "50%" }} />
            </button>
            <div style={{ width: "36px", height: "36px", background: "linear-gradient(135deg, #CC0000, #880000)", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "50%" }}>
              <User size={18} color="white" />
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "32px 24px" }}>
        {/* Expiry Alert */}
        {daysLeft <= 15 && (
          <div style={{ background: "rgba(204,0,0,0.08)", border: "1px solid rgba(204,0,0,0.3)", borderLeft: "4px solid #CC0000", padding: "16px 20px", marginBottom: "24px", display: "flex", alignItems: "center", gap: "12px", borderRadius: "8px" }}>
            <AlertTriangle size={18} color="#CC0000" />
            <div style={{ flex: 1 }}>
              <span style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: "14px", color: "#14213D" }}>Plan expiring in {daysLeft} days — {expiryDate}</span>
              <span style={{ fontSize: "13px", color: "#667085", marginLeft: 8 }}>Renew now to avoid interruption.</span>
            </div>
            <Link href="/renew" style={{ background: "#CC0000", color: "#fff", fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: "12px", letterSpacing: 1, textDecoration: "none", padding: "8px 18px", borderRadius: "6px" }}>RENEW NOW</Link>
          </div>
        )}

        {/* Top cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20, marginBottom: 28 }}>
          {/* Active Plan */}
          <div style={{ background: "linear-gradient(135deg, #14213D 0%, #1e3a5f 100%)", borderRadius: 12, padding: "28px", color: "#fff" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
              <Wifi size={20} color="#CC0000" />
              <span style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: 1, textTransform: "uppercase", color: "rgba(255,255,255,0.6)" }}>Active Plan</span>
            </div>
            <div style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 26, letterSpacing: 1, marginBottom: 4 }}>100 Mbps – Internet + OTT</div>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", marginBottom: 16 }}>30 OTT Apps • Expires {expiryDate}</div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 32, color: "#CC0000" }}>₹799<span style={{ fontSize: 14, color: "rgba(255,255,255,0.5)" }}>/mo</span></span>
              <Link href="/renew" style={{ background: "#CC0000", color: "#fff", fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: 1, textDecoration: "none", padding: "8px 16px", borderRadius: 6 }}>RENEW</Link>
            </div>
          </div>

          {/* Data Usage */}
          <div style={{ background: "#fff", border: "1px solid rgba(20,33,61,0.08)", borderRadius: 12, padding: "28px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
              <BarChart2 size={20} color="#CC0000" />
              <span style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: 1, textTransform: "uppercase", color: "#667085" }}>Data Usage</span>
            </div>
            <div style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 32, color: "#14213D", marginBottom: 4 }}>{usedGB} GB <span style={{ fontSize: 16, color: "#9CA3AF" }}>/ {totalGB} GB</span></div>
            <div style={{ background: "#f0f0f0", borderRadius: 999, height: 8, marginBottom: 10, overflow: "hidden" }}>
              <div style={{ width: `${usedPct}%`, height: "100%", background: usedPct > 80 ? "#CC0000" : "#14213D", borderRadius: 999, transition: "width 0.5s" }} />
            </div>
            <div style={{ fontSize: 12, color: "#667085" }}>{usedPct}% used this month • {totalGB - usedGB} GB remaining</div>
          </div>

          {/* Upgrade Option */}
          <div style={{ background: "rgba(204,0,0,0.04)", border: "1px solid rgba(204,0,0,0.15)", borderRadius: 12, padding: "28px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
              <ArrowUpCircle size={20} color="#CC0000" />
              <span style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: 1, textTransform: "uppercase", color: "#667085" }}>Upgrade Plan</span>
            </div>
            <div style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 22, color: "#14213D", marginBottom: 8 }}>200 Mbps + 30 OTTs</div>
            <div style={{ fontSize: 13, color: "#667085", marginBottom: 16 }}>Upgrade to 200 Mbps for just ₹999/mo</div>
            <Link href="/plans" style={{ display: "inline-block", background: "#CC0000", color: "#fff", fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: 1, textDecoration: "none", padding: "10px 20px", borderRadius: 6 }}>VIEW PLANS</Link>
          </div>
        </div>

        {/* Quick Actions */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 14, marginBottom: 28 }}>
          {[
            { icon: <CreditCard size={20} />, label: "Pay Bill", href: "/renew", color: "#CC0000" },
            { icon: <FileText size={20} />, label: "View Bill", href: "#bills", color: "#0055CC" },
            { icon: <BarChart2 size={20} />, label: "Data Usage", href: "#usage", color: "#006633" },
            { icon: <RefreshCw size={20} />, label: "Renew Plan", href: "/renew", color: "#CC0000" },
            { icon: <ArrowUpCircle size={20} />, label: "Upgrade", href: "/plans", color: "#8B1A1A" },
            { icon: <Headphones size={20} />, label: "Support", href: "/contact", color: "#14213D" },
          ].map((action, i) => (
            <Link key={i} href={action.href} style={{ background: "#fff", border: "1px solid rgba(20,33,61,0.08)", borderRadius: 10, padding: "20px 16px", display: "flex", flexDirection: "column", alignItems: "center", gap: 10, textDecoration: "none", transition: "box-shadow 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 8px 24px rgba(20,33,61,0.1)")}
              onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}>
              <div style={{ width: 44, height: 44, borderRadius: 10, background: `${action.color}15`, display: "flex", alignItems: "center", justifyContent: "center", color: action.color }}>{action.icon}</div>
              <span style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 13, color: "#344054", textAlign: "center" }}>{action.label}</span>
            </Link>
          ))}
        </div>

        {/* Bill History */}
        <div id="bills" style={{ background: "#fff", border: "1px solid rgba(20,33,61,0.08)", borderRadius: 12, padding: "28px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <div style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 18, color: "#14213D", display: "flex", alignItems: "center", gap: 8 }}>
              <Clock size={18} color="#CC0000" /> Bill History
            </div>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid #f0f0f0" }}>
                  {["Transaction ID", "Date", "Plan", "Amount", "Status"].map((h) => (
                    <th key={h} style={{ textAlign: "left", padding: "10px 14px", fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 12, color: "#667085", letterSpacing: 1, textTransform: "uppercase" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {transactions.map((t) => (
                  <tr key={t.id} style={{ borderBottom: "1px solid #f9f9f9" }}>
                    <td style={{ padding: "14px", fontFamily: "monospace", fontSize: 13, color: "#14213D" }}>{t.id}</td>
                    <td style={{ padding: "14px", fontSize: 13, color: "#475467" }}>{t.date}</td>
                    <td style={{ padding: "14px", fontSize: 13, color: "#475467" }}>{t.plan}</td>
                    <td style={{ padding: "14px", fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 15, color: "#14213D" }}>{t.amount}</td>
                    <td style={{ padding: "14px" }}>
                      <span style={{ background: "rgba(0,100,50,0.1)", color: "#006432", fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: 0.5, padding: "4px 10px", borderRadius: 999 }}>{t.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
