"use client";

import { useTransition } from "react";
import { LogOut } from "lucide-react";
import { signOut } from "../actions/auth";
import { Button } from "./ui/Button";

export function SignOutButton({
  className,
  disabled,
}: {
  className?: string;
  disabled?: boolean;
}) {
  const [isPending, startTransition] = useTransition();

  const handleSignOut = () => {
    startTransition(async () => {
      await signOut();
    });
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleSignOut}
      disabled={isPending || disabled}
      className={className}
    >
      <LogOut className="size-5 translate-x-[1px]" />
    </Button>
  );
}
