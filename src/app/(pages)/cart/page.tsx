import React from "react";
import Cart from "./Cart";
import { FaShoppingCart } from "react-icons/fa";

export default function Page() {
  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Cart Component */}
        <Cart />
      </div>
    </div>
  );
}
