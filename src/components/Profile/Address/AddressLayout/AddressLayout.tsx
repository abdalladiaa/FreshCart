"use client";
import React, { useState } from "react";
import { Plus } from "lucide-react";
import AddressCard from "../AddressCard/AddressCard";
import AddressModal from "../AddressModal/AddressModal";
import NoAddresses from "../NoAddresses/NoAddresses";

interface Address {
  _id: string;
  name: string;
  details: string;
  phone: string;
  city: string;
}

interface AddressLayoutProps {
  addresses: Address[];
}

export default function AddressLayout({ addresses }: AddressLayoutProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className="flex-1 min-w-0">
      <div>
        {/* Header Section */}
        <div className="flex items-center justify-between mb-6 gap-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900">My Addresses</h2>
            <p className="text-gray-500 text-sm mt-1">
              Manage your saved delivery addresses
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors shadow-lg shadow-primary-600/25 cursor-pointer shrink-0"
          >
            <Plus size={16} />
            <span>Add Address</span>
          </button>
        </div>

        {/* Dynamic Content View */}
        {addresses.length === 0 ? (
          <NoAddresses openModal={() => setIsModalOpen(true)} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {addresses.map((address) => (
              <AddressCard key={address._id} address={address} />
            ))}
          </div>
        )}
      </div>

      {/* Control Modal */}
      <AddressModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </main>
  );
}
