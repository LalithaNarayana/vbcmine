import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { processImageToWebp, processIconToWebp, processFaviconToWebp } from "@/lib/image";
import { uploadBufferToS3, deleteFromS3, keyFromUrl } from "@/lib/s3";

export const runtime = "nodejs";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif"];
const MAX_SIZE_BYTES = 10 * 1024 * 1024; // 10MB raw upload cap before compression

// folders that use the smaller "icon" preset instead of the full-size preset
const ICON_FOLDERS = new Set(["ott-icons", "client-logos"]);

export async function POST(req: NextRequest) {
  const session = await requireAdmin();
  if (session instanceof Response) return session;

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const folder = (formData.get("folder") as string) || "misc";
    const oldUrl = formData.get("oldUrl") as string | null; // optional: delete previous image

    if (!file) {
      return NextResponse.json({ error: "No file provided." }, { status: 400 });
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "Unsupported file type. Use JPG, PNG, WEBP, GIF or AVIF." },
        { status: 400 }
      );
    }

    if (file.size > MAX_SIZE_BYTES) {
      return NextResponse.json(
        { error: "File too large. Max size is 10MB." },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const inputBuffer = Buffer.from(arrayBuffer);

    let webpBuffer: Buffer;
    if (folder === "favicon") {
      webpBuffer = await processFaviconToWebp(inputBuffer);
    } else if (ICON_FOLDERS.has(folder)) {
      webpBuffer = await processIconToWebp(inputBuffer);
    } else {
      webpBuffer = await processImageToWebp(inputBuffer);
    }

    const { url, key } = await uploadBufferToS3(webpBuffer, {
      folder,
      fileNameHint: file.name.replace(/\.[^.]+$/, ""),
    });

    // best-effort cleanup of the previous image so the bucket doesn't fill with orphans
    if (oldUrl) {
      try {
        await deleteFromS3(keyFromUrl(oldUrl));
      } catch (e) {
        console.warn("[upload] failed to delete old image:", e);
      }
    }

    return NextResponse.json({ url, key });
  } catch (err) {
    // Log the real cause server-side (S3/network/auth/env misconfig etc.)
    // so failures are diagnosable — the client only ever sees a generic
    // message, but this line is what tells you what actually broke.
    const message = err instanceof Error ? err.message : String(err);
    console.error("[upload] error:", message, err);
    return NextResponse.json(
      { error: "Upload failed. Please try again." },
      { status: 500 }
    );
  }
}