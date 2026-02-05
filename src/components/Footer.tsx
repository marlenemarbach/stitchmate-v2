"use server";
import Link from "next/link";
import { Copyright } from "lucide-react";
import { cn } from "@/lib/utils";

export async function Footer() {
  return (
    <footer className={cn("flex justify-center gap-6 px-5 pt-5 pb-6 text-xs")}>
      <div className="flex gap-1">
        <span className="flex items-center gap-1 opacity-40">
          <Copyright className="size-3" />
          2026 by{" "}
        </span>
        <a
          className="ease opacity-40 transition-opacity duration-150 outline-none hover:opacity-60 focus-visible:opacity-70"
          href="https://www.instagram.com/crafty_stitchess/"
          target="_blank"
        >
          @craftystitchess
        </a>
      </div>
      <a
        className="ease opacity-40 transition-opacity duration-150 outline-none hover:opacity-60 focus-visible:opacity-70"
        href="mailto:stitchmate.contact@gmail.com?subject=Hello"
      >
        Contact
      </a>
      <Link
        className="ease opacity-40 transition-opacity duration-150 outline-none hover:opacity-70 focus-visible:opacity-70"
        href="/privacy"
      >
        Privacy
      </Link>
    </footer>
  );
}
