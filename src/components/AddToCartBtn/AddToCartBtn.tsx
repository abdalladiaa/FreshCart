"use client";
import { addToCart } from "@/services/cart/addToCart/addToCart";
import React, { ReactNode, useState } from "react";
import { toast } from "sonner";
import { ImSpinner2 } from "react-icons/im";
import { updateCart } from "@/services/cart/updateCart/updateCart";

interface AddToCartBtnProps {
  children?: ReactNode;
  className?: string;
  id: string;
  quantity?: number;
}

export default function AddToCartBtn({
  children,
  className,
  id,
  quantity = 0,
}: AddToCartBtnProps) {
  const [loading, setLoading] = useState(false);

  async function handleAddToCart() {
    try {
      setLoading(true);
      const result = await addToCart(id);
      if (result) {
        if (quantity) {
          updateCart(id, quantity);
        }
        toast.success("Product added to cart successfully");
      } else {
        toast.error("Failed to add product to cart");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleAddToCart}
      disabled={loading}
      className={`${className} ${loading ? "opacity-80 cursor-not-allowed" : ""}`}
    >
      {loading ? (
        <>
          <ImSpinner2 className="animate-spin text-xl" />
          <span className="text-sm font-bold uppercase tracking-wide">
            Adding...
          </span>
        </>
      ) : (
        children
      )}
    </button>
  );
}
