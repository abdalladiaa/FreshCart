'use server'
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getDecodedTokenFunc() {
  const cookie = await cookies();
  const token = cookie.get("next-auth.session-token")?.value;
  const decodedCookie = await decode({
    secret: process.env.AUTH_SECRET!,
    token,
  });
  return decodedCookie?.userToken
}
