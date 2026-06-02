import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  glass?: boolean;
  hover?: boolean;
  style?: React.CSSProperties;
  className?: string;
}

export default function Card({ children, glass, hover, style, className }: CardProps) {
  return (
    <div
      className={className}
      style={{
        background: glass ? "rgba(255,255,255,0.03)" : "#141414",
        border: "1px solid rgba(204,0,0,0.12)",
        backdropFilter: glass ? "blur(10px)" : undefined,
        transition: hover ? "transform 0.3s ease, box-shadow 0.3s ease" : undefined,
        ...style,
      }}
      onMouseEnter={hover ? (e) => {
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
        (e.currentTarget as HTMLDivElement).style.boxShadow = "0 20px 60px rgba(204,0,0,0.15)";
      } : undefined}
      onMouseLeave={hover ? (e) => {
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
        (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
      } : undefined}
    >
      {children}
    </div>
  );
}
