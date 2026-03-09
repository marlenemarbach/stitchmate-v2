import Link from "next/link";
import { cn } from "@/lib/utils";
import { SignOutButton } from "./SignOutButton";
import { SignUpButton } from "./SignUpButton";
import { Logo } from "./svg/Logo";

export function Header({
  isGuest,
  className,
}: {
  className?: string;
  isGuest: boolean;
}) {
  return (
    <header
      className={cn(
        "flex items-center justify-between bg-background px-4 py-3",
        className,
      )}
    >
      <Link href="/projects" className="cursor-default">
        <Logo className="h-[1.125rem]" />
      </Link>
      <div className="flex items-center gap-4">
        {isGuest ? <SignUpButton /> : <SignOutButton />}
      </div>
    </header>
  );
}
