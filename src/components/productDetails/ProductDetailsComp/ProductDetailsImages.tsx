"use client";
import { ProductDetails } from "@/interfaces/productDetails.interface";
import React, { useState } from "react";

export default function ProductDetailsImages({
  product,
}: {
  product: ProductDetails;
}) {
  const [image, setImage] = useState<string>(product?.data?.images?.[0] ?? "");

  return (
    <>
      <div className="lg:w-1/3 w-full relative lg:sticky  top-24">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
          <div className="overflow-hidden rounded-xl mb-4 bg-gray-50">
            {image ? (
              <img
                src={image}
                alt={product?.data?.title ?? "product image"}
                className="w-full h-auto object-contain aspect-square hover:scale-110 transition-transform duration-500"
              />
            ) : (
              <div className="w-full aspect-square flex items-center justify-center text-gray-400">
                No image available
              </div>
            )}
          </div>
          <div className="flex justify-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {(product?.data?.images ?? []).map((img: string, i: number) => (
              <img
                onClick={() => setImage(img)}
                key={i}
                src={img}
                className={`  w-20 h-20 shrink-0 rounded-lg border-2 ${img === image ? "border-primary-500" : "border-transparent"} hover:border-primary-500 object-cover cursor-pointer transition-all`}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
