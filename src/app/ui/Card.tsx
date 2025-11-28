import { cn } from "@/app/lib/utils";

export function Card({
  children,
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cn(
        "flex flex-col gap-6 px-6 pt-6 pb-8 rounded-xl bg-card max-w-md w-full dark:border border-border",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
