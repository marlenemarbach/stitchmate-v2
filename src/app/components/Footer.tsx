"use server";
import { Copyright, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

export async function Footer() {
  return (
    <footer
      className={cn("grid grid-cols-2 items-center p-5 text-xs sm:grid-cols-3")}
    >
      <p className="hidden items-center gap-1 pl-1 opacity-50 sm:flex">
        <Copyright className="size-3" />
        stitchmate 2026
      </p>
      <a
        className="w-fit cursor-pointer rounded-lg p-1 opacity-50 transition-[ring,opacity] duration-250 ease-out outline-none hover:opacity-70 focus-visible:opacity-70 focus-visible:ring-[1px] focus-visible:ring-ring sm:justify-self-center"
        href="https://www.instagram.com/crafty_stitchess/"
        target="_blank"
      >
        created by @craftystitchess
      </a>
      <a
        className="cursor-pointer justify-self-end rounded-lg p-1 opacity-50 transition-[ring,opacity] duration-250 ease-out outline-none hover:opacity-70 focus-visible:opacity-70 focus-visible:ring-[1px] focus-visible:ring-ring"
        href="mailto:stitchmate.contact@gmail.com?subject=Hello"
      >
        <Mail className="size-5" />
      </a>
    </footer>
  );
}
