import CartCard from "@/components/Cart/CartCard/CartCard";
import DeleteCartBtn from "@/components/Cart/DeleteCartBtn/DeleteCartBtn";
import OrderSummary from "@/components/Cart/OrderSummary/OrderSummary";
import { deleteUserCart } from "@/services/cart/deleteUserCart/deleteUserCart";
import { getCart } from "@/services/cart/getCart/getCart";
import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";


export default async function Cart() {
  const { data, cartId, numOfCartItems } = await getCart();
  const { totalCartPrice, products } = data;
  if (products.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="max-w-md text-center">
          <div className="relative mb-8">
            <div className="w-32 h-32 rounded-full bg-linear-to-br from-gray-100 to-gray-50 flex items-center justify-center mx-auto">
              <svg
                className="w-16 h-16 text-gray-300"
                fill="currentColor"
                viewBox="0 0 640 512"
              >
                <path d="M560.3 237.2c10.4 11.8 28.3 14.4 41.8 5.5 14.7-9.8 18.7-29.7 8.9-44.4l-48-72c-2.8-4.2-6.6-7.7-11.1-10.2L351.4 4.7c-19.3-10.7-42.8-10.7-62.2 0L88.8 116c-5.4 3-9.7 7.4-12.6 12.8L27.7 218.7c-12.6 23.4-3.8 52.5 19.6 65.1l33 17.7 0 53.3c0 23 12.4 44.3 32.4 55.7l176 99.7c19.6 11.1 43.5 11.1 63.1 0l176-99.7c20.1-11.4 32.4-32.6 32.4-55.7l0-117.5zm-240-9.8L170.2 144 320.3 60.6 470.4 144 320.3 227.4zm-41.5 50.2l-21.3 46.2-165.8-88.8 25.4-47.2 161.7 89.8z" />
              </svg>
            </div>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-4 bg-gray-100 rounded-full blur-md"></div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Your cart is empty
          </h2>
          <p className="text-gray-500 mb-8 leading-relaxed">
            Looks like you haven't added anything to your cart yet.
            <br />
            Start exploring our products!
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-linear-to-r from-primary-600 to-primary-700 text-white py-3.5 px-8 rounded-xl font-semibold hover:from-primary-700 hover:to-primary-800 transition-all shadow-lg shadow-primary-600/20 active:scale-[0.98]"
          >
            <span>Start Shopping</span>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 512 512">
              <path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l370.7 0-105.4 105.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
            </svg>
          </Link>
          <div className="mt-12 pt-8 border-t border-gray-100">
            <p className="text-sm text-gray-400 mb-4">Popular Categories</p>
            <div className="flex flex-wrap justify-center gap-2">
              {["Electronics", "Fashion", "Home", "Beauty"].map((cat) => (
                <Link
                  key={cat}
                  className="px-4 py-2 bg-gray-50 hover:bg-primary-50 hover:text-primary-600 text-gray-600 rounded-full text-sm font-medium transition-colors"
                  href={`/categories`}
                >
                  {cat}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
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

          {/* الـ Counter بشكل أشيك */}
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
        {/* Left Side */}
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {products.map((product: any) => (
              <CartCard key={product._id} product={product} />
            ))}
          </div>

          {/* Clear Cart Button */}
          <DeleteCartBtn />
        </div>

        {/* Right Side */}
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
