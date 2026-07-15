import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Settings, { getOrCreateSettings } from "@/models/Settings";
import { requireAdmin } from "@/lib/auth";

// GET is public — used by SSR pages (layout, contact page, footer, etc.)
export async function GET() {
  await connectDB();
  const settings = await getOrCreateSettings();
  return NextResponse.json(settings);
}

// PUT is admin-only — used by the Settings admin screen
export async function PUT(req: NextRequest) {
  const session = await requireAdmin();
  if (session instanceof Response) return session;

  try {
    const body = await req.json();

    const allowedFields = [
      "siteName",
      "logo",
      "favicon",
      "metaTitle",
      "metaDescription",
      "contact1",
      "contact2",
      "whatsappNumber",
      "mail1",
      "mail2",
      "address",
      "workingHours",
      "topBarTitle",
      "topBarNumber",
      "footerDescription",
    ];

    const update: Record<string, unknown> = {};
    for (const field of allowedFields) {
      if (field in body) update[field] = body[field];
    }

    await connectDB();

    const settings = await Settings.findOneAndUpdate(
      {},
      { $set: update },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    return NextResponse.json(settings);
  } catch (err) {
    console.error("[settings] update error:", err);
    return NextResponse.json(
      { error: "Failed to update settings." },
      { status: 500 }
    );
  }
}