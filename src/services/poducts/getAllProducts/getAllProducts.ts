import { AllProducts } from "@/interfaces/products.interface";

export async function getAllProducts(
  queryString: string = "",
): Promise<AllProducts> {
  const params = new URLSearchParams(queryString);

  const search = params.get("search");

  if (search) {
    params.set("keyword", search);
    params.delete("search");
  }

  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/products${queryString}`;

  const response = await fetch(url);
  const data = await response.json();
  return data;
}
