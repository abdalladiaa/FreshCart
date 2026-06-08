"use server"
import { getDecodedCookie } from "./getDecodedTokenFunc";

export async function getUserInfo() {
  const token = await getDecodedCookie();
  return {
    userName: token?.name,
    email: token?.email,
  };
}