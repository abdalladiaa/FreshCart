import { Category, SpecificCategory } from '@/interfaces/categories.interface';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

export default function HomeCategoryCard({category}:{category:Category}) {
    const displayImage = category.image
  return (
    <Link
      href={`/products?category=${category._id}`}
      className="bg-white rounded-lg p-4 text-center shadow-sm hover:shadow-md transition group cursor-pointer block"
    >
      <div className="h-20 w-20 overflow-hidden bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-emerald-200 transition">
        {displayImage && (
          <Image
            alt={category.name || "item"}
            src={displayImage}
            width={300}
            height={300}
            className="w-full h-full object-cover"
          />
        )}
      </div>
      <h3 className="font-medium text-gray-800 group-hover:text-emerald-600 transition-colors">
        {category.name}
      </h3>
    </Link>
  );
}
