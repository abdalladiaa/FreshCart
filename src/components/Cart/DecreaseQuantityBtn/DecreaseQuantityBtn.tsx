"use client";
import { updateCart } from "@/services/cart/updateCart/updateCart";
import React, { ReactNode, useState } from "react";
import { ImSpinner2 } from "react-icons/im"; // عشان لو حبيت تظهر Spinner

interface DecreaseQuantityProps {
  children?: ReactNode;
  className?: string;
  count?: number;
  disabled?: boolean;
  productId?: string;
}

export default function DecreaseQuantityBtn({
  children,
  className,
  count,
  disabled,
  productId,
}: DecreaseQuantityProps) {

  const [loading, setLoading] = useState(false);

  async function handleDecrease() {
    if (productId && count !== undefined && count > 1) {
      try {
        setLoading(true);
        await updateCart(productId, count - 1);
      } catch (err) {
        console.error("Update Cart Error:", err);
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <button
      onClick={handleDecrease}
      className={className}
      disabled={disabled || loading || count === 1}
    >
      {loading ? <ImSpinner2 className="animate-spin" /> : children}
    </button>
  );
}
