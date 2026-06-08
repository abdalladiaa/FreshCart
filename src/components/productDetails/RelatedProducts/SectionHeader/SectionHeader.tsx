import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

export default function SectionHeader() {
  return (
    <div className="flex justify-between items-center mb-6">
      {/* Title */}
      <div className="flex items-center gap-3">
        <div className="h-8 w-1.5 bg-gradient-to-b from-emerald-500 to-emerald-700 rounded-full"></div>
        <h2 className="text-2xl font-bold text-gray-800">
          You May Also <span className="text-emerald-600">Like</span>
        </h2>
      </div>

      {/* Navigation Buttons */}
      <div className="flex space-x-2 rtl:space-x-reverse">
        <button className="swiper-prev-btn h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-emerald-50 hover:text-emerald-600 transition active:scale-95">
          <FaChevronLeft />
          <span className="sr-only">Previous</span>
        </button>
        <button className="swiper-next-btn h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-emerald-50 hover:text-emerald-600 transition active:scale-95">
          <FaChevronRight />
          <span className="sr-only">Next</span>
        </button>
      </div>
    </div>
  );
}
