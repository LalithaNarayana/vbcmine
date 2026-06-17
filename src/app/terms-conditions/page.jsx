import Link from "next/link";

const terms = [
  "Installation is subject to on-ground feasibility at the installation address and availability of valid documents as per TRAI guidelines.",
  "Post expiry of data quota, internet speed will be throttled at 512 kbps with no additional charging.",
  "Upon subscription to one of the select plans under the present offer, Internet will exhaust at the end of each month, regardless of usage, and cannot be carried forward to the subsequent month. Upon non-payment of the renewal dues for more than three months, the ONU box (Wi-Fi router) is recoverable.",
  "The extent of applicability of the subscribed Plan, the usage by an individual customer and the entitlement of the Subscription Internet is subject to the network feasibility in the area of residence of the interested customer. The network feasibility of the specific area shall be communicated to the customer at the time of sale.",
  "These Terms and Conditions shall constitute an agreement between VBC and each customer and by subscribing to the Offer, you accept the same as binding upon you.",
  "The terms and conditions of usage of VBC continue to be applicable upon you as a user of the broadband services.",
  "VBC will be entitled to postpone, suspend, modify or cancel the Offer or any aspect thereof, across the entire territories of service or any part thereof, at any time with or without notice, for any reason, including but not limited to acts of God, force majeure, technical difficulties, or any other reasons beyond VBC's reasonable control. If VBC suspends or cancels the Offer, all aspects of the Offer shall be null and void. VBC will not be liable to compensate any customer for any postponement or cancellation or for any reason directly or indirectly.",
  "VBC has no liability whatsoever in respect of any claims or disputes and any resulting damages or losses, whether direct or indirect, relating to the customer availing, not receiving, or the customer's use of the connection.",
  "VBC makes no warranties or representations whatsoever in respect of the offer and the broadband services, including as to its fitness for any particular purpose, merchantability, quality, availability, disruption or error-free operation.",
  "The statements in these terms and conditions do not constitute any general representation from VBC regarding VBC's services or its availability. VBC's broadband network is available on an 'as is where is available' basis, and VBC makes no representation, guarantee or warranty regarding the availability, fitness for any specified purpose, or error-free operation of the network. Network availability may be affected due to various reasons including force majeure, acts of God, inclement weather, topographical / geographic / demographic factors, maintenance work, availability of interconnection with other networks, etc.",
  "Any dispute or claim (contractual or non-contractual) arising out of or in relation to this agreement, including disputes as to its formation, will be governed by and construed in accordance with Indian laws. VBC and the customer submit to the exclusive jurisdiction of Courts at Andhra Pradesh alone.",
];

export default function TermsConditionsPage() {
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
            TERMS &amp; <span style={{ color: "#CC0000" }}>CONDITIONS</span>
          </h1>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#667085" }}>
            The agreement between VBC On Fiber and our subscribers.
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
          <ol style={{ listStyle: "none", padding: 0, margin: 0, counterReset: "term-counter" }} className="terms-list">
            {terms.map((t, i) => (
              <li
                key={i}
                style={{
                  display: "flex",
                  gap: 16,
                  alignItems: "flex-start",
                  padding: "18px 0",
                  borderBottom: i === terms.length - 1 ? "none" : "1px solid rgba(20,33,61,0.07)",
                }}
              >
                <span
                  style={{
                    flexShrink: 0,
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    background: "rgba(204,0,0,0.08)",
                    color: "#CC0000",
                    fontFamily: "'Rajdhani', sans-serif",
                    fontWeight: 700,
                    fontSize: 13,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {i + 1}
                </span>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14.5, color: "#475467", lineHeight: 1.85 }}>
                  {t}
                </span>
              </li>
            ))}
          </ol>

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
            Need clarification on any of these terms? Contact us at{" "}
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