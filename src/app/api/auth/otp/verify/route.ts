import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import connectDB from "@/lib/mongodb";
import Otp from "@/models/Otp";
import User from "@/models/User";
import { signUserToken, setUserSessionCookie } from "@/lib/userAuth";

const verifySchema = z.object({
  mobile: z.string().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number."),
  otp: z.string().length(6, "Enter the 6-digit OTP."),
  purpose: z.enum(["register", "login", "plan-request"]),
  // Required when purpose is register/plan-request and the user doesn't
  // already exist yet.
  name: z.string().trim().min(2).optional(),
});

const MAX_ATTEMPTS = 5;

// Dev-only universal bypass code — lets QA/testing move past OTP entry
// without depending on a live SMS provider. Remove once a real SMS
// gateway (OTP_PROVIDER != mock) is wired in for production.
const DEV_BYPASS_OTP = "123456";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = verifySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || "Invalid input." },
        { status: 400 }
      );
    }

    const { mobile, otp, purpose, name } = parsed.data;

    await connectDB();

    const isDevBypass = otp === DEV_BYPASS_OTP;

    if (!isDevBypass) {
      const otpDoc = await Otp.findOne({
        mobile,
        purpose,
        verified: false,
      }).sort({ createdAt: -1 });

      if (!otpDoc) {
        return NextResponse.json(
          { error: "OTP not found or already used. Please request a new one." },
          { status: 400 }
        );
      }

      if (otpDoc.expiresAt.getTime() < Date.now()) {
        return NextResponse.json(
          { error: "OTP has expired. Please request a new one." },
          { status: 400 }
        );
      }

      if (otpDoc.attempts >= MAX_ATTEMPTS) {
        return NextResponse.json(
          { error: "Too many incorrect attempts. Please request a new OTP." },
          { status: 429 }
        );
      }

      const isValid = await otpDoc.compareOtp(otp);
      if (!isValid) {
        otpDoc.attempts += 1;
        await otpDoc.save();
        return NextResponse.json({ error: "Incorrect OTP." }, { status: 400 });
      }

      otpDoc.verified = true;
      await otpDoc.save();
    } else {
      // Mark any pending OTP for this mobile/purpose as verified too, so
      // it can't be replayed separately.
      await Otp.updateMany(
        { mobile, purpose, verified: false },
        { $set: { verified: true } }
      );
    }

    let user = await User.findOne({ mobile });

    if (!user) {
      if (purpose === "login") {
        return NextResponse.json(
          { error: "No account found with this mobile number. Please register first." },
          { status: 404 }
        );
      }
      if (!name) {
        return NextResponse.json(
          { error: "Name is required to create your account." },
          { status: 400 }
        );
      }
      // Note: accountId is intentionally omitted (left unset) rather than
      // set to null — see src/models/User.ts for why that matters with the
      // sparse unique index.
      user = await User.create({
        name,
        mobile,
        connectionStatus: "pending",
      });

    }

    const token = signUserToken({
      userId: user._id.toString(),
      mobile: user.mobile,
    });
    await setUserSessionCookie(token);

    return NextResponse.json({
      success: true,
      user: {
        id: user._id.toString(),
        name: user.name,
        mobile: user.mobile,
        accountId: user.accountId,
        connectionStatus: user.connectionStatus,
      },
    });
  } catch (err) {
    console.error("[otp/verify] error:", err);
    return NextResponse.json(
      {
        error: "Something went wrong. Please try again.",
        // Temporary debug detail — remove once the root cause is confirmed fixed.
        detail: err instanceof Error ? err.message : String(err),
      },
      { status: 500 }
    );
  }
}
