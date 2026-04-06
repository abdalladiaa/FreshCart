import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(req: NextRequest) {
  const cookieName =
    process.env.NODE_ENV == "production"
      ? "__Secure-next-auth.session-token"
      : "next-auth.session-token";
  const token = await getToken({ req, secret: process.env.AUTH_SECRET , cookieName });
  if (req.nextUrl.pathname.includes("/cart")) {
    if (!token) {
      return NextResponse.redirect(new URL("/signin", req.url));
    } else {
      return NextResponse.next();
    }
  }
  if (
    req.nextUrl.pathname.includes("/signin") ||
    req.nextUrl.pathname.includes("/signup")
  ) {
    if (token) {
      return NextResponse.redirect(new URL("/", req.url));
    } else {
      return NextResponse.next();
    }
  }
}

export const config = {
  matcher: ["/cart", "/signin", "/signup"],
};
