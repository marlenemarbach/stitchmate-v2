"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/Button";

export function SignUpButton() {
  const router = useRouter();
  return (
    <Button
      variant="secondary"
      size="small"
      onClick={() => {
        router.push("/signup");
      }}
    >
      Sign up
    </Button>
  );
}
