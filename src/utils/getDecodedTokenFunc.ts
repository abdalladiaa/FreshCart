"use server";

import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getDecodedCookie() {
  const cookieStore = await cookies();

  const token =
    cookieStore.get("__Secure-next-auth.session-token")?.value ||
    cookieStore.get("next-auth.session-token")?.value;

  if (!token) return null;

  const decodedCookie = await decode({
    secret: process.env.AUTH_SECRET!,
    token,
  });

  return decodedCookie;
}

export async function getDecodedTokenFunc() {
  const decodedCookie = await getDecodedCookie();
  return decodedCookie?.userToken;
}

// const token =
//   cookieStore.get("__Secure-next-auth.session-token")?.value ||
//   cookieStore.get("next-auth.session-token")?.value;
// "use server";

// import { cookies } from "next/headers";
// import { getToken } from "next-auth/jwt";

// export async function getDecodedTokenFunc() {
//   const cookieStore = await cookies();

//   const token = await getToken({
//     req: {
//       cookies: {
//         "next-auth.session-token":
//           cookieStore.get("next-auth.session-token")?.value,
//         "__Secure-next-auth.session-token":
//           cookieStore.get("__Secure-next-auth.session-token")?.value,
//       },
//     } as any,
//     secret: process.env.NEXTAUTH_SECRET,
//   });

//   return token?.userToken ?? null;
// }