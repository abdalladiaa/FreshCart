"use client";

import { useSearchParams } from "next/navigation";
import { IoClose } from "react-icons/io5";
import { FaFilter } from "react-icons/fa";

interface ActiveFiltersProps {
  setValue: any;
  allCategories: any[];
  allBrands: any[];
  onClear: () => void;
}

export default function ActiveFilters({
  setValue,
  allCategories,
  allBrands,
  onClear,
}: ActiveFiltersProps) {
  const searchParams = useSearchParams();
  const search = searchParams.get("q");
  const categories = searchParams.getAll("category");
  const brands = searchParams.getAll("brand");
  const sort = searchParams.get("sort");
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");

  const hasFilters =
    search ||
    categories.length ||
    brands.length ||
    sort ||
    minPrice ||
    maxPrice;
  if (!hasFilters) return null;

  const getCategoryName = (id: string) =>
    allCategories?.find((c: any) => c._id === id)?.name || id;
  const getBrandName = (id: string) =>
    allBrands?.find((b: any) => b._id === id)?.name || id;

  const removeSearch = () => setValue("search", "");
  const removeCategory = (id: string) =>
    setValue(
      "category",
      categories.filter((c) => c !== id),
    );
  const removeBrand = (id: string) =>
    setValue(
      "brand",
      brands.filter((b) => b !== id),
    );
  const removeSort = () => setValue("sort", "");
  const removePrice = () => {
    setValue("minPrice", "");
    setValue("maxPrice", "");
  };

  return (
    <div className="mb-6 flex items-center gap-2 flex-wrap">
      <span className="text-sm text-gray-500 flex items-center gap-1">
        <FaFilter className="text-xs" />
        Active:
      </span>

      {search && (
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-medium">
          {search}
          <button
            onClick={removeSearch}
            className="hover:text-red-500 transition-colors cursor-pointer"
            title="Remove search"
          >
            <IoClose size={14} />
          </button>
        </span>
      )}

      {categories.map((id) => (
        <span
          key={`cat-${id}`}
          className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs"
        >
          {getCategoryName(id)}
          <button
            onClick={() => removeCategory(id)}
            className="hover:text-red-500 transition-colors cursor-pointer"
            title="Remove category"
          >
            <IoClose size={14} />
          </button>
        </span>
      ))}

      {brands.map((id) => (
        <span
          key={`br-${id}`}
          className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-violet-100 text-violet-700 text-xs"
        >
          {getBrandName(id)}
          <button
            onClick={() => removeBrand(id)}
            className="hover:text-red-500 transition-colors cursor-pointer"
            title="Remove brand"
          >
            <IoClose size={14} />
          </button>
        </span>
      ))}

      {sort && (
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-sky-100 text-sky-700 text-xs">
          Sort: {sort}
          <button
            onClick={removeSort}
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
            onClick={removePrice}
            className="hover:text-red-500 transition-colors cursor-pointer"
            title="Remove price filter"
          >
            <IoClose size={14} />
          </button>
        </span>
      )}

      <button
        type="button"
        onClick={onClear}
        className="text-xs text-gray-500 hover:text-gray-700 underline ml-2 cursor-pointer"
      >
        Clear all
      </button>
    </div>
  );
}
