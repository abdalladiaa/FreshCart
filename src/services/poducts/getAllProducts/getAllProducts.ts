import { AllProducts } from "@/interfaces/products.interface";

export async function getAllProducts(
  queryString: string = "",
): Promise<AllProducts> {
  const params = new URLSearchParams(queryString);

  const search = params.get("q");
  const maxPrice = params.get("maxPrice");
  const minPrice = params.get("minPrice");

  if (search) {
    params.set("keyword", search);
    params.delete("q");
  }
  if (minPrice) {
    params.set("price[gte]", minPrice);
    params.delete("minPrice");
  }

  if (maxPrice) {
    params.set("price[lte]", maxPrice);
    params.delete("maxPrice");
  }

  const query = params.toString();

  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/products${query ? `?${query}` : ""}`;

  const response = await fetch(url);
  const data = await response.json();
  return data;
}
