"use client";

import { usePathname, useSearchParams } from "next/navigation";
import {
  Pagination,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "./ui/Pagination";

export function ProjectListPagination({
  pageCount,
  currentPage,
}: {
  pageCount: number;
  currentPage: number;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function createPageURL(pageNumber: string | number) {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  }

  return (
    <Pagination>
      <PaginationPrevious
        href={createPageURL(currentPage - 1)}
        disabled={currentPage <= 1}
      ></PaginationPrevious>
      <PaginationItem>
        <span>{`${currentPage} of ${pageCount}`}</span>
      </PaginationItem>
      <PaginationNext
        disabled={currentPage >= pageCount}
        href={createPageURL(currentPage + 1)}
      ></PaginationNext>
    </Pagination>
  );
}
