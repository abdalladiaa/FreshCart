"use client";

import { FaFilter } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

interface ActiveFiltersProps {
  selectedBrands: string[];
  selectedCategories: string[];
  minPrice: string | null;
  maxPrice: string | null;
  allBrands: any[];
  allCategories: any[];
}

export default function ActiveFilters({
  selectedBrands,
  selectedCategories,
  minPrice,
  maxPrice,
  allBrands,
  allCategories,
}: ActiveFiltersProps) {
  return null;
}