"use server"
import { getDecodedCookie } from "./getDecodedTokenFunc";

export async function getUserId() {
  return ( await getDecodedCookie())?.user?.id;
}