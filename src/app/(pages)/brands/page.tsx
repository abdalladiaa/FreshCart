import BrandCard from '@/components/BrandsComps/BrandCard/BrandCard'
import PageDescription from '@/components/PageDescription/PageDescription'
import { getAllBrands } from '@/services/brands/getAllBrands'
import React from 'react'
import { FaTags } from 'react-icons/fa'

export default async function Brands() {
  const allBrands = await getAllBrands()
  return <>
    <PageDescription
      icon={<FaTags />}
      page={"Top Brands"}
      description={"Shop from your favorite brands"}
      color='from-violet-600 via-violet-500 to-purple-400'
    />
    <div className='container mx-auto px-4 py-10'>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-5'>
        {allBrands.data.map((brand: any) => <BrandCard brand={brand} key={brand._id} />)}
      </div>
    </div>
  </>
}
