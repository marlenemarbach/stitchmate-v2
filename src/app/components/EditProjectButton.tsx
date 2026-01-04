"use client";

import { Pencil } from "lucide-react";
import { cn } from "../lib/utils";

export function EditProjectButton({ className }: { className?: string }) {
  return (
    <button
      className={cn(
        "cursor-pointer text-muted-foreground hover:text-foreground/80 transition-colors ease-out 150ms",
        className,
      )}
    >
      <Pencil className="size-4" />
    </button>
  );
}
