"use client";

import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { IoSearch } from "react-icons/io5";

interface SearchHeaderProps {
  totalResults: number;
  searchValue: string;
  onSearchChange: (value: string) => void;
}

export default function SearchHeader({
  totalResults,
  searchValue,
  onSearchChange,
}: SearchHeaderProps) {
  const router = useRouter();
  const isFirstRender = useRef(true);
  const { register, handleSubmit, reset, watch } = useForm({
    defaultValues: { search: searchValue },
  });

  const watchedSearch = watch("search");

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    onSearchChange(watchedSearch);
  }, [watchedSearch]);

  useEffect(() => {
    reset({ search: searchValue });
  }, [searchValue, reset]);

  const onSubmit = (data: { search: string }) => {
    onSearchChange(data.search);
  };

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
              {searchValue ? (
                <>
                  We found{" "}
                  <span className="font-bold text-gray-900">
                    {totalResults}
                  </span>{" "}
                  products for{" "}
                  <span className="font-semibold text-gray-900">
                    &ldquo;{searchValue}&rdquo;
                  </span>
                </>
              ) : (
                <>
                  We found{" "}
                  <span className="font-bold text-gray-900">
                    {totalResults}
                  </span>{" "}
                  products for your search
                </>
              )}
            </p>
          </div>

          <div className="flex-1 max-w-xl w-full">
            <form onSubmit={handleSubmit(onSubmit)} className="relative flex items-center">
              <div className="absolute left-4 text-gray-400 text-xl pointer-events-none">
                <IoSearch />
              </div>
              <input
                {...register("search")}
                placeholder="Search for products..."
                className="w-full pl-12 pr-28 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-lg"
                type="text"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
