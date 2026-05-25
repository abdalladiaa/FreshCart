import React from 'react';
import Link from 'next/link';
import { Filter, FolderOpen, Tag, X } from 'lucide-react';

interface ActiveFiltersProps {
  categoryName: string | null;
  categoryId: string | null;
  subcategoryName: string | null;
  subcategoryId: string | null;
  brandName: string | null;
  brandId: string | null;
}

export default function ActiveFilters({
  categoryName,
  categoryId,
  subcategoryName,
  subcategoryId,
  brandName,
  brandId,
}: ActiveFiltersProps) {
  const activeFilterName = categoryName ?? subcategoryName;
  const activeFilterId = categoryId ?? subcategoryId;
  const isCategoryFilter = Boolean(categoryName);

  if (!activeFilterName && !brandName) return null;

  const categoryClearHref = brandId ? `/products?brand=${brandId}` : "/products";
  const brandClearHref = activeFilterId
    ? `/products?${isCategoryFilter ? `category=${activeFilterId}` : `subcategory=${activeFilterId}`}`
    : "/products";

  return (
    <div className="mb-6 flex items-center gap-3 flex-wrap">
      <span className="flex items-center gap-2 text-sm text-gray-600 font-medium">
        <Filter className="w-4 h-4 text-gray-500" />
        Active Filters:
      </span>
      
      {/* Category / Subcategory Filter Chip */}
      {activeFilterName && (
        <Link 
          href={categoryClearHref} 
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-sm font-semibold border border-emerald-100 hover:bg-emerald-100 hover:text-emerald-800 transition-all duration-200 shadow-xs"
        >
          <FolderOpen className="w-3.5 h-3.5" />
          {activeFilterName}
          <X className="w-3.5 h-3.5 rounded-full p-0.5 hover:bg-emerald-200/50 transition-colors" />
        </Link>
      )}

      {/* Brand Filter Chip */}
      {brandName && (
        <Link 
          href={brandClearHref} 
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 text-sm font-semibold border border-blue-100 hover:bg-blue-100 hover:text-blue-800 transition-all duration-200 shadow-xs"
        >
          <Tag className="w-3.5 h-3.5" />
          {brandName}
          <X className="w-3.5 h-3.5 rounded-full p-0.5 hover:bg-blue-200/50 transition-colors" />
        </Link>
      )}

      <Link 
        href="/products" 
        className="text-sm text-gray-400 hover:text-red-500 hover:underline transition-colors ml-1 font-medium"
      >
        Clear all
      </Link>
    </div>
  );
}
