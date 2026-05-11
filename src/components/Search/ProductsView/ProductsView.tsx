import ProductCard from "@/components/productCard/ProductCard";
import EmptyState from "../EmptyState";
import { AllProducts } from "@/interfaces/products.interface";

interface ProductsViewProps {
  view: "grid" | "list";
  products: AllProducts;
}

export default function ProductsView({ view, products }: ProductsViewProps) {
  return (
    <div
      className={
        view === "grid"
          ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          : "space-y-4"
      }
    >
      {products?.data?.length ? (
        products.data.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))
      ) : (
        <EmptyState />
      )}
    </div>
  );
}
