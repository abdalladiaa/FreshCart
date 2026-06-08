"use server";

import { getDecodedTokenFunc } from "@/utils/getDecodedTokenFunc";
import { revalidatePath } from "next/cache";

export async function deleteUserAddress(addressId: string) {
  const token = await getDecodedTokenFunc();

  if (!token) {
    throw new Error("unAuth");
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/addresses/${addressId}`,
    {
      method: "DELETE",
      headers: {
        token,
        "Content-Type": "application/json",
      },
    },
  );

  const data = await response.json();

  if (data.status === "success") {
    revalidatePath("/profile/addresses");
  }

  return data;
}
