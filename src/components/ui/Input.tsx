import { cn } from "@/lib/utils";

export function Input({
  className,
  ...props
}: React.ComponentPropsWithRef<"input">) {
  return (
    <input
      className={cn(
        "h-11 w-full rounded-lg border border-border px-3 text-base drop-shadow-xs transition-[color,box-shadow] outline-none [-moz-appearance:textfield] placeholder:text-muted-foreground focus-visible:ring-[1.5px] focus-visible:ring-ring disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 dark:data-[com-onepassword-filled=light]:text-neutral-950",
        className,
      )}
      {...props}
    />
  );
}
