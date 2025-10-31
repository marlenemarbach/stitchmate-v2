import { cn } from "@/app/lib/utils";

export function Toolbar({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      role="toolbar"
      className={cn(
        " flex items-center gap-2 w-fit h-12 px-1 rounded-lg elevation-level-1 bg-midnight-700 ",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
