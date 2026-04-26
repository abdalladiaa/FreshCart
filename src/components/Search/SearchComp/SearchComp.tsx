"use client";

import React, { useState } from "react";
import Loading from "@/app/loading";
import ProductCard from "@/components/productCard/ProductCard";
import FilterSidebar from "../FilterSidebar/FilterSidebar";
import SearchHeader from "../SearchHeader";
import SearchToolbar from "../SearchToolbar";
import ActiveFilters from "../ActiveFilters";
import EmptyState from "../EmptyState";
import MobileFilterSidebar from "../MobileFilterSidebar";
import { getAllProducts } from "@/services/poducts/getAllProducts/getAllProducts";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

interface SearchCompProps {
  allCategories: any[];
  allBrands: any[];
}

export default function SearchComp({
  allCategories,
  allBrands,
}: SearchCompProps) {
  const searchParams = useSearchParams();
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);


  const searchTerm = searchParams.get("search") || "";
  const filteredBrands = searchParams.getAll("brand") || "";
  const filteredCategories = searchParams.getAll("category") || "";

  const queryString = searchParams.toString();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["products", queryString],
    queryFn: () => getAllProducts(searchParams),
  });

  const products = data?.data || [];

  const [view, setView] = useState<"grid" | "list">("grid");

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Mobile Drawer */}
      <MobileFilterSidebar
        isOpen={isMobileFiltersOpen}
        onClose={() => setIsMobileFiltersOpen(false)}
        categories={allCategories}
        brands={allBrands}
      />

      {/* Header Section */}
      <SearchHeader
        key={`header-${queryString}`}
        searchTerm={searchTerm}
        totalResults={products.length}
      />

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar (Desktop) */}
          <FilterSidebar 
            key={`sidebar-${queryString}`}
            brands={allBrands} 
            categories={allCategories} 
          />

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {/* Toolbar: Sort & View Options */}
            <SearchToolbar
              view={view}
              setView={setView}
              onOpenFilters={() => setIsMobileFiltersOpen(true)}
            />

            {/* Active Filter Chips */}
            <ActiveFilters 
              searchTerm={searchTerm} 
              selectedBrands={filteredBrands}
              selectedCategories={filteredCategories}
              minPrice={searchParams.get("minPrice")}
              maxPrice={searchParams.get("maxPrice")}
              allBrands={allBrands}
              allCategories={allCategories}
            />

            {/* Content Area */}
            <div className="min-h-[400px]">
              {isLoading ? (
                <div className="h-96 flex items-center justify-center">
                  <Loading />
                </div>
              ) : isError ? (
                <div className="text-center py-20 text-red-500 font-medium bg-red-50 rounded-2xl border border-red-100">
                  Oops! Something went wrong while fetching products.
                </div>
              ) : products.length > 0 ? (
                <div
                  className={
                    view === "grid"
                      ? "grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-6"
                      : "grid grid-cols-1 gap-6"
                  }
                >
                  {products.map((product: any) => (
                    <ProductCard key={product._id} product={product} />
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
