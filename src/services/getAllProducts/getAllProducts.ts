import { AllProducts } from "@/interfaces/products.interface";

export async function getAllProducts():Promise<AllProducts> {
  const response = await fetch(
    "https://ecommerce.routemisr.com/api/v1/products",
  );
  const data = await response.json();
  return data
}