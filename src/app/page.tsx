import HomeCategoryCard from "@/components/CategoriesComps/HomeCategoryCard/HomeCategoryCard";
import FeaturesSection from "@/components/FeaturesSection/FeaturesSection";
import GenericSection from "@/components/GenericSection/GenericSection";
import NewsletterSection from "@/components/NewsletterSection/NewsletterSection";
import ProductCard from "@/components/productCard/ProductCard";
import PromoBanner from "@/components/PromoBanner/PromoBanner";
import Homeslider from "@/components/Slider/HomeSlider";
import { getAllCategories } from "@/services/categories/getAllCategories/getAllCategories";
import { getAllProducts } from "@/services/poducts/getAllProducts/getAllProducts";

export default function Home() {
  return (
    <>
      {/* Slider */}
      <div className="relative">
        <Homeslider />
      </div>
      <FeaturesSection />
      <GenericSection
        fn={getAllCategories}
        title={"Shop By Category"}
        renderItem={(category: any) => <HomeCategoryCard category={category} />}
      />

      <div className="container">
        <div className="grid md:grid-cols-2 gap-6">
          
          <PromoBanner
            title="Fresh Organic Fruits"
            subtitle="Get up to 40% off on selected organic fruits"
            discount="40% OFF"
            code="ORGANIC40"
            link="/products"
            badgeIcon="🔥"
            badgeText="Deal of the Day"
            bgColor="bg-emerald-600"
            btnTextColor="text-emerald-600"
            initial={-100}
          />
          <PromoBanner
            title="Exotic Vegetables"
            subtitle="Discover our latest collection of premium vegetables"
            discount="25% OFF"
            code="FRESH25"
            link="/products?sort=newest"
            badgeIcon="✨"
            badgeText="New Arrivals"
            bgColor="bg-orange-500"
            btnTextColor="text-orange-500"
            initial={100}
          />
        </div>

        <GenericSection
          fn={getAllProducts}
          title={"Featured Products"}
          gridCols="grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
          renderItem={(product: any) => <ProductCard product={product} />}
        />
        <NewsletterSection />
      </div>
    </>
  );
}
