import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET as string;
const COOKIE_NAME = process.env.ADMIN_SESSION_COOKIE_NAME || "vbc_admin_session";
const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

if (!JWT_SECRET) {
  console.warn("[auth] Missing JWT_SECRET environment variable.");
}

export interface AdminSessionPayload {
  adminId: string;
  email: string;
}

/** Signs a JWT for an authenticated admin. */
export function signAdminToken(payload: AdminSessionPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: SESSION_MAX_AGE });
}

/** Verifies a JWT and returns the decoded payload, or null if invalid/expired. */
export function verifyAdminToken(token: string): AdminSessionPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as AdminSessionPayload;
  } catch {
    return null;
  }
}

/** Sets the admin session cookie (httpOnly, secure in production). */
export async function setAdminSessionCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
}

/** Clears the admin session cookie (logout). */
export async function clearAdminSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

/**
 * Reads and verifies the current admin session from cookies.
 * Use in Server Components / layouts / route handlers.
 */
export async function getAdminSession(): Promise<AdminSessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyAdminToken(token);
}

/**
 * Guard for API route handlers: throws a Response(401) style result
 * the caller can return directly if there's no valid admin session.
 * Usage:
 *   const session = await requireAdmin();
 *   if (session instanceof Response) return session;
 */
export async function requireAdmin(): Promise<AdminSessionPayload | Response> {
  const session = await getAdminSession();
  if (!session) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }
  return session;
}

export const ADMIN_COOKIE_NAME = COOKIE_NAME;