import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Client from "@/models/Client";
import { requireAdmin } from "@/lib/auth";
import { reorderDocument } from "@/lib/reorder";

interface Params {
  params: Promise<{ id: string }>;
}

export async function PUT(req: NextRequest, { params }: Params) {
  const session = await requireAdmin();
  if (session instanceof Response) return session;

  const { id } = await params;

  try {
    const { name, logo } = await req.json();

    await connectDB();
    const client = await Client.findByIdAndUpdate(
      id,
      { $set: { name, logo } },
      { new: true }
    );

    if (!client) {
      return NextResponse.json({ error: "Client not found." }, { status: 404 });
    }

    return NextResponse.json(client);
  } catch (err) {
    console.error("[home/clients/:id] update error:", err);
    return NextResponse.json({ error: "Failed to update client." }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: Params) {
  const session = await requireAdmin();
  if (session instanceof Response) return session;

  const { id } = await params;

  await connectDB();
  await Client.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}

export async function PATCH(req: NextRequest, { params }: Params) {
  const session = await requireAdmin();
  if (session instanceof Response) return session;

  const { id } = await params;

  try {
    const { direction } = await req.json();
    if (direction !== "up" && direction !== "down") {
      return NextResponse.json({ error: "Invalid direction." }, { status: 400 });
    }

    await connectDB();
    await reorderDocument(Client, id, direction);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[home/clients/:id] reorder error:", err);
    return NextResponse.json({ error: "Failed to reorder client." }, { status: 500 });
  }
}
