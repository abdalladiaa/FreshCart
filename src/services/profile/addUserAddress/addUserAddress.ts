"use server";

import { getDecodedTokenFunc } from "@/utils/getDecodedTokenFunc";
import { revalidatePath } from "next/cache";

export interface AddressInput {
  name: string;
  details: string;
  phone: string;
  city: string;
}

export async function addUserAddress(values: AddressInput) {
  const token = await getDecodedTokenFunc();

  if (!token) {
    throw new Error("unAuth");
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/addresses`,
    {
      method: "POST",
      body: JSON.stringify(values),
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
