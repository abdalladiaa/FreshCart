'use client'
import CartCard from "@/components/Cart/CartCard/CartCard";
import DeleteCartBtn from "@/components/Cart/DeleteCartBtn/DeleteCartBtn";
import OrderSummary from "@/components/Cart/OrderSummary/OrderSummary";
import { deleteUserCart } from "@/services/cart/deleteUserCart/deleteUserCart";
import { getCart } from "@/services/cart/getCart/getCart";
import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";
import EmptyCart from "../../../app/(pages)/cart/EmptyCart";
import useCart from "@/hooks/useCart/useCart";
import Loading from "@/app/loading";
import { CartResponse } from "@/interfaces/cart.interface";


export default function Cart() {
  const { data: res, isLoading } = useCart<CartResponse>(getCart, ['cart']);

  if (isLoading || !res) {
    return <Loading />;
  }

  const { numOfCartItems, data } = res;
  const { products, totalCartPrice } = data;

  if (products.length === 0) {
    return <EmptyCart />;
  }

  return (
    <>
      <div className="mb-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-200 pb-8">
          <div className="flex items-center gap-4">
            <div className="bg-linear-to-r from-primary-600 to-primary-700 text-white w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg shadow-primary-600/20">
              <FaShoppingCart size={24} />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                Shopping Cart
              </h1>
              <p className="text-gray-500 mt-1 flex items-center gap-1.5">
                Manage your items and proceed to checkout
              </p>
            </div>
          </div>

          <div className="bg-white px-4 py-2 rounded-full border border-gray-100 shadow-sm self-start md:self-auto">
            <p className="text-sm text-gray-600">
              You have
              <span className="font-bold text-primary-600 mx-1.5 text-base">
                {numOfCartItems}
              </span>
              items in your cart
            </p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {products.map((product) => (
              <CartCard key={product._id} product={product} />
            ))}
          </div>

          <DeleteCartBtn />
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <OrderSummary
              itemCount={numOfCartItems}
              subtotal={totalCartPrice}
            />
          </div>
        </div>
      </div>
    </>
  );
}
