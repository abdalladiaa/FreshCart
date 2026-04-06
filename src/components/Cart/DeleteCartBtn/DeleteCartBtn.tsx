"use client"
import { deleteUserCart } from "@/services/cart/deleteUserCart/deleteUserCart";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ImSpinner2 } from "react-icons/im";
import { MdDeleteSweep } from "react-icons/md";

export default function DeleteCartBtn() {
  const [deleteCartLoading, setDeleteCartLoading] = useState(false);
  const router = useRouter();
  async function handleDeleteCart() {
    try {
      setDeleteCartLoading(true);
      const res: any = await deleteUserCart();
      if (res?.status === "success") {
        router.refresh();
      }
    } catch (err) {
      console.log(err);
    } finally {
      setDeleteCartLoading(false);
    }
  }
  return (
    <>
      <div className="mt-8 flex justify-end px-2">
        <button
          onClick={handleDeleteCart}
          className="cursor-pointer flex items-center gap-2 px-6 py-3 rounded-2xl text-red-600 bg-white border-2 border-red-50 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all duration-300 font-bold shadow-sm hover:shadow-red-200"
        >
          {deleteCartLoading ? (
            <>
              <ImSpinner2 className="animate-spin mx-auto" />
              <span>Deleting Cart...</span>
            </>
          ) : (
            <>
              <MdDeleteSweep size={22} />
              <span>Clear All Items</span>
            </>
          )}
        </button>
      </div>
    </>
  );
}
