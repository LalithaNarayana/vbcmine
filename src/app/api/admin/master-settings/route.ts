import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import connectDB from "@/lib/mongodb";
import MasterSettings, { getOrCreateMasterSettings } from "@/models/MasterSettings";
import { requireAdmin } from "@/lib/auth";

// GET is admin-only — used by the Master Settings admin screen.
// (Other server code that needs gstPercent for checkout math should call
// getOrCreateMasterSettings() directly rather than fetching this route.)
export async function GET() {
  const session = await requireAdmin();
  if (session instanceof Response) return session;

  await connectDB();
  const settings = await getOrCreateMasterSettings();
  return NextResponse.json(settings);
}

const patchSchema = z.object({
  gstPercent: z.number().min(0).max(100),
});

export async function PATCH(req: NextRequest) {
  const session = await requireAdmin();
  if (session instanceof Response) return session;

  try {
    const body = await req.json();
    const parsed = patchSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || "Invalid GST percentage." },
        { status: 400 }
      );
    }

    await connectDB();

    const settings = await MasterSettings.findOneAndUpdate(
      {},
      { $set: { gstPercent: parsed.data.gstPercent } },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    return NextResponse.json(settings);
  } catch (err) {
    console.error("[admin/master-settings] update error:", err);
    return NextResponse.json(
      { error: "Failed to update GST setting." },
      { status: 500 }
    );
  }
}
