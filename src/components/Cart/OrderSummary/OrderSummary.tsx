import React from "react";
import {
  FaBagShopping,
  FaTruck,
  FaTag,
  FaLock,
  FaShieldHalved,
} from "react-icons/fa6";
import Link from "next/link";

interface OrderSummaryProps {
  subtotal: number;
  itemCount: number;
}

export default function OrderSummary({
  subtotal,
  itemCount,
}: OrderSummaryProps) {
  const FREE_SHIPPING_THRESHOLD = 500;
  const SHIPPING_FEE = 50;
  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;

  const amountToFreeShipping = FREE_SHIPPING_THRESHOLD - subtotal;
  const progressPercentage = Math.min(
    (subtotal / FREE_SHIPPING_THRESHOLD) * 100,
    100,
  );

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden sticky top-24 shadow-sm">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-5">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <FaBagShopping size={20} />
          Order Summary
        </h2>
        <p className="text-primary-100 text-sm mt-1.5 opacity-90">
          {itemCount} {itemCount === 1 ? "item" : "items"} in your cart
        </p>
      </div>

      <div className="p-6 space-y-5">
        {/* Dynamic Shipping Badge / Progress Bar */}
        {isFreeShipping ? (
          <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl p-4 flex items-center gap-3 border border-emerald-100/50">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-emerald-600">
              <FaTruck size={18} />
            </div>
            <div>
              <p className="font-bold text-emerald-700 text-sm">
                Free Shipping!
              </p>
              <p className="text-xs text-emerald-600/80">
                You qualify for free delivery
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-4 border border-orange-100/50">
            <div className="flex items-center gap-2 mb-2.5">
              <FaTruck className="text-orange-500" size={16} />
              <span className="text-sm font-bold text-gray-700">
                Add{" "}
                <span className="text-orange-600">
                  {amountToFreeShipping} EGP
                </span>{" "}
                for free shipping
              </span>
            </div>
            <div className="h-2 bg-orange-100 rounded-full overflow-hidden shadow-inner">
              <div
                className="h-full bg-gradient-to-r from-orange-400 to-amber-400 rounded-full transition-all duration-700 ease-out"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Pricing Details */}
        <div className="space-y-3.5">
          <div className="flex justify-between text-gray-600 text-sm font-medium">
            <span>Subtotal</span>
            <span className="text-gray-900 font-bold">
              {subtotal.toLocaleString()} EGP
            </span>
          </div>
          <div className="flex justify-between text-sm font-medium">
            <span className="text-gray-600">Shipping</span>
            <span
              className={
                isFreeShipping
                  ? "text-emerald-600 font-bold"
                  : "text-gray-900 font-bold"
              }
            >
              {isFreeShipping ? "FREE" : `${SHIPPING_FEE} EGP`}
            </span>
          </div>

          <div className="border-t border-dashed border-gray-200 pt-4 mt-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-900 font-bold text-lg">Total</span>
              <div className="text-right">
                <span className="text-2xl font-black text-gray-900">
                  {(
                    subtotal + (isFreeShipping ? 0 : SHIPPING_FEE)
                  ).toLocaleString()}
                </span>
                <span className="text-sm font-bold text-gray-400 ml-1">
                  EGP
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Actions & Trust Badges (نفس الكود السابق) */}
        <div className="space-y-3">
          <button className="w-full flex items-center justify-center gap-2 py-3 border border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-primary-400 hover:text-primary-600 hover:bg-primary-50/50 transition-all font-medium text-sm">
            <FaTag /> Apply Promo Code
          </button>
          <Link
            href="/checkout"
            className="w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white py-4 px-6 rounded-xl font-bold hover:shadow-lg transition-all flex items-center justify-center gap-3 active:scale-[0.97]"
          >
            <FaLock size={16} /> Secure Checkout
          </Link>
        </div>

        <div className="flex items-center justify-center gap-4 py-2 border-t border-gray-50">
          <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-bold uppercase">
            <FaShieldHalved className="text-emerald-500" /> Secure
          </div>
          <div className="w-px h-3 bg-gray-200"></div>
          <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-bold uppercase">
            <FaTruck className="text-blue-500" /> Fast
          </div>
        </div>
      </div>
    </div>
  );
}
