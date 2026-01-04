import { cn } from "@/lib/utils";

export function ToggleGroup({
  children,
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      role="group"
      className={cn(
        "flex items-center justify-center gap-1 rounded-full p-1",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function ToggleGroupItem({
  children,
  className,
  ...props
}: React.ComponentPropsWithoutRef<"button">) {
  return (
    <button
      type="button"
      className={cn(
        "flex size-7 cursor-pointer items-center justify-center rounded-full text-muted-foreground hover:text-foreground disabled:opacity-50 aria-pressed:bg-foreground/5 aria-pressed:text-foreground [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
