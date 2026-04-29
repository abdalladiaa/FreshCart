import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";

export type Filters = {
  search?: string;
  category?: string[];
  brand?: string[];
  maxPrice?: string;
  minPrice?: string;
};

export function useProductsFiltering() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const search = searchParams.get("q") || "";
  const category = searchParams.getAll("category");
  const brand = searchParams.getAll("brand");
  const maxPrice = searchParams.get("maxPrice") || "";
  const minPrice = searchParams.get("minPrice") || "";

  const setFilters = useCallback(
    (filters: Filters) => {
      const params = new URLSearchParams(searchParams.toString());

      if (filters.search !== undefined) {
        filters.search
          ? params.set("q", filters.search)
          : params.delete("q");
      }

      if (filters.category) {
        params.delete("category");
        filters.category.forEach((c) => params.append("category", c));
      }

      if (filters.brand) {
        params.delete("brand");
        filters.brand.forEach((b) => params.append("brand", b));
      }

      if (filters.maxPrice !== undefined) {
        filters.maxPrice
          ? params.set("maxPrice", filters.maxPrice)
          : params.delete("maxPrice");
      }

      if (filters.minPrice !== undefined) {
        filters.minPrice
          ? params.set("minPrice", filters.minPrice)
          : params.delete("minPrice");
      }

      router.replace(`/search?${params.toString()}`, { scroll: false });
    },
    [searchParams, router],
  );

  return useMemo(
    () => ({
      search,
      category,
      brand,
      maxPrice,
      minPrice,
      setFilters,
    }),
    [search, category, brand, maxPrice, minPrice, setFilters],
  );
}
