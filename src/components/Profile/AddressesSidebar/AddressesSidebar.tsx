"use client"
import { ChevronRight, MapPin, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function AddressesSidebar() {
  const pathname = usePathname();

  const menuItems = [
    {
      name: "My Addresses",
      href: "/profile/addresses",
      icon: <MapPin size={18} />,
    },
    {
      name: "Settings",
      href: "/profile/settings",
      icon: <Settings size={18} />,
    },
  ];

  return (
    <aside className="w-full lg:w-72 shrink-0">
      <nav className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <h2 className="font-bold text-gray-900">My Account</h2>
        </div>
        <ul className="p-2 space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                    isActive
                      ? "bg-primary-50 text-primary-700"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
                      isActive
                        ? "bg-primary-500 text-white"
                        : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"
                    }`}
                  >
                    {item.icon}
                  </div>
                  <span className="font-medium flex-1">{item.name}</span>
                  <ChevronRight
                    size={14}
                    className={`transition-transform ${
                      isActive
                        ? "text-primary-500"
                        : "text-gray-400 group-hover:translate-x-0.5"
                    }`}
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
