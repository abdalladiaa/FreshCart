"use server";

import { CartResponse } from "@/interfaces/cart.interface";
import { getDecodedTokenFunc } from "@/utils/getDecodedTokenFunc";
import { revalidatePath } from "next/cache";

export async function updateCart(productId: string, count: number) {
  const token = await getDecodedTokenFunc();
  if (!token) {
    // Not authenticated — return a failure-shaped response instead of throwing
    return {
      status: "fail",
      message: "unAuth",
      numOfCartItems: 0,
      cartId: "",
      data: {
        _id: "",
        cartOwner: "",
        products: [],
        createdAt: "",
        updatedAt: "",
        __v: 0,
        totalCartPrice: 0,
      },
    } as unknown as CartResponse;
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
