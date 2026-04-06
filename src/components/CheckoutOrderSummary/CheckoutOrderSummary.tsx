import React from "react";
import { FaBox, FaTruck } from "react-icons/fa";
import { FaBagShopping, FaShieldHalved } from "react-icons/fa6";

export default function CheckoutOrderSummary() {
  return (
    <div className="lg:col-span-1">
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm sticky top-20">
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-4 text-white">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <FaBagShopping /> Order Summary
          </h2>
        </div>

        <div className="p-5">
          {/* Total Calculation */}
          <div className="space-y-3">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span className="font-medium text-gray-900">1,341 EGP</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span className="flex items-center gap-2">
                <FaTruck className="text-gray-400" /> Shipping
              </span>
              <span className="text-green-600 font-semibold">FREE</span>
            </div>
            <hr className="border-gray-100" />
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-gray-900">Total</span>
              <div className="text-right">
                <span className="text-2xl font-bold text-primary-600">
                  1,341
                </span>
                <span className="text-sm text-gray-500 ml-1">EGP</span>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-6 bg-gradient-to-r from-primary-600 to-primary-700 text-white py-4 rounded-xl font-bold hover:from-primary-700 hover:to-primary-800 transition-all shadow-lg shadow-primary-600/20 active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <FaBox /> Place Order
          </button>

          <div className="flex items-center justify-center gap-4 mt-6 text-[10px] text-gray-400 uppercase tracking-widest font-bold">
            <span className="flex items-center gap-1">
              <FaShieldHalved className="text-green-500" /> Secure
            </span>
            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
            <span className="flex items-center gap-1">
              <FaTruck className="text-blue-500" /> Fast
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
