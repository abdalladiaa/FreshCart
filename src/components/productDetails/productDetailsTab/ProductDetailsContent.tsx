"use client";

import React from "react";
import { TabsContent } from "@/components/ui/tabs";
import { ProductAboutSection } from "./ProductAboutSection";
import { ProductFeaturesCard } from "./ProductFeaturesCard";
import { ProductInformationCard } from "./ProductInformationCard";
import { Data } from "@/interfaces/productDetails.interface";
import ProductRanks from "./ProductRanks";
import ShippingAndReturn from "./ShippingAndReturn";

export function ProductDetailsContent({ product }: { product: Data }) {
  return (
    <div className="p-6">
      <div className="space-y-6">
        {/* Tab 1: Details */}
        <TabsContent
          value="details"
          className="space-y-6 mt-0 focus-visible:outline-none"
        >
          <ProductAboutSection productDescription = {product.description} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ProductInformationCard product={product} />
            <ProductFeaturesCard />
          </div>
        </TabsContent>


        <TabsContent
          value="reviews"
          className="mt-0 focus-visible:outline-none"
        >
          <ProductRanks product={product} />
        </TabsContent>


        <TabsContent
          value="shipping"
          className="mt-0 text-sm text-gray-500 focus-visible:outline-none"
        >
          <div className="bg-gray-50 rounded-xl p-5 border border-gray-100 text-gray-600 leading-relaxed">
            <ShippingAndReturn/>
          </div>
        </TabsContent>
      </div>
    </div>
  );
}
