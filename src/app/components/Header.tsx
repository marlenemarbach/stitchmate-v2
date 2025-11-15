import { cn } from "../lib/utils";

export function Header({
  children,
  className,
}: React.ComponentPropsWithoutRef<"header">) {
  return (
    <header
      className={cn("flex items-center justify-between px-6 py-4", className)}
    >
      {children}
    </header>
  );
}
