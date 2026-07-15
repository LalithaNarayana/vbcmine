import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET as string;
const COOKIE_NAME = process.env.USER_SESSION_COOKIE_NAME || "vbc_user_session";
const SESSION_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

if (!JWT_SECRET) {
  console.warn("[userAuth] Missing JWT_SECRET environment variable.");
}

export interface UserSessionPayload {
  userId: string;
  mobile: string;
}

/** Signs a JWT for an authenticated user. */
export function signUserToken(payload: UserSessionPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: SESSION_MAX_AGE });
}

/** Verifies a JWT and returns the decoded payload, or null if invalid/expired. */
export function verifyUserToken(token: string): UserSessionPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as UserSessionPayload;
  } catch {
    return null;
  }
}

/** Sets the user session cookie (httpOnly, secure in production). */
export async function setUserSessionCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
}

/** Clears the user session cookie (logout). */
export async function clearUserSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

/**
 * Reads and verifies the current user session from cookies.
 * Use in Server Components / layouts / route handlers.
 */
export async function getUserSession(): Promise<UserSessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyUserToken(token);
}

/**
 * Guard for API route handlers: returns a 401 Response if there's no
 * valid user session. Usage:
 *   const session = await requireUser();
 *   if (session instanceof Response) return session;
 */
export async function requireUser(): Promise<UserSessionPayload | Response> {
  const session = await getUserSession();
  if (!session) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }
  return session;
}

export const USER_COOKIE_NAME = COOKIE_NAME;
