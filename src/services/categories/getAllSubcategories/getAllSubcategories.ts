import { AllSubcategories } from "@/interfaces/subcategories.interface";

export async function getAllSubcategories(categorieId:string): Promise<AllSubcategories> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/categories/${categorieId}/subcategories`);
  const data = await response.json();
  return data;
}