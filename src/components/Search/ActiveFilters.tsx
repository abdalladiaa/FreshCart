"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FaFilter } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

interface ActiveFiltersProps {
  searchTerm: string;
  selectedBrands: string[];
  selectedCategories: string[];
  minPrice: string | null;
  maxPrice: string | null;
  allBrands: any[];
  allCategories: any[];
}

export default function ActiveFilters({
  searchTerm,
  selectedBrands,
  selectedCategories,
  minPrice,
  maxPrice,
  allBrands,
  allCategories,
}: ActiveFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleRemove = (type: string, value?: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (type === "all") {
      router.replace(pathname);
      return;
    }

    if (type === "search") {
      params.delete("search");
    } else if (type === "brand") {
      const remaining = params.getAll("brand").filter((id) => id !== value);
      params.delete("brand");
      remaining.forEach((id) => params.append("brand", id));
    } else if (type === "category") {
      const remaining = params.getAll("category").filter((id) => id !== value);
      params.delete("category");
      remaining.forEach((id) => params.append("category", id));
    } else if (type === "price") {
      params.delete("minPrice");
      params.delete("maxPrice");
    }

    router.replace(`${pathname}?${params.toString()}`);
  };

  const hasFilters =
    searchTerm ||
    selectedBrands.length > 0 ||
    selectedCategories.length > 0 ||
    minPrice ||
    maxPrice;

  if (!hasFilters) return null;

  return (
    <div className="mb-6 flex items-center gap-2 flex-wrap">
      <span className="text-sm text-gray-500 flex items-center gap-1 font-medium mr-1">
        <FaFilter size={10} className="text-xs" />
        Active:
      </span>

      {/* Search Term */}
      {searchTerm && (
        <FilterChip
          label={searchTerm}
          variant="blue"
          onRemove={() => handleRemove("search")}
        />
      )}

      {/* Categories */}
      {selectedCategories.map((id) => {
        const category = allCategories.find((c) => c._id === id);
        return (
          <FilterChip
            key={id}
            label={category?.name || id}
            variant="emerald"
            onRemove={() => handleRemove("category", id)}
          />
        );
      })}

      {/* Brands */}
      {selectedBrands.map((id) => {
        const brand = allBrands.find((b) => b._id === id);
        return (
          <FilterChip
            key={id}
            label={brand?.name || id}
            variant="violet"
            onRemove={() => handleRemove("brand", id)}
          />
        );
      })}

      {/* Price Range */}
      {(minPrice || maxPrice) && (
        <FilterChip
          label={`${minPrice || "0"} - ${maxPrice || "∞"} EGP`}
          variant="amber"
          onRemove={() => handleRemove("price")}
        />
      )}

      {/* Clear All Button */}
      <button
        onClick={() => handleRemove("all")}
        className="text-xs text-gray-500 hover:text-gray-700 underline ml-2 cursor-pointer transition-colors"
      >
        Clear all
      </button>
    </div>
  );
}

function FilterChip({
  label,
  onRemove,
  variant,
}: {
  label: string;
  onRemove: () => void;
  variant: "emerald" | "violet" | "amber" | "blue";
}) {
  const variants = {
    emerald: "bg-emerald-100 text-emerald-700",
    violet: "bg-violet-100 text-violet-700",
    amber: "bg-amber-100 text-amber-700",
    blue: "bg-blue-100 text-blue-700",
  };

  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${variants[variant]}`}
    >
      {label}
      <button
        onClick={onRemove}
        className="hover:text-red-500 transition-colors ml-0.5 cursor-pointer"
      >
        <IoClose size={14} />
      </button>
    </span>
  );
}
