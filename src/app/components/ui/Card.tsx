import { cn } from "@/lib/utils";

export function Card({
  children,
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cn(
        "flex w-full max-w-md flex-col items-center gap-4 rounded-xl border-border bg-card/50 p-6 dark:border",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
