"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "@/services/poducts/getAllProducts/getAllProducts";
import ProductCard from "@/components/productCard/ProductCard";
import FilterSidebar from "../FilterSidebar/FilterSidebar";
import SearchHeader from "../SearchHeader";
import SearchToolbar from "../SearchToolbar";
import ActiveFilters from "../ActiveFilters";
import EmptyState from "../EmptyState";
import MobileFilterSidebar from "../MobileFilterSidebar";
import Loading from "@/app/loading";

type Filters = {
  search: string;
  category: string[];
  brand: string[];
  sort: string;
  minPrice: string;
  maxPrice: string;
};

interface SearchCompProps {
  allCategories: any[];
  allBrands: any[];
}

export default function SearchComp({
  allCategories,
  allBrands,
}: SearchCompProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryString = searchParams.toString();
  const [view, setView] = useState<"grid" | "list">("grid");
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ["Products", queryString],
    queryFn: () => getAllProducts(queryString),
  });

  const { register, watch, reset, setValue } = useForm<Filters>({
    defaultValues: {
      search: searchParams.get("q") ?? "",
      category: searchParams.getAll("category"),
      brand: searchParams.getAll("brand"),
      sort: searchParams.get("sort") ?? "",
      minPrice: searchParams.get("minPrice") ?? "",
      maxPrice: searchParams.get("maxPrice") ?? "",
    },
  });

  const values = watch();
  console.log(values);

  const isFormUpdating = useRef(false);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const params = new URLSearchParams(searchParams.toString());
    params.delete("q");
    params.delete("category");
    params.delete("brand");
    params.delete("sort");
    params.delete("minPrice");
    params.delete("maxPrice");

    if (values.search) params.set("q", values.search);
    

    Array.from(new Set(values.category))?.forEach((id) => {
      if (id) params.append("category", id);
    });


    Array.from(new Set(values.brand))?.forEach((id) => {
      if (id) params.append("brand", id);
    });

    if (values.sort) params.set("sort", values.sort);
    if (values.minPrice) params.set("minPrice", values.minPrice);
    if (values.maxPrice) params.set("maxPrice", values.maxPrice);

    isFormUpdating.current = true;
    router.push(`/search?${params.toString()}`, { scroll: false });
  }, [
    values.search,
    values.category,
    values.brand,
    values.sort,
    values.minPrice,
    values.maxPrice,
  ]);

  useEffect(() => {
    if (isFirstRender.current || isFormUpdating.current) {
      isFormUpdating.current = false;
      return;
    }

    reset({
      search: searchParams.get("q") ?? "",
      category: searchParams.getAll("category"),
      brand: searchParams.getAll("brand"),
      sort: searchParams.get("sort") ?? "",
      minPrice: searchParams.get("minPrice") ?? "",
      maxPrice: searchParams.get("maxPrice") ?? "",
    });
  }, [searchParams, reset]);

  const clearAll = () => {
    reset({
      search: "",
      category: [],
      brand: [],
      sort: "",
      minPrice: "",
      maxPrice: "",
    });
    router.push("/search");
  };

  const products = data?.data;
  const totalResults = data?.results ?? products?.length ?? 0;

  return (
    <div className="min-h-screen bg-gray-50/50">
      <MobileFilterSidebar
        watch={watch}
        isOpen={isMobileFiltersOpen}
        onClose={() => setIsMobileFiltersOpen(false)}
        categories={allCategories}
        brands={allBrands}
        register={register}
        setValue={setValue}
      />

      <SearchHeader totalResults={totalResults} setValue={setValue} />

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <FilterSidebar
            watch={watch}
            categories={allCategories}
            brands={allBrands}
            register={register}
            setValue={setValue}
          />

          <main className="flex-1 min-w-0">
            <SearchToolbar
              view={view}
              setView={setView}
              onOpenFilters={() => setIsMobileFiltersOpen(true)}
              register={register}
            />

            <ActiveFilters
              setValue={setValue}
              allCategories={allCategories}
              allBrands={allBrands}
              onClear={clearAll}
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
