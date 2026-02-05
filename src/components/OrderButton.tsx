import { ArrowDown, ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/Button";

export function OrderButton({
  order,
  defaultOrder,
  children,
  className,
  ...props
}: React.ComponentPropsWithoutRef<"button"> & {
  order?: string | null;
  defaultOrder?: "asc" | "desc";
}) {
  const activeOrder = order ?? defaultOrder;

  const isAsc = activeOrder === "asc";
  const isDesc = activeOrder === "desc";

  return (
    <Button
      className={cn(
        "group transiton-opacity ease col-span-2 w-fit -translate-x-4 gap-2 pr-2 font-medium duration-150 hover:text-foreground data-[state=active]:text-foreground",
        className,
      )}
      size="small"
      variant="ghost"
      data-state={activeOrder ? "active" : "inactive"}
      {...props}
    >
      {children}
      {!activeOrder && (
        <ArrowDown className="opacity-0 group-hover:opacity-100" />
      )}
      {isDesc && <ArrowDown className="size-4" />}
      {isAsc && <ArrowUp className="size-4" />}
    </Button>
  );
}
