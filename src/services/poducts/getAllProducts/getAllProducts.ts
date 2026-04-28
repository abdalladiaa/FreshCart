import { AllProducts } from "@/interfaces/products.interface";

export async function getAllProducts(): Promise<AllProducts> {


  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/products`;

  const response = await fetch(url);
  const data = await response.json();
  return data;
}
