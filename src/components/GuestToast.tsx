"use client";

import { useEffect } from "react";
import { customToast } from "./ui/CustomToast";

export function GuestToast({ isGuest }: { isGuest: boolean }) {
  function renderGuestToast() {
    if (isGuest && !sessionStorage.getItem("guest-toast-dismissed")) {
      customToast({
        id: "guestToast",
        title: "🎉 Welcome to Stitchmate!",
        description:
          "Feel free to explore. Just a heads-up: Your projects will be lost when you leave. Remember to sign up before you go to save your progress.",
        duration: 6000,
      });
    }
  }

  useEffect(() => {
    renderGuestToast();
  }, []);

  return null;
}
