import { cn } from "@/lib/utils";

export function Label({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<"label">) {
  return (
    <label className={cn("text-sm", className)} {...props}>
      {children}
    </label>
  );
}
