"use server"
import { getDecodedCookie } from "./getDecodedTokenFunc";

export async function getUserId() {
  const token = await getDecodedCookie();
  return token?.userId;
}