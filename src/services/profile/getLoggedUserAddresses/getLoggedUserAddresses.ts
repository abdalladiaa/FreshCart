"use server";

import { UserAddressesResponse } from "@/interfaces/userAddresses.interface";
import { getDecodedTokenFunc } from "@/utils/getDecodedTokenFunc";

export async function getLoggedUserAddresses() {
  const token = await getDecodedTokenFunc();

  if (!token) {
    throw new Error("unAuth");
  }

  try {
    const respons = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/addresses`, {
      method: "GET",
      headers: {
        token,
        "Content-type": "application/json",
      },
    });
    const data: UserAddressesResponse = await respons.json();
    return data;
  } catch {
    throw new Error("get logged user addresses Error");
  }
}
