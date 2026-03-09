import { ArrowDown, ArrowUp } from "lucide-react";
import { cn } from "../../lib/utils";
import { Button } from "./Button";

export function DataList({
  children,
  className,
}: React.PropsWithChildren & { className?: string }) {
  return (
    <div
      className={cn("flex w-screen flex-1 flex-col items-center", className)}
    >
      {children}
    </div>
  );
}

export function DataListHeader({
  children,
  className,
}: React.PropsWithChildren & { className?: string }) {
  return (
    <>
      <div
        className={cn(
          "grid w-full grid-cols-4 items-start gap-2 bg-background mask-b-from-80% mask-b-to-90% px-4 py-2 sm:grid-cols-6",
          className,
        )}
      >
        {children}
      </div>
    </>
  );
}

export type Order = "asc" | "desc";

type DataListColumnTitleProps = {
  isActive: boolean;
  order?: Order;
  onOrderChange?: (order: Order) => void;
};

export function DataListColumnTitle({
  className,
  children,
  isActive,
  order,
  onOrderChange,
  ...props
}: React.ComponentPropsWithoutRef<typeof Button> & DataListColumnTitleProps) {
  const isAsc = order === "asc";
  const isDesc = order === "desc";

  function handleChange() {
    if (!order || order === "asc") onOrderChange?.("desc");
    else onOrderChange?.("asc");
  }

  return (
    <Button
      className={cn(
        "group w-fit -translate-x-3 gap-1 pr-2 font-medium text-muted-foreground transition-colors duration-150 ease-[ease] hover:text-foreground",
        className,
      )}
      size="small"
      variant="ghost"
      data-state={isActive ? "active" : "inactive"}
      {...props}
      onClick={handleChange}
    >
      {children}
      {!order && (
        <ArrowDown className="opacity-0 transition-opacity duration-150 ease-[ease] group-hover:opacity-100" />
      )}
      {isDesc && <ArrowDown className="size-4" />}
      {isAsc && <ArrowUp className="size-4" />}
    </Button>
  );
}

export function DataListContent({
  children,
  className,
}: React.PropsWithChildren & { className?: string }) {
  return (
    <div className={cn("grid w-full max-w-3xl sm:gap-1", className)}>
      {children}
    </div>
  );
}

export function DataListItem({
  children,
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cn(
        "grid min-h-11 grid-cols-6 items-center gap-2 border-b border-border/50 px-4 py-3 focus-within:bg-foreground/3 hover:bg-foreground/3 sm:rounded-full sm:border-none sm:py-2",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
