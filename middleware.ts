import { NextRequest, NextResponse } from "next/server";

const USER_COOKIE_NAME =
  process.env.USER_SESSION_COOKIE_NAME || "vbc_user_session";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/dashboard")) {
    const token = req.cookies.get(USER_COOKIE_NAME)?.value;
    if (!token) {
      const loginUrl = new URL("/login", req.url);
      loginUrl.searchParams.set("next", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
