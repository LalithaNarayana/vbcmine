"use client";
import { useEffect, useState } from "react";
import { CreditCard, Shield, RefreshCw, CircleCheck } from "lucide-react";
import Modal from "@/components/ui/Modal";

interface ConnectionPaymentModalProps {
  open: boolean;
  onClose: () => void;
  onPaid: () => void;
}

interface PaymentDetails {
  paymentId: string;
  planName: string;
  baseAmount: number;
  gstPercent: number;
  gstAmount: number;
  totalAmount: number;
}

const rowStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "10px",
  fontSize: "13px",
};

export default function ConnectionPaymentModal({ open, onClose, onPaid }: ConnectionPaymentModalProps) {
  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState(false);
  const [error, setError] = useState("");
  const [details, setDetails] = useState<PaymentDetails | null>(null);
  const [paid, setPaid] = useState(false);

  useEffect(() => {
    if (!open) return;
    setLoading(true);
    setError("");
    setPaid(false);
    setDetails(null);
    (async () => {
      try {
        const res = await fetch("/api/user/connection-payment");
        const data = await res.json();
        if (data.pending) {
          setDetails(data);
        } else {
          setError("No pending payment found. Please refresh the page.");
        }
      } catch {
        setError("Network error. Please try again.");
      } finally {
        setLoading(false);
      }
    })();
  }, [open]);

  async function handlePay() {
    if (!details || paying) return;
    setError("");
    setPaying(true);
    try {
      const res = await fetch("/api/payment/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paymentId: details.paymentId }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data.error || "Payment could not be verified.");
        return;
      }
      setPaid(true);
      onPaid();
    } catch {
      setError("Network error during payment. Please try again.");
    } finally {
      setPaying(false);
    }
  }

  return (
    <Modal open={open} onClose={onClose} title={paid ? undefined : "Complete Your Payment"} width="440px">
      {loading ? (
        <p style={{ textAlign: "center", color: "#667085", padding: "20px 0" }}>Loading…</p>
      ) : paid ? (
        <div style={{ textAlign: "center", padding: "8px 0" }}>
          <CircleCheck size={48} color="#00C864" style={{ margin: "0 auto 16px" }} />
          <h3 style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: "18px", color: "#152238", marginBottom: "10px" }}>
            Payment Successful!
          </h3>
          <p style={{ color: "#667085", fontSize: "13px", lineHeight: 1.7, marginBottom: "20px" }}>
            Our team will now schedule your router installation and assign your Account ID shortly.
          </p>
          <button onClick={onClose} className="btn-primary" style={{ border: "none", cursor: "pointer" }}>
            Close
          </button>
        </div>
      ) : details ? (
        <div>
          <div style={rowStyle}>
            <span style={{ color: "#667085" }}>Plan</span>
            <span style={{ color: "#152238", fontWeight: 600 }}>{details.planName}</span>
          </div>
          <div style={{ height: "1px", background: "rgba(20,33,61,0.08)", margin: "12px 0" }} />
          <div style={rowStyle}>
            <span style={{ color: "#667085" }}>Plan Charges</span>
            <span style={{ color: "#152238" }}>₹{details.baseAmount.toLocaleString("en-IN")}</span>
          </div>
          <div style={rowStyle}>
            <span style={{ color: "#667085" }}>GST ({details.gstPercent}%)</span>
            <span style={{ color: "#152238" }}>₹{details.gstAmount.toLocaleString("en-IN")}</span>
          </div>
          <div style={{ height: "1px", background: "rgba(20,33,61,0.08)", margin: "12px 0" }} />
          <div style={{ ...rowStyle, marginBottom: "24px", alignItems: "center" }}>
            <span style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: "15px", color: "#152238" }}>Amount Due</span>
            <span style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "28px", color: "#CC0000", letterSpacing: "1px" }}>
              ₹{details.totalAmount.toLocaleString("en-IN")}
            </span>
          </div>

          {error && <p style={{ color: "#CC0000", fontSize: "13px", marginBottom: "16px" }}>{error}</p>}

          <button
            onClick={handlePay}
            disabled={paying}
            className="btn-primary"
            style={{ width: "100%", border: "none", cursor: paying ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", padding: "14px" }}
          >
            {paying ? <RefreshCw size={16} style={{ animation: "spin 1s linear infinite" }} /> : <CreditCard size={16} />}
            {paying ? "Processing..." : `Pay ₹${details.totalAmount.toLocaleString("en-IN")} Securely`}
          </button>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginTop: "16px" }}>
            <Shield size={12} color="#667085" />
            <span style={{ fontSize: "11px", color: "#667085" }}>256-bit SSL Encrypted Payment Gateway</span>
          </div>
        </div>
      ) : (
        <p style={{ color: "#CC0000", fontSize: "13px", textAlign: "center", padding: "20px 0" }}>{error}</p>
      )}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </Modal>
  );
}
