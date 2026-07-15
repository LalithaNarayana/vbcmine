import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import connectDB from "@/lib/mongodb";
import Admin from "@/models/Admin";
import { signAdminToken, setAdminSessionCookie } from "@/lib/auth";

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(1),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = loginSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid email or password format." },
        { status: 400 }
      );
    }

    const { email, password } = parsed.data;

    await connectDB();

    const admin = await Admin.findOne({ email: email.toLowerCase() }).select(
      "+password"
    );

    if (!admin) {
      return NextResponse.json(
        { error: "Invalid credentials." },
        { status: 401 }
      );
    }

    const isValid = await admin.comparePassword(password);
    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid credentials." },
        { status: 401 }
      );
    }

    const token = signAdminToken({
      adminId: admin._id.toString(),
      email: admin.email,
    });

    await setAdminSessionCookie(token);

    return NextResponse.json({
      success: true,
      admin: { email: admin.email, name: admin.name },
    });
  } catch (err) {
    console.error("[admin-login] error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}