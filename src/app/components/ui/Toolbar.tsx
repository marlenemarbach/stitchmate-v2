"use client";

import { cn } from "@/lib/utils";

export function Toolbar({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      role="toolbar"
      className={cn(
        "relative flex w-fit items-center gap-2 rounded-full border border-border bg-card text-card-foreground",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
