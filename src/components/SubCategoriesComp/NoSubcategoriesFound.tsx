import { FolderOpen } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

export default function NoSubcategoriesFound({ categorieId }: { categorieId: string }) {
  return (
    <div className="text-center py-20">
      <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-5">
        <FolderOpen className="w-8 h-8 text-gray-400" />
      </div>
      
      <h3 className="text-lg font-bold text-gray-900 mb-2">
        No Subcategories Found
      </h3>
      
      <p className="text-gray-500 mb-6">
        This category doesn't have any subcategories yet.
      </p>
      
      <Link 
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors" 
        href={`/products?category=${categorieId}`}
      >
        View All Products in Music
      </Link>
    </div>
  );
}
