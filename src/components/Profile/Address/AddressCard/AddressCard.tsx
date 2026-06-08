"use client";
import React, { useState } from "react";
import { MapPin, Phone, Building2, Pencil, Trash2 } from "lucide-react";
import { deleteUserAddress } from "@/services/profile/deleteUserAddress/deleteUserAddress";
import { ImSpinner2 } from "react-icons/im";

interface Address {
  _id: string;
  name: string;
  details: string;
  phone: string;
  city: string;
}

interface AddressCardProps {
  address: Address;
}

export default function AddressCard({
  address,
}: AddressCardProps) {

  const [isLoading , setIsLoading] = useState<boolean>(false)

  async function handleDeleteAddress(){
    try{
      setIsLoading(true)
      const data = await deleteUserAddress(address._id)
    }catch(err){
      console.log(err);
      
    }finally{
      setIsLoading(false)
    }
  }


  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md hover:border-primary-100 transition-all duration-200 group">
      <div className="flex items-start justify-between gap-4">
        {/* Address Main Info */}
        <div className="flex items-start gap-4 flex-1">
          <div className="w-11 h-11 rounded-xl bg-primary-50 flex items-center justify-center shrink-0 group-hover:bg-primary-100 transition-colors text-primary-600">
            <MapPin size={20} />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-gray-900 mb-1 capitalize">
              {address.name}
            </h3>
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
              {address.details}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1.5">
                <Phone size={14} className="text-gray-400" />
                {address.phone}
              </span>
              <span className="flex items-center gap-1.5 capitalize">
                <Building2 size={14} className="text-gray-400" />
                {address.city}
              </span>
            </div>
          </div>
        </div>

        {/* Actions Button Group */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleDeleteAddress}
            className="w-9 h-9 rounded-lg bg-gray-100 text-gray-600 hover:bg-red-100 hover:text-red-600 flex items-center justify-center transition-colors disabled:opacity-50 cursor-pointer"
            title="Delete address"
          >
            {isLoading ? <ImSpinner2 size={16} className="animate-spin" /> : <Trash2 size={16} /> }
          </button>
        </div>
      </div>
    </div>
  );
}
