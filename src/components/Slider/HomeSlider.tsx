"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import Link from "next/link";
import Image from "next/image";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import sliderImage from "../../../public/assets/home-slider-1.d79601a8.png";


const slidesData = [
  {
    title: "Fresh Products Delivered to your Door",
    description: "Get 20% off your first order",
    btn1Text: "Shop Now",
    btn1Link: "/products",
    btn1Color: "text-green-500",
    btn2Text: "View Deals",
    btn2Link: "/deals",
  },
  {
    title: "Fast & Free Delivery",
    description: "Same day delivery available",
    btn1Text: "Order Now",
    btn1Link: "/products",
    btn1Color: "text-purple-500",
    btn2Text: "Delivery Info",
    btn2Link: "/delivery",
  },
  {
    title: "Premium Quality Guaranteed",
    description: "Fresh from farm to your table",
    btn1Text: "Shop Now",
    btn1Link: "/products",
    btn1Color: "text-blue-500",
    btn2Text: "Learn More",
    btn2Link: "/about",
  },
];

export default function Homeslider() {
  return (
    <div className="relative group w-full h-[400px] md:h-[500px]  overflow-hidden shadow-xl">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        className="w-full h-full [&_.swiper-pagination-bullet]:bg-white [&_.swiper-pagination-bullet-active]:w-10 [&_.swiper-pagination-bullet-active]:rounded-full [&_.swiper-pagination-bullet-active]:transition-all [&_.swiper-pagination-bullet-active]:bg-white"
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        pagination={{
          clickable: true,
          renderBullet: function (index, className) {
            return `<span class="${className}"></span>`;
          },
          bulletActiveClass: "!bg-white !opacity-100 text-white shadow-lg",
          bulletClass:
            "swiper-pagination-bullet !w-4 !h-4 !inline-flex items-center justify-center border transition-all duration-300",
        }}
        navigation={{
          prevEl: ".custom-prev",
          nextEl: ".custom-next",
        }}
      >
        {slidesData.map((slide, index) => (
          <SwiperSlide key={index} className="relative w-full h-full">
            {/* الصورة الخلفية */}
            <Image
              src={sliderImage}
              alt={slide.title}
              fill
              priority={index === 0}
              className="object-cover"
            />

            {/* الـ Overlay والنصوص */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary-600/80  to-primary-600/25 flex items-center px-6 md:px-20 z-10">
              <div className="container h-full flex flex-col justify-center">
                <h2 className="text-white text-4xl md:text-5xl font-bold mb-4 max-w-lg leading-tight">
                  {slide.title}
                </h2>
                <p className="text-white text-lg md:text-xl opacity-90 mb-6">
                  {slide.description}
                </p>
                <div className="flex items-center gap-3">
                  <Link
                    href={slide.btn1Link}
                    className={`bg-white border-2 border-white/50 ${slide.btn1Color} px-8 py-3 rounded-xl font-bold hover:scale-105 transition-transform shadow-lg`}
                  >
                    {slide.btn1Text}
                  </Link>
                  <Link
                    href={slide.btn2Link}
                    className="bg-transparent border-2 border-white/50 text-white px-8 py-3 rounded-xl font-bold hover:bg-white/10 hover:scale-105 transition-all"
                  >
                    {slide.btn2Text}
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* أزرار التنقل (Custom Arrows) */}
      <div className="custom-prev absolute left-6 top-1/2 -translate-y-1/2 z-20 cursor-pointer bg-white/20 hover:bg-white text-white hover:text-green-600 rounded-full w-12 h-12 hidden md:flex items-center justify-center backdrop-blur-sm border border-white/30 transition-all duration-300 hover:scale-110 opacity-0 group-hover:opacity-100 -translate-x-5 group-hover:translate-x-0">
        <FaChevronLeft className="text-lg" />
      </div>

      <div className="custom-next absolute right-6 top-1/2 -translate-y-1/2 z-20 cursor-pointer bg-white/20 hover:bg-white text-white hover:text-green-600 rounded-full w-12 h-12 hidden md:flex items-center justify-center backdrop-blur-sm border border-white/30 transition-all duration-300 hover:scale-110 opacity-0 group-hover:opacity-100 translate-x-5 group-hover:translate-x-0">
        <FaChevronRight className="text-lg" />
      </div>
    </div>
  );
}
