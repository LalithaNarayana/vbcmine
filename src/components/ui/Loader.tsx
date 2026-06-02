export default function Loader({ size = 40, text }: { size?: number; text?: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
      <div style={{
        width: size, height: size, border: "3px solid rgba(204,0,0,0.15)",
        borderTop: "3px solid #CC0000", borderRadius: "50%",
        animation: "spin 0.8s linear infinite",
      }} />
      {text && <p style={{ fontFamily: "'Rajdhani', sans-serif", color: "#555", fontSize: "13px", letterSpacing: "1px" }}>{text}</p>}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
