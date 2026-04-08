"use server";

import { cookies } from "next/headers";
import { getToken } from "next-auth/jwt";

export async function getDecodedTokenFunc() {
  const cookieStore = await cookies();

  const token = await getToken({
    req: {
      cookies: {
        "next-auth.session-token":
          cookieStore.get("next-auth.session-token")?.value,
        "__Secure-next-auth.session-token":
          cookieStore.get("__Secure-next-auth.session-token")?.value,
      },
    } as any,
    secret: process.env.NEXTAUTH_SECRET,
  });

  return token?.userToken ?? null;
}