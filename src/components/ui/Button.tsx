"use client";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  disabled?: boolean;
  fullWidth?: boolean;
  type?: "button" | "submit" | "reset";
  href?: string;
  style?: React.CSSProperties;
  className?: string;
}

export default function Button({
  children, variant = "primary", size = "md", onClick, disabled, fullWidth, type = "button", style, className,
}: ButtonProps) {
  const sizes = { sm: "8px 20px", md: "12px 32px", lg: "16px 40px" };
  const fontSizes = { sm: "12px", md: "14px", lg: "16px" };

  const base: React.CSSProperties = {
    display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px",
    padding: sizes[size], fontSize: fontSizes[size],
    fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, letterSpacing: "1px",
    textTransform: "uppercase", border: "none", cursor: disabled ? "not-allowed" : "pointer",
    transition: "all 0.3s ease", textDecoration: "none", width: fullWidth ? "100%" : undefined,
    opacity: disabled ? 0.5 : 1,
    clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
  };

  const variants = {
    primary: { background: "linear-gradient(135deg, #CC0000, #880000)", color: "white" },
    outline: { background: "transparent", color: "#CC0000", border: "1px solid #CC0000" },
    ghost: { background: "rgba(204,0,0,0.08)", color: "#CC0000", clipPath: "none" },
  };

  return (
    <button type={type} onClick={onClick} disabled={disabled} style={{ ...base, ...variants[variant], ...style }} className={className}>
      {children}
    </button>
  );
}
