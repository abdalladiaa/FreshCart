"use client";

import { Filters } from "@/hooks/useProductsFiltering/useProductsFiltering";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { IoSearch } from "react-icons/io5";

interface SearchHeaderProps {
  totalResults: number;
  setFilters: (filters: Filters) => void;
  search:string
}

export default function SearchHeader({
  search,
  setFilters,
  totalResults,
}: SearchHeaderProps) {
  const router = useRouter();

  const {register , watch , setValue} = useForm({
    defaultValues:{
      search:search
    }
  })

  const searchValue = watch("search")

  useEffect(()=>{
    setFilters({search: searchValue})
  } , [searchValue])

  return (
    <div className="bg-white border-b border-gray-100">
      <div className="container mx-auto px-4 py-6">
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4">
          <button
            onClick={() => router.push("/")}
            className="hover:text-emerald-600 transition-colors"
          >
            Home
          </button>
          <span>/</span>
          <span className="text-emerald-600 font-medium">Search Results</span>
        </nav>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex-1 max-w-2xl">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Search Results
            </h1>
            <p className="text-gray-500">
              We found{" "}
              <span className="font-bold text-gray-900">{totalResults}</span>{" "}
              products for your search
            </p>
          </div>

          <div className="flex-1 max-w-xl w-full">
            <div className="relative">
              <IoSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
              <input
                {...register("search")}
                placeholder="Search for products..."
                className="w-full pl-12 pr-14 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-lg"
                type="text"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
