"use client";

import FilterContent from "../FilterContent";
import type { Category } from "@/interfaces/categories.interface";
import type { Brand } from "@/interfaces/brands.interface";

interface FilterSidebarProps {
  categories: Category[];
  brands: Brand[];
  selectedCategories: string[];
  selectedBrands: string[];
  minPrice: string;
  maxPrice: string;
  onCategoryChange: (id: string) => void;
  onBrandChange: (id: string) => void;
  onMinPriceChange: (value: string) => void;
  onMaxPriceChange: (value: string) => void;
}

export default function FilterSidebar({
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
}: FilterSidebarProps) {
  return (
    <aside className="hidden lg:block w-64 shrink-0">
      <div className="bg-white rounded-2xl border border-gray-100 p-6 sticky top-24 shadow-sm">
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
    </aside>
  );
}
