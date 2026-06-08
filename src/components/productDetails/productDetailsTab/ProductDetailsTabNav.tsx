"use client";

import React from "react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FaBox, FaStar, FaTruck } from "react-icons/fa";

export function ProductDetailsTabNav({ reviewsCount }: { reviewsCount: number }) {
  return (
    <div className="border-b border-gray-200">
      <TabsList className="grid grid-cols-3 h-full! w-full bg-transparent p-0 rounded-none">
        <TabsTrigger
          value="details"
          className="
            flex items-center justify-center gap-2 py-4 font-medium whitespace-nowrap
            transition-all duration-200
            border-b-2 border-transparent
            text-gray-600 rounded-none cursor-pointer
            data-[state=active]:border-b-primary-600
            data-[state=active]:text-primary-600
            data-[state=active]:bg-primary-50/50
            data-[state=active]:shadow-none
          "
        >
          <FaBox className="text-sm shrink-0" />
          <span className="truncate text-xs sm:text-sm">Product Details</span>
        </TabsTrigger>

        <TabsTrigger
          value="reviews"
          className="
            flex items-center justify-center gap-1 sm:gap-2 py-4 font-medium whitespace-nowrap
            transition-all duration-200
            border-b-2 border-transparent
            text-gray-600 rounded-none cursor-pointer
            hover:text-primary-600
            hover:bg-gray-50/50
            data-[state=active]:border-b-primary-600
            data-[state=active]:text-primary-600
            data-[state=active]:bg-primary-50/50
            data-[state=active]:shadow-none
          "
        >
          <FaStar className="text-sm shrink-0" />
          <span className="truncate text-xs sm:text-sm">Reviews</span>
          <span className="text-[10px] sm:text-xs shrink-0">
            ({reviewsCount})
          </span>
        </TabsTrigger>

        <TabsTrigger
          value="shipping"
          className="
            flex items-center justify-center gap-2 py-4 font-medium whitespace-nowrap
            transition-all duration-200
            border-b-2 border-transparent
            text-gray-600 rounded-none cursor-pointer
            hover:text-primary-600
            hover:bg-gray-50/50
            data-[state=active]:border-b-primary-600
            data-[state=active]:text-primary-600
            data-[state=active]:bg-primary-50/50
            data-[state=active]:shadow-none
          "
        >
          <FaTruck className="text-sm shrink-0" />
          <span className="truncate text-xs sm:text-sm">Shipping & Returns</span>
        </TabsTrigger>
      </TabsList>
    </div>
  );
}
