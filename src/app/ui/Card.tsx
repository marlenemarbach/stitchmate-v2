import { cn } from "@/app/lib/utils";

export function Card({
  children,
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cn(
        "grid gap-6 p-6 rounded-lg bg-midnight-800 elevation-level-1 max-w-md w-full",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
