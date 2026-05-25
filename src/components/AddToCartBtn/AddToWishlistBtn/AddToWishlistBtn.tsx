"use client";
import React, { ReactNode } from "react";
import { ImSpinner2 } from "react-icons/im";
import useWishlistMutation from "@/hooks/useWishlistMutation/useWishlistMutaition";
import useWishlist from "@/hooks/useWishlist/useWishlist";
import { addToWishlist } from "@/services/wishlist/addToWishlist/addToWishlist";
import { deleteWishlistItem } from "@/services/wishlist/deleteWishlistItem/deleteWishlistItem";
import { getWishlist } from "@/services/wishlist/getWishlist/getWishlist";
import { WishlistResponse } from "@/interfaces/wishlist.interface";
import { FaHeart } from "react-icons/fa";

interface AddToWishlistBtnProps {
  isDetails?: boolean;
  children?: ReactNode;
  className?: string;
  id: string;
}

export default function AddToWishlistBtn({
  isDetails = false,
  children,
  className,
  id,
}: AddToWishlistBtnProps) {
  const { mutate: addMutate, isPending: addIsPending } = useWishlistMutation(
    async (productId: string) => {
      const res = await addToWishlist(productId);
      return res;
    },
    [["wishlist"]],
    "Product Added To Wishlist Successfully",
    "Login First",
  );

  const { mutate: deleteMutate, isPending: deleteIsPending } =
    useWishlistMutation(
      deleteWishlistItem,
      [["wishlist"]],
      "Product Removed From Wishlist Successfully",
      "Login First",
    );

  const { data: wishlistRes } = useWishlist<WishlistResponse>(getWishlist, [
    "wishlist",
  ]);
  const wishlistItems = wishlistRes?.data;
  const wishlistItem = wishlistItems?.find((item) => item._id === id);
  const isInWishlist = Boolean(wishlistItem);

  function handleAddToWishlist() {
    if (isInWishlist) return;
    addMutate(id);
  }

  function handleDeleteFromWishlist() {
    if (!wishlistItem) return;
    deleteMutate(id);
  }

  if (isInWishlist) {
    if (isDetails) {
      return (
        <button
          onClick={handleDeleteFromWishlist}
          disabled={deleteIsPending}
          className="cursor-pointer w-full border-2 border-red-200 text-red-600 bg-red-50 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 disabled:opacity-80"
        >
          {deleteIsPending ? (
            <ImSpinner2 className="animate-spin text-xl" />
          ) : (
            <>
              <FaHeart size={16} />
              <span>In Wishlist</span>
            </>
          )}
        </button>
      );
    }

    return (
      <button
        onClick={handleDeleteFromWishlist}
        disabled={deleteIsPending}
        className={`${className} ${deleteIsPending ? "opacity-80 cursor-not-allowed" : ""}`}
      >
        {deleteIsPending ? (
          <ImSpinner2 className="animate-spin text-xl" />
        ) : (
          <FaHeart color="red" size={16} />
        )}
      </button>
    );
  }

  return (
    <button
      onClick={handleAddToWishlist}
      disabled={addIsPending}
      className={`${className} ${addIsPending ? "opacity-80 cursor-not-allowed" : ""}`}
    >
      {addIsPending ? (
        <ImSpinner2 className="animate-spin text-xl" />
      ) : (
        children
      )}
    </button>
  );
}
