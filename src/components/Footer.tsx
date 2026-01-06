"use server";
import { Copyright, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

export async function Footer() {
  return (
    <footer
      className={cn("flex items-center justify-between p-5 text-sm opacity-50")}
    >
      <a
        className="w-fit cursor-pointer rounded-lg p-1 opacity-50 transition-[ring,opacity] duration-250 ease-out outline-none hover:opacity-70 focus-visible:opacity-70 focus-visible:ring-[1px] focus-visible:ring-ring"
        href="https://www.instagram.com/crafty_stitchess/"
        target="_blank"
      >
        created by @craftystitchess
      </a>
      <a
        className="cursor-pointer rounded-lg p-1 opacity-50 transition-[ring,opacity] duration-250 ease-out outline-none hover:opacity-70 focus-visible:opacity-70 focus-visible:ring-[1px] focus-visible:ring-ring"
        href="mailto:stitchmate.contact@gmail.com?subject=Hello"
      >
        <Mail className="size-5" />
      </a>
    </footer>
  );
}
