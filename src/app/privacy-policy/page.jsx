import Link from "next/link";

const collectionPurposes = [
  "Verify your identity",
  "Complete transactions effectively and bill for products and services",
  "Respond to your request for service or assistance",
  "Perform market analysis, market research, business and operational analysis",
  "Provide, maintain and improve our products and services",
  "Anticipate and resolve issues and concerns with our products and services",
  "Promote and market our products and services which we consider may be of interest to you and may benefit you",
  "Ensure adherence to legal and regulatory requirements for prevention and detection of frauds and crimes",
];

const policyScope = [
  "Kinds of personal information that may be collected by us",
  "Measures taken by us to ensure its privacy and security",
  "Duration for which it may be retained by us",
  "How you may access and control its use",
];

const sectionLabel = {
  fontFamily: "'Rajdhani', sans-serif",
  fontWeight: 700,
  fontSize: 12,
  color: "#CC0000",
  letterSpacing: 1.5,
  textTransform: "uppercase",
  marginBottom: 10,
};

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

const listItem = {
  display: "flex",
  alignItems: "flex-start",
  gap: 10,
  marginBottom: 10,
  fontFamily: "'DM Sans', sans-serif",
  fontSize: 14.5,
  color: "#475467",
  lineHeight: 1.7,
};

const dot = {
  width: 7,
  height: 7,
  borderRadius: "50%",
  background: "#CC0000",
  flexShrink: 0,
  marginTop: 7,
};

export default function PrivacyPolicyPage() {
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
            PRIVACY <span style={{ color: "#CC0000" }}>POLICY</span>
          </h1>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#667085" }}>
            How VBC On Fiber collects, uses and protects your information.
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
          <p style={paragraph}>
            We at VBC ON FIBER are committed to protect our customers&apos; personal information and/or sensitive
            personal data and strive to maintain the privacy of your personal information.
          </p>
          <p style={paragraph}>
            For your information, &ldquo;Personal information&rdquo; is any information that can be used by itself
            to uniquely identify, contact, or locate a person, or can be used with information available from other
            sources to uniquely identify an individual. For the purpose of this policy, sensitive personal data or
            information has been considered as a part of personal information.
          </p>

          <div style={{ height: 1, background: "rgba(20,33,61,0.08)", margin: "28px 0" }} />

          <div style={sectionLabel}>Why we collect it</div>
          <h2 style={heading2}>How VBC Uses Your Information</h2>
          <p style={paragraph}>
            VBC does collect your personal information for a variety of regulatory and business purposes. These
            include, but are not limited to:
          </p>
          <ul style={{ listStyle: "none", padding: 0, margin: "0 0 8px 0" }}>
            {collectionPurposes.map((item, i) => (
              <li key={i} style={listItem}>
                <span style={dot} />
                {item}
              </li>
            ))}
          </ul>

          <div style={{ height: 1, background: "rgba(20,33,61,0.08)", margin: "28px 0" }} />

          <div style={sectionLabel}>What this policy covers</div>
          <h2 style={heading2}>Designed Around Your Privacy</h2>
          <p style={paragraph}>
            The VBC Privacy Policy is designed and developed to address the privacy and security of your personal
            information provided to us. This Privacy Policy describes the personal information which we may collect
            and provides our approach towards handling or dealing with the same. The policy is designed to help you
            understand the:
          </p>
          <ul style={{ listStyle: "none", padding: 0, margin: "0 0 8px 0" }}>
            {policyScope.map((item, i) => (
              <li key={i} style={listItem}>
                <span style={dot} />
                {item}
              </li>
            ))}
          </ul>

          <div style={{ height: 1, background: "rgba(20,33,61,0.08)", margin: "28px 0" }} />

          <p style={paragraph}>
            VBC reserves the right to amend or modify this Privacy Policy at any time, as and when the need arises.
            We request you to visit our website{" "}
            <a href="https://www.vbctv.in" target="_blank" rel="noopener noreferrer" style={{ color: "#CC0000", textDecoration: "none", fontWeight: 600 }}>
              www.vbctv.in
            </a>{" "}
            periodically for contemporary information and changes.
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
            Questions about this policy? Reach our team at{" "}
            <a href="mailto:support@vbctv.in" style={{ color: "#CC0000", textDecoration: "none", fontWeight: 600 }}>
              support@vbctv.in
            </a>{" "}
            or visit our{" "}
            <Link href="/contact" style={{ color: "#CC0000", textDecoration: "none", fontWeight: 600 }}>
              Contact page
            </Link>
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