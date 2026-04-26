"use client";

import { FaSlidersH, FaThLarge, FaList } from "react-icons/fa";

interface SearchToolbarProps {
  onOpenFilters: () => void;
  view: "grid" | "list";
  setView: (view: "grid" | "list") => void;
}

export default function SearchToolbar({
  onOpenFilters,
  view,
  setView,
}: SearchToolbarProps) {
  return (
    <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
      <div className="flex items-center gap-4">
        {/* Mobile Filter Button */}
        <button 
          onClick={onOpenFilters}
          className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-gray-200 text-gray-700 text-sm font-medium hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-200 transition-colors cursor-pointer"
        >
          <FaSlidersH />
          Filters
        </button>

        {/* View Switcher */}
        <div className="flex items-center bg-white border border-gray-200 rounded-lg p-1">
          <button
            onClick={() => setView("grid")}
            className={`p-2 rounded-md transition-all cursor-pointer ${
              view === "grid"
                ? "bg-emerald-100 text-emerald-600 shadow-sm"
                : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"
            }`}
            title="Grid View"
          >
            <FaThLarge size={16} />
          </button>
          <button
            onClick={() => setView("list")}
            className={`p-2 rounded-md transition-all cursor-pointer ${
              view === "list"
                ? "bg-emerald-100 text-emerald-600 shadow-sm"
                : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"
            }`}
            title="List View"
          >
            <FaList size={16} />
          </button>
        </div>
      </div>

      {/* Sort Dropdown */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-500">Sort by:</span>
        <select className="px-3 py-2 rounded-lg border border-gray-200 text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none bg-white cursor-pointer">
          <option value="">Relevance</option>
          <option value="price">Price: Low to High</option>
          <option value="-price">Price: High to Low</option>
          <option value="-ratingsAverage">Rating: High to Low</option>
          <option value="title">Name: A to Z</option>
          <option value="-title">Name: Z to A</option>
        </select>
      </div>
    </div>
  );
}
