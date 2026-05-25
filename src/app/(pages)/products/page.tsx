import Features from "@/components/Features/Features";
import PageDescription from "@/components/PageDescription/PageDescription";
import ProductCard from "@/components/productCard/ProductCard";
import ActiveFilters from "@/components/ActiveFilters/ActiveFilters";
import NoProductsFound from "@/components/NoProductsFound/NoProductsFound";
import { getSpecificSubcategorie } from "@/services/categories/getspicificsubcategorie/getSpecificSubcategorie";
import { getSpecificCategory } from "@/services/categories/getSpecificCaregory/getSpecificCaregory";
import { getSpecificCategory as getSpecificBrand } from "@/services/brands/getSpecificBrand";
import { getAllProducts } from "@/services/products/getAllProducts/getAllProducts";
import { FaBoxOpen } from "react-icons/fa";
import Image from "next/image";

export default async function Products({
  searchParams,
}: {
  searchParams: Promise<{
    subcategory?: string;
    brand?: string;
    category?: string;
  }>;
}) {
  const { subcategory, brand, category } = await searchParams;

  const specificSub = subcategory
    ? await getSpecificSubcategorie(subcategory)
    : null;

  const subcategoryId = specificSub?.data?._id || null;
  const subcategoryName = specificSub?.data?.name || null;

  const categoryFromSub = specificSub?.data?.category || null;

  const specificBrand = brand ? await getSpecificBrand(brand) : null;

  const brandId = specificBrand?.data?._id || null;
  const brandName = specificBrand?.data?.name || null;
  const brandImage = specificBrand?.data?.image || null;

  const specificCategory = category
    ? await getSpecificCategory(category)
    : categoryFromSub
    ? await getSpecificCategory(categoryFromSub)
    : null;

  const categoryId = specificCategory?.data?._id || categoryFromSub || null;
  const categoryName = specificCategory?.data?.name || null;

  const apiQueryParams = new URLSearchParams();
  if (subcategory) {
    apiQueryParams.set("subcategory", subcategory);
  }
  if (category) {
    apiQueryParams.set("category", category);
  } else if (categoryFromSub) {
    apiQueryParams.set("category", categoryFromSub);
  }
  if (brand) {
    apiQueryParams.set("brand", brand);
  }

  const allProducts = await getAllProducts(apiQueryParams.toString());

  const selectedProducts = allProducts.data;

  const activeName = subcategoryName || categoryName;

  const pageTitle =
    activeName && brandName
      ? `${activeName} - ${brandName}`
      : activeName
        ? activeName
        : brandName
          ? brandName
          : "All Products";

  const pageDesc =
    activeName && brandName
      ? `Explore ${brandName} products in ${activeName}`
      : activeName
        ? `Explore our collection under ${activeName}`
        : brandName
          ? `Explore products from ${brandName}`
          : "Explore our complete product collection";

  const pageIcon = brandImage ? (
    <div className="relative w-full h-full rounded-2xl overflow-hidden bg-white p-1 flex items-center justify-center">
      <Image
        src={brandImage}
        alt={brandName || "Brand"}
        fill
        className="object-contain"
        sizes="64px"
      />
    </div>
  ) : (
    <FaBoxOpen />
  );

  return (
    <>
      <PageDescription
        icon={pageIcon}
        page={pageTitle}
        description={pageDesc}
      />
      <section className="py-10">
        <div className="container px-4">
          <ActiveFilters
            categoryName={categoryName}
            categoryId={categoryId}
            subcategoryName={subcategoryName}
            subcategoryId={subcategoryId}
            brandName={brandName}
            brandId={brandId}
          />
          <div className="mb-6 text-sm text-gray-500">
            {`Showing ${selectedProducts.length} products`}
          </div>
          {selectedProducts && selectedProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {selectedProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <NoProductsFound />
          )}
        </div>
      </section>
      <Features />
    </>
  );
}
