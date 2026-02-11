import { cn } from "@/lib/utils";

export function Header({
  children,
  className,
}: React.ComponentPropsWithoutRef<"header">) {
  return (
    <header
      className={cn("flex h-14 items-center justify-between px-4", className)}
    >
      {children}
    </header>
  );
}
