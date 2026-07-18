"use client";
import { useEffect, useState, useCallback } from "react";
import { X, Briefcase, MapPin, Phone, MessageSquare, CircleCheck, User } from "lucide-react";
import { useUserSession } from "@/components/auth/UserSessionProvider";

interface ServiceOption {
  _id: string;
  name: string;
}

interface BusinessServiceEnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  services: ServiceOption[];
  preselectedServiceId: string;
  cities: string[];
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

export default function BusinessServiceEnquiryModal({
  isOpen,
  onClose,
  services,
  preselectedServiceId,
  cities,
}: BusinessServiceEnquiryModalProps) {
  const { user } = useUserSession();

  const [businessServiceId, setBusinessServiceId] = useState("");
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState("");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // When the visitor is logged in, their name & mobile come straight from
  // the user session instead of being typed in manually.
  const isSessionPrefilled = !!user;

  const resetState = useCallback(() => {
    setBusinessServiceId(preselectedServiceId || "");
    setName(user?.name || "");
    setCity("");
    setAddress("");
    setMobile(user?.mobile || "");
    setMessage("");
    setLoading(false);
    setError("");
    setSubmitted(false);
  }, [preselectedServiceId, user]);

  useEffect(() => {
    if (!isOpen) return;
    resetState();
  }, [isOpen, resetState]);

  if (!isOpen) return null;

  const canSubmit =
    !!businessServiceId &&
    name.trim().length >= 2 &&
    !!city &&
    /^\d{10}$/.test(mobile) &&
    message.trim().length >= 5 &&
    !loading;

  const handleSubmit = async () => {
    if (!canSubmit) return;
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/business-service-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ businessServiceId, name, city, address, mobile, message }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to submit request.");
        return;
      }
      setSubmitted(true);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
          {submitted ? (
            <div style={{ textAlign: "center", padding: "20px 0" }}>
              <CircleCheck size={56} color="#00C864" style={{ margin: "0 auto 20px" }} />
              <h2
                style={{
                  fontFamily: "'Bebas Neue', cursive",
                  fontSize: "30px",
                  letterSpacing: "2px",
                  color: "#152238",
                  marginBottom: "12px",
                }}
              >
                REQUEST SUBMITTED!
              </h2>
              <p style={{ color: "#667085", fontSize: "14px", lineHeight: "1.7", marginBottom: "24px" }}>
                Our business team has received your enquiry and will reach out to you shortly.
              </p>
              <button onClick={onClose} className="btn-primary" style={{ border: "none", cursor: "pointer" }}>
                Close
              </button>
            </div>
          ) : (
            <>
              <div className="badge-red" style={{ display: "inline-block", marginBottom: "16px" }}>
                Get This Service
              </div>
              <h2
                style={{
                  fontFamily: "'Bebas Neue', cursive",
                  fontSize: "30px",
                  letterSpacing: "2px",
                  color: "#152238",
                  marginBottom: "8px",
                }}
              >
                REQUEST YOUR CONNECTION
              </h2>
              <p style={{ color: "#667085", fontSize: "13px", marginBottom: "28px" }}>
                Fill in your details — our business team will contact you to set it up.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                {/* Business Service */}
                <div>
                  <label style={labelStyle}>Business Service *</label>
                  <div style={{ position: "relative" }}>
                    <div
                      style={{
                        position: "absolute",
                        left: "14px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "#CC0000",
                        display: "flex",
                      }}
                    >
                      <Briefcase size={14} />
                    </div>
                    <select
                      value={businessServiceId}
                      onChange={(e) => setBusinessServiceId(e.target.value)}
                      style={{ ...inputStyle, appearance: "auto" }}
                    >
                      <option value="">Choose business service...</option>
                      {services.map((s) => (
                        <option key={s._id} value={s._id}>
                          {s.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label style={labelStyle}>Your Name *</label>
                  <div style={{ position: "relative" }}>
                    <div
                      style={{
                        position: "absolute",
                        left: "14px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "#CC0000",
                        display: "flex",
                      }}
                    >
                      <User size={14} />
                    </div>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      readOnly={isSessionPrefilled}
                      placeholder="Enter your full name"
                      style={{
                        ...inputStyle,
                        background: isSessionPrefilled ? "#F2F4F7" : "#ffffff",
                        cursor: isSessionPrefilled ? "not-allowed" : "text",
                      }}
                    />
                  </div>
                </div>

                {/* City */}
                <div>
                  <label style={labelStyle}>Select City *</label>
                  <div style={{ position: "relative" }}>
                    <div
                      style={{
                        position: "absolute",
                        left: "14px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "#CC0000",
                        display: "flex",
                      }}
                    >
                      <MapPin size={14} />
                    </div>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      style={{ ...inputStyle, appearance: "auto" }}
                    >
                      <option value="">Choose city...</option>
                      {cities.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label style={labelStyle}>Address with Landmark</label>
                  <div style={{ position: "relative" }}>
                    <div style={{ position: "absolute", left: "14px", top: "14px", color: "#CC0000", display: "flex" }}>
                      <MapPin size={14} />
                    </div>
                    <textarea
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Enter your full address with a nearby landmark..."
                      rows={3}
                      style={{ ...inputStyle, resize: "vertical", paddingTop: "12px" }}
                    />
                  </div>
                </div>

                {/* Mobile */}
                <div>
                  <label style={labelStyle}>Mobile Number *</label>
                  <div style={{ position: "relative" }}>
                    <div style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#CC0000", display: "flex" }}>
                      <Phone size={14} />
                    </div>
                    <input
                      type="tel"
                      maxLength={10}
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
                      readOnly={isSessionPrefilled}
                      placeholder="+91 XXXXX XXXXX"
                      style={{
                        ...inputStyle,
                        background: isSessionPrefilled ? "#F2F4F7" : "#ffffff",
                        cursor: isSessionPrefilled ? "not-allowed" : "text",
                      }}
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label style={labelStyle}>Message *</label>
                  <div style={{ position: "relative" }}>
                    <div style={{ position: "absolute", left: "14px", top: "14px", color: "#CC0000", display: "flex" }}>
                      <MessageSquare size={14} />
                    </div>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell us about your requirements..."
                      rows={4}
                      style={{ ...inputStyle, resize: "vertical", paddingTop: "12px" }}
                    />
                  </div>
                </div>

                {error && <p style={{ color: "#CC0000", fontSize: "12px" }}>{error}</p>}

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
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
