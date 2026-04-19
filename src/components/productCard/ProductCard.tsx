"use client";
import { Product } from "@/interfaces/products.interface";
import Image from "next/image";
import Link from "next/link";
import { FaRegHeart, FaStar, FaEye, FaStarHalfAlt } from "react-icons/fa";
import { HiPlus } from "react-icons/hi";
import { LuRefreshCw } from "react-icons/lu";
import AddToCartBtn from "../AddToCartBtn/AddToCartBtn";

export default function ProductCard({ product }: { product: Product }) {
  // Discound
  const discountPercentage = product.priceAfterDiscount
    ? Math.round(
        ((product.price - product.priceAfterDiscount) / product.price) * 100,
      )
    : null;

  return (
    <div className="group bg-white border border-gray-200 rounded-lg overflow-hidden flex flex-col h-full hover:shadow-lg transition-all duration-300">
      {/* Image Container */}
      <div className="relative">
        {product.priceAfterDiscount && (
          <div className="absolute top-3 left-3 z-10">
            <span className="bg-red-500 text-white text-[11px] font-bold px-2 py-1 rounded shadow-sm">
              -{discountPercentage}%
            </span>
          </div>
        )}

        <Link href={`/products/${product._id}`} className="block">
          <Image
            src={product?.imageCover}
            alt={product?.title}
            width={400}
            height={400}
            className="w-full h-60 object-contain bg-white transition-transform duration-500 group-hover:scale-105"
          />
        </Link>

        {/* Action Buttons */}
        <div className="absolute top-3 right-3 flex flex-col space-y-2 z-10">
          <button className="bg-white h-8 w-8 rounded-full flex items-center justify-center transition shadow-sm text-gray-600 hover:text-red-500 cursor-pointer">
            <FaRegHeart size={15} />
          </button>
          <button className="bg-white h-8 w-8 rounded-full flex items-center justify-center text-gray-600 hover:text-primary-600 shadow-sm cursor-pointer">
            <LuRefreshCw size={15} />
          </button>
          <Link
            href={`/products/${product._id}`}
            className="bg-white h-8 w-8 rounded-full flex items-center justify-center text-gray-600 hover:text-primary-600 shadow-sm"
          >
            <FaEye size={15} />
          </Link>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 flex flex-col flex-1">
        <div className="text-xs text-gray-500 mb-1 font-medium">
          {product?.category?.name}
        </div>

        <h3 className="font-semibold mb-1 cursor-pointer" title={product.title}>
          <Link
            href={`/products/${product._id}`}
            className="line-clamp-2 text-gray-800 hover:text-primary-600 transition-colors text-sm sm:text-base"
          >
            {product.title}
          </Link>
        </h3>

        {/* Ratings */}
        <div className="flex items-center mb-3">
          <div className="flex text-yellow-400 mr-2">
            {[...Array(5)].map((_, i) => {
              const rating = product.ratingsAverage;
              if (i < Math.floor(rating)) return <FaStar key={i} size={13} />;
              if (i < rating) return <FaStarHalfAlt key={i} size={13} />;
              return <FaStar key={i} className="text-gray-200" size={13} />;
            })}
          </div>
          <span className="text-xs text-gray-400 font-bold">
            {product.ratingsAverage} ({product.ratingsQuantity || 0})
          </span>
        </div>

        {/* Pricing & Add to Cart */}
        <div className="flex items-center justify-between mt-auto pt-2">
          <div className="flex flex-col">
            <span className="text-lg font-bold text-primary-600 leading-none">
              {product.priceAfterDiscount || product.price}{" "}
              <small className="text-[10px]">EGP</small>
            </span>
            {product.priceAfterDiscount && (
              <span className="text-sm text-gray-400 line-through mt-1">
                {product.price} <small className="text-[9px]">EGP</small>
              </span>
            )}
          </div>

          <AddToCartBtn
            id={product._id}
            className=" cursor-pointer h-10 w-10 rounded-full flex items-center justify-center transition bg-primary-600 text-white hover:bg-primary-700 active:scale-90 shadow-md shadow-primary-600/20"
          >
            <HiPlus size={18} />
          </AddToCartBtn>
        </div>
      </div>
    </div>
  );
}
