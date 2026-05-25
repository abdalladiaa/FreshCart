import React from "react";
import { FaCalendarAlt, FaCheckCircle, FaClock } from "react-icons/fa";
import { Order } from "@/interfaces/orders.interface";
import OrderProductItem from "../OrderProductItem/OrderProductItem";
import OrderDeliveryInfo from "../OrderDeliveryInfo/OrderDeliveryInfo";

interface OrderCardProps {
  order: Order;
}

export default function OrderCard({ order }: OrderCardProps) {

  const orderDate = new Date(order.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      {/* Order Header */}
      <div className="bg-gray-50/50 px-6 py-4 flex flex-wrap items-center justify-between gap-4 border-b border-gray-100">
        <div className="flex flex-wrap items-center gap-6">
          <div>
            <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">
              Order ID
            </p>
            <p className="text-sm font-bold text-gray-900">#{order.id}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">
              Date
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-700 font-medium">
              <FaCalendarAlt className="text-primary-500" /> {orderDate}
            </div>
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">
              Status
            </p>
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                order.isDelivered
                  ? "bg-green-100 text-green-700"
                  : "bg-blue-100 text-blue-700"
              }`}
            >
              {order.isDelivered ? <FaCheckCircle /> : <FaClock />}
              {order.isDelivered ? "Delivered" : "Processing"}
            </span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">
            Total Amount
          </p>
          <p className="text-lg font-black text-primary-600">
            {order.totalOrderPrice} EGP
          </p>
        </div>
      </div>

      {/* Order Body */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Products List */}
          <div className="space-y-4">
            {order.cartItems?.map((item) => (
              <OrderProductItem key={item._id} item={item} />
            ))}
          </div>

          {/* Delivery & Payment Info */}
          <OrderDeliveryInfo
            shippingAddress={order.shippingAddress}
            paymentMethodType={order.paymentMethodType}
          />
        </div>
      </div>
    </div>
  );
}
