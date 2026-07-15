import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireAdmin } from "@/lib/auth";
import { getIspProvider } from "@/lib/isp";

const bodySchema = z.object({
  accountId: z.string().trim().min(1, "accountId is required."),
});

/**
 * POST /api/isp/deactivate — admin action to suspend a customer's
 * connection with the ISP provider. Used from the Sales panel.
 */
export async function POST(req: NextRequest) {
  const session = await requireAdmin();
  if (session instanceof Response) return session;

  try {
    const body = await req.json();
    const parsed = bodySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || "Invalid input." },
        { status: 400 }
      );
    }

    const provider = getIspProvider();
    const result = await provider.deactivate(parsed.data.accountId);

    return NextResponse.json(result);
  } catch (err) {
    console.error("[isp/deactivate] error:", err);
    return NextResponse.json(
      { error: "Failed to deactivate connection." },
      { status: 500 }
    );
  }
}
