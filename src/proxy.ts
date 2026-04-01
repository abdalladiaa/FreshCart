import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  if (req.nextUrl.pathname.includes("/cart")) {
    if (!token) {
      return NextResponse.redirect(
        `${process.env.NEXTAUTH_URL_INTERNAL}/signin`,
      );
    } else {
      return NextResponse.next();
    }
  }
  if (
    req.nextUrl.pathname.includes("/signin") ||
    req.nextUrl.pathname.includes("/signup")
  ) {
    if (token) {
      return NextResponse.redirect(`${process.env.NEXTAUTH_URL_INTERNAL}/`);
    } else {
      return NextResponse.next();
    }
  }
}

export const config = {
  matcher: ["/cart", "/signin", "/signup"],
};
