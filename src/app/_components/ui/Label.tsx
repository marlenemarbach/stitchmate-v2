import { cn } from "../../_lib/utils";

export function Label({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<"label">) {
  return (
    <label className={cn("", className)} {...props}>
      {children}
    </label>
  );
}
