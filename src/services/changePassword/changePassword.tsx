import { ChangePasswordSchemaType } from "@/schema/auth.schema";
import { getDecodedTokenFunc } from "@/utils/getDecodedTokenFunc";

export async function changePassword(values:ChangePasswordSchemaType) {
  const token = await getDecodedTokenFunc();

  if (!token) {
    throw new Error("unAuth");
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/users/changeMyPassword`,
    {
      method: "PUT",
      body: JSON.stringify(values),
      headers: {
        token,
        "content-type": "application/json",
      },
    },
  );

  const data = response?.json()

  return data;
}
