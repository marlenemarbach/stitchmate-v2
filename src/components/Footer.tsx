"use server";

import { cn } from "@/lib/utils";

export async function Footer() {
  return (
    <footer className={cn("flex justify-center gap-6 px-5 pt-5 pb-6 text-xs")}>
      <a
        className="ease opacity-40 transition-opacity duration-150 outline-none hover:opacity-60 focus-visible:opacity-70"
        href="https://www.instagram.com/crafty_stitchess/"
        target="_blank"
      >
        created by @craftystitchess
      </a>
    </footer>
  );
}
