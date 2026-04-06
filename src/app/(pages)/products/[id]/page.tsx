import ProductDetailsComp from "@/components/productDetails/ProductDetailsComp/ProductDetailsComp";
import { ProductDetails } from "@/interfaces/productDetails.interface";
import { getSpecificProduct } from "@/services/getSpecificProduct/getSpecificProduct";


export default async function Details({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const product: ProductDetails = await getSpecificProduct(id);
  

  return (
    <>
      <ProductDetailsComp product = {product}  />

    </>
  );
}
