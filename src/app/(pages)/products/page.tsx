import Features from "@/components/Features/Features";
import PageDescription from "@/components/PageDescription/PageDescription";
import ProductCard from "@/components/productCard/ProductCard";
import { getAllProducts } from "@/services/getAllProducts/getAllProducts";
import { FaBoxOpen } from "react-icons/fa";

export default async function Products() {
  const allProducts = await getAllProducts();

  return (
    <>
        <PageDescription
          icon={<FaBoxOpen />}
          page={"All Products"}
          description={"Explore our complete product collection"}
        />
      <section className="py-10">
        <div className="container px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 px-2">
            Recent Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {allProducts?.data?.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </section>
      <Features/>
    </>
  );
}
