"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

interface FilterContentProps {
  categories: any[];
  brands: any[];
}

interface FilterFormValues {
  brand: string[];
  category: string[];
  minPrice: number | string;
  maxPrice: number | string;
}

export default function FilterContent({
  categories,
  brands,
}: FilterContentProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { register, watch } = useForm<FilterFormValues>({
    defaultValues: {
      brand: searchParams.getAll("brand") || [],
      category: searchParams.getAll("category") || [],
      minPrice: searchParams.get("minPrice") || "",
      maxPrice: searchParams.get("maxPrice") || "",
    },
  });

  const handleQuickPrice = (priceStr: string) => {
    const priceMap: Record<string, number> = {
      "500": 500,
      "1K": 1000,
      "5K": 5000,
      "10K": 10000,
    };
    
    const value = priceMap[priceStr];
    if (value) {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("minPrice");
      params.set("maxPrice", value.toString());
      router.replace(`${pathname}?${params.toString()}`);
    }
  };

  const brandValue = watch("brand");
  const categoryValue = watch("category");
  const minPriceValue = watch("minPrice");
  const maxPriceValue = watch("maxPrice");

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    params.delete("brand");
    brandValue.forEach((id) => params.append("brand", id));

    params.delete("category");
    categoryValue.forEach((id) => params.append("category", id));

    if (minPriceValue) params.set("minPrice", minPriceValue.toString());
    else params.delete("minPrice");

    if (maxPriceValue) params.set("maxPrice", maxPriceValue.toString());
    else params.delete("maxPrice");

    router.replace(`${pathname}?${params.toString()}`);
  }, [brandValue, categoryValue, minPriceValue, maxPriceValue]);

  return (
    <div className="space-y-6">
      {/* Categories Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-gray-900">Categories</h3>
        </div>
        <div className="space-y-2 max-h-52 overflow-y-auto custom-scrollbar">
          {categories?.map((category) => (
            <label key={category._id} className="flex items-center gap-3 cursor-pointer group">
              <input
                {...register("category")}
                type="checkbox"
                value={category._id}
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

      {/* Price Range Section */}
      <div>
        <h3 className="font-bold text-gray-900 mb-4">Price Range</h3>
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Min (EGP)</label>
            <input
              {...register("minPrice")}
              placeholder="0"
              className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all"
              type="number"
            />
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Max (EGP)</label>
            <input
              {...register("maxPrice")}
              placeholder="No limit"
              className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all"
              type="number"
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {["500", "1K", "5K", "10K"].map((price) => {
            const numericValue = price === "1K" ? "1000" : price === "5K" ? "5000" : price === "10K" ? "10000" : "500";
            const isActive = maxPriceValue?.toString() === numericValue && !minPriceValue;
            return (
              <button
                key={price}
                type="button"
                onClick={() => handleQuickPrice(price)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                  isActive ? "bg-emerald-600 text-white shadow-sm" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                Under {price}
              </button>
            );
          })}
        </div>
      </div>

      <hr className="border-gray-100" />

      {/* Brands Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-gray-900">Brands</h3>
        </div>
        <div className="space-y-2 max-h-52 overflow-y-auto custom-scrollbar">
          {brands?.map((brand) => (
            <label key={brand._id} className="flex items-center gap-3 cursor-pointer group">
              <input
                {...register("brand")}
                type="checkbox"
                value={brand._id}
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
