import { SpecificSubcategory } from "@/interfaces/subcategories.interface";

export async function getSpecificSubcategorie(
  subcategoryId: string
): Promise<SpecificSubcategory> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/subcategories/${subcategoryId}`,
    {
      next: {
        revalidate: 10,
      },
    }
  );
  const data = await response.json();
  return data;
}
