"use client";

import { IoClose } from "react-icons/io5";
import { FaFilter } from "react-icons/fa";
import type { Category } from "@/interfaces/categories.interface";
import type { Brand } from "@/interfaces/brands.interface";

interface ActiveFiltersProps {
  searchValue: string;
  selectedCategories: string[];
  selectedBrands: string[];
  sortValue: string;
  minPrice: string;
  maxPrice: string;
  allCategories: Category[];
  allBrands: Brand[];
  onRemoveSearch: () => void;
  onRemoveCategory: (id: string) => void;
  onRemoveBrand: (id: string) => void;
  onRemoveSort: () => void;
  onRemovePrice: () => void;
  onClearAll: () => void;
}

export default function ActiveFilters({
  searchValue,
  selectedCategories,
  selectedBrands,
  sortValue,
  minPrice,
  maxPrice,
  allCategories,
  allBrands,
  onRemoveSearch,
  onRemoveCategory,
  onRemoveBrand,
  onRemoveSort,
  onRemovePrice,
  onClearAll,
}: ActiveFiltersProps) {
  const hasFilters =
    searchValue ||
    selectedCategories.length ||
    selectedBrands.length ||
    sortValue ||
    minPrice ||
    maxPrice;
  if (!hasFilters) return null;

  const getCategoryName = (id: string) =>
    allCategories?.find((c: Category) => c._id === id)?.name || id;
  const getBrandName = (id: string) =>
    allBrands?.find((b: Brand) => b._id === id)?.name || id;

  return (
    <div className="mb-6 flex items-center gap-2 flex-wrap">
      <span className="text-sm text-gray-500 flex items-center gap-1">
        <FaFilter className="text-xs" />
        Active:
      </span>

      {searchValue && (
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-medium">
          {searchValue}
          <button
            onClick={onRemoveSearch}
            className="hover:text-red-500 transition-colors cursor-pointer"
            title="Remove search"
          >
            <IoClose size={14} />
          </button>
        </span>
      )}

      {selectedCategories.map((id) => (
        <span
          key={`cat-${id}`}
          className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs"
        >
          {getCategoryName(id)}
          <button
            onClick={() => onRemoveCategory(id)}
            className="hover:text-red-500 transition-colors cursor-pointer"
            title="Remove category"
          >
            <IoClose size={14} />
          </button>
        </span>
      ))}

      {selectedBrands.map((id) => (
        <span
          key={`br-${id}`}
          className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-violet-100 text-violet-700 text-xs"
        >
          {getBrandName(id)}
          <button
            onClick={() => onRemoveBrand(id)}
            className="hover:text-red-500 transition-colors cursor-pointer"
            title="Remove brand"
          >
            <IoClose size={14} />
          </button>
        </span>
      ))}

      {sortValue && (
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-sky-100 text-sky-700 text-xs">
          Sort: {sortValue}
          <button
            onClick={onRemoveSort}
            className="hover:text-red-500 transition-colors cursor-pointer"
            title="Remove sort"
          >
            <IoClose size={14} />
          </button>
        </span>
      )}

      {(minPrice || maxPrice) && (
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-amber-100 text-amber-700 text-xs">
          {minPrice || "0"} - {maxPrice || "∞"} EGP
          <button
            onClick={onRemovePrice}
            className="hover:text-red-500 transition-colors cursor-pointer"
            title="Remove price filter"
          >
            <IoClose size={14} />
          </button>
        </span>
      )}

      <button
        type="button"
        onClick={onClearAll}
        className="text-xs text-gray-500 hover:text-gray-700 underline ml-2 cursor-pointer"
      >
        Clear all
      </button>
    </div>
  );
}
