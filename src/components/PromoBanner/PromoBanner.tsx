'use client'
import Link from "next/link";
import { motion } from "framer-motion";

interface PromoBannerProps {
  title: string;
  subtitle: string;
  discount: string;
  code: string;
  link: string;
  badgeIcon: string;
  badgeText: string;
  bgColor: string;
  btnTextColor: string;
  initial: number
}

export default function PromoBanner({
  title,
  subtitle,
  discount,
  code,
  link,
  badgeIcon,
  badgeText,
  bgColor,
  btnTextColor,
  initial
}: PromoBannerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: initial }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      viewport={{ once: true }}
      className={`relative overflow-hidden rounded-2xl ${bgColor} p-8 text-white shadow-lg`}
    >
      {/* Decorative Circles */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>

      {/* Content */}
      <div className="relative z-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-sm mb-4 backdrop-blur-sm">
          <span>{badgeIcon}</span>
          <span>{badgeText}</span>
        </div>

        {/* Title */}
        <h3 className="text-2xl md:text-3xl font-bold mb-2">{title}</h3>

        {/* Subtitle */}
        <p className="text-white/80 mb-4 max-w-md">{subtitle}</p>

        {/* Discount + Code */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <div className="text-3xl font-bold">{discount}</div>
          <div className="text-sm text-white/70 bg-black/10 px-3 py-1 rounded-lg">
            Use code:{" "}
            <span className="font-bold text-white uppercase">{code}</span>
          </div>
        </div>

        {/* Button */}
        <Link
          href={link}
          className={`inline-flex items-center gap-2 bg-white ${btnTextColor} px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all active:scale-95`}
        >
          Explore Now
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </Link>
      </div>
    </motion.div>
  );
}
