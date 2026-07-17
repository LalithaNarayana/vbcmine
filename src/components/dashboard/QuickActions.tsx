"use client";
import Link from "next/link";
import { RefreshCw, FileText, Headphones, Wifi, TrendingUp, CreditCard, PlusCircle } from "lucide-react";

interface QuickActionsProps {
  onGetNewConnection?: () => void;
}

export default function QuickActions({ onGetNewConnection }: QuickActionsProps) {
  const actions: {
    icon: React.ReactNode;
    label: string;
    href?: string;
    onClick?: () => void;
    primary: boolean;
  }[] = [
    { icon: <RefreshCw size={20} />, label: "Renew Plan", href: "/renew", primary: true },
    { icon: <FileText size={20} />, label: "Raise Ticket", href: "/dashboard/complaints", primary: false },
    { icon: <Headphones size={20} />, label: "Support", href: "/contact", primary: false },
    { icon: <Wifi size={20} />, label: "Speed Test", href: "#", primary: false },
    { icon: <TrendingUp size={20} />, label: "Upgrade Plan", href: "/plans?upgrade=1", primary: false },
    { icon: <CreditCard size={20} />, label: "Pay Bill", href: "/renew", primary: false },
    ...(onGetNewConnection
      ? [{ icon: <PlusCircle size={20} />, label: "Get New Connection", onClick: onGetNewConnection, primary: false }]
      : []),
  ];

  return (
    <div>
      <h3 style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: "13px", letterSpacing: "2px", textTransform: "uppercase", color: "var(--vbc-muted)", marginBottom: "16px" }}>Quick Actions</h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px" }}>
        {actions.map((a, i) => {
          const tileStyle: React.CSSProperties = {
            display: "flex", flexDirection: "column", alignItems: "center", gap: "8px",
            padding: "20px 12px", textDecoration: "none",
            borderRadius: "10px",
            background: a.primary ? "rgba(204,0,0,0.06)" : "var(--vbc-surface)",
            border: a.primary ? "1px solid rgba(204,0,0,0.3)" : "1px solid var(--vbc-border)",
            boxShadow: a.primary ? "none" : "var(--vbc-shadow)",
            transition: "all 0.2s",
            cursor: a.onClick ? "pointer" : undefined,
            width: "100%",
            font: "inherit",
          };
          const onMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
            (e.currentTarget as HTMLElement).style.background = "rgba(204,0,0,0.1)";
            (e.currentTarget as HTMLElement).style.borderColor = "rgba(204,0,0,0.3)";
          };
          const onMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
            (e.currentTarget as HTMLElement).style.background = a.primary ? "rgba(204,0,0,0.06)" : "var(--vbc-surface)";
            (e.currentTarget as HTMLElement).style.borderColor = a.primary ? "rgba(204,0,0,0.3)" : "var(--vbc-border)";
          };
          const inner = (
            <>
              <span style={{ color: a.primary ? "#CC0000" : "var(--vbc-muted)" }}>{a.icon}</span>
              <span style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 600, fontSize: "11px", letterSpacing: "0.5px", textTransform: "uppercase", color: a.primary ? "var(--vbc-red-dark)" : "var(--vbc-muted)", textAlign: "center" }}>{a.label}</span>
            </>
          );
          return a.onClick ? (
            <button key={i} onClick={a.onClick} style={tileStyle} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
              {inner}
            </button>
          ) : (
            <Link key={i} href={a.href || "#"} style={tileStyle} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
              {inner}
            </Link>
          );
        })}
      </div>
    </div>
  );
}