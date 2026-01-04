import { cn } from "@/lib/utils";

export function Checkbox({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"input">) {
  return (
    <input
      className={cn(
        "200ms size-4 appearance-none rounded-sm border border-border accent-primary transition-colors ease-out group-data-[state=inactive]:accent-slate-800 checked:appearance-auto",
        className,
      )}
      type="checkbox"
      {...props}
    ></input>
  );
}
