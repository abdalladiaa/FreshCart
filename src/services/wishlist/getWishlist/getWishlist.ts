"use server";

import { WishlistResponse } from "@/interfaces/wishlist.interface";
import { getDecodedTokenFunc } from "@/utils/getDecodedTokenFunc";

export async function getWishlist() {
  const token = await getDecodedTokenFunc();

  if (!token) {
    throw new Error("unAuth");
  }

  try {
    const respons = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/wishlist`, {
      method: "GET",
      headers: {
        token,
        "Content-type": "application/json",
      },
    });
    const data: WishlistResponse = await respons.json();
    return data;
  } catch {
    throw new Error("get Wishlist Error");
  }
}
