import React from "react";
import { FaBox } from "react-icons/fa";
import { getUserOrders } from "@/services/orders/getUserOrders";
import { UserOrdersResponse } from "@/interfaces/orders.interface";
import OrderCard from "@/components/Orders/OrderCard/OrderCard";

export default async function AllOrders() {
  const orders: UserOrdersResponse = await getUserOrders();

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      {/* Page Header */}
      <div className="flex items-center gap-4 mb-10 border-b border-gray-100 pb-6">
        <div className="w-14 h-14 bg-primary-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-primary-600/20">
          <FaBox size={24} />
        </div>
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            My Orders
          </h1>
          <p className="text-gray-500 mt-1">
            Track and manage your recent purchases
          </p>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-8">
        {orders && orders.length > 0 ? (
          orders.map((order) => <OrderCard key={order._id} order={order} />)
        ) : (
          <div className="text-center py-12 text-gray-500">
            You haven't placed any orders yet.
          </div>
        )}
      </div>
    </div>
  );
}
