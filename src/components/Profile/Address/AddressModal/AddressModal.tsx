"use client";
import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import AddAddressBtn from "../AddAddressBtn/AddAddressBtn";
import { addUserAddress } from "@/services/profile/addUserAddress/addUserAddress";
import { toast } from "sonner";

interface AddressInput {
  name: string;
  details: string;
  phone: string;
  city: string;
}

interface AddressModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddressModal({ isOpen, onClose }: AddressModalProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      name: "",
      details: "",
      phone: "",
      city: "",
    },
  });

  async function handleAddAddress(values: AddressInput) {
    try {
      setIsLoading(true);
      const data = await addUserAddress(values);
      console.log(data);
      
      if (data.status == "success") {
        onClose();
        reset();
      }else{
        toast.error(data.message)
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-200"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg p-6 sm:p-8 animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Add Address</h2>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit(handleAddAddress)}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Address Name
            </label>
            <input
              {...register("name")}
              placeholder="e.g. Home, Office"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all text-sm"
              required
              type="text"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Address
            </label>
            <textarea
              {...register("details")}
              placeholder="Street, building, apartment..."
              rows={3}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all resize-none text-sm"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                {...register("phone")}
                placeholder="01xxxxxxxxx"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all text-sm"
                required
                type="tel"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                City
              </label>
              <input
                {...register("city")}
                placeholder="Cairo"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all text-sm"
                required
                type="text"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-6 rounded-xl bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 transition-colors cursor-pointer disabled:opacity-50"
            >
              Cancel
            </button>
            <AddAddressBtn isLoading={isLoading} />
          </div>
        </form>
      </div>
    </div>
  );
}
