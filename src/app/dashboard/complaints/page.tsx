"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Send, Loader2 } from "lucide-react";
import Badge from "@/components/ui/Badge";

interface ComplaintItem {
  _id: string;
  subject: string;
  description: string;
  status: "Open" | "In Progress" | "Resolved";
  createdAt: string;
}

const fieldStyle: React.CSSProperties = {
  width: "100%",
  boxSizing: "border-box",
  background: "var(--vbc-surface-alt)",
  border: "1px solid var(--vbc-border)",
  borderRadius: "8px",
  color: "var(--vbc-text)",
  padding: "12px 14px",
  fontFamily: "'DM Sans', sans-serif",
  fontSize: "14px",
  outline: "none",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontFamily: "'Rajdhani', sans-serif",
  fontWeight: 600,
  fontSize: "11px",
  letterSpacing: "1.5px",
  textTransform: "uppercase",
  color: "var(--vbc-muted)",
  marginBottom: "8px",
};

function statusVariant(status: string): "green" | "yellow" | "red" {
  if (status === "Resolved") return "green";
  if (status === "In Progress") return "yellow";
  return "red";
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function ComplaintsPage() {
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [complaints, setComplaints] = useState<ComplaintItem[]>([]);
  const [loadingList, setLoadingList] = useState(true);

  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function loadComplaints() {
    setLoadingList(true);
    const res = await fetch("/api/complaints");
    if (res.ok) {
      setComplaints(await res.json());
    }
    setLoadingList(false);
  }

  useEffect(() => {
    (async () => {
      const meRes = await fetch("/api/user/me");
      const meData = await meRes.json();
      if (!meData.user) {
        router.replace("/login?next=/dashboard/complaints");
        return;
      }
      setCheckingAuth(false);
      loadComplaints();
    })();
  }, [router]);

  const canSubmit = subject.trim().length >= 3 && description.trim().length >= 10 && !submitting;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitting(true);
    setError("");
    setSuccess(false);
    try {
      const res = await fetch("/api/complaints", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject, description }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to submit your ticket.");
        return;
      }
      setSubject("");
      setDescription("");
      setSuccess(true);
      await loadComplaints();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (checkingAuth) {
    return (
      <div style={{ minHeight: "100vh", background: "var(--vbc-dark)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--vbc-muted)" }}>
        <Loader2 size={22} style={{ animation: "spin 1s linear infinite" }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--vbc-dark)" }}>
      <div style={{ background: "var(--vbc-black)", borderBottom: "1px solid rgba(204,0,0,0.25)", padding: "20px 24px" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <Link
            href="/dashboard"
            style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "rgba(255,255,255,0.7)", fontFamily: "'Rajdhani', sans-serif", fontWeight: 600, fontSize: 12, letterSpacing: 1, textTransform: "uppercase", textDecoration: "none", marginBottom: 10 }}
          >
            <ArrowLeft size={14} /> Back to Dashboard
          </Link>
          <h1 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "28px", letterSpacing: "2px", color: "#FFFFFF" }}>
            SUPPORT TICKETS
          </h1>
        </div>
      </div>

      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "32px 24px", display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: "24px" }} className="complaints-grid">
        {/* Raise Ticket form */}
        <div style={{ background: "var(--vbc-surface)", border: "1px solid var(--vbc-border)", borderRadius: "12px", boxShadow: "var(--vbc-shadow)", padding: "28px", height: "fit-content" }}>
          <h2 style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: "15px", letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--vbc-text)", marginBottom: "18px" }}>
            Raise a Ticket
          </h2>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div>
              <label style={labelStyle}>Subject</label>
              <input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g. Slow internet speed"
                style={fieldStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your issue in detail..."
                rows={5}
                style={{ ...fieldStyle, resize: "vertical" }}
              />
            </div>

            {error && <p style={{ color: "#CC0000", fontSize: "12px" }}>{error}</p>}
            {success && <p style={{ color: "#00C864", fontSize: "12px" }}>Ticket submitted successfully.</p>}

            <button
              type="submit"
              disabled={!canSubmit}
              className="btn-primary"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                border: "none",
                cursor: canSubmit ? "pointer" : "not-allowed",
                opacity: canSubmit ? 1 : 0.6,
              }}
            >
              <Send size={14} /> {submitting ? "Submitting..." : "Submit Ticket"}
            </button>
          </form>
        </div>

        {/* My Complaints list */}
        <div style={{ background: "var(--vbc-surface)", border: "1px solid var(--vbc-border)", borderRadius: "12px", boxShadow: "var(--vbc-shadow)", padding: "28px" }}>
          <h2 style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: "15px", letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--vbc-text)", marginBottom: "18px" }}>
            My Complaints
          </h2>
          {loadingList ? (
            <p style={{ color: "var(--vbc-muted)", fontSize: "13px" }}>Loading…</p>
          ) : complaints.length === 0 ? (
            <p style={{ color: "var(--vbc-muted)", fontSize: "13px" }}>You haven&apos;t raised any tickets yet.</p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {complaints.map((c) => (
                <div key={c._id} style={{ border: "1px solid var(--vbc-border)", borderRadius: "8px", padding: "14px 16px", background: "var(--vbc-surface-alt)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "8px", marginBottom: "6px" }}>
                    <span style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: "14px", color: "var(--vbc-text)" }}>{c.subject}</span>
                    <Badge variant={statusVariant(c.status)}>{c.status}</Badge>
                  </div>
                  <p style={{ fontSize: "13px", color: "var(--vbc-muted)", lineHeight: 1.6, margin: "0 0 8px 0" }}>{c.description}</p>
                  <span style={{ fontSize: "11px", color: "var(--vbc-muted)", fontFamily: "'Rajdhani', sans-serif", letterSpacing: "0.5px" }}>{formatDate(c.createdAt)}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <style>{`@media (max-width: 800px) { .complaints-grid { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  );
}
