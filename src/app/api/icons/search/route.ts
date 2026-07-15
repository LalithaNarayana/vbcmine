import { NextRequest, NextResponse } from "next/server";
import { LUCIDE_ICON_NAMES } from "@/constants/lucideIconNames";
import { requireAdmin } from "@/lib/auth";

// Admin-only — powers the IconPicker search-as-you-type. The picker
// component also does client-side filtering, but this endpoint exists
// so the full ~1900-icon list never has to ship to the client bundle
// and searches can be done server-side instead.
export async function GET(req: NextRequest) {
  const session = await requireAdmin();
  if (session instanceof Response) return session;

  const q = (req.nextUrl.searchParams.get("q") || "").trim().toLowerCase();

  const results = q
    ? LUCIDE_ICON_NAMES.filter((name) => name.includes(q)).slice(0, 100)
    : LUCIDE_ICON_NAMES.slice(0, 60);

  return NextResponse.json(results);
}
