"use client";
import useWishlist from '@/hooks/useWishlist/useWishlist';
import { WishlistResponse } from '@/interfaces/wishlist.interface';
import { getWishlist } from '@/services/wishlist/getWishlist/getWishlist';
import Link from 'next/link';
import { WishlistHeader } from '../WishlistHeader/WishlistHeader';
import { WishlistItem } from '../wishlistItem/wishlistItem';
import EmptyWishlist from '../EmptyWishlis/EmptyWishlist';

export default function Wishlist() {
  const { data: res, isLoading, isError } = useWishlist<WishlistResponse>(getWishlist, ['wishlist']);

  const products = res?.data || [];


  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50/50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading wishlist...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gray-50/50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg font-medium">Failed to load wishlist</p>
          <p className="text-gray-600 text-sm mt-2">Please try again later</p>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return <EmptyWishlist />;
  }

  return (
    <div className="min-h-screen bg-gray-50/50">
      <WishlistHeader count={products.length} />

      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-100 text-sm font-medium text-gray-500">
            <div className="col-span-6">Product</div>
            <div className="col-span-2 text-center">Price</div>
            <div className="col-span-2 text-center">Status</div>
            <div className="col-span-2 text-center">Actions</div>
          </div>

          <div className="divide-y divide-gray-100">
            {products.map((product) => (
              <WishlistItem
              inStock = {Boolean(product.quantity > 0)}
                key={product._id}
                id={product._id || product.id}
                title={product.title}
                category={product.subcategory?.[0]?.name || product.category?.name || "Uncategorized"}
                price={product.price}
                image={product.imageCover}
              />
            ))}
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between">
          <Link
            className="text-gray-500 hover:text-primary-600 text-sm font-medium transition-colors"
            href="/products"
          >
            ← Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}