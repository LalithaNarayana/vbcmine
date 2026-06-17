import Link from "next/link";
import { CheckCircle } from "lucide-react";

const refundChecklist = [
  "Mobile number and Account ID",
  "Transaction date",
  "Order number",
];

const heading2 = {
  fontFamily: "'Bebas Neue', cursive",
  fontSize: "clamp(26px, 3.4vw, 36px)",
  letterSpacing: 1,
  color: "#152238",
  marginBottom: 18,
  lineHeight: 1.1,
};

const paragraph = {
  fontFamily: "'DM Sans', sans-serif",
  fontSize: 14.5,
  color: "#475467",
  lineHeight: 1.9,
  marginBottom: 18,
};

const sectionLabel = {
  fontFamily: "'Rajdhani', sans-serif",
  fontWeight: 700,
  fontSize: 12,
  color: "#CC0000",
  letterSpacing: 1.5,
  textTransform: "uppercase",
  marginBottom: 10,
};

export default function RefundPolicyPage() {
  return (
    <div style={{ background: "#ffffff", minHeight: "100vh" }}>
      {/* Hero */}
      <section
        style={{
          padding: "90px 24px 64px",
          background: "linear-gradient(135deg, #fff7f5 0%, #ffffff 55%, #f7fafc 100%)",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div className="badge-red" style={{ display: "inline-block", marginBottom: 16 }}>
            Legal
          </div>
          <h1
            style={{
              fontFamily: "'Bebas Neue', cursive",
              fontSize: "clamp(42px, 6vw, 68px)",
              letterSpacing: 2,
              color: "#152238",
              lineHeight: 0.95,
              marginBottom: 14,
            }}
          >
            CANCELLATION &amp; <span style={{ color: "#CC0000" }}>REFUND POLICY</span>
          </h1>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#667085" }}>
            What to expect if a transaction doesn&apos;t go as planned.
          </p>
        </div>
      </section>

      {/* Content */}
      <section style={{ padding: "20px 24px 100px" }}>
        <div
          style={{
            maxWidth: 820,
            margin: "0 auto",
            background: "#ffffff",
            border: "1px solid rgba(20,33,61,0.08)",
            boxShadow: "0 18px 40px rgba(20,33,61,0.06)",
            borderRadius: 16,
            padding: "48px 44px",
          }}
          className="legal-card"
        >
          <div style={sectionLabel}>All sales final</div>
          <h2 style={heading2}>No Refund or Exchange</h2>
          <p style={paragraph}>
            All sales of VBC&apos;s subscription are final and there will be no refund or exchange permitted. You
            are responsible for the mobile number or other details provided at the time of application, and for all
            charges that result from those purchases. VBC is not responsible for any incorrect details provided.
          </p>

          <div style={{ height: 1, background: "rgba(20,33,61,0.08)", margin: "28px 0" }} />

          <div style={sectionLabel}>When you may be eligible</div>
          <h2 style={heading2}>Undelivered Installation or Renewal</h2>
          <p style={paragraph}>
            If a transaction has been completed by you on the site, and money has been charged to your card or bank
            account, but an installation or renewal is not delivered within 24 hours of completing the transaction,
            you may inform us by emailing{" "}
            <a href="mailto:support@vbctv.in" style={{ color: "#CC0000", textDecoration: "none", fontWeight: 600 }}>
              support@vbctv.in
            </a>{" "}
            or posting a message on our{" "}
            <Link href="/contact" style={{ color: "#CC0000", textDecoration: "none", fontWeight: 600 }}>
              Contact Us
            </Link>{" "}
            page. In this scenario you will be entitled to a full refund.
          </p>
          <p style={paragraph}>Please include the following details in your email so we can investigate promptly:</p>
          <ul style={{ listStyle: "none", padding: 0, margin: "0 0 8px 0" }}>
            {refundChecklist.map((item, i) => (
              <li
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 10,
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 14.5,
                  color: "#475467",
                }}
              >
                <CheckCircle size={16} color="#CC0000" style={{ flexShrink: 0 }} />
                {item}
              </li>
            ))}
          </ul>
          <p style={paragraph}>
            We will investigate the incident, and if it is found that money was indeed charged to your card or bank
            account without delivery, you will be refunded the amount within 7 working days from the date we receive
            your email.
          </p>

          <div
            style={{
              marginTop: 32,
              padding: "20px 24px",
              background: "rgba(204,0,0,0.04)",
              border: "1px solid rgba(204,0,0,0.12)",
              borderRadius: 10,
              fontSize: 13.5,
              color: "#475467",
              lineHeight: 1.8,
            }}
          >
            Have a billing concern? Reach our team at{" "}
            <a href="mailto:support@vbctv.in" style={{ color: "#CC0000", textDecoration: "none", fontWeight: 600 }}>
              support@vbctv.in
            </a>{" "}
            or call{" "}
            <a href="tel:08916677123" style={{ color: "#CC0000", textDecoration: "none", fontWeight: 600 }}>
              (0891) 6677-123
            </a>
            .
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 600px) {
          .legal-card { padding: 32px 22px !important; }
        }
      `}</style>
    </div>
  );
}