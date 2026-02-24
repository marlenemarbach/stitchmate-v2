"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { customToast } from "./ui/CustomToast";

export function GuestToast({ isGuest }: { isGuest: boolean }) {
  const router = useRouter();

  function renderGuestToast() {
    if (isGuest && !sessionStorage.getItem("guest-toast-dismissed")) {
      customToast({
        id: "guestToast",
        title: "🎉 Welcome to Stitchmate",
        description:
          "Feel free to explore! Just a heads-up: Your projects will be lost when you leave. Remember to sign up before you go to save your progress.",
        buttons: [
          {
            label: "Ok, got it!",
            variant: "secondary",
            size: "small",
            onClick: () =>
              sessionStorage.setItem("guest-toast-dismissed", "true"),
          },
          {
            label: "Sign up",
            className: "bg-neutral-100/90 hover:bg-neutral-100 text-black",
            size: "small",
            onClick: () => {
              router.push("/signup");
            },
          },
        ],
        duration: Infinity,
      });
    }
  }

  useEffect(() => {
    renderGuestToast();
  }, []);

  return null;
}
