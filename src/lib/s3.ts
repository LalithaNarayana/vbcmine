import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import crypto from "crypto";

const REGION = process.env.AWS_REGION as string;
const BUCKET_NAME = process.env.AWS_BUCKET_NAME as string;
// Optional: custom endpoint for S3-*compatible* providers (Contabo, DigitalOcean
// Spaces, Backblaze B2, MinIO, Wasabi, etc). Leave unset to talk to real AWS S3.
// e.g. https://sin1.contabostorage.com
const S3_ENDPOINT = process.env.AWS_S3_ENDPOINT;
// Public base URL used to build the returned image URL, e.g.
// https://sin1.contabostorage.com/<bucket-id>:<bucket-name>  (Contabo uses
// path-style addressing, so the bucket name is part of the path, not a subdomain)
const S3_DOMAIN = process.env.AWS_S3_DOMAIN as string;

if (!REGION || !BUCKET_NAME || !process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY || !S3_DOMAIN) {
  console.warn(
    "[s3] One or more storage env vars are missing. Uploads will fail until AWS_REGION, AWS_BUCKET_NAME, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_S3_DOMAIN (and AWS_S3_ENDPOINT for non-AWS providers) are set."
  );
}

const s3Client = new S3Client({
  region: REGION,
  // Any S3-compatible provider needs both the custom endpoint AND
  // path-style addressing (bucket-in-path, not bucket-as-subdomain).
  // This is also required here because the bucket name contains a ":",
  // which isn't a valid DNS label, so virtual-hosted-style requests
  // (bucket.endpoint.com) would fail outright even against Contabo.
  ...(S3_ENDPOINT
    ? { endpoint: S3_ENDPOINT, forcePathStyle: true }
    : {}),
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
});

export interface UploadResult {
  key: string;
  url: string;
}

/**
 * Uploads a buffer to S3 with public-read ACL so the object can be
 * fetched directly via its URL. Used for all CMS image uploads
 * (already converted to webp + resized before calling this).
 */
export async function uploadBufferToS3(
  buffer: Buffer,
  options: {
    folder: string; // e.g. "banners", "plans", "services"
    contentType?: string; // defaults to image/webp
    fileNameHint?: string; // optional slug for readability
  }
): Promise<UploadResult> {
  const { folder, contentType = "image/webp", fileNameHint } = options;

  const uniqueId = crypto.randomBytes(8).toString("hex");
  const safeHint = fileNameHint
    ? fileNameHint.toLowerCase().replace(/[^a-z0-9-]+/g, "-").slice(0, 40)
    : "img";
  const key = `${folder}/${Date.now()}-${safeHint}-${uniqueId}.webp`;

  await s3Client.send(
    new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
      Body: buffer,
      ContentType: contentType,
      ACL: "public-read",
    })
  );

  const baseDomain = S3_DOMAIN?.replace(/\/$/, "");
  const url = `${baseDomain}/${key}`;

  return { key, url };
}

/**
 * Deletes an object from S3 by its key. Used when an admin replaces
 * or removes an image so the old file doesn't linger in the bucket.
 */
export async function deleteFromS3(key: string): Promise<void> {
  if (!key) return;
  await s3Client.send(
    new DeleteObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
    })
  );
}

/**
 * Derives the S3 key from a full public URL (so we can delete old
 * images when a CMS field is updated with a new one).
 */
export function keyFromUrl(url: string): string {
  const baseDomain = S3_DOMAIN?.replace(/\/$/, "");
  return url.startsWith(baseDomain) ? url.slice(baseDomain.length + 1) : url;
}

export default s3Client;