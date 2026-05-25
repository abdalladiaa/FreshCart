import PageDescription from "@/components/PageDescription/PageDescription";
import SubCategoriesComp from "@/components/SubCategoriesComp/SubCategoriesComp";
import { getSpecificCategory } from "@/services/categories/getSpecificCaregory/getSpecificCaregory";
import Image from "next/image";
import React from "react";

export default async function Category({ params }: { params: { id: string } }) {
    const { id } = await params;
  const { data: category } = await getSpecificCategory(id);
  
  const categoryImage = (
    <div className="relative w-full h-full rounded-2xl overflow-hidden">
      <Image 
        src={category.image} 
        alt={category.name} 
        fill 
        className="object-cover"
        sizes="64px"
      />
    </div>
  );
    
  return (
    <>
      <PageDescription
        icon={categoryImage}
        page={category.name}
        description={"Choose a subcategory to browse products"}
      />
      <SubCategoriesComp categorieId = {id}/>
    </>
  );
}
