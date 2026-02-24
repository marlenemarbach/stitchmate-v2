"use client";
import { useRouter } from "next/navigation";
import { Button } from "./ui/Button";

export function SignUpButton() {
  const router = useRouter();
  return (
    <Button
      size="small"
      className="bg-neutral-100/90 text-black hover:bg-neutral-100"
      onClick={() => {
        router.push("/signup");
      }}
    >
      Sign up
    </Button>
  );
}
