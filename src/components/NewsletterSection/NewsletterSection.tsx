"use client";
import React, { useState } from "react";
import { Mail, Leaf, Truck, Tag, MoveRight, Star } from "lucide-react";
import { SiAppstore, SiGoogleplay } from "react-icons/si";
import { motion } from "framer-motion";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Subscribing email:", email);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      <section className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden my-12">
        <div className="relative grid lg:grid-cols-5 gap-8 p-8 lg:p-14">
          {/* Left Side: Newsletter Info */}
          <div className="lg:col-span-3 space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/30">
                <Mail className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-emerald-600 uppercase tracking-wide">
                  Newsletter
                </h3>
                <p className="text-xs text-gray-500">50,000+ subscribers</p>
              </div>
            </div>

            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-snug">
                Get the Freshest Updates{" "}
                <span className="text-emerald-600">Delivered Free</span>
              </h2>
              <p className="text-gray-500 mt-3 text-lg">
                Weekly recipes, seasonal offers & exclusive member perks.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {[
                {
                  icon: <Leaf className="w-4 h-4 text-emerald-600" />,
                  text: "Fresh Picks Weekly",
                },
                {
                  icon: <Truck className="w-4 h-4 text-emerald-600" />,
                  text: "Free Delivery Codes",
                },
                {
                  icon: <Tag className="w-4 h-4 text-emerald-600" />,
                  text: "Members-Only Deals",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2.5 bg-emerald-50/50 backdrop-blur-sm border border-emerald-100 px-4 py-2.5 rounded-full shadow-sm text-sm font-medium text-gray-700"
                >
                  {item.icon}
                  {item.text}
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="pt-2">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <input
                    placeholder="you@example.com"
                    className="w-full pl-5 pr-5 py-4 bg-white border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all shadow-sm"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  className="group flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-semibold bg-emerald-600 text-white shadow-lg shadow-emerald-500/30 hover:bg-emerald-700 hover:scale-[1.02] transition-all"
                >
                  Subscribe
                  <MoveRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
              <p className="text-xs text-gray-400 mt-3 pl-1">
                ✨ Unsubscribe anytime. No spam, ever.
              </p>
            </form>
          </div>

          {/* Right Side: Mobile App Promo */}
          <div className="lg:col-span-2 lg:border-l lg:border-emerald-100 lg:pl-8">
            <div className="h-full flex flex-col justify-center">
              <div className="bg-gray-900 rounded-3xl p-8 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 rounded-full blur-2xl"></div>
                <div className="relative space-y-5">
                  <div className="inline-block bg-emerald-500/20 text-emerald-400 text-xs font-semibold px-3 py-1.5 rounded-full border border-emerald-500/30">
                    📱 MOBILE APP
                  </div>
                  <h3 className="text-2xl font-bold leading-tight">
                    Shop Faster on Our App
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Get app-exclusive deals & 15% off your first order.
                  </p>

                  <div className="flex flex-col gap-3 pt-2">
                    <AppStoreButton platform="apple" />
                    <AppStoreButton platform="google" />
                  </div>

                  <div className="flex items-center gap-2 pt-2 text-sm">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <span className="text-gray-400 text-xs">
                      4.9 • 100K+ downloads
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}

function AppStoreButton({ platform }: { platform: "apple" | "google" }) {
  const isApple = platform === "apple";
  return (
    <a
      href="#"
      className="flex items-center gap-3 bg-white/10 hover:bg-white/15 backdrop-blur-sm border border-white/10 px-4 py-3 rounded-xl transition-all hover:scale-[1.02]"
    >
      {isApple ? (
        <SiAppstore className="w-6 h-6" />
      ) : (
        <SiGoogleplay className="w-6 h-6" />
      )}
      <div className="text-left">
        <div className="text-[10px] text-gray-400 uppercase tracking-wide">
          {isApple ? "Download on" : "Get it on"}
        </div>
        <div className="text-sm font-semibold -mt-0.5">
          {isApple ? "App Store" : "Google Play"}
        </div>
      </div>
    </a>
  );
}
