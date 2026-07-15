import slugify from "slugify";

/**
 * Generates a URL-safe, lowercase slug from a string (e.g. a Business
 * Service name), used for /services/[slug] routes.
 */
export function toSlug(value: string): string {
  return slugify(value, { lower: true, strict: true, trim: true });
}

/**
 * Ensures a slug is unique against a Mongoose model by appending
 * -2, -3, ... if the base slug is already taken by another document.
 */
export async function ensureUniqueSlug(
  model: { exists: (q: Record<string, unknown>) => Promise<unknown> },
  base: string,
  excludeId?: string
): Promise<string> {
  let slug = base;
  let counter = 2;

  while (
    await model.exists(
      excludeId ? { slug, _id: { $ne: excludeId } } : { slug }
    )
  ) {
    slug = `${base}-${counter}`;
    counter += 1;
  }

  return slug;
}