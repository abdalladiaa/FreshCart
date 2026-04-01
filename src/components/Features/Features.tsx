import React from "react";
import {
  FaTruck,
  FaArrowRotateLeft,
  FaShieldHalved,
  FaHeadset,
} from "react-icons/fa6";

const features = [
  {
    icon: <FaTruck />,
    title: "Free Shipping",
    desc: "On orders over 500 EGP",
  },
  {
    icon: <FaArrowRotateLeft />,
    title: "Easy Returns",
    desc: "14-day return policy",
  },
  {
    icon: <FaShieldHalved />,
    title: "Secure Payment",
    desc: "100% secure checkout",
  },
  {
    icon: <FaHeadset />,
    title: "24/7 Support",
    desc: "Contact us anytime",
  },
];

export default function Features() {
  return (
    <section className="bg-emerald-50/50 border-y border-emerald-100">
      <div className="container mx-auto px-4 py-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group flex items-center gap-4 p-2 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-2xl bg-white shadow-sm border border-emerald-100 flex items-center justify-center shrink-0 text-emerald-600 text-xl group-hover:bg-emerald-600 group-hover:text-white group-hover:scale-110 transition-all duration-300">
                {feature.icon}
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-sm mb-0.5 tracking-tight">
                  {feature.title}
                </h4>
                <p className="text-gray-500 text-xs font-medium">
                  {feature.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
