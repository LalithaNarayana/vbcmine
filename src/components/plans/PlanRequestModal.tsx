"use client";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { X, User, Phone, MapPin, Landmark as LandmarkIcon, Building2, CircleCheck, AlertCircle, Clock } from "lucide-react";
import type { Plan, PlanDuration } from "@/types/plan";

interface SalesCityOption {
  _id: string;
  name: string;
}

interface SessionUser {
  id: string;
  name: string;
  mobile: string;
  accountId: string | null;
  connectionStatus: "pending" | "active";
}

interface PlanRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedPlanId?: string;
  onSuccess?: () => void;
}

const labelStyle: React.CSSProperties = {
  display: "block",
  fontFamily: "'Rajdhani', sans-serif",
  fontWeight: 600,
  fontSize: "11px",
  letterSpacing: "1.5px",
  textTransform: "uppercase",
  color: "#667085",
  marginBottom: "8px",
};

const inputStyle: React.CSSProperties = {
  display: "block",
  width: "100%",
  boxSizing: "border-box",
  background: "#ffffff",
  border: "1px solid rgba(20,33,61,0.12)",
  color: "#152238",
  padding: "12px 16px 12px 44px",
  fontFamily: "'DM Sans', sans-serif",
  fontSize: "14px",
  outline: "none",
};

const lockedInputStyle: React.CSSProperties = {
  ...inputStyle,
  background: "#F2F4F7",
  color: "#475467",
  cursor: "not-allowed",
};

function planLabel(plan: Plan): string {
  const sorted = [...plan.prices].sort((a, b) => {
    const aM = typeof a.duration === "object" ? (a.duration as PlanDuration).months : 0;
    const bM = typeof b.duration === "object" ? (b.duration as PlanDuration).months : 0;
    return aM - bM;
  });
  const cheapest = sorted[0];
  const priceLabel = cheapest ? ` — ₹${cheapest.price}/mo` : "";
  return `${plan.name} (${plan.speed} ${plan.speedUnit})${priceLabel}`;
}

export default function PlanRequestModal({
  isOpen,
  onClose,
  preselectedPlanId,
  onSuccess,
}: PlanRequestModalProps) {
  const [checkingSession, setCheckingSession] = useState(true);
  const [sessionUser, setSessionUser] = useState<SessionUser | null>(null);

  const [plans, setPlans] = useState<Plan[]>([]);
  const [planId, setPlanId] = useState("");
  const [cities, setCities] = useState<SalesCityOption[]>([]);
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [landmark, setLandmark] = useState("");

  // Anonymous-user OTP sub-flow
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [debugOtp, setDebugOtp] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submittedReplaced, setSubmittedReplaced] = useState(false);
  const [blockedState, setBlockedState] = useState<"duplicate" | "payment-required" | null>(null);
  const [blockedMessage, setBlockedMessage] = useState("");
  const router = useRouter();

  const resetState = useCallback(() => {
    setCheckingSession(true);
    setSessionUser(null);
    setPlans([]);
    setPlanId("");
    setCities([]);
    setCity("");
    setAddress("");
    setLandmark("");
    setName("");
    setMobile("");
    setOtpSent(false);
    setOtp("");
    setDebugOtp("");
    setLoading(false);
    setError("");
    setSubmitted(false);
    setSubmittedReplaced(false);
    setBlockedState(null);
    setBlockedMessage("");
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    resetState();

    (async () => {
      try {
        const [meRes, plansRes, citiesRes] = await Promise.all([
          fetch("/api/user/me"),
          fetch("/api/plans"),
          fetch("/api/contact/cities"),
        ]);
        const meData = await meRes.json();
        const plansData: Plan[] = await plansRes.json();
        const citiesData: SalesCityOption[] = await citiesRes.json();
        setSessionUser(meData.user || null);
        setPlans(Array.isArray(plansData) ? plansData : []);
        setCities(Array.isArray(citiesData) ? citiesData : []);
        if (preselectedPlanId) setPlanId(preselectedPlanId);
      } catch {
        setError("Could not load plans. Please try again.");
      } finally {
        setCheckingSession(false);
      }
    })();
  }, [isOpen, preselectedPlanId, resetState]);

  if (!isOpen) return null;

  const canSendOtp = name.trim().length >= 2 && mobile.length === 10 && !loading;

  const handleSendOtp = async () => {
    if (!canSendOtp) return;
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile, purpose: "plan-request" }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to send OTP.");
        return;
      }
      setOtpSent(true);
      if (data.debugOtp) setDebugOtp(data.debugOtp);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (otp.length !== 6 || loading) return;
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile, otp, purpose: "plan-request", name }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "OTP verification failed.");
        return;
      }
      setSessionUser(data.user);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const canSubmit =
    !!sessionUser &&
    !!planId &&
    !!city &&
    address.trim().length >= 5 &&
    landmark.trim().length >= 2 &&
    !loading;

  const handleSubmit = async () => {
    if (!canSubmit) return;
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/connection-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId, city, address, landmark }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to submit request.");
        return;
      }
      if (data.state === "duplicate" || data.state === "payment-required") {
        setBlockedState(data.state);
        setBlockedMessage(data.message || "");
        return;
      }
      setSubmittedReplaced(data.state === "replaced");
      setSubmitted(true);
      onSuccess?.();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  function handleGoToDashboardForPayment() {
    onClose();
    router.push("/dashboard");
  }

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(20,33,61,0.55)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: "20px",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: "480px",
          maxHeight: "90vh",
          overflowY: "auto",
          background: "#ffffff",
          boxShadow: "0 30px 80px rgba(20,33,61,0.3)",
          position: "relative",
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            background: "#F2F4F7",
            border: "none",
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "#152238",
            zIndex: 1,
          }}
        >
          <X size={16} />
        </button>

        <div style={{ padding: "40px 32px 32px" }}>
          {blockedState ? (
            <div style={{ textAlign: "center", padding: "20px 0" }}>
              {blockedState === "payment-required" ? (
                <Clock size={56} color="#CC0000" style={{ margin: "0 auto 20px" }} />
              ) : (
                <AlertCircle size={56} color="#B54708" style={{ margin: "0 auto 20px" }} />
              )}
              <h2 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "26px", letterSpacing: "2px", color: "#152238", marginBottom: "12px" }}>
                {blockedState === "payment-required" ? "PAYMENT PENDING" : "REQUEST ALREADY RECEIVED"}
              </h2>
              <p style={{ color: "#667085", fontSize: "14px", lineHeight: "1.7", marginBottom: "24px" }}>
                {blockedMessage}
              </p>
              {blockedState === "payment-required" ? (
                <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
                  <button onClick={onClose} className="btn-outline" style={{ cursor: "pointer" }}>
                    Close
                  </button>
                  <button onClick={handleGoToDashboardForPayment} className="btn-primary" style={{ border: "none", cursor: "pointer" }}>
                    Go to Dashboard to Pay
                  </button>
                </div>
              ) : (
                <button onClick={onClose} className="btn-primary" style={{ border: "none", cursor: "pointer" }}>
                  Close
                </button>
              )}
            </div>
          ) : submitted ? (
            <div style={{ textAlign: "center", padding: "20px 0" }}>
              <CircleCheck size={56} color="#00C864" style={{ margin: "0 auto 20px" }} />
              <h2 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "30px", letterSpacing: "2px", color: "#152238", marginBottom: "12px" }}>
                {submittedReplaced ? "REQUEST UPDATED!" : "REQUEST SUBMITTED!"}
              </h2>
              <p style={{ color: "#667085", fontSize: "14px", lineHeight: "1.7", marginBottom: "24px" }}>
                {submittedReplaced
                  ? "We've updated your connection request to this plan. Our sales team has received it and will reach out to you shortly."
                  : "Our sales team has received your connection request and will reach out to you shortly."}
              </p>
              <button onClick={onClose} className="btn-primary" style={{ border: "none", cursor: "pointer" }}>
                Close
              </button>
            </div>
          ) : checkingSession ? (
            <p style={{ textAlign: "center", color: "#667085", padding: "40px 0" }}>Loading…</p>
          ) : (
            <>
              <div className="badge-red" style={{ display: "inline-block", marginBottom: "16px" }}>
                {sessionUser?.accountId ? "Get Another Connection" : "Get This Plan"}
              </div>
              <h2 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "30px", letterSpacing: "2px", color: "#152238", marginBottom: "8px" }}>
                {sessionUser?.accountId ? "REQUEST A NEW CONNECTION" : "REQUEST YOUR CONNECTION"}
              </h2>
              <p style={{ color: "#667085", fontSize: "13px", marginBottom: "28px" }}>
                {sessionUser
                  ? sessionUser.accountId
                    ? "Setting up service at a new address? Fill in the details below and our team will process it just like your first connection."
                    : "Fill in your address and pick a plan — our team will contact you to set it up."
                  : "Verify your mobile number to continue."}
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                {/* Name */}
                <div>
                  <label style={labelStyle}>Full Name</label>
                  <div style={{ position: "relative" }}>
                    <div style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#CC0000", display: "flex" }}>
                      <User size={14} />
                    </div>
                    <input
                      value={sessionUser ? sessionUser.name : name}
                      onChange={(e) => !sessionUser && setName(e.target.value)}
                      placeholder="Your full name"
                      readOnly={!!sessionUser}
                      disabled={otpSent}
                      style={sessionUser ? lockedInputStyle : inputStyle}
                    />
                  </div>
                </div>

                {/* Mobile */}
                <div>
                  <label style={labelStyle}>Mobile Number</label>
                  <div style={{ position: "relative" }}>
                    <div style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#CC0000", display: "flex" }}>
                      <Phone size={14} />
                    </div>
                    <input
                      type="tel"
                      maxLength={10}
                      value={sessionUser ? sessionUser.mobile : mobile}
                      onChange={(e) => !sessionUser && setMobile(e.target.value.replace(/\D/g, ""))}
                      placeholder="10-digit mobile number"
                      readOnly={!!sessionUser}
                      disabled={otpSent}
                      style={sessionUser ? lockedInputStyle : inputStyle}
                    />
                  </div>
                </div>

                {/* Anonymous-user OTP step */}
                {!sessionUser && (
                  <>
                    {!otpSent ? (
                      <button
                        onClick={handleSendOtp}
                        disabled={!canSendOtp}
                        className="btn-primary"
                        style={{
                          border: "none",
                          cursor: canSendOtp ? "pointer" : "not-allowed",
                          opacity: canSendOtp ? 1 : 0.6,
                        }}
                      >
                        {loading ? "Sending OTP..." : "Send OTP"}
                      </button>
                    ) : (
                      <div>
                        <label style={labelStyle}>Enter OTP</label>
                        <input
                          type="tel"
                          maxLength={6}
                          value={otp}
                          onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                          placeholder="6-digit OTP"
                          style={{ ...inputStyle, paddingLeft: "16px", letterSpacing: "4px" }}
                        />
                        {debugOtp && (
                          <p style={{ marginTop: "6px", fontSize: "11px", color: "#00C864" }}>
                            Dev mode — OTP: {debugOtp} (SMS provider not yet connected)
                          </p>
                        )}
                        <button
                          onClick={() => { setOtpSent(false); setOtp(""); setDebugOtp(""); setError(""); }}
                          style={{ marginTop: "6px", background: "none", border: "none", cursor: "pointer", fontSize: "11px", color: "#CC0000", padding: 0 }}
                        >
                          Change number / Resend
                        </button>
                        <button
                          onClick={handleVerifyOtp}
                          disabled={otp.length !== 6 || loading}
                          className="btn-primary"
                          style={{
                            width: "100%",
                            marginTop: "14px",
                            border: "none",
                            cursor: otp.length === 6 && !loading ? "pointer" : "not-allowed",
                            opacity: otp.length === 6 && !loading ? 1 : 0.6,
                          }}
                        >
                          {loading ? "Verifying..." : "Verify OTP"}
                        </button>
                      </div>
                    )}
                  </>
                )}

                {/* Plan + address — only shown once verified/logged in */}
                {sessionUser && (
                  <>
                    <div>
                      <label style={labelStyle}>Select Plan</label>
                      <select
                        value={planId}
                        onChange={(e) => setPlanId(e.target.value)}
                        style={{ ...inputStyle, paddingLeft: "16px", appearance: "auto" }}
                      >
                        <option value="">Choose a plan</option>
                        {plans.map((p) => (
                          <option key={p._id} value={p._id}>
                            {planLabel(p)}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label style={labelStyle}>City</label>
                      <div style={{ position: "relative" }}>
                        <div style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#CC0000", display: "flex" }}>
                          <Building2 size={14} />
                        </div>
                        <select
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          required
                          style={{ ...inputStyle, appearance: "auto" }}
                        >
                          <option value="">Select your city</option>
                          {cities.map((c) => (
                            <option key={c._id} value={c.name}>
                              {c.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label style={labelStyle}>Address</label>
                      <div style={{ position: "relative" }}>
                        <div style={{ position: "absolute", left: "14px", top: "14px", color: "#CC0000", display: "flex" }}>
                          <MapPin size={14} />
                        </div>
                        <textarea
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          placeholder="House/flat no., street, area, city, pincode"
                          rows={3}
                          style={{ ...inputStyle, resize: "vertical", paddingTop: "12px" }}
                        />
                      </div>
                    </div>

                    <div>
                      <label style={labelStyle}>Landmark</label>
                      <div style={{ position: "relative" }}>
                        <div style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#CC0000", display: "flex" }}>
                          <LandmarkIcon size={14} />
                        </div>
                        <input
                          value={landmark}
                          onChange={(e) => setLandmark(e.target.value)}
                          placeholder="Nearby landmark"
                          style={inputStyle}
                        />
                      </div>
                    </div>

                    {error && (
                      <p style={{ color: "#CC0000", fontSize: "12px" }}>{error}</p>
                    )}

                    <button
                      onClick={handleSubmit}
                      disabled={!canSubmit}
                      className="btn-primary"
                      style={{
                        width: "100%",
                        border: "none",
                        cursor: canSubmit ? "pointer" : "not-allowed",
                        opacity: canSubmit ? 1 : 0.6,
                      }}
                    >
                      {loading ? "Submitting..." : "Submit Request"}
                    </button>
                  </>
                )}

                {!sessionUser && error && (
                  <p style={{ color: "#CC0000", fontSize: "12px" }}>{error}</p>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}