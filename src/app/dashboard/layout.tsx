import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { ShieldAlert } from "lucide-react";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import { getUserSession } from "@/lib/userAuth";

export const metadata: Metadata = {
  title: "My Dashboard — VBC On Fiber",
  description: "Manage your VBC On Fiber account, view usage stats, plan details, and transaction history.",
};

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getUserSession();
  if (!session) {
    redirect("/login");
  }

  await connectDB();
  const user = await User.findById(session.userId).select("connectionStatus").lean();

  if (!user) {
    redirect("/login");
  }

  if (user.connectionStatus === "inactive") {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px", background: "#f9fafb" }}>
        <div style={{ maxWidth: "420px", textAlign: "center", background: "#fff", border: "1px solid rgba(0,0,0,0.08)", borderRadius: "12px", padding: "40px 32px" }}>
          <div style={{ width: "56px", height: "56px", borderRadius: "50%", background: "#fef3f2", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
            <ShieldAlert size={26} color="#b42318" />
          </div>
          <h1 style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: "22px", color: "#1a1a1a", marginBottom: "10px" }}>
            Account Deactivated
          </h1>
          <p style={{ fontSize: "14px", color: "#667085", lineHeight: 1.6, marginBottom: "24px" }}>
            Your dashboard access has been temporarily disabled by the admin team. Please contact support to
            reactivate your account.
          </p>
          <a
            href="/contact"
            style={{ display: "inline-block", background: "#cc0000", color: "#fff", fontWeight: 600, fontSize: "14px", padding: "10px 24px", borderRadius: "999px", textDecoration: "none" }}
          >
            Contact Support
          </a>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
