import React from "react";
import BackToCategoriesBtn from "./BackToCategoriesBtn/BackToCategoriesBtn";
import { getAllSubcategories } from "@/services/categories/getAllSubcategories/getAllSubcategories";
import SubcategorieCard from "./SubcategorieCard";
import NoSubcategoriesFound from "./NoSubcategoriesFound";

interface SubCategoriesCompProps {
  categorieId: string;
}

export default async function SubCategoriesComp({
  categorieId,
}: SubCategoriesCompProps) {
  const allSubcategories = await getAllSubcategories(categorieId);
  console.log(allSubcategories);
  console.log(categorieId);
  

  return (
    <div className="container mx-auto px-4 py-10">
      <BackToCategoriesBtn />
      {allSubcategories?.data && allSubcategories.data.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {allSubcategories.data.map((sub) => (
            <SubcategorieCard key={sub._id} subcategory={sub} />
          ))}
        </div>
      ) : (
        <NoSubcategoriesFound categorieId = {categorieId} />
      )}
    </div>
  );
}
