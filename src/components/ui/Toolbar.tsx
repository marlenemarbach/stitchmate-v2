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
        "tems-center relative flex w-fit gap-2 rounded-full border border-border bg-popup p-1 text-popup-foreground",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
