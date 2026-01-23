"use server";
import Link from "next/link";
import { Copyright } from "lucide-react";
import { cn } from "@/lib/utils";

export async function Footer() {
  return (
    <footer
      className={cn(
        "flex justify-between gap-2 border-t border-border/50 px-5 pt-5 pb-6 text-xs",
      )}
    >
      <div className="flex gap-1">
        <span className="flex items-center gap-1 opacity-50">
          <Copyright className="size-3" />
          2026
        </span>
        <a
          className="opacity-50 transition-opacity duration-150 ease-out outline-none hover:opacity-70 focus-visible:opacity-70"
          href="https://www.instagram.com/crafty_stitchess/"
          target="_blank"
        >
          by @craftystitchess
        </a>
      </div>
      <div className="flex items-center justify-center gap-6">
        <a
          className="opacity-50 transition-opacity duration-150 ease-out outline-none hover:opacity-70 focus-visible:opacity-70"
          href="mailto:stitchmate.contact@gmail.com?subject=Hello"
        >
          Contact
        </a>
        <Link
          className="opacity-50 transition-opacity duration-150 ease-out outline-none hover:opacity-70 focus-visible:opacity-70"
          href="/privacy"
        >
          Privacy
        </Link>
      </div>
    </footer>
  );
}
