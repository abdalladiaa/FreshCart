import SearchComp from "@/components/Search/SearchComp/SearchComp";
import { getAllBrands } from "@/services/brands/getAllBrands";
import { getAllCategories } from "@/services/categories/getAllCategories/getAllCategories";

export default async function SearchPage() {
  const [allCategories, allBrands] = await Promise.all([
    getAllCategories(),
    getAllBrands(),
  ]);

  return (
    <SearchComp
      allCategories={allCategories?.data}
      allBrands={allBrands?.data}
    />
  );
}
