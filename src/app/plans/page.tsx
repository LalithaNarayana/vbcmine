import connectDB from "@/lib/mongodb";
import PlanCategory from "@/models/PlanCategory";
import Plan from "@/models/Plan";
import { getOrCreateSectionHeadings } from "@/models/SectionHeading";
import PlansExplorer from "@/components/plans/PlansExplorer";

export const dynamic = "force-dynamic";

interface PlansPageProps {
  searchParams: Promise<{ upgrade?: string }>;
}

export default async function PlansPage({ searchParams }: PlansPageProps) {
  await connectDB();

  const { upgrade } = await searchParams;
  const isUpgradeIntent = upgrade === "1" || upgrade === "true";

  const [categories, plans, headings] = await Promise.all([
    PlanCategory.find().sort({ order: 1, createdAt: 1 }).lean(),
    Plan.find()
      .sort({ order: 1, createdAt: 1 })
      .populate("bullets")
      .populate("prices.duration")
      .lean(),
    getOrCreateSectionHeadings(),
  ]);

  const serializedCategories = JSON.parse(JSON.stringify(categories));
  const serializedPlans = JSON.parse(JSON.stringify(plans));
  const heading = JSON.parse(JSON.stringify(headings.plansPage));

  const plansByCategory: Record<string, typeof serializedPlans> = {};
  for (const plan of serializedPlans) {
    const catId = String(plan.category);
    if (!plansByCategory[catId]) plansByCategory[catId] = [];
    plansByCategory[catId].push(plan);
  }

  return (
    <div style={{ background: "#ffffff", minHeight: "100vh" }}>
      {/* Hero */}
      <section
        style={{
          padding: "100px 24px 80px",
          background: "linear-gradient(135deg, #fff7f5 0%, #ffffff 55%, #f7fafc 100%)",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(20,33,61,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(20,33,61,0.025) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: -120,
            left: "50%",
            transform: "translateX(-50%)",
            width: 700,
            height: 350,
            background:
              "radial-gradient(ellipse, rgba(204,0,0,0.10) 0%, transparent 70%)",
            zIndex: 0,
          }}
        />
        <div style={{ maxWidth: 900, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div className="badge-red" style={{ display: "inline-block", marginBottom: 20 }}>
            {heading.tag || "Broadband Plans"}
          </div>
          <h1
            style={{
              fontFamily: "'Bebas Neue', cursive",
              fontSize: "clamp(48px, 7vw, 88px)",
              letterSpacing: 2,
              color: "#152238",
              lineHeight: 0.95,
              marginBottom: 20,
            }}
          >
            {heading.titlePart1 || "PLANS &"}{" "}
            <span style={{ WebkitTextStroke: "2px #CC0000", color: "transparent" }}>
              {heading.titlePart2 || "PRICING"}
            </span>
          </h1>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 16,
              marginBottom: 20,
            }}
          >
            <div style={{ height: 1, width: 60, background: "linear-gradient(90deg, transparent, #CC0000)" }} />
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#CC0000" }} />
            <div style={{ height: 1, width: 60, background: "linear-gradient(90deg, #CC0000, transparent)" }} />
          </div>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: "#475467", lineHeight: 1.8 }}>
            {heading.description || "Choose your perfect plan. All prices per month. GST @18% extra."}
          </p>
        </div>
      </section>

      <div style={{ padding: "0 24px 100px" }}>
        {isUpgradeIntent && (
          <div
            style={{
              maxWidth: 1280,
              margin: "0 auto 24px",
              background: "rgba(204,0,0,0.06)",
              border: "1px solid rgba(204,0,0,0.2)",
              borderRadius: 8,
              padding: "14px 20px",
              textAlign: "center",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 13,
              color: "#152238",
            }}
          >
            Pick a new plan below and we&apos;ll take you straight to payment — no need to fill out the connection form again.
          </div>
        )}
        <PlansExplorer
          categories={serializedCategories}
          plansByCategory={plansByCategory}
          topTagline={heading.topTagline}
          bottomTagline={heading.bottomTagline}
        />
      </div>
    </div>
  );
}
