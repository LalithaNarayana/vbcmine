"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, CreditCard, Shield, RefreshCw, CircleCheck, TrendingUp } from "lucide-react";
import Modal from "@/components/ui/Modal";
import { formatCurrency } from "@/lib/format";

interface UpgradePlanModalProps {
  open: boolean;
  onClose: () => void;
  planId: string;
  planName: string;
  planSpeed?: number;
  planSpeedUnit?: string;
  /** Called once the upgrade payment is verified successfully. */
  onUpgraded?: () => void;
}

interface OrderDetails {
  paymentId: string;
  planName: string;
  currentPlanName?: string;
  baseAmount: number;
  gstPercent: number;
  gstAmount: number;
  totalAmount: number;
}

type Step = "confirm" | "creating" | "pay" | "paying" | "success" | "error" | "same-plan";

const rowStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "10px",
  fontSize: "13px",
};

export default function UpgradePlanModal({
  open,
  onClose,
  planId,
  planName,
  planSpeed,
  planSpeedUnit,
  onUpgraded,
}: UpgradePlanModalProps) {
  const router = useRouter();
  const [step, setStep] = useState<Step>("confirm");
  const [error, setError] = useState("");
  const [order, setOrder] = useState<OrderDetails | null>(null);

  useEffect(() => {
    if (!open) return;
    setStep("confirm");
    setError("");
    setOrder(null);
  }, [open, planId]);

  async function handleConfirmUpgrade() {
    setStep("creating");
    setError("");
    try {
      const res = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ purpose: "upgrade", planId }),
      });
      const data = await res.json();
      if (!res.ok) {
        if (res.status === 400 && /already on this plan/i.test(data.error || "")) {
          setStep("same-plan");
          return;
        }
        setError(data.error || "Could not start the upgrade. Please try again.");
        setStep("error");
        return;
      }
      setOrder(data);
      setStep("pay");
    } catch {
      setError("Network error. Please try again.");
      setStep("error");
    }
  }

  async function handlePay() {
    if (!order) return;
    setStep("paying");
    setError("");
    try {
      const res = await fetch("/api/payment/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paymentId: order.paymentId }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data.error || "Payment could not be verified.");
        setStep("error");
        return;
      }
      setStep("success");
      onUpgraded?.();
    } catch {
      setError("Network error during payment. Please try again.");
      setStep("error");
    }
  }

  function handleGoToDashboard() {
    onClose();
    router.push("/dashboard");
  }

  const title =
    step === "success"
      ? undefined
      : step === "pay" || step === "paying"
      ? "Complete Your Payment"
      : "Upgrade Your Plan";

  return (
    <Modal open={open} onClose={onClose} title={title} width="440px">
      {step === "confirm" || step === "creating" ? (
        <div style={{ textAlign: "center", padding: "8px 0" }}>
          <div
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "50%",
              background: "rgba(204,0,0,0.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 20px",
            }}
          >
            <TrendingUp size={28} color="#CC0000" />
          </div>
          <h3 style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: "20px", color: "#152238", marginBottom: "10px" }}>
            Want to upgrade to {planName}?
          </h3>
          <p style={{ color: "#667085", fontSize: "13px", lineHeight: 1.7, marginBottom: "28px" }}>
            {planSpeed
              ? `You're about to switch your active connection to the ${planName} plan (${planSpeed} ${planSpeedUnit}). We'll calculate the exact amount due, including GST, on the next step.`
              : `You're about to switch your active connection to the ${planName} plan. We'll calculate the exact amount due, including GST, on the next step.`}
          </p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
            <button onClick={onClose} className="btn-outline" style={{ cursor: "pointer" }}>
              Cancel
            </button>
            <button
              onClick={handleConfirmUpgrade}
              disabled={step === "creating"}
              className="btn-primary"
              style={{ border: "none", cursor: step === "creating" ? "not-allowed" : "pointer", display: "flex", alignItems: "center", gap: "8px" }}
            >
              {step === "creating" ? (
                <>
                  <RefreshCw size={14} style={{ animation: "spin 1s linear infinite" }} /> Preparing…
                </>
              ) : (
                <>
                  Yes, Upgrade Me <ArrowRight size={14} />
                </>
              )}
            </button>
          </div>
        </div>
      ) : step === "same-plan" ? (
        <div style={{ textAlign: "center", padding: "8px 0" }}>
          <p style={{ color: "#667085", fontSize: "14px", lineHeight: 1.7, marginBottom: "20px" }}>
            You&apos;re already on the {planName} plan. Pick a different plan to upgrade or downgrade.
          </p>
          <button onClick={onClose} className="btn-primary" style={{ border: "none", cursor: "pointer" }}>
            Close
          </button>
        </div>
      ) : step === "success" ? (
        <div style={{ textAlign: "center", padding: "8px 0" }}>
          <CircleCheck size={48} color="#00C864" style={{ margin: "0 auto 16px" }} />
          <h3 style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: "18px", color: "#152238", marginBottom: "10px" }}>
            Plan Upgraded!
          </h3>
          <p style={{ color: "#667085", fontSize: "13px", lineHeight: 1.7, marginBottom: "20px" }}>
            You&apos;re now on the {order?.planName || planName} plan. Your dashboard will reflect the change right away.
          </p>
          <button onClick={handleGoToDashboard} className="btn-primary" style={{ border: "none", cursor: "pointer" }}>
            Go to Dashboard
          </button>
        </div>
      ) : step === "pay" || step === "paying" ? (
        order ? (
          <div>
            {order.currentPlanName && (
              <div style={rowStyle}>
                <span style={{ color: "#667085" }}>Current Plan</span>
                <span style={{ color: "#152238" }}>{order.currentPlanName}</span>
              </div>
            )}
            <div style={rowStyle}>
              <span style={{ color: "#667085" }}>New Plan</span>
              <span style={{ color: "#152238", fontWeight: 600 }}>{order.planName}</span>
            </div>
            <div style={{ height: "1px", background: "rgba(20,33,61,0.08)", margin: "12px 0" }} />
            <div style={rowStyle}>
              <span style={{ color: "#667085" }}>Plan Charges</span>
              <span style={{ color: "#152238" }}>₹{formatCurrency(order.baseAmount)}</span>
            </div>
            <div style={rowStyle}>
              <span style={{ color: "#667085" }}>GST ({order.gstPercent}%)</span>
              <span style={{ color: "#152238" }}>₹{formatCurrency(order.gstAmount)}</span>
            </div>
            <div style={{ height: "1px", background: "rgba(20,33,61,0.08)", margin: "12px 0" }} />
            <div style={{ ...rowStyle, marginBottom: "24px", alignItems: "center" }}>
              <span style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: "15px", color: "#152238" }}>Amount Due</span>
              <span style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "28px", color: "#CC0000", letterSpacing: "1px" }}>
                ₹{formatCurrency(order.totalAmount)}
              </span>
            </div>

            <button
              onClick={handlePay}
              disabled={step === "paying"}
              className="btn-primary"
              style={{ width: "100%", border: "none", cursor: step === "paying" ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", padding: "14px" }}
            >
              {step === "paying" ? <RefreshCw size={16} style={{ animation: "spin 1s linear infinite" }} /> : <CreditCard size={16} />}
              {step === "paying" ? "Processing…" : `Pay ₹${formatCurrency(order.totalAmount)} Securely`}
            </button>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginTop: "16px" }}>
              <Shield size={12} color="#667085" />
              <span style={{ fontSize: "11px", color: "#667085" }}>256-bit SSL Encrypted Payment Gateway</span>
            </div>
          </div>
        ) : null
      ) : (
        <div style={{ textAlign: "center", padding: "8px 0" }}>
          <p style={{ color: "#CC0000", fontSize: "13px", marginBottom: "20px" }}>{error}</p>
          <button onClick={() => setStep("confirm")} className="btn-primary" style={{ border: "none", cursor: "pointer" }}>
            Try Again
          </button>
        </div>
      )}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </Modal>
  );
}
