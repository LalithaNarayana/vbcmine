import Link from "next/link";

export default function NotFound() {
  return (
    <section
      style={{
        minHeight: "70vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "80px 24px",
        background: "#0D0D0D",
      }}
    >
      <div
        style={{
          fontFamily: "'Bebas Neue', cursive",
          fontSize: "clamp(80px, 14vw, 160px)",
          letterSpacing: "4px",
          lineHeight: 0.9,
          color: "#CC0000",
          WebkitTextStroke: "2px #CC0000",
        }}
      >
        404
      </div>
      <h1
        style={{
          fontFamily: "'Rajdhani', sans-serif",
          fontWeight: 700,
          fontSize: "22px",
          letterSpacing: "2px",
          textTransform: "uppercase",
          color: "#E8E8E8",
          marginTop: "16px",
          marginBottom: "12px",
        }}
      >
        Page Not Found
      </h1>
      <p
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "14px",
          color: "#888",
          maxWidth: "420px",
          lineHeight: 1.8,
          marginBottom: "32px",
        }}
      >
        The page you&apos;re looking for doesn&apos;t exist or may have been moved.
      </p>
      <Link
        href="/"
        style={{
          display: "inline-block",
          background: "#CC0000",
          color: "#fff",
          fontFamily: "'Rajdhani', sans-serif",
          fontWeight: 700,
          fontSize: "13px",
          letterSpacing: "1.5px",
          textTransform: "uppercase",
          textDecoration: "none",
          padding: "13px 36px",
          borderRadius: "999px",
        }}
      >
        Back to Home
      </Link>
    </section>
  );
}