"use client";
import React from "react";
import {
  Calendar,
  CheckCircle2,
  Clock,
  MapPin,
  Truck,
  Package,
  CreditCard,
} from "lucide-react";
import { Order } from "@/interfaces/orders.interface";

interface OrderCardProps {
  order: Order;
}

export default function OrderCard({ order }: OrderCardProps) {
  const statusConfig = order.isDelivered
    ? {
        label: "Delivered",
        color: "bg-emerald-50 text-emerald-700 border-emerald-100",
        icon: <CheckCircle2 className="w-4 h-4" />,
      }
    : order.isPaid
      ? {
          label: "Paid",
          color: "bg-blue-50 text-blue-700 border-blue-100",
          icon: <CreditCard className="w-4 h-4" />,
        }
      : {
          label: "Processing",
          color: "bg-amber-50 text-amber-700 border-amber-100",
          icon: <Clock className="w-4 h-4" />,
        };

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-all duration-300">
      {/* Order Header */}
      <div className="bg-gray-50/50 px-6 py-5 flex flex-wrap items-center justify-between gap-4 border-b border-gray-100">
        <div className="flex flex-wrap items-center gap-8">
          <div>
            <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mb-1">
              Order ID
            </p>
            <p className="text-sm font-bold text-gray-900">#{order.id}</p>
          </div>

          <div>
            <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mb-1">
              Date
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-700 font-semibold">
              <Calendar className="w-4 h-4 text-primary-500" />
              {new Date(order.createdAt).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </div>
          </div>

          <div>
            <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mb-1">
              Status
            </p>
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold border ${statusConfig.color}`}
            >
              {statusConfig.icon}
              {statusConfig.label}
            </span>
          </div>
        </div>

        <div className="text-right">
          <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mb-1">
            Total Amount
          </p>
          <p className="text-xl font-black text-emerald-600">
            {order.totalOrderPrice.toLocaleString()}{" "}
            <span className="text-xs font-bold">EGP</span>
          </p>
        </div>
      </div>

      {/* Order Body */}
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Products List */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2 mb-4">
              <Package className="w-4 h-4" /> Items ({order.cartItems.length})
            </h5>
            <div className="max-h-[240px] overflow-y-auto pr-2 custom-scrollbar space-y-3">
              {order.cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center gap-4 p-3 rounded-2xl bg-white border border-gray-50 hover:border-emerald-100 hover:bg-emerald-50/10 transition-all group"
                >
                  <div className="w-16 h-16 rounded-xl bg-gray-50 p-1.5 shrink-0 group-hover:scale-105 transition-transform">
                    <img
                      src={item.product.imageCover}
                      alt={item.product.title}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-gray-900 truncate">
                      {item.product.title}
                    </h4>
                    <p className="text-xs text-gray-500 mt-1 font-medium">
                      <span className="text-emerald-600 font-bold">
                        {item.count}
                      </span>{" "}
                      × {item.price} EGP
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery & Logistics */}
          <div className="space-y-4">
            <h5 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2 mb-4">
              <Truck className="w-4 h-4" /> Logistics Details
            </h5>

            <div className="bg-gray-50/80 rounded-2xl p-5 space-y-5 border border-gray-100">
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center text-emerald-600 shadow-sm shrink-0 border border-gray-100">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                    Shipping Address
                  </p>
                  <p className="text-sm text-gray-700 mt-1 font-semibold leading-relaxed">
                    {order.shippingAddress?.city}
                    <span className="block text-xs text-gray-500 font-normal mt-0.5">
                      {order.shippingAddress?.details}
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center text-emerald-600 shadow-sm shrink-0 border border-gray-100">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                    Payment Method
                  </p>
                  <p className="text-sm text-gray-700 mt-1 font-semibold capitalize flex items-center gap-2">
                    {order.paymentMethodType}
                    {order.isPaid && (
                      <span className="text-[10px] bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded uppercase">
                        Paid
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
