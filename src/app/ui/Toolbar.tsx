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
        "flex w-fit items-center gap-2 rounded-xl border border-border bg-card px-2 py-1 text-card-foreground",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
