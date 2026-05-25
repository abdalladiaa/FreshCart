"use server";

import { CartResponse } from "@/interfaces/cart.interface";
import { getDecodedTokenFunc } from "@/utils/getDecodedTokenFunc";
import { revalidatePath } from "next/cache";

export async function deleteWishlistItem(productId: string) {
  const token = await getDecodedTokenFunc();
  if (!token) {
    throw new Error("unAuth");
  }
  try {
    const respons = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/wishlist/${productId}`,
      {
        method: "DELETE",
        headers: {
          token,
          "Content-type": "application/json",
        },
      },
    );
    const data: CartResponse = await respons.json();

    if(data.status === "success"){
      revalidatePath('/wishlist')
    }

    return data;
  } catch {
    throw new Error("Delete wishlist item Error");
  }
}
