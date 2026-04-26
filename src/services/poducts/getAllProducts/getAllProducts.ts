import { AllProducts } from "@/interfaces/products.interface";

export async function getAllProducts(searchParams?: URLSearchParams): Promise<AllProducts> {

  const apiParams = new URLSearchParams(searchParams?.toString() || "");


  const minPrice = apiParams.get("minPrice");
  const maxPrice = apiParams.get("maxPrice");

  if (minPrice) {
    apiParams.set("price[gte]", minPrice);
    apiParams.delete("minPrice");
  }
  
  if (maxPrice) {
    apiParams.set("price[lte]", maxPrice);
    apiParams.delete("maxPrice");
  }

  const queryString = apiParams.toString();

  const url = queryString 
    ? `${process.env.NEXT_PUBLIC_BASE_URL}/products?${queryString}`
    : `${process.env.NEXT_PUBLIC_BASE_URL}/products`;
    
  const response = await fetch(url);
  const data = await response.json();
  return data;
}
