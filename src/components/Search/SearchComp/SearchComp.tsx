"use client";

import React, { useState } from "react";
import ProductCard from "@/components/productCard/ProductCard";
import FilterSidebar from "../FilterSidebar/FilterSidebar";
import SearchHeader from "../SearchHeader";
import SearchToolbar from "../SearchToolbar";
import ActiveFilters from "../ActiveFilters";
import EmptyState from "../EmptyState";
import MobileFilterSidebar from "../MobileFilterSidebar";

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
  const products: any[] = [];

  return (
    <div className="min-h-screen bg-gray-50/50">
      <MobileFilterSidebar
        isOpen={isMobileFiltersOpen}
        onClose={() => setIsMobileFiltersOpen(false)}
        categories={allCategories}
        brands={allBrands}
      />

      <SearchHeader totalResults={0} />

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

            <div className="min-h-[400px]">
              <EmptyState />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}