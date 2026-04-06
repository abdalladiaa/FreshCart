"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  FaReceipt,
  FaArrowLeft,
  FaHouseUser,
  FaCity,
  FaLocationDot,
  FaPhone,
  FaWallet,
  FaMoneyBill,
  FaCreditCard,
  FaCheck,
  FaShieldHalved,
  FaBagShopping,
  FaTruck,
  FaBox,
} from "react-icons/fa6"; // تأكد من تثبيت react-icons
import CheckoutOrderSummary from "@/components/CheckoutOrderSummary/CheckoutOrderSummary";

export default function Checkout() {
  const [paymentMethod, setPaymentMethod] = useState("cash");

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb & Header */}
        <div className="mb-8">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <Link className="hover:text-primary-600 transition" href="/">
              Home
            </Link>
            <span className="text-gray-300">/</span>
            <Link className="hover:text-primary-600 transition" href="/cart">
              Cart
            </Link>
            <span className="text-gray-300">/</span>
            <span className="text-gray-900 font-medium">Checkout</span>
          </nav>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <span className="bg-gradient-to-br from-primary-600 to-primary-700 text-white w-12 h-12 rounded-xl flex items-center justify-center shadow-lg shadow-primary-600/20">
                  <FaReceipt size={22} />
                </span>
                Complete Your Order
              </h1>
              <p className="text-gray-500 mt-2">
                Review your items and complete your purchase
              </p>
            </div>
            <Link
              className="text-primary-600 hover:text-primary-700 font-medium flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-primary-50 transition-all"
              href="/cart"
            >
              <FaArrowLeft /> Back to Cart
            </Link>
          </div>
        </div>

        <form>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Side: Forms */}
            <div className="lg:col-span-2 space-y-6">
              {/* Shipping Address Section */}
              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-4">
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <FaHouseUser /> Shipping Address
                  </h2>
                  <p className="text-primary-100 text-sm mt-1">
                    Where should we deliver your order?
                  </p>
                </div>

                <div className="p-6 space-y-5">
                  {/* City Input */}
                  <div>
                    <label
                      htmlFor="city"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      City <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500">
                        <FaCity />
                      </div>
                      <input
                        className="w-full px-4 py-3.5 pl-14 border-2 rounded-xl focus:outline-none transition-all border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
                        placeholder="e.g. Cairo, Alexandria, Giza"
                        type="text"
                      />
                    </div>
                  </div>

                  {/* Street Address Input */}
                  <div>
                    <label
                      htmlFor="details"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Street Address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute left-4 top-4 w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500">
                        <FaLocationDot />
                      </div>
                      <textarea
                        id="details"
                        rows={3}
                        className="w-full px-4 py-3.5 pl-14 border-2 rounded-xl focus:outline-none transition-all resize-none border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
                        placeholder="Street name, building number, floor, apartment..."
                        name="details"
                      ></textarea>
                    </div>
                  </div>

                  {/* Phone Input */}
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500">
                        <FaPhone />
                      </div>
                      <input
                        id="phone"
                        className="w-full px-4 py-3.5 pl-14 border-2 rounded-xl focus:outline-none transition-all border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
                        placeholder="01xxxxxxxxx"
                        type="tel"
                        name="phone"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Method Section */}
              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-4">
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <FaWallet /> Payment Method
                  </h2>
                  <p className="text-primary-100 text-sm mt-1">
                    Choose how you'd like to pay
                  </p>
                </div>

                <div className="p-6 space-y-4">
                  {/* Cash on Delivery */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("cash")}
                    className={`w-full p-5 rounded-xl border-2 transition-all flex items-center gap-4 group ${paymentMethod === "cash" ? "border-primary-500 bg-primary-50/50" : "border-gray-100 hover:border-primary-200"}`}
                  >
                    <div
                      className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all ${paymentMethod === "cash" ? "bg-primary-600 text-white" : "bg-gray-100 text-gray-400"}`}
                    >
                      <FaMoneyBill size={24} />
                    </div>
                    <div className="flex-1 text-left">
                      <h3
                        className={`font-bold ${paymentMethod === "cash" ? "text-primary-700" : "text-gray-900"}`}
                      >
                        Cash on Delivery
                      </h3>
                      <p className="text-sm text-gray-500 mt-0.5">
                        Pay when your order arrives
                      </p>
                    </div>
                    {paymentMethod === "cash" && (
                      <div className="w-7 h-7 rounded-full bg-primary-600 text-white flex items-center justify-center">
                        <FaCheck size={12} />
                      </div>
                    )}
                  </button>

                  {/* Online Payment */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("card")}
                    className={`w-full p-5 rounded-xl border-2 transition-all flex items-center gap-4 group ${paymentMethod === "card" ? "border-primary-500 bg-primary-50/50" : "border-gray-100 hover:border-primary-200"}`}
                  >
                    <div
                      className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all ${paymentMethod === "card" ? "bg-primary-600 text-white" : "bg-gray-100 text-gray-400"}`}
                    >
                      <FaCreditCard size={24} />
                    </div>
                    <div className="flex-1 text-left">
                      <h3
                        className={`font-bold ${paymentMethod === "card" ? "text-primary-700" : "text-gray-900"}`}
                      >
                        Pay Online
                      </h3>
                      <p className="text-sm text-gray-500 mt-0.5">
                        Secure payment via Stripe/Card
                      </p>
                    </div>
                    {paymentMethod === "card" && (
                      <div className="w-7 h-7 rounded-full bg-primary-600 text-white flex items-center justify-center">
                        <FaCheck size={12} />
                      </div>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Right Side: Order Summary */}
            <CheckoutOrderSummary/>
          </div>
        </form>
      </div>
    </div>
  );
}
