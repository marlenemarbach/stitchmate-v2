"use client";

import { ArrowDown, ArrowUp } from "lucide-react";
import { cn } from "../../lib/utils";
import { Button } from "./Button";

export type Order = "asc" | "desc";

type OrderButtonProps = {
  order?: Order;
  onOrderChange?: (order: Order) => void;
  defaultOrder?: Order;
};

export function OrderButton({
  className,
  children,
  onClick,
  order,
  onOrderChange,
  defaultOrder,
  ...props
}: React.ComponentPropsWithoutRef<typeof Button> & OrderButtonProps) {
  const isAsc = order === "asc";
  const isDesc = order === "desc";

  function handleChange() {
    if (!order || order === "asc") onOrderChange?.("desc");
    else onOrderChange?.("asc");
  }

  return (
    <Button
      className={cn(
        "group w-fit gap-1 pr-2 font-medium text-muted-foreground transition-colors duration-150 ease-[ease] hover:text-foreground focus-visible:text-foreground",
        className,
      )}
      size="small"
      variant="ghost"
      {...props}
      onClick={(e) => {
        onClick?.(e);
        handleChange();
      }}
    >
      {children}
      {!order && (
        <DefaultArrow
          order={defaultOrder ?? "desc"}
          className="opacity-0 transition-opacity duration-150 ease-[ease] group-hover:opacity-100 group-focus-visible:opacity-100"
        />
      )}
      {isAsc && <ArrowDown data-testid="arrow-down" className="size-4" />}
      {isDesc && <ArrowUp data-testid="arrow-up" className="size-4" />}
    </Button>
  );
}

function DefaultArrow({
  order,
  className,
}: {
  order?: Order;
  className?: string;
}) {
  if (order === "asc")
    return <ArrowUp className={className} data-testid="default-up" />;
  return <ArrowDown className={className} data-testid="default-down" />;
}
