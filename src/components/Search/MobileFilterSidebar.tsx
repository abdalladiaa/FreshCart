"use client";

import React from "react";
import { IoClose } from "react-icons/io5";
import FilterContent from "./FilterContent";

interface MobileFilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  categories: any[];
  brands: any[];
  selectedCategory: string[];
  selectedBrand: string[];
  minPrice: string;
  maxPrice: string;
  setFilters: (filters: any) => void;
}

export default function MobileFilterSidebar({
  isOpen,
  onClose,
  categories,
  brands,
  selectedCategory,
  selectedBrand,
  minPrice,
  maxPrice,
  setFilters,
}: MobileFilterSidebarProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      <div className="absolute right-0 top-0 bottom-0 w-80 bg-white p-6 overflow-y-auto shadow-2xl transition-transform">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Filters</h2>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-red-50 hover:text-red-500 transition-all cursor-pointer"
          >
            <IoClose size={24} />
          </button>
        </div>

        <FilterContent
          categories={categories}
          brands={brands}
          selectedCategory={selectedCategory}
          selectedBrand={selectedBrand}
          minPrice={minPrice}
          maxPrice={maxPrice}
          setFilters={setFilters}
        />
      </div>
    </div>
  );
}