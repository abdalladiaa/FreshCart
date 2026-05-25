import React from 'react'
import Link from 'next/link'
import { Subcategory } from '@/interfaces/subcategories.interface'
import { ArrowRight, FolderOpen } from 'lucide-react';

export default function SubcategorieCard({ subcategory }: { subcategory: Subcategory }) {
  const {_id , category , name , slug} = subcategory 
return (
    <Link 
      href={`/products?subcategory=${_id}`}
      className="group bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-xl hover:border-primary-200 transition-all duration-300 hover:-translate-y-1 block"
    >

      <div className="w-14 h-14 rounded-xl bg-primary-50 flex items-center justify-center mb-4 group-hover:bg-primary-100 transition-colors">
        <FolderOpen className="w-6 h-6 text-primary-600" />
      </div>

      <h3 className="font-bold text-gray-900 text-lg group-hover:text-primary-600 transition-colors mb-2">
        {name}
      </h3>

      <div className="flex items-center gap-2 text-sm text-primary-600 opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-x-1 group-hover:translate-x-0">
        <span>Browse Products</span>
        <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
      </div>
    </Link>
  );
}

