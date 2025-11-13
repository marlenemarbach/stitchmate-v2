import { cn } from "../lib/utils";

export function Header({
  children,
  className,
}: React.ComponentPropsWithoutRef<"header">) {
  return (
    <header
      className={cn("grid h-14 grid-cols-3 items-center px-6", className)}
    >
      {children}
    </header>
  );
}
