"use client";
import { ReactNode, useEffect } from "react";
import { X } from "lucide-react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  width?: string;
}

export default function Modal({ open, onClose, title, children, width = "480px" }: ModalProps) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    if (open) document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 9000,
      display: "flex", alignItems: "center", justifyContent: "center",
      background: "rgba(0,0,0,0.85)", backdropFilter: "blur(4px)",
      padding: "24px",
    }} onClick={onClose}>
      <div style={{
        background: "#141414", border: "1px solid rgba(204,0,0,0.2)",
        width: "100%", maxWidth: width, position: "relative",
        animation: "modalIn 0.2s ease",
      }} onClick={(e) => e.stopPropagation()}>
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "20px 24px", borderBottom: "1px solid rgba(255,255,255,0.05)",
        }}>
          {title && <h3 style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: "18px", color: "#E8E8E8", letterSpacing: "0.5px" }}>{title}</h3>}
          <button onClick={onClose} style={{ background: "none", border: "none", color: "#555", cursor: "pointer", padding: "4px", marginLeft: "auto" }}>
            <X size={20} />
          </button>
        </div>
        <div style={{ padding: "24px" }}>{children}</div>
      </div>
      <style>{`@keyframes modalIn { from { opacity: 0; transform: scale(0.96) translateY(8px); } to { opacity: 1; transform: none; } }`}</style>
    </div>
  );
}
