import React from "react";

export default function loading() {
  return (
    <section className="my-10 animate-pulse">
      <div className="relative flex flex-col lg:flex-row gap-10 items-start">
        
        {/* Left Side: Image Skeleton */}
        <div className="lg:w-1/3 w-full space-y-4">
          <div className="aspect-square bg-gray-200 rounded-2xl w-full"></div>
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-square bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>

        {/* Right Side: Content Skeleton */}
        <div className="lg:w-2/3 w-full space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            
            {/* Category & Brand */}
            <div className="flex items-center gap-3 mb-4">
              <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
              <div className="h-4 w-4 bg-gray-200 rounded-full"></div>
              <div className="h-6 w-24 bg-gray-200 rounded-md"></div>
            </div>

            {/* Title */}
            <div className="h-10 bg-gray-200 rounded-xl w-3/4 mb-4"></div>

            {/* Ratings */}
            <div className="flex items-center gap-3 mb-8">
              <div className="h-5 w-32 bg-gray-200 rounded-md"></div>
              <div className="h-5 w-20 bg-gray-200 rounded-md"></div>
            </div>

            {/* Price & Description */}
            <div className="mb-8">
              <div className="h-12 w-40 bg-gray-200 rounded-xl mb-6"></div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            </div>

            {/* Counter Skeleton */}
            <div className="h-14 bg-gray-100 rounded-xl w-40 mb-6"></div>

            {/* Buttons Skeleton */}
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <div className="flex-[3] h-14 bg-gray-200 rounded-xl"></div>
              <div className="flex-[2] h-14 bg-gray-200 rounded-xl"></div>
            </div>
            <div className="h-14 bg-gray-200 rounded-xl mb-8"></div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-gray-100">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                  <div className="space-y-2">
                    <div className="h-3 w-16 bg-gray-200 rounded"></div>
                    <div className="h-2 w-12 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}