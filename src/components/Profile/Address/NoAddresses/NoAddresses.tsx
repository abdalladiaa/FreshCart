"use client";
import React from "react";
import { MapPin, Plus } from "lucide-react";

interface NoAddressesProps {
  openModal: () => void;
}

export default function NoAddresses({ openModal }: NoAddressesProps) {
  return (
    <div className="w-full  rounded-3xl border  p-8 md:p-16 text-center ">
      <div className="w-20 h-20 rounded-full  flex items-center justify-center mx-auto mb-5 border ">
        <MapPin size={32} className="text-gray-400" />
      </div>

      <h3 className="text-xl font-bold text-gray-900 mb-2">No Addresses Yet</h3>

      <p className="text-gray-500 text-sm mb-6 max-w-sm mx-auto leading-relaxed">
        Add your first delivery address to make checkout faster and easier.
      </p>

      <button
        onClick={openModal}
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors shadow-lg shadow-primary-600/25 cursor-pointer"
      >
        <Plus size={18} />
        <span>Add Your First Address</span>
      </button>
    </div>
  );
}
