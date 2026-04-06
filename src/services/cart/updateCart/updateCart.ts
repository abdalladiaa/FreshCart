"use server";

import { CartResponse } from "@/interfaces/cart.interface";
import { getDecodedTokenFunc } from "@/utils/getDecodedTokenFunc";
import { revalidatePath } from "next/cache";

export async function updateCart(productId: string, count: number) {
  const token = await getDecodedTokenFunc();
  if (!token) {
    throw new Error("unAuth");
  }
  try {
    const respons = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL_V2}/cart/${productId}`,
      {
        method: "PUT",
        body: JSON.stringify({ count }),
        headers: {
          token,
          "Content-type": "application/json",
        },
      },
    );
    const data: CartResponse = await respons.json();

    if(data.status === "success"){
      revalidatePath('/cart')
    }

    return data;
  } catch {
    throw new Error("update Cart item Error");
  }
}
