import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Client from "@/models/Client";
import { requireAdmin } from "@/lib/auth";
import { getNextOrder } from "@/lib/reorder";

// GET is public — used by the SSR Home Clients section
export async function GET() {
  await connectDB();
  const clients = await Client.find().sort({ order: 1, createdAt: 1 });
  return NextResponse.json(clients);
}

export async function POST(req: NextRequest) {
  const session = await requireAdmin();
  if (session instanceof Response) return session;

  try {
    const { name, logo } = await req.json();

    if (!name || !logo) {
      return NextResponse.json({ error: "Name and logo are required." }, { status: 400 });
    }

    await connectDB();
    const order = await getNextOrder(Client);

    const client = await Client.create({ name, logo, order });

    return NextResponse.json(client, { status: 201 });
  } catch (err) {
    console.error("[home/clients] create error:", err);
    return NextResponse.json({ error: "Failed to create client." }, { status: 500 });
  }
}
