"use client";

import React from "react";

export function ProductAboutSection({productDescription}:{productDescription: string}) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-3">
        About this Product
      </h3>
      <p className="text-gray-600 leading-relaxed whitespace-pre-line text-sm bg-gray-50 p-4 rounded-xl border border-gray-100 max-w-md">
        {productDescription}
      </p>
    </div>
  );
}
