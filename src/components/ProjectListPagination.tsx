import {
  Pagination,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "./ui/Pagination";

export function ProjectListPagination({ pageCount }: { pageCount: number }) {
  return (
    <Pagination>
      <PaginationPrevious href="#"></PaginationPrevious>
      <PaginationItem>
        <span>20 of 42</span>
      </PaginationItem>
      <PaginationNext href="#"></PaginationNext>
    </Pagination>
  );
}
