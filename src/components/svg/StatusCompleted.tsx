import { cn } from "@/lib/utils";

export function StatusCompleted({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg
      className={cn("size-4 text-completed", className)}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Completed"
      {...props}
    >
      <circle cx="10" cy="10" r="8.5" fill="currentColor" />
    </svg>
  );
}
