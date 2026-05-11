import { getUserId } from "@/utils/getUserId";
import { Order } from "@/interfaces/orders.interface";

export async function getUserOrders(): Promise<Order[]> {

    const userId = await getUserId()
    console.log(userId);
    

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/orders/user/${userId}`,
    {
      method: "GET",
      headers: { "content-type": "application/json" },
    },
  );
  return await res.json();
}
