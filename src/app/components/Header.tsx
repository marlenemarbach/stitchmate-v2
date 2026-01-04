import { cn } from "@/lib/utils";

export function Header({
  children,
  className,
}: React.ComponentPropsWithoutRef<"header">) {
  return (
    <header className={cn("flex items-center justify-between p-3", className)}>
      {children}
    </header>
  );
}
