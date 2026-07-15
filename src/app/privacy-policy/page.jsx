import connectDB from "@/lib/mongodb";
import { getOrCreateLegalPage } from "@/models/LegalPage";

export const dynamic = "force-dynamic";

export default async function PrivacyPolicyPage() {
  await connectDB();
  const page = await getOrCreateLegalPage("privacy");

  return (
    <section style={{ background: "#ffffff", padding: "100px 24px" }}>
      <div style={{ maxWidth: "820px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <div className="badge-red" style={{ display: "inline-block", marginBottom: "16px" }}>
            Legal
          </div>
          <h1
            style={{
              fontFamily: "'Bebas Neue', cursive",
              fontSize: "clamp(36px, 5vw, 56px)",
              letterSpacing: "2px",
              color: "#152238",
            }}
          >
            {page.title}
          </h1>
        </div>

        <div
          style={{
            background: "#f9fafb",
            border: "1px solid rgba(20,33,61,0.08)",
            borderRadius: "16px",
            padding: "48px 44px",
            boxShadow: "0 4px 24px rgba(20,33,61,0.04)",
          }}
        >
          {page.content ? (
            <div
              className="legal-content ck-content"
              style={{ color: "#344054", fontSize: "15px", lineHeight: 1.9 }}
              dangerouslySetInnerHTML={{ __html: page.content }}
            />
          ) : (
            <p style={{ color: "#98A2B3", textAlign: "center" }}>
              This page hasn&apos;t been published yet. Please check back soon.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}