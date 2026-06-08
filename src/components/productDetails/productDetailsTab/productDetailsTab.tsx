"use client";

import React from "react";
import { Tabs } from "@/components/ui/tabs";
import { ProductDetailsContent } from "./ProductDetailsContent";
import { ProductDetailsTabNav } from "./ProductDetailsTabNav";
import { Data } from "@/interfaces/productDetails.interface";

export default function ProductDetailsTabs({ product }: { product: Data }) {
  return (
    <Tabs defaultValue="details" className="w-full">
      <div className="bg-white shadow-sm border border-gray-100">
        <ProductDetailsTabNav reviewsCount={product.reviews?.length ?? 0} />
        <ProductDetailsContent product={product} />
      </div>
    </Tabs>
  );
}
