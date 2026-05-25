
import Wishlist from "@/components/Wishlist/wishlistPage/wishlist";
import React from "react";


export default function page() {
  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="container mx-auto px-4 max-w-6xl">
        <Wishlist/>
      </div>
    </div>
  );
}
