import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import LegalPage, { getOrCreateLegalPage, LegalPageType } from "@/models/LegalPage";
import { requireAdmin } from "@/lib/auth";

const VALID_TYPES: LegalPageType[] = ["privacy", "terms", "refund"];

// GET is public — used by the SSR privacy/terms/refund pages.
// ?type=privacy|terms|refund. Without a type, returns all three (used by the admin editor).
export async function GET(req: NextRequest) {
  await connectDB();

  const type = req.nextUrl.searchParams.get("type") as LegalPageType | null;

  if (type) {
    if (!VALID_TYPES.includes(type)) {
      return NextResponse.json({ error: "Invalid legal page type." }, { status: 400 });
    }
    const page = await getOrCreateLegalPage(type);
    return NextResponse.json(page);
  }

  const pages = await Promise.all(VALID_TYPES.map((t) => getOrCreateLegalPage(t)));
  return NextResponse.json(pages);
}

// PUT is admin-only — body: { type, title, content }
export async function PUT(req: NextRequest) {
  const session = await requireAdmin();
  if (session instanceof Response) return session;

  try {
    const { type, title, content } = await req.json();

    if (!type || !VALID_TYPES.includes(type)) {
      return NextResponse.json({ error: "Invalid legal page type." }, { status: 400 });
    }

    await connectDB();
    const page = await LegalPage.findOneAndUpdate(
      { type },
      { $set: { title, content } },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    return NextResponse.json(page);
  } catch (err) {
    console.error("[legal] update error:", err);
    return NextResponse.json({ error: "Failed to update legal page." }, { status: 500 });
  }
}
