"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Info, Zap, User } from "lucide-react";

const tabs = [
  { label: "Home",       href: "/",       icon: Home },
  { label: "About",      href: "/about",  icon: Info },
  { label: "Plans",      href: "/plans",  icon: Zap  },
  { label: "My Account", href: "/login",  icon: User },
];

export default function BottomTabBar() {
  const pathname = usePathname();

  return (
    <>
      {/* Spacer so page content isn't hidden behind the bar */}
      <div className="bottom-tab-spacer" style={{ height: 72 }} />

      <nav
        className="bottom-tab-bar"
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1100,
          background: "#fff",
          borderTop: "1px solid #F0E8F0",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          height: 68,
          boxShadow: "0 -4px 24px rgba(20,33,61,0.08)",
          paddingBottom: "env(safe-area-inset-bottom, 0px)",
        }}
      >
        {tabs.map(({ label, href, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 4,
                flex: 1,
                textDecoration: "none",
                padding: "8px 0",
                color: active ? "#CC0000" : "#94A3B8",
                transition: "color 0.2s",
                position: "relative",
              }}
            >
              {/* Active pill indicator */}
              {active && (
                <span style={{
                  position: "absolute",
                  top: 0,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: 32,
                  height: 3,
                  borderRadius: "0 0 4px 4px",
                  background: "#CC0000",
                }} />
              )}
              <span style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 36,
                height: 36,
                borderRadius: 12,
                background: active ? "rgba(204,0,0,0.08)" : "transparent",
                transition: "background 0.2s",
              }}>
                <Icon size={20} strokeWidth={active ? 2.5 : 1.8} />
              </span>
              <span style={{
                fontSize: 11,
                fontWeight: active ? 700 : 500,
                fontFamily: "'DM Sans', sans-serif",
                letterSpacing: 0.2,
                lineHeight: 1,
              }}>
                {label}
              </span>
            </Link>
          );
        })}
      </nav>

      <style>{`
        /* Only show on mobile */
        @media (min-width: 1101px) {
          .bottom-tab-bar,
          .bottom-tab-spacer {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}
