import { cn } from "@/app/_lib/utils";

export function Toolbar({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      role="toolbar"
      className={cn(
        " flex bg-midnight-700 p-2 rounded-lg elevation-level-1 gap-2 w-fit h-14",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
