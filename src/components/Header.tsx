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
        "flex h-14 items-center justify-between px-4 opacity-95",
        className,
      )}
    >
      <Link href="/projects" className="cursor-default">
        <Logo className="h-5" />
      </Link>
      <div className="flex items-center gap-4">
        {isGuest ? <SignUpButton /> : <SignOutButton />}
      </div>
    </header>
  );
}
