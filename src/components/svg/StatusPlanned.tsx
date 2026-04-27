import { cn } from "@/lib/utils";

export function StatusPlanned({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg
      className={cn("size-4 text-planned", className)}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Planned"
      {...props}
    >
      <circle
        cx="10.0002"
        cy="9.99995"
        r="7.3"
        stroke="currentColor"
        strokeWidth="2.3"
        strokeLinecap="round"
        strokeDasharray="2 4"
      />
    </svg>
  );
}
