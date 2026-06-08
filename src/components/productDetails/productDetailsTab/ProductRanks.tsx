import React from "react";
import { FaStar, FaRegStar } from "react-icons/fa";
import { Data } from "@/interfaces/productDetails.interface";

interface ProductRanksProps {
  product: Data;
}

export default function ProductRanks({ product }: ProductRanksProps) {

  const ratingsAverage = product?.ratingsAverage ?? 0;
  const ratingsQuantity = product?.ratingsQuantity ?? 0;

 
  const breakdown = [
    { label: "5 star", width: "25%" },
    { label: "4 star", width: "60%" },
    { label: "3 star", width: "25%" },
    { label: "2 star", width: "5%" },
    { label: "1 star", width: "5%" },
  ];

  return (
    <div className="flex flex-col md:flex-row gap-8 items-start md:items-center bg-white p-4">

      <div className="text-center shrink-0 min-w-[120px]">
        <div className="text-5xl font-black text-gray-900 mb-2">
          {ratingsAverage.toFixed(1)}
        </div>


        <div className="flex justify-center text-yellow-400 text-lg gap-0.5">
          {[1, 2, 3, 4, 5].map((star) => (
            <span key={star}>
              {ratingsAverage >= star ? (
                <FaStar />
              ) : (
                <FaRegStar className="text-gray-300" />
              )}
            </span>
          ))}
        </div>

        <p className="text-xs text-gray-500 mt-2 font-medium">
          Based on {ratingsQuantity} reviews
        </p>
      </div>


      <div className="flex-1 w-full space-y-2">
        {breakdown.map((row) => (
          <div key={row.label} className="flex items-center gap-3">
            <span className="text-sm text-gray-600 font-medium w-10 whitespace-nowrap">
              {row.label}
            </span>
            <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-yellow-400 rounded-full transition-all duration-500 ease-out"
                style={{ width: row.width }}
              />
            </div>
            <span className="text-sm text-gray-400 font-medium w-10 text-right">
              {row.width}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
