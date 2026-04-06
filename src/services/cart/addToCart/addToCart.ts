"use server";

import { CartResponsAdd } from "@/interfaces/addToCart.interface";
import { getDecodedTokenFunc } from "@/utils/getDecodedTokenFunc";

export async function addToCart(productId: string) {
  const token = await getDecodedTokenFunc();
  console.log(token, "UserToken");

  if (!token) {
    // Not authenticated — signal failure to caller instead of throwing
    return false;
  }

  try {
    const respons = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_V2}/cart`, {
      method: "POST",
      body: JSON.stringify({ productId }),
      headers: {
        token,
        "Content-type": "application/json",
      },
    });
    const data: CartResponsAdd = await respons.json();

    if (data.status === "success") {
      return true;
    } else {
      return false;
    }
  } catch {
    return false;
  }
}
