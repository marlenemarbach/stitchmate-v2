import { cn } from "../lib/utils";

export function ToggleGroup({
  children,
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      role="group"
      className={cn("flex items-center justify-center gap-2", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function ToggleGroupItem({
  children,
  isActive,
  className,
  ...props
}: React.ComponentPropsWithoutRef<"button"> & { isActive: boolean }) {
  return (
    <button
      aria-pressed={isActive}
      data-state={isActive ? "on" : "off"}
      type="button"
      className={cn(
        "h-9 dark:border border-border flex items-center justify-center rounded-md px-2 py-1 text-sm hover:bg-foreground/20 focus-visible:ring data-[state=on]:bg-primary",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
