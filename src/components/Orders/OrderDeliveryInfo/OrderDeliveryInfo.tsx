import React from "react";
import { FaMapMarkerAlt, FaShippingFast } from "react-icons/fa";
import { ShippingAddress } from "@/interfaces/orders.interface";

interface DeliveryInfoProps {
  shippingAddress?: ShippingAddress;
  paymentMethodType: string;
}

export default function OrderDeliveryInfo({
  shippingAddress,
  paymentMethodType,
}: DeliveryInfoProps) {
  return (
    <div className="bg-gray-50/50 rounded-2xl p-5 space-y-4">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-primary-600 shadow-sm shrink-0">
          <FaMapMarkerAlt />
        </div>
        <div>
          <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">
            Shipping Address
          </p>
          <p className="text-sm text-gray-700 mt-1 font-medium">
            {shippingAddress
              ? `${shippingAddress.details}, ${shippingAddress.city} (Phone: ${shippingAddress.phone})`
              : "No address provided"}
          </p>
        </div>
      </div>
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-primary-600 shadow-sm shrink-0">
          <FaShippingFast />
        </div>
        <div>
          <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">
            Payment Method
          </p>
          <p className="text-sm text-gray-700 mt-1 font-medium italic uppercase">
            {paymentMethodType}
          </p>
        </div>
      </div>
    </div>
  );
}
