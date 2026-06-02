import { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "red" | "green" | "yellow" | "gray";
  style?: React.CSSProperties;
}

export default function Badge({ children, variant = "red", style }: BadgeProps) {
  const variants = {
    red: { background: "rgba(204,0,0,0.08)", color: "#A32020", border: "1px solid rgba(204,0,0,0.14)" },
    green: { background: "rgba(0,200,100,0.12)", color: "#067647", border: "1px solid rgba(0,200,100,0.2)" },
    yellow: { background: "rgba(255,180,0,0.14)", color: "#B54708", border: "1px solid rgba(255,180,0,0.18)" },
    gray: { background: "#F2F4F7", color: "#475467", border: "1px solid #E4E7EC" },
  };
  return (
    <span style={{
      ...variants[variant], padding: "4px 12px",
      fontFamily: "'Rajdhani', sans-serif", fontWeight: 600, fontSize: "11px",
      letterSpacing: "1.5px", textTransform: "uppercase", display: "inline-block", borderRadius: "999px", ...style,
    }}>
      {children}
    </span>
  );
}
