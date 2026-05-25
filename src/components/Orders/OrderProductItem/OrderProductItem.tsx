import React from "react";
import { CartItem } from "@/interfaces/orders.interface"; 

interface OrderProductItemProps {
  item: CartItem;
}

export default function OrderProductItem({ item }: OrderProductItemProps) {
  const { product, count, price } = item;

  return (
    <div className="flex items-center gap-4 p-3 rounded-2xl bg-white border border-gray-50 hover:border-primary-100 transition-colors">
      <div className="w-16 h-16 rounded-xl bg-gray-50 p-1 shrink-0">
        <img
          src={product?.imageCover}
          alt={product?.title}
          className="w-full h-full object-contain"
        />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-bold text-gray-900 truncate">
          {product?.title}
        </h4>
        <p className="text-xs text-gray-500 mt-1">
          {count} unit(s) × {price} EGP
        </p>
      </div>
    </div>
  );
}
