import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import { requireUser } from "@/lib/userAuth";
import { getIspProvider } from "@/lib/isp";

/**
 * GET /api/isp/data-usage — data usage for the logged-in user's own
 * account, powering the dashboard usage widget.
 */
export async function GET() {
  const session = await requireUser();
  if (session instanceof Response) return session;

  try {
    await connectDB();
    const user = await User.findById(session.userId);
    if (!user?.accountId) {
      return NextResponse.json(
        { error: "No account is linked to this profile yet." },
        { status: 400 }
      );
    }

    const provider = getIspProvider();
    const result = await provider.getDataUsage(user.accountId);

    return NextResponse.json(result);
  } catch (err) {
    console.error("[isp/data-usage] error:", err);
    return NextResponse.json(
      { error: "Failed to fetch data usage." },
      { status: 500 }
    );
  }
}
