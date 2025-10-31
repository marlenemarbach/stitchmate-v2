import { cn } from "../lib/utils";

export function RadioGroup({
  children,
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      role="radiogroup"
      className={cn(
        "flex justify-center items-center gap-1 rounded-sm",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
