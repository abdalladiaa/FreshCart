"use client";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { deleteWishlistItem } from "@/services/wishlist/deleteWishlistItem/deleteWishlistItem";
import useWishlistMutation from "@/hooks/useWishlistMutation/useWishlistMutaition";
import { ImSpinner2 } from "react-icons/im";
import { MdDeleteOutline } from "react-icons/md";
import AddToCartBtn from "@/components/AddToCartBtn/AddToCartBtn";

interface WishlistItemProps {
  inStock: boolean;
  id: string;
  title: string;
  category: string;
  price: number;
  image: string;
}

export function WishlistItem({
  inStock,
  id,
  title,
  category,
  price,
  image,
}: WishlistItemProps) {
  const { mutate: deleteMutate, isPending } = useWishlistMutation(
    deleteWishlistItem,
    [["wishlist"]],
  );

  function handelDeleteItem() {
    deleteMutate(id);
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 md:px-6 md:py-5 items-center hover:bg-gray-50/50 transition-colors">
      {/* Product Info */}
      <div className="md:col-span-6 flex items-center gap-4">
        <Link
          className="w-20 h-20 rounded-xl bg-gray-50 border border-gray-100 overflow-hidden shrink-0 block relative"
          href={`/products/${id}`}
        >
          <Image
            alt={title}
            className="w-full h-full object-contain p-2"
            src={image}
            width={80}
            height={80}
          />
        </Link>
        <div className="min-w-0">
          <Link
            className="font-medium text-gray-900 hover:text-primary-600 transition-colors line-clamp-2"
            href={`/products/${id}`}
          >
            {title}
          </Link>
          <p className="text-sm text-gray-400 mt-1">{category}</p>
        </div>
      </div>

      {/* Price */}
      <div className="md:col-span-2 flex md:justify-center items-center gap-2">
        <span className="md:hidden text-sm text-gray-500">Price:</span>
        <div className="text-right md:text-center">
          <div className="font-semibold text-gray-900">{price} EGP</div>
        </div>
      </div>

      <div className="md:col-span-2 flex md:justify-center">
        <span className="md:hidden text-sm text-gray-500 mr-2">Status:</span>
        {inStock ? (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
            In Stock
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-red-50 text-red-700">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
            Out of Stock
          </span>
        )}
      </div>

      {/* Actions */}
      <div className="md:col-span-2 flex items-center gap-2 md:justify-center">
        <AddToCartBtn
          isWishlist
          ProductId={id}
          className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all bg-primary-600 text-white hover:bg-primary-700 cursor-pointer"
        >
          <ShoppingCart size={12} />
          <span className="md:hidden lg:inline">Add to Cart</span>
        </AddToCartBtn>

        <button
          onClick={handelDeleteItem}
          disabled={isPending}
          className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition-all disabled:opacity-50 cursor-pointer shrink-0"
          title="Remove"
        >
          {isPending ? (
            <ImSpinner2 className="animate-spin" size={16} />
          ) : (
            <MdDeleteOutline size={18} />
          )}
        </button>
      </div>
    </div>
  );
}
