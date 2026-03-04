"use client";

import { useTransition } from "react";
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
      variant="secondary"
      size="small"
      onClick={handleSignOut}
      disabled={isPending || disabled}
      className={className}
    >
      Logout
    </Button>
  );
}
