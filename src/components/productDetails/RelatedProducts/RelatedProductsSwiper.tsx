"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import ProductCard from "@/components/productCard/ProductCard";
import SectionHeader from "./SectionHeader/SectionHeader";
import { Product } from "@/interfaces/products.interface";

export default function RelatedProductsSwiper({
  products,
  currentProductId,
}: {
  products: Product[];
  currentProductId: string;
}) {
  return (
    <Swiper
      modules={[Navigation, Autoplay]}
      slidesPerView={1}
      className="pb-4"
      navigation={{
        prevEl: ".swiper-prev-btn",
        nextEl: ".swiper-next-btn",
      }}
      autoplay={{
        delay: 4000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
      breakpoints={{
        640: {
          slidesPerView: 2,
          spaceBetween: 16,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 4,
          spaceBetween: 24,
        },
      }}
    >
      {products
        .filter((product) => product._id !== currentProductId)
        .map((product) => (
          <SwiperSlide key={product._id} className="h-auto">
            <div className="p-1 h-full">
              <ProductCard product={product} />
            </div>
          </SwiperSlide>
        ))}
    </Swiper>
  );
}
