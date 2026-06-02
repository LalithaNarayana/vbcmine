"use client";
import Link from "next/link";
import { Wifi, Tv, CreditCard, Bell, User, RefreshCw, FileText, Headphones, ChevronRight, AlertTriangle } from "lucide-react";

const transactions = [
  { id: "TXN001", date: "01 Jun 2025", plan: "Fiber Premium", amount: "₹999", status: "Success" },
  { id: "TXN002", date: "01 May 2025", plan: "Fiber Premium", amount: "₹999", status: "Success" },
  { id: "TXN003", date: "01 Apr 2025", plan: "Fiber Standard", amount: "₹699", status: "Success" },
  { id: "TXN004", date: "01 Mar 2025", plan: "Fiber Standard", amount: "₹699", status: "Success" },
];

export default function DashboardPage() {
  const daysLeft = 14;
  const expiryDate = "15 Jun 2025";

  return (
    <div style={{ paddingTop: "0px", background: "#c1c1c1", minHeight: "100vh" }}>

      {/* Top Bar */}
      <div style={{ background: "#0D0D0D", borderBottom: "1px solid rgba(204,0,0,0.15)", padding: "20px 24px" }}>
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <div style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "12px", color: "#ffffff", letterSpacing: "1px", textTransform: "uppercase" }}>
              Welcome back
            </div>
            <h1 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "28px", letterSpacing: "2px", color: "#E8E8E8" }}>
              RAVI KUMAR
            </h1>
          </div>
          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <button style={{ background: "none", border: "none", color: "#ffffff", cursor: "pointer", position: "relative" }}>
              <Bell size={20} />
              <span
                style={{
                  position: "absolute",
                  top: "-2px",
                  right: "-2px",
                  width: "8px",
                  height: "8px",
                  background: "#CC0000",
                  borderRadius: "50%",
                }}
              />
            </button>
            <div
              style={{
                width: "36px",
                height: "36px",
                background: "linear-gradient(135deg, #CC0000, #880000)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "50%",
              }}
            >
              <User size={18} color="white" />
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "32px 24px" }}>

        {/* Expiry Alert */}
        {daysLeft <= 15 && (
          <div
            style={{
              background: "rgba(204,0,0,0.08)",
              border: "1px solid rgba(204,0,0,0.3)",
              borderLeft: "4px solid #CC0000",
              padding: "16px 20px",
              marginBottom: "24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "16px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <AlertTriangle size={20} color="#CC0000" />
              <span style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 600, fontSize: "15px", color: "#E8E8E8" }}>
                Your plan expires in <strong style={{ color: "#CC0000" }}>{daysLeft} days</strong> on {expiryDate}
              </span>
            </div>
            <Link href="/renew" className="btn-primary" style={{ textDecoration: "none", fontSize: "12px", padding: "8px 20px", whiteSpace: "nowrap" }}>
              Renew Now
            </Link>
          </div>
        )}

        {/* Main grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "24px" }}>

          {/* Left Sidebar */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

            {/* Active Plan Card */}
            <div
              style={{
                background: "linear-gradient(135deg, #CC0000, #880000)",
                padding: "28px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "-20px",
                  right: "-20px",
                  width: "100px",
                  height: "100px",
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.08)",
                }}
              />
              <div style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.7)", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "6px" }}>
                Active Plan
              </div>
              <div style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "26px", color: "white", letterSpacing: "1px", marginBottom: "4px" }}>
                FIBER PREMIUM
              </div>
              <div style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "40px", color: "white", letterSpacing: "2px", lineHeight: 1 }}>
                300 Mbps
              </div>
              <div style={{ marginTop: "16px", paddingTop: "16px", borderTop: "1px solid rgba(255,255,255,0.2)" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div>
                    <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.6)", letterSpacing: "1px" }}>EXPIRES</div>
                    <div style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: "14px", color: "white" }}>{expiryDate}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.6)", letterSpacing: "1px" }}>DAYS LEFT</div>
                    <div style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "24px", color: "white" }}>{daysLeft}</div>
                  </div>
                </div>
                {/* Progress bar */}
                <div style={{ height: "4px", background: "rgba(255,255,255,0.2)", borderRadius: "2px", marginTop: "12px" }}>
                  <div style={{ height: "100%", width: `${(daysLeft / 30) * 100}%`, background: "white", borderRadius: "2px" }} />
                </div>
              </div>
            </div>

            {/* Account Info */}
            <div className="glass-card" style={{ padding: "24px" }}>
              <h3 style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: "14px", color: "#CC0000", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "16px" }}>
                Account Details
              </h3>
              {[
                { label: "Customer ID", value: "VBC-2024-8821" },
                { label: "Mobile", value: "+91 98XXX XXXXX" },
                { label: "Area", value: "MVP Colony, Sector 4" },
                { label: "Connection", value: "Fiber – FTTH" },
              ].map((item) => (
                <div key={item.label} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  <span style={{ fontSize: "12px", color: "#555" }}>{item.label}</span>
                  <span style={{ fontSize: "13px", color: "#E8E8E8", fontFamily: "'Rajdhani', sans-serif", fontWeight: 600 }}>{item.value}</span>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="glass-card" style={{ padding: "24px" }}>
              <h3 style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: "14px", color: "#CC0000", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "16px" }}>
                Quick Actions
              </h3>
              {[
                { icon: <RefreshCw size={16} />, label: "Renew Plan", href: "/renew" },
                { icon: <Wifi size={16} />, label: "Upgrade Plan", href: "/plans" },
                { icon: <Headphones size={16} />, label: "Raise Ticket", href: "/contact" },
                { icon: <FileText size={16} />, label: "Pay Bill", href: "#" },
              ].map((action) => (
                <Link
                  key={action.label}
                  href={action.href}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "12px 0",
                    borderBottom: "1px solid rgba(255,255,255,0.04)",
                    textDecoration: "none",
                    color: "#888",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#CC0000")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#888")}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    {action.icon}
                    <span style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 600, fontSize: "14px" }}>{action.label}</span>
                  </div>
                  <ChevronRight size={14} />
                </Link>
              ))}
            </div>
          </div>

          {/* Right Main */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>

            {/* Service Status */}
            <div className="glass-card" style={{ padding: "24px" }}>
              <h3 style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: "14px", color: "#CC0000", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "20px" }}>
                Service Status
              </h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
                {[
                  { icon: <Wifi size={24} />, label: "Internet", status: "Active", speed: "300 Mbps" },
                  { icon: <Tv size={24} />, label: "Digital TV", status: "Inactive", speed: "—" },
                  { icon: <CreditCard size={24} />, label: "Auto-Renew", status: "Enabled", speed: "₹999/mo" },
                ].map((s) => (
                  <div
                    key={s.label}
                    style={{
                      background: "rgba(255,255,255,0.02)",
                      border: `1px solid ${s.status === "Active" || s.status === "Enabled" ? "rgba(204,0,0,0.2)" : "rgba(255,255,255,0.05)"}`,
                      padding: "20px",
                      textAlign: "center",
                    }}
                  >
                    <div style={{ color: s.status === "Inactive" ? "#444" : "#CC0000", marginBottom: "10px", display: "flex", justifyContent: "center" }}>
                      {s.icon}
                    </div>
                    <div style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: "14px", color: "#E8E8E8", marginBottom: "4px" }}>
                      {s.label}
                    </div>
                    <div
                      style={{
                        fontSize: "11px",
                        padding: "2px 10px",
                        display: "inline-block",
                        background: s.status === "Inactive" ? "rgba(255,255,255,0.04)" : "rgba(204,0,0,0.15)",
                        color: s.status === "Inactive" ? "#444" : "#CC0000",
                        letterSpacing: "1px",
                        fontFamily: "'Rajdhani', sans-serif",
                        fontWeight: 600,
                        marginBottom: "6px",
                      }}
                    >
                      {s.status}
                    </div>
                    <div style={{ fontSize: "12px", color: "#555" }}>{s.speed}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Transaction History */}
            <div className="glass-card" style={{ padding: "24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <h3 style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: "14px", color: "#CC0000", letterSpacing: "1px", textTransform: "uppercase" }}>
                  Transaction History
                </h3>
                <button style={{ background: "none", border: "none", color: "#555", cursor: "pointer", fontFamily: "'Rajdhani', sans-serif", fontSize: "12px", letterSpacing: "1px" }}>
                  View All →
                </button>
              </div>

              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    {["Txn ID", "Date", "Plan", "Amount", "Status"].map((h) => (
                      <th
                        key={h}
                        style={{
                          textAlign: "left",
                          padding: "8px 12px",
                          fontFamily: "'Rajdhani', sans-serif",
                          fontWeight: 600,
                          fontSize: "11px",
                          color: "#444",
                          letterSpacing: "1px",
                          textTransform: "uppercase",
                          borderBottom: "1px solid rgba(255,255,255,0.05)",
                        }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((t) => (
                    <tr
                      key={t.id}
                      style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLTableRowElement).style.background = "rgba(255,255,255,0.02)")}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLTableRowElement).style.background = "transparent")}
                    >
                      <td style={{ padding: "12px", fontFamily: "'Rajdhani', sans-serif", fontSize: "13px", color: "#CC0000" }}>{t.id}</td>
                      <td style={{ padding: "12px", fontSize: "13px", color: "#666" }}>{t.date}</td>
                      <td style={{ padding: "12px", fontSize: "13px", color: "#888" }}>{t.plan}</td>
                      <td style={{ padding: "12px", fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: "14px", color: "#E8E8E8" }}>{t.amount}</td>
                      <td style={{ padding: "12px" }}>
                        <span
                          style={{
                            background: "rgba(0,180,0,0.1)",
                            color: "#00b400",
                            border: "1px solid rgba(0,180,0,0.3)",
                            padding: "2px 10px",
                            fontSize: "11px",
                            fontFamily: "'Rajdhani', sans-serif",
                            fontWeight: 600,
                            letterSpacing: "0.5px",
                          }}
                        >
                          {t.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <style>{`@media(max-width:900px){div[style*="grid-template-columns: 1fr 2fr"]{grid-template-columns:1fr!important;}}`}</style>
    </div>
  );
}