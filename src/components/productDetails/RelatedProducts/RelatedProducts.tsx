import { Category } from "@/interfaces/productDetails.interface";
import { getAllProducts } from "@/services/products/getAllProducts/getAllProducts";
import RelatedProductsSwiper from "./RelatedProductsSwiper";
import SectionHeader from "./SectionHeader/SectionHeader";

export default async function RelatedProducts({
  productId,
  productCategory,
}: {
  productId: string;
  productCategory: Category;
}) {
  const relatedProducts = (
    await getAllProducts(`category=${productCategory._id}`)
  ).data.slice(0, 10);

  return (
    <section id="similar-products" className="py-10 bg-white">
      <div className="container mx-auto px-4">
        <SectionHeader />
        <RelatedProductsSwiper currentProductId={productId} products={relatedProducts} />
      </div>
    </section>
  );
}

