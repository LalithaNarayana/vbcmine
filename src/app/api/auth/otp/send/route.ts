import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/mongodb";
import Otp from "@/models/Otp";
import User from "@/models/User";
import { getOtpProvider } from "@/lib/otp";

const sendSchema = z.object({
  mobile: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number."),
  purpose: z.enum(["register", "login", "plan-request"]),
});

const OTP_EXPIRY_MINUTES = 5;
const RESEND_COOLDOWN_SECONDS = 30;

function generateOtp(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = sendSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || "Invalid input." },
        { status: 400 }
      );
    }

    const { mobile, purpose } = parsed.data;

    await connectDB();

    // login purpose requires an existing user
    if (purpose === "login") {
      const existing = await User.findOne({ mobile });
      if (!existing) {
        return NextResponse.json(
          { error: "No account found with this mobile number. Please register first." },
          { status: 404 }
        );
      }
    }

    // register purpose requires the mobile is not already taken
    if (purpose === "register") {
      const existing = await User.findOne({ mobile });
      if (existing) {
        return NextResponse.json(
          { error: "This mobile number is already registered. Please login instead." },
          { status: 409 }
        );
      }
    }

    // Cooldown: block resend within RESEND_COOLDOWN_SECONDS.
    // Skipped entirely while the mock OTP provider is active (dev/testing) —
    // only applies once a real SMS gateway (OTP_PROVIDER != mock) is wired in.
    const isMockProvider = (process.env.OTP_PROVIDER || "mock") === "mock";
    if (!isMockProvider) {
      const recent = await Otp.findOne({ mobile, purpose }).sort({ createdAt: -1 });
      if (recent) {
        const secondsSinceLast =
          (Date.now() - new Date(recent.createdAt).getTime()) / 1000;
        if (secondsSinceLast < RESEND_COOLDOWN_SECONDS) {
          return NextResponse.json(
            {
              error: `Please wait ${Math.ceil(
                RESEND_COOLDOWN_SECONDS - secondsSinceLast
              )}s before requesting another OTP.`,
            },
            { status: 429 }
          );
        }
      }
    }

    const otp = generateOtp();
    const otpHash = await bcrypt.hash(otp, 10);
    const expiresAt = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000);

    await Otp.create({ mobile, otpHash, purpose, expiresAt });

    const provider = getOtpProvider();
    const result = await provider.sendOtp(mobile, otp);

    return NextResponse.json({
      success: true,
      message: "OTP sent successfully.",
      // Only present with the mock provider — remove once a real SMS
      // gateway is wired in (real providers never return debugOtp).
      ...(result.debugOtp ? { debugOtp: result.debugOtp } : {}),
    });
  } catch (err) {
    console.error("[otp/send] error:", err);
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
