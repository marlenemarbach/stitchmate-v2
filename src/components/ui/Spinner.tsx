import { Loader } from "lucide-react";
import { cn } from "@/lib/utils";

export function Spinner({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <Loader
      className={cn("animate-spin text-muted-foreground", className)}
      {...props}
    />
  );
}
