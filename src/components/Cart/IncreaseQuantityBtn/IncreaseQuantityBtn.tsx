"use client";
import { updateCart } from "@/services/cart/updateCart/updateCart";
import React, { ReactNode, useState } from "react";
import { ImSpinner2 } from "react-icons/im";

interface IncreaseQuantityProps {
  children?: ReactNode;
  className?: string;
  count?: number;
  disabled?: boolean;
  productId?: string;
  quantity?: number; // ضفنا الـ stock المتاح عشان منزودش عنه
}

export default function IncreaseQuantityBtn({
  children,
  className,
  count,
  disabled,
  productId,
  quantity,
}: IncreaseQuantityProps) {
  const [loading, setLoading] = useState(false);

  async function handleIncrease() {
    if (productId && count !== undefined) {
      if (quantity !== undefined && count >= quantity) {
        console.warn("Reached stock limit");
        return;
      }

      try {
        setLoading(true);
        await updateCart(productId, (count + 1));
      } catch (err) {
        console.error("Update Cart Error:", err);
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <button
      onClick={handleIncrease}
      className={className}
      disabled={disabled}
    >
      {loading ? <ImSpinner2 className="animate-spin mx-auto" /> : children}
    </button>
  );
}
