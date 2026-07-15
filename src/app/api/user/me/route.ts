import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import { getUserSession } from "@/lib/userAuth";

export async function GET() {
  try {
    const session = await getUserSession();
    if (!session) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    await connectDB();
    const user = await User.findById(session.userId);
    if (!user) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    return NextResponse.json({
      user: {
        id: user._id.toString(),
        name: user.name,
        mobile: user.mobile,
        accountId: user.accountId,
        connectionStatus: user.connectionStatus,
      },
    });
  } catch (err) {
    console.error("[user/me] error:", err);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
