import { cn } from "../lib/utils";

export function ToggleGroup({
  children,
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      role="group"
      className={cn(
        "flex items-center justify-center gap-1 rounded-sm",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

type ToggleButtonProps = {
  isActive: boolean;
};

export function ToggleGroupButton({
  children,
  isActive,
  className,
  ...props
}: React.ComponentPropsWithoutRef<"button"> & ToggleButtonProps) {
  return (
    <button
      aria-pressed={isActive}
      data-state={isActive ? "on" : "off"}
      className={cn(
        "flex items-center justify-center rounded-md text-sm hover:bg-foreground/10 focus-visible:ring",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
