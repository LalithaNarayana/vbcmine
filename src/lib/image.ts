import sharp from "sharp";

export interface ProcessImageOptions {
  /** Max width in px; image is downscaled to fit, never upscaled. */
  maxWidth?: number;
  /** Max height in px; used together with maxWidth (contain, no crop). */
  maxHeight?: number;
  /** webp quality 1-100 */
  quality?: number;
}

/**
 * Converts any incoming image buffer (jpg/png/gif/etc.) to a compressed
 * WebP buffer. Every image uploaded anywhere in the admin panel
 * (banners, logos, favicons, plan/OTT icons, service images, client
 * logos, card images, testimonial avatars, etc.) must pass through
 * this before being sent to S3.
 */
export async function processImageToWebp(
  input: Buffer,
  options: ProcessImageOptions = {}
): Promise<Buffer> {
  const { maxWidth = 1600, maxHeight = 1600, quality = 100 } = options;

  return sharp(input)
    .rotate() // auto-orient based on EXIF, then strip metadata
    .resize({
      width: maxWidth,
      height: maxHeight,
      fit: "inside",
      withoutEnlargement: true,
    })
    .webp({ quality })
    .toBuffer();
}

/**
 * Preset used for small icon-style images (OTT app icons, client
 * logos) where a smaller max size keeps files light.
 */
export async function processIconToWebp(input: Buffer): Promise<Buffer> {
  return processImageToWebp(input, { maxWidth: 512, maxHeight: 512, quality: 100 });
}

/**
 * Preset used for the site favicon specifically.
 */
export async function processFaviconToWebp(input: Buffer): Promise<Buffer> {
  return processImageToWebp(input, { maxWidth: 256, maxHeight: 256, quality: 100 });
}