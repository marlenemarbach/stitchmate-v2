import { cn } from "@/lib/utils";

export function Label({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<"label">) {
  return (
    <label className={cn("pl-1", className)} {...props}>
      {children}
    </label>
  );
}
