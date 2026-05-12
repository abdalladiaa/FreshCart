"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "@/services/products/getAllProducts/getAllProducts";
import ProductCard from "@/components/productCard/ProductCard";
import FilterSidebar from "../FilterSidebar/FilterSidebar";
import SearchHeader from "../SearchHeader";
import SearchToolbar from "../SearchToolbar";
import ActiveFilters from "../ActiveFilters";
import EmptyState from "../EmptyState";
import MobileFilterSidebar from "../MobileFilterSidebar";
import Loading from "@/app/loading";
import type { Product } from "@/interfaces/products.interface";
import type { Category } from "@/interfaces/categories.interface";
import type { Brand } from "@/interfaces/brands.interface";

interface SearchCompProps {
  allCategories: Category[];
  allBrands: Brand[];
}

export default function SearchComp({ allCategories, allBrands }: SearchCompProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryString = searchParams.toString();

  const [view, setView] = useState<"grid" | "list">("grid");
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ["Products", queryString],
    queryFn: () => getAllProducts(queryString),
  });

  const searchValue = searchParams.get("q") ?? "";
  const selectedCategories = searchParams.getAll("category");
  const selectedBrands = searchParams.getAll("brand");
  const sortValue = searchParams.get("sort") ?? "";
  const minPrice = searchParams.get("minPrice") ?? "";
  const maxPrice = searchParams.get("maxPrice") ?? "";

  const setFilter = (key: string, value: string | string[]) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete(key);
    if (Array.isArray(value)) {
      value.forEach((v) => { if (v) params.append(key, v); });
    } else if (value) {
      params.set(key, value);
    }
    router.replace(`/search?${params.toString()}`, { scroll: false });
  };

  const toggleCategory = (id: string) => {
    const next = selectedCategories.includes(id)
      ? selectedCategories.filter((c) => c !== id)
      : [...selectedCategories, id];
    setFilter("category", next);
  };

  const toggleBrand = (id: string) => {
    const next = selectedBrands.includes(id)
      ? selectedBrands.filter((b) => b !== id)
      : [...selectedBrands, id];
    setFilter("brand", next);
  };

  const removePriceFilter = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("minPrice");
    params.delete("maxPrice");
    router.replace(`/search?${params.toString()}`, { scroll: false });
  };

  const clearAll = () => {
    router.replace("/search");
  };

  const products = data?.data;
  const totalResults = data?.results ?? products?.length ?? 0;

  return (
    <div className="min-h-screen bg-gray-50/50">
      <MobileFilterSidebar
        isOpen={isMobileFiltersOpen}
        onClose={() => setIsMobileFiltersOpen(false)}
        categories={allCategories}
        brands={allBrands}
        selectedCategories={selectedCategories}
        selectedBrands={selectedBrands}
        minPrice={minPrice}
        maxPrice={maxPrice}
        onCategoryChange={toggleCategory}
        onBrandChange={toggleBrand}
        onMinPriceChange={(value) => setFilter("minPrice", value)}
        onMaxPriceChange={(value) => setFilter("maxPrice", value)}
      />

      <SearchHeader
        totalResults={totalResults}
        searchValue={searchValue}
        onSearchChange={(value) => setFilter("q", value)}
      />

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <FilterSidebar
            categories={allCategories}
            brands={allBrands}
            selectedCategories={selectedCategories}
            selectedBrands={selectedBrands}
            minPrice={minPrice}
            maxPrice={maxPrice}
            onCategoryChange={toggleCategory}
            onBrandChange={toggleBrand}
            onMinPriceChange={(value) => setFilter("minPrice", value)}
            onMaxPriceChange={(value) => setFilter("maxPrice", value)}
          />

          <main className="flex-1 min-w-0">
            <SearchToolbar
              view={view}
              setView={setView}
              onOpenFilters={() => setIsMobileFiltersOpen(true)}
              sortValue={sortValue}
              onSortChange={(value) => setFilter("sort", value)}
            />

            <ActiveFilters
              searchValue={searchValue}
              selectedCategories={selectedCategories}
              selectedBrands={selectedBrands}
              sortValue={sortValue}
              minPrice={minPrice}
              maxPrice={maxPrice}
              allCategories={allCategories}
              allBrands={allBrands}
              onRemoveSearch={() => setFilter("q", "")}
              onRemoveCategory={(id) => {
                const next = selectedCategories.filter((c) => c !== id);
                setFilter("category", next);
              }}
              onRemoveBrand={(id) => {
                const next = selectedBrands.filter((b) => b !== id);
                setFilter("brand", next);
              }}
              onRemoveSort={() => setFilter("sort", "")}
              onRemovePrice={removePriceFilter}
              onClearAll={clearAll}
            />

            <div className="min-h-100">
              {isLoading ? (
                <Loading />
              ) : error ? (
                <p className="text-center py-20 text-red-500">
                  Something went wrong. Please try again.
                </p>
              ) : products?.length ? (
                <div
                  className={
                    view === "grid"
                      ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                      : "flex flex-col gap-4"
                  }
                >
                  {products.map((product: Product) => (
                    <ProductCard product={product} key={product._id} />
                  ))}
                </div>
              ) : (
                <EmptyState onClear={clearAll} />
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
