import { cn } from "@/lib/utils";

export function Input({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"input">) {
  return (
    <input
      className={cn(
        "[&::-webkit-inner-spin-button]:-webkit-appearance-none [&::-webkit-outer-spin-button]:-webkit-appearance-none placeholder:text-foreground-muted h-9 w-full rounded-lg border border-border px-3 text-base transition-[color,box-shadow] outline-none [-moz-appearance:textfield] focus-visible:ring-[1.5px] focus-visible:ring-ring disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
        className,
      )}
      {...props}
    />
  );
}
