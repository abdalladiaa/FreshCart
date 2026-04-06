"use server";

import { CartResponse } from "@/interfaces/cart.interface";
import { getDecodedTokenFunc } from "@/utils/getDecodedTokenFunc";

export async function getCart() {
  const token = await getDecodedTokenFunc();
  if (!token) {
    throw new Error("unAuth");
  }
  try {
    const respons = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_V2}/cart`, {
      method: "GET",
      headers: {
        token,
        "Content-type": "application/json",
      },
    });
    const data: CartResponse = await respons.json();

    return data;
  } catch {
    throw new Error("get Cart Error")
  }
}
