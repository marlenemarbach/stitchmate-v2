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
  mode?: "radio" | "toggle";
};

export function ToggleGroupItem({
  children,
  isActive,
  className,
  mode = "toggle",
  ...props
}: React.ComponentPropsWithoutRef<"button"> & ToggleButtonProps) {
  if (mode === "toggle") {
    return (
      <ToggleGroupButton
        isActive={isActive}
        className={className}
        aria-pressed={isActive}
        {...props}
      >
        {children}
      </ToggleGroupButton>
    );
  }
  return (
    <ToggleGroupButton
      isActive={isActive}
      className={className}
      aria-checked={isActive}
      role="radio"
      {...props}
    >
      {children}
    </ToggleGroupButton>
  );
}

function ToggleGroupButton({
  isActive,
  children,
  className,
  ...props
}: React.ComponentPropsWithoutRef<"button"> & {
  isActive: boolean;
}) {
  return (
    <button
      data-state={isActive ? "on" : "off"}
      className={cn(
        "flex items-center justify-center rounded-md px-2 py-1 text-sm hover:bg-accent focus-visible:ring data-[state=on]:bg-primary",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
