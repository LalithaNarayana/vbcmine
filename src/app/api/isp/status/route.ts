import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import { getUserSession } from "@/lib/userAuth";
import { getAdminSession } from "@/lib/auth";
import { getIspProvider } from "@/lib/isp";

/**
 * GET /api/isp/status — live active/inactive status from the ISP provider.
 * - Logged-in user (no query param): resolves their own accountId.
 * - Admin: pass ?accountId=xxx to check any account (used on Sales page).
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const queryAccountId = searchParams.get("accountId");

    let accountId: string | null = null;

    const userSession = await getUserSession();
    if (userSession) {
      await connectDB();
      const user = await User.findById(userSession.userId);
      if (!user?.accountId) {
        return NextResponse.json(
          { error: "No account is linked to this profile yet." },
          { status: 400 }
        );
      }
      accountId = user.accountId;
    } else {
      const adminSession = await getAdminSession();
      if (!adminSession) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      if (!queryAccountId) {
        return NextResponse.json(
          { error: "accountId query parameter is required." },
          { status: 400 }
        );
      }
      accountId = queryAccountId;
    }

    const provider = getIspProvider();
    const result = await provider.getStatus(accountId);

    return NextResponse.json(result);
  } catch (err) {
    console.error("[isp/status] error:", err);
    return NextResponse.json(
      { error: "Failed to fetch connection status." },
      { status: 500 }
    );
  }
}
