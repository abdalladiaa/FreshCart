"use server"
import { getDecodedCookie } from "./getDecodedTokenFunc";

export async function getUserRole() {
  const token = await getDecodedCookie();
  return token?.role;
}