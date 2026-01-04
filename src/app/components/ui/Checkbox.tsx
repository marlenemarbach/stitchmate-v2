import { cn } from "../lib/utils";

export function Checkbox({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"input">) {
  return (
    <input
      className={cn(
        "size-4 appearance-none rounded-sm border border-border accent-primary checked:appearance-auto transition-colors ease-out 200ms group-data-[state=inactive]:accent-slate-800",
        className,
      )}
      type="checkbox"
      {...props}
    ></input>
  );
}
