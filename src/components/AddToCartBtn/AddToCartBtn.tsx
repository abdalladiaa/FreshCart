"use client";

import { addToCart } from "@/services/cart/addToCart/addToCart";
import React, { ReactNode } from "react";
import { ImSpinner2 } from "react-icons/im";
import useCartMutation from "@/hooks/useCartMutation/useCartMutation";
import { updateCart } from "@/services/cart/updateCart/updateCart";
import { getCart } from "@/services/cart/getCart/getCart";
import useCart from "@/hooks/useCart/useCart";
import { CartResponse } from "@/interfaces/cart.interface";
import { FaCheck } from "react-icons/fa";
import { deleteCartItem } from "@/services/cart/deleteCartItem/deleteCartItem";

interface AddToCartBtnProps {
  isWishlist?: boolean;
  isDetailes?: boolean;
  children?: ReactNode;
  className?: string;
  ProductId: string;
  quantity?: number;
}

export default function AddToCartBtn({
  isWishlist = false,
  isDetailes = false,
  children,
  className,
  ProductId,
  quantity = 0,
}: AddToCartBtnProps) {
  const { mutate, isPending } = useCartMutation(
    async (productId: string) => {
      const res = await addToCart(productId);

      if (res && quantity > 1) {
        await updateCart(productId, quantity);
      }

      return res;
    },
    [["cart"]],
    "Product Added To Cart Successfully",
    "Login First",
  );

  const {
    mutate: deleteItemFromCartMutate,
    isPending: deleteItemFromCartIsPending,
  } = useCartMutation(deleteCartItem, [["cart"]]);

  const { data: cartRes } = useCart<CartResponse>(getCart, ["cart"]);
  const userCartProducts = cartRes?.data.products;

  const cartItem = userCartProducts?.find(
    (cartProduct) => ProductId === cartProduct.product._id,
  );

  const isInCart = Boolean(cartItem);

  function handleAddToCart() {
    if (isInCart) return;
    mutate(ProductId);
  }

  function handleDeleteItemFromCart() {
    if (!cartItem) return;
    deleteItemFromCartMutate(ProductId);
  }

  if (isInCart) {
    if (isDetailes) {
      return (
        <button
          onClick={handleDeleteItemFromCart}
          disabled={deleteItemFromCartIsPending}
          className="cursor-pointer flex-[3] bg-green-50 text-green-700 border border-green-200 py-4 rounded-xl font-bold flex items-center justify-center gap-3 shadow-lg shadow-green-600/10 disabled:cursor-not-allowed"
        >
          {deleteItemFromCartIsPending ? (
            <ImSpinner2 className="animate-spin text-xl" />
          ) : (
            <>
              <FaCheck size={16} />
              <span className="text-sm font-bold uppercase tracking-wide">
                Added to Cart
              </span>
            </>
          )}
        </button>
      );
    }


    if (isWishlist) {
      return (
        <button
          onClick={handleDeleteItemFromCart}
          disabled={deleteItemFromCartIsPending}
          className="cursor-pointer flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all bg-green-50 text-green-700 border border-green-200 disabled:cursor-not-allowed shadow-sm"
        >
          {deleteItemFromCartIsPending ? (
            <ImSpinner2 className="animate-spin text-xs" />
          ) : (
            <>
              <FaCheck size={12} />
              <span>Added to Cart</span>
            </>
          )}
        </button>
      );
    }

    return (
      <button
        onClick={handleDeleteItemFromCart}
        disabled={deleteItemFromCartIsPending}
        className="h-10 w-10 rounded-full flex items-center justify-center bg-green-50 text-green-600 border border-green-200 shadow-sm cursor-pointer"
      >
        {deleteItemFromCartIsPending ? (
          <ImSpinner2 className="animate-spin text-lg" />
        ) : (
          <FaCheck size={16} />
        )}
      </button>
    );
  }

  return (
    <button
      onClick={handleAddToCart}
      disabled={isPending}
      className={`${className} ${
        isPending ? "opacity-80 cursor-not-allowed" : ""
      }`}
    >
      {isPending ? <ImSpinner2 className="animate-spin text-xl" /> : children}
    </button>
  );
}
