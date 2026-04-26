"use client";

import { IoSearchOutline } from "react-icons/io5";

export default function EmptyState() {
  return (
    <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
      <div className="w-20 h-20 rounded-full bg-gray-50 flex items-center justify-center mx-auto mb-5">
        <IoSearchOutline className="text-4xl text-gray-300" />
      </div>
      <h3 className="text-lg font-bold text-gray-900 mb-2">No Products Found</h3>
      <p className="text-gray-500 mb-6 max-w-xs mx-auto">
        Try adjusting your search or filters to find what you're looking for.
      </p>
      <button className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition-all active:scale-95 shadow-lg shadow-emerald-600/20">
        Clear All Filters
      </button>
    </div>
  );
}
