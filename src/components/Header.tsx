import { cn } from "@/lib/utils";
import { SignOutButton } from "./SignOutButton";
import { SignUpButton } from "./SignUpButton";

export function Header({
  isGuest,
  children,
  className,
}: React.ComponentPropsWithoutRef<"header"> & { isGuest: boolean }) {
  return (
    <header
      className={cn("flex h-14 items-center justify-between px-4", className)}
    >
      {children}
      <div className="flex items-center gap-4">
        {isGuest ? <SignUpButton /> : <SignOutButton />}
      </div>
    </header>
  );
}
