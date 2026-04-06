"use client";
import { CartProduct } from "@/interfaces/cart.interface";
import Image from "next/image";
import Link from "next/link";
import { FaMinus, FaPlus } from "react-icons/fa";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { MdDeleteOutline, MdErrorOutline } from "react-icons/md";
import DecreaseQuantityBtn from "../DecreaseQuantityBtn/DecreaseQuantityBtn";
import IncreaseQuantityBtn from "../IncreaseQuantityBtn/IncreaseQuantityBtn";
import { deleteCartItem } from "@/services/cart/deleteCartItem/deleteCartItem";
import { useState } from "react";
import { ImSpinner2 } from "react-icons/im";

export default function CartCard({ product }: { product: CartProduct }) {
  const { count, price } = product;
  const { imageCover, title, category, quantity, _id, brand } = product.product;

  const [deleteLoading, setDeleteLoading] = useState(false);

  async function handleDeleteItem() {
    try {
      setDeleteLoading(true);
      await deleteCartItem(_id);
    } catch (err) {
      console.log(err);
    } finally {
      setDeleteLoading(false);
    }
  }

  return (
    <div className="group relative bg-white rounded-3xl p-1 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_10px_10px_-5px_rgba(0,0,0,0.04)] transition-all duration-500 border border-gray-100/50">
      <div className="p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row gap-5 items-center sm:items-start">
          {/* صورة المنتج مع Badge الحالة */}
          <div className="relative shrink-0">
            <Link
              href={`/products/${_id}`}
              className="relative block w-32 h-32 sm:w-36 sm:h-36 rounded-2xl overflow-hidden bg-gray-50 border border-gray-50 transition-transform duration-500 group-hover:scale-[1.02]"
            >
              <Image
                src={imageCover}
                alt={title}
                fill
                className="object-contain p-2 transition-transform duration-700 group-hover:scale-110"
              />
            </Link>

            {/* Status Badge */}
            <div className="absolute -top-2 -left-2">
              {quantity > 0 ? (
                <div className="flex items-center gap-1 bg-emerald-50 text-emerald-600 px-2 py-1 rounded-lg text-[10px] font-bold border border-emerald-100 shadow-sm">
                  <IoIosCheckmarkCircle
                    className="text-emerald-500"
                    size={14}
                  />
                  AVAILABLE
                </div>
              ) : (
                <div className="flex items-center gap-1 bg-red-50 text-red-600 px-2 py-1 rounded-lg text-[10px] font-bold border border-red-100 shadow-sm">
                  <MdErrorOutline className="text-red-500" size={14} />
                  OUT OF STOCK
                </div>
              )}
            </div>
          </div>

          {/* تفاصيل المنتج */}
          <div className="flex-1 w-full flex flex-col min-h-[140px]">
            <div className="flex justify-between items-start gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-primary-500 uppercase tracking-widest px-2 py-0.5 bg-primary-50 rounded-md">
                  {category.name}
                </span>
                <Link href={`/products/${_id}`}>
                  <h3 className="font-bold text-gray-800 text-lg sm:text-xl line-clamp-1 hover:text-primary-600 transition-colors leading-tight">
                    {title}
                  </h3>
                </Link>
                <p className="text-xs text-gray-400 font-medium capitalize">
                  Brand: <span className="text-gray-600">{brand.name}</span>
                </p>
              </div>

              {/* زر الحذف العلوي (Desktop) */}
              <button
                onClick={handleDeleteItem}
                className="hidden sm:flex cursor-pointer h-10 w-10 rounded-xl bg-gray-50 text-gray-400 hover:bg-red-50 hover:text-red-500 items-center justify-center transition-all duration-300 border border-transparent hover:border-red-100"
              >
                {deleteLoading ? <ImSpinner2 className="animate-spin mx-auto" /> : <MdDeleteOutline size={22} />}
              </button>
            </div>

            {/* التحكم في السعر والكمية */}
            <div className="mt-auto pt-4 flex flex-wrap items-end justify-between gap-4">
              <div className="flex items-center gap-6">
                {/* السعر */}
                <div className="space-y-0.5">
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">
                    Unit Price
                  </p>
                  <p className="text-xl font-black text-gray-900 tracking-tight">
                    {price}{" "}
                    <span className="text-sm font-bold text-gray-400">EGP</span>
                  </p>
                </div>

                {/* أزرار الكمية بتصميم مودرن */}
                <div className="flex items-center bg-gray-100/80 p-1.5 rounded-2xl border border-gray-200/50 backdrop-blur-sm">
                  <DecreaseQuantityBtn
                    productId={_id}
                    disabled={count === 1}
                    count={count}
                    className=" cursor-pointer h-8 w-8 rounded-xl bg-white shadow-sm flex items-center justify-center text-gray-600 hover:text-red-500 transition-all disabled:opacity-40"
                  >
                    <FaMinus size={12} />
                  </DecreaseQuantityBtn>

                  <span className="w-10 text-center font-black text-gray-800 text-base">
                    {count}
                  </span>

                  <IncreaseQuantityBtn
                    productId={_id}
                    disabled={count >= quantity}
                    count={count}
                    className=" cursor-pointer h-8 w-8 rounded-xl bg-primary-600 flex items-center justify-center text-white hover:bg-primary-700 transition-all shadow-md disabled:bg-gray-300"
                  >
                    <FaPlus size={12} />
                  </IncreaseQuantityBtn>
                </div>
              </div>

              {/* الإجمالي وزر الحذف للموبايل */}
              <div className="flex items-center justify-between w-full sm:w-auto sm:gap-6 border-t sm:border-0 border-gray-50 pt-4 sm:pt-0">
                <div className="text-left sm:text-right">
                  <p className="text-[10px] text-gray-400 font-bold uppercase">
                    Subtotal
                  </p>
                  <p className="text-2xl font-black text-primary-600">
                    {price * count}
                    <span className="text-xs font-bold ml-1 text-primary-400">
                      EGP
                    </span>
                  </p>
                </div>

                <button className="sm:hidden h-11 w-11 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center border border-red-100 active:scale-95 transition-transform">
                  <MdDeleteOutline size={24} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
