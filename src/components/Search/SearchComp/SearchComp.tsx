"use client";

import React, { useEffect, useState } from "react";
import ProductCard from "@/components/productCard/ProductCard";
import FilterSidebar from "../FilterSidebar/FilterSidebar";
import SearchHeader from "../SearchHeader";
import SearchToolbar from "../SearchToolbar";
import ActiveFilters from "../ActiveFilters";
import EmptyState from "../EmptyState";
import MobileFilterSidebar from "../MobileFilterSidebar";
import { getAllProducts } from "@/services/poducts/getAllProducts/getAllProducts";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/app/loading";
import { useProductsFiltering } from "@/hooks/useProductsFiltering/useProductsFiltering";
import { useSearchParams } from "next/navigation";

interface SearchCompProps {
  allCategories: any[];
  allBrands: any[];
}

export default function SearchComp({
  allCategories,
  allBrands,
}: SearchCompProps) {
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [view, setView] = useState<"grid" | "list">("grid");
  const { brand, category, maxPrice, minPrice, search, setFilters } =
    useProductsFiltering();
  const searchParams = useSearchParams();
  const queryString = searchParams.toString();

  const { data, isLoading, error } = useQuery({
    queryKey: ["Products", { category, search, brand, maxPrice, minPrice }],
    queryFn: ()=> getAllProducts(queryString),
  });

  const products = data?.data;

  const filters = useProductsFiltering();

  useEffect(() => {
    console.log(filters);
  }, [filters]);

  return (
    <div className="min-h-screen bg-gray-50/50">
      <MobileFilterSidebar
        isOpen={isMobileFiltersOpen}
        onClose={() => setIsMobileFiltersOpen(false)}
        categories={allCategories}
        brands={allBrands}
      />

      <SearchHeader search={search} setFilters={setFilters} totalResults={0} />

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <FilterSidebar brands={allBrands} categories={allCategories} />

          <main className="flex-1 min-w-0">
            <SearchToolbar
              view={view}
              setView={setView}
              onOpenFilters={() => setIsMobileFiltersOpen(true)}
            />

            <ActiveFilters
              selectedBrands={[]}
              selectedCategories={[]}
              minPrice={null}
              maxPrice={null}
              allBrands={allBrands}
              allCategories={allCategories}
            />

            <div className="min-h-100">
              {isLoading ? (
                <Loading />
              ) : error ? (
                <p>Something went wrong</p>
              ) : products?.length ? (
                <div
                  className={
                    view === "grid"
                      ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                      : "flex flex-col gap-4"
                  }
                >
                  {products.map((product: any) => (
                    <ProductCard product={product} key={product._id} />
                  ))}
                </div>
              ) : (
                <EmptyState />
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
