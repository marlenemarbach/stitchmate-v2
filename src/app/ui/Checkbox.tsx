import { cn } from "../lib/utils";

export function Checkbox({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"input">) {
  return (
    <input
      className={cn(
        "size-3.5 appearance-none rounded-sm border border-border accent-primary checked:appearance-auto transition-colors ease-out 200ms",
        className,
      )}
      type="checkbox"
      {...props}
    ></input>
  );
}
