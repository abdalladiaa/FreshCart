import { Filters } from "@/hooks/useProductsFiltering/useProductsFiltering";
import FilterContent from "../FilterContent";

interface FilterSidebarProps {
  categories: any[];
  brands: any[];
    selectedCategory: string[];
  selectedBrand: string[];
  minPrice: string;
  maxPrice: string;
  setFilters: (filters: Filters) => void;
}

export default function FilterSidebar({
    selectedCategory,
  selectedBrand,
  minPrice,
  maxPrice,
  categories,
  brands,
  setFilters
}: FilterSidebarProps) {
  return (
    <aside className="hidden lg:block w-64 shrink-0">
      <div className="bg-white rounded-2xl border border-gray-100 p-6 sticky top-24 shadow-sm">
        <FilterContent setFilters={setFilters} maxPrice={maxPrice} minPrice={minPrice} selectedBrand={selectedBrand} selectedCategory={selectedCategory} categories={categories} brands={brands} />
      </div>
    </aside>
  );
}