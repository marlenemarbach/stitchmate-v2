import { ArrowDown, ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./Button";

export function OrderButton({
  order,
  onOrderChange,
  children,
  className,
  ...props
}: React.ComponentPropsWithoutRef<"button"> & {
  order?: string | null;
  onOrderChange?: (order: "asc" | "desc") => void;
}) {
  const isAsc = order === "asc";
  const isDesc = order === "desc";

  function handleChange() {
    if (!order || order === "asc") onOrderChange?.("desc");
    else onOrderChange?.("asc");
  }

  return (
    <Button
      className={cn(
        "group w-fit -translate-x-3 gap-1 pr-2 font-medium transition-colors duration-150 ease-[ease] hover:text-foreground data-[state=active]:text-foreground",
        className,
      )}
      size="small"
      variant="ghost"
      data-state={order ? "active" : "inactive"}
      onClick={() => handleChange()}
      {...props}
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
