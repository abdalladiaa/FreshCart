"use client";
import { ProductDetails } from "@/interfaces/productDetails.interface";
import React from "react";
import { FaMinus, FaPlus } from "react-icons/fa";

type Props = {
  product: ProductDetails;
  setInputValue: React.Dispatch<React.SetStateAction<number>>;
  inputValue: number;
};

export default function QuantityCounter({
  product,
  setInputValue,
  inputValue,
}: Props) {
  // تعريف متغير للسهولة وللحماية لو الداتا لسه مجتش
  const stock = product.data?.quantity ?? 0;
  const isOutOfStock = stock <= 0;

  return (
    <div className="flex items-center gap-6 mb-8">
      <div
        className={`flex items-center border-2 border-gray-100 rounded-xl overflow-hidden bg-white shadow-sm ${isOutOfStock ? "opacity-50 pointer-events-none" : ""}`}
      >
        {/* Minus btn */}
        <button
          type="button"
          onClick={() => setInputValue((prev) => Math.max(1, prev - 1))}
          className="cursor-pointer px-5 py-3 text-gray-400 hover:bg-red-50 hover:text-red-500 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          disabled={inputValue <= 1 || isOutOfStock}
        >
          <FaMinus size={14} />
        </button>

        <input
          readOnly // أحسن من disabled عشان الـ value تبان واضحة واليوزر ميعرفش يغيرها كيبورد
          type="number"
          value={isOutOfStock ? 0 : inputValue}
          className="w-16 text-center border-0 focus:ring-0 focus:outline-none text-lg font-medium bg-transparent"
        />

        {/* Plus btn */}
        <button
          type="button"
          onClick={() => setInputValue((prev) => Math.min(stock, prev + 1))}
          className="cursor-pointer px-5 py-3 text-gray-400 hover:bg-primary-50 hover:text-primary-600 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          disabled={inputValue >= stock || isOutOfStock}
        >
          <FaPlus size={14} />
        </button>
      </div>

      <div className="flex flex-col justify-center">
        <span
          className={`text-sm font-bold ${isOutOfStock ? "text-red-500" : "text-gray-900"}`}
        >
          {stock} available
        </span>
        <span
          className={`text-[10px] font-medium uppercase tracking-wider ${isOutOfStock ? "text-red-400" : "text-green-500"}`}
        >
          {isOutOfStock ? "Out of Stock" : "In Stock"}
        </span>
      </div>
    </div>
  );
}
