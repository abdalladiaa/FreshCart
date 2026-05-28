"use client";

import ReactPaginate from "react-paginate";
import { useRouter, useSearchParams } from "next/navigation";

interface PaginationProps {
  pageCount: number;
  currentPage: number;
}

export default function Pagination({
  pageCount,
  currentPage,
}: PaginationProps) {
  const router = useRouter();

  const searchParams = useSearchParams();

  const handlePageClick = (event: { selected: number }) => {
    const params = new URLSearchParams(searchParams);

    params.set("page", (event.selected + 1).toString());

    router.push(`/products?${params.toString()}`);
  };

  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel="التالي >"
      previousLabel="< السابق"
      onPageChange={handlePageClick}
      pageRangeDisplayed={3}
      pageCount={pageCount}
      forcePage={currentPage - 1}
      containerClassName="flex gap-2"
      pageClassName="border px-3 py-1 rounded"
      activeClassName="bg-black text-white"
    />
  );
}