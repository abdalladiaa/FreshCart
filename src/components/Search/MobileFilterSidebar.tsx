"use client";

import { IoClose } from "react-icons/io5";
import FilterContent from "./FilterContent";

interface MobileFilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  categories: any[];
  brands: any[];
  selectedCategories: string[];
  selectedBrands: string[];
  minPrice: string;
  maxPrice: string;
  onCategoryChange: (id: string) => void;
  onBrandChange: (id: string) => void;
  onMinPriceChange: (value: string) => void;
  onMaxPriceChange: (value: string) => void;
}

export default function MobileFilterSidebar({
  isOpen,
  onClose,
  categories,
  brands,
  selectedCategories,
  selectedBrands,
  minPrice,
  maxPrice,
  onCategoryChange,
  onBrandChange,
  onMinPriceChange,
  onMaxPriceChange,
}: MobileFilterSidebarProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="absolute right-0 top-0 bottom-0 w-80 bg-white p-6 overflow-y-auto shadow-2xl">
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
          selectedCategories={selectedCategories}
          selectedBrands={selectedBrands}
          minPrice={minPrice}
          maxPrice={maxPrice}
          onCategoryChange={onCategoryChange}
          onBrandChange={onBrandChange}
          onMinPriceChange={onMinPriceChange}
          onMaxPriceChange={onMaxPriceChange}
        />
      </div>
    </div>
  );
}
