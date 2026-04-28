"use client";

import React from "react";

interface FilterContentProps {
  categories: any[];
  brands: any[];
}

export default function FilterContent({
  categories,
  brands,
}: FilterContentProps) {
  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-gray-900">Categories</h3>
        </div>
        <div className="space-y-2 max-h-52 overflow-y-auto custom-scrollbar">
          {categories?.map((category) => (
            <label
              key={category._id}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
              />
              <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                {category.name}
              </span>
            </label>
          ))}
        </div>
      </div>

      <hr className="border-gray-100" />

      <div>
        <h3 className="font-bold text-gray-900 mb-4">Price Range</h3>
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div>
            <label className="text-xs text-gray-500 mb-1 block">
              Min (EGP)
            </label>
            <input
              placeholder="0"
              className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all"
              type="number"
            />
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">
              Max (EGP)
            </label>
            <input
              placeholder="No limit"
              className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all"
              type="number"
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {["500", "1K", "5K", "10K"].map((price) => (
            <button
              key={price}
              type="button"
              className="px-3 py-1.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors cursor-pointer"
            >
              Under {price}
            </button>
          ))}
        </div>
      </div>

      <hr className="border-gray-100" />

      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-gray-900">Brands</h3>
        </div>
        <div className="space-y-2 max-h-52 overflow-y-auto custom-scrollbar">
          {brands?.map((brand) => (
            <label
              key={brand._id}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
              />
              <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                {brand.name}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}