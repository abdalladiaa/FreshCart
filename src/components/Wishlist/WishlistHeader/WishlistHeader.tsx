import { Heart } from "lucide-react";

interface WishlistHeaderProps {
  count: number;
}

export function WishlistHeader({ count }: WishlistHeaderProps) {
  return (
    <div className="bg-white border-b border-gray-100">
      <div className="container mx-auto px-4 py-8">
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4">
          <a className="hover:text-primary-600 transition-colors" href="/">
            Home
          </a>
          <span>/</span>
          <span className="text-gray-900 font-medium">Wishlist</span>
        </nav>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center">
              <Heart className="w-6 h-6 text-red-500 fill-red-500" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">My Wishlist</h1>
              <p className="text-gray-500 text-sm">{count} items saved</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}