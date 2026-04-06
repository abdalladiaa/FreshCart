"use client";
import { Product } from "@/interfaces/products.interface";
import Image from "next/image";
import Link from "next/link";
import { FaRegHeart, FaStar, FaEye } from "react-icons/fa";
import { HiPlus } from "react-icons/hi";
import AddToCartBtn from "../AddToCartBtn/AddToCartBtn";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group relative bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-500 flex flex-col h-full">
      {/* Image Container & Badges */}
      <div className="relative aspect-square overflow-hidden rounded-t-2xl bg-gray-50/50 p-6">
        {/* Discount Badge */}
        {product.priceAfterDiscount && (
          <div className="absolute top-3 left-3 z-10 bg-red-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm">
            SAVE{" "}
            {Math.round(
              ((product.price - product.priceAfterDiscount) / product.price) *
                100,
            )}
            %
          </div>
        )}

        <div className="absolute right-3 top-3 flex flex-col gap-2 transition-all duration-300 z-10">
          <button className="p-3 bg-white hover:bg-red-50 text-gray-600 hover:text-red-500 rounded-xl shadow-lg border border-gray-50 transition-colors cursor-pointer">
            <FaRegHeart size={18} />
          </button>
          <Link
            href={`/products/${product._id}`}
            className="p-3 bg-white hover:bg-emerald-50 text-gray-600 hover:text-emerald-600 rounded-xl shadow-lg border border-gray-50 transition-colors cursor-pointer"
          >
            <FaEye size={18} />
          </Link>
        </div>

        <Link href={`/products/${product._id}`} className="block h-full">
          <Image
            src={product?.imageCover}
            alt={product?.title}
            width={400}
            height={400}
            className="w-full h-full object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-110"
          />
        </Link>
      </div>

      {/* Content Section */}
      <div className="p-5 flex flex-col grow">
        <div className="mb-auto">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-primary-600 uppercase tracking-widest">
              {product?.category?.name}
            </span>
            <div className="flex items-center gap-1 bg-yellow-50 px-2 py-0.5 rounded-md">
              <FaStar className="text-yellow-500 text-[10px]" />
              <span className="text-[11px] font-bold text-yellow-700">
                {product?.ratingsAverage}
              </span>
            </div>
          </div>

          <Link href={`/products/${product._id}`}>
            <h3 className="text-gray-800 font-semibold text-base line-clamp-1 hover:text-emerald-600 transition-colors mb-2">
              {product?.title}
            </h3>
          </Link>
        </div>

        {/* Pricing */}
        <div className="flex  items-center gap-2 mt-4">
          {product.priceAfterDiscount ? (
            <>
              <span className="text-xl font-bold text-gray-900 leading-none">
                {product?.priceAfterDiscount}{" "}
                <small className="text-xs font-medium uppercase">Egp</small>
              </span>
              <span className="text-sm text-gray-400 line-through mb-0.5">
                {product?.price} Egp
              </span>
            </>
          ) : (
            <span className="text-xl font-bold text-gray-900 leading-none">
              {product?.price}{" "}
              <small className="text-xs font-medium uppercase">Egp</small>
            </span>
          )}
        </div>

        {/* Add to Cart Button (Back to Emerald) */}
        <AddToCartBtn
          id={product._id}
          className="mt-5 w-full bg-primary-600 hover:bg-primary-700 text-white py-3.5 rounded-xl flex items-center justify-center gap-2.5 transition-all duration-300 shadow-lg shadow-emerald-100 hover:shadow-emerald-200 cursor-pointer active:scale-95"
        >
          <HiPlus className="text-xl  transition-transform duration-300" />
          <span className="text-sm font-bold uppercase tracking-wide">
            Add to Cart
          </span>
        </AddToCartBtn>
      </div>
    </div>
  );
}
