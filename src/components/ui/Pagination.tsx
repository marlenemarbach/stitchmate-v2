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
        "mx-auto mt-auto flex w-full justify-center py-3 sm:fixed sm:bottom-0 sm:border-t sm:border-border sm:bg-background",
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
  disabled?: boolean;
} & React.ComponentPropsWithoutRef<typeof LinkButton>;

function PaginationLink({
  className,
  disabled,
  ...props
}: PaginationLinkProps) {
  return (
    <LinkButton
      variant="secondary"
      size="small"
      aria-disabled={disabled ? "true" : undefined}
      className={cn(
        "cursor-default px-1 py-0 aria-disabled:pointer-events-none aria-disabled:text-muted-foreground [&_svg:not([class*='size-'])]:size-5",
        className,
      )}
      {...props}
    />
  );
}

export function PaginationPrevious({
  className,
  ...props
}: PaginationLinkProps) {
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
