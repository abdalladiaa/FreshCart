"use client";

import React from "react";
import { FaCheck } from "react-icons/fa";

const productFeatures = [
  "Premium Quality Product",
  "100% Authentic Guarantee",
  "Fast & Secure Packaging",
  "Quality Tested",
] as const;

export function ProductFeaturesCard() {
  return (
    <div className="bg-gray-50 p-5 rounded-xl border border-gray-100">
      <h4 className="font-bold text-gray-900 mb-4 text-sm tracking-wide uppercase">Key Features</h4>
      <ul className="space-y-3 text-sm text-gray-600">
        {productFeatures.map((feature) => (
          <li key={feature} className="flex items-center gap-3">
            <div className="w-5 h-5 rounded-full bg-primary-50 flex items-center justify-center text-primary-600 shrink-0">
              <FaCheck className="w-2.5 h-2.5" />
            </div>
            <span className="font-medium">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
