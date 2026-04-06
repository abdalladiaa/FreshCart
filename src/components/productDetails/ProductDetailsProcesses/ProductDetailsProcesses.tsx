'use client'
import React, { useState } from 'react'
import QuantityCounter from '../QuantityCounter/QuantityCounter'
import { AllProducts, Product } from '@/interfaces/products.interface'
import { ProductDetails } from '@/interfaces/productDetails.interface'
import { FaBolt, FaRegHeart, FaShoppingCart } from 'react-icons/fa'
import AddToCartBtn from '@/components/AddToCartBtn/AddToCartBtn'

export default function ProductDetailsProcesses({product}:{product:ProductDetails}) {
      const [inputValue , setInputValue] = useState<number>(1)
      console.log(inputValue);
      
  return <>
  <QuantityCounter inputValue={inputValue} setInputValue={setInputValue} product={product} />

                <div className="flex flex-col sm:flex-row gap-4 mb-4">
                  <AddToCartBtn quantity={inputValue} id={product.data._id} className=" cursor-pointer flex-[3] bg-primary-600 text-white py-4 rounded-xl font-bold hover:bg-primary-700 active:scale-95 transition-all flex items-center justify-center gap-3 shadow-lg shadow-primary-600/20">
                    <FaShoppingCart />
                    <span className="text-sm font-bold uppercase tracking-wide">
                      Add to Cart
                    </span>
                  </AddToCartBtn>
  
                  <button className=" cursor-pointer flex-[2] bg-gray-900 text-white py-4 rounded-xl font-bold hover:bg-black active:scale-95 transition-all flex items-center justify-center gap-3">
                    <FaBolt />
                    Buy Now
                  </button>
                </div>
  
                <div className="mb-8">
                  <button className=" cursor-pointer w-full border-2 border-gray-100 text-gray-700 py-4 rounded-xl font-bold hover:border-primary-200 hover:text-primary-600 hover:bg-primary-50 transition-all flex items-center justify-center gap-2">
                    <FaRegHeart />
                    Add to Wishlist
                  </button>
                </div>
  </>
}
