import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { LinkButton } from "./Button";

export function Pagination({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<"nav">) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      className={cn(
        "fixed bottom-0 mx-auto flex w-full justify-center border-t border-border bg-background py-3",
        className,
      )}
      {...props}
    >
      <PaginationContent>{children}</PaginationContent>
    </nav>
  );
}

export function PaginationContent({
  className,
  ...props
}: React.ComponentProps<"ul">) {
  return (
    <ul
      className={cn(
        "flex w-full items-center justify-center gap-4 px-3",
        className,
      )}
      {...props}
    />
  );
}

export function PaginationItem({ ...props }: React.ComponentProps<"li">) {
  return <li className="text-sm leading-none font-medium" {...props} />;
}

type PaginationLinkProps = {
  isActive?: boolean;
} & React.ComponentPropsWithoutRef<typeof Link>;

function PaginationLink({
  className,
  isActive,
  ...props
}: PaginationLinkProps) {
  return (
    <LinkButton
      variant="secondary"
      size="small"
      className={cn(
        "px-1 py-0 [&_svg:not([class*='size-'])]:size-5",
        className,
      )}
      aria-current={isActive ? "page" : undefined}
      data-active={isActive}
      {...props}
    />
  );
}

export function PaginationPrevious({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationItem>
      <PaginationLink
        aria-label="Go to previous page"
        className={cn("pr-3", className)}
        {...props}
      >
        <ChevronLeftIcon />
        Prev
      </PaginationLink>
    </PaginationItem>
  );
}

export function PaginationNext({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationItem>
      <PaginationLink
        aria-label="Go to next page"
        className={cn("pl-3", className)}
        {...props}
      >
        Next
        <ChevronRightIcon />
      </PaginationLink>
    </PaginationItem>
  );
}
