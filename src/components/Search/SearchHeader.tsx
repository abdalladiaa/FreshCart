"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { IoSearch } from "react-icons/io5";

interface SearchHeaderProps {
  searchTerm: string;
  totalResults: number;
}

interface SearchFormValues {
  search: string;
}

export default function SearchHeader({
  searchTerm,
  totalResults,
}: SearchHeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { register, watch } = useForm<SearchFormValues>({
    defaultValues: {
      search: searchTerm,
    },
  });

  const watchedSearch = watch("search");

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (watchedSearch) {
      params.set("search", watchedSearch);
    } else {
      params.delete("search");
    }
    router.replace(`${pathname}?${params.toString()}`);
  }, [watchedSearch]);

  return (
    <div className="bg-white border-b border-gray-100">
      <div className="container mx-auto px-4 py-6">
        {/* Breadcrumbs */}
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
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-lg"
                type="text"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
