"use client";

import { Data } from "@/interfaces/productDetails.interface";
import React from "react";

export function ProductInformationCard({ product }: { product: Data }) {
  const productInfoItems = [
    ["Category", product.category?.name ?? "Uncategorized"],
    [
      "Subcategory",
      product.subcategory?.map((sub) => sub.name).join(", ") ||
        "No subcategories",
    ],
    ["Brand", product.brand?.name ?? "Unknown Brand"],
    ["Items Sold", `${String(product.sold)}+ sold`],
  ] as const;

  return (
    <div className="bg-gray-50 p-5 rounded-xl border border-gray-100">
      <h4 className="font-bold text-gray-900 mb-4 text-sm tracking-wide uppercase">
        Product Information
      </h4>
      <ul className="space-y-3 text-sm">
        {productInfoItems.map(([label, value]) => (
          <li
            key={label}
            className="flex justify-between text-sm border-b border-gray-200/40 pb-2 last:border-none last:pb-0"
          >
            <span className="text-gray-500">{label}</span>
            <span className="text-gray-900 font-semibold">{value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
