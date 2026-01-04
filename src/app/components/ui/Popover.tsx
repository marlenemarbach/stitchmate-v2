"use client";

import * as PopoverPrimitive from "@radix-ui/react-popover";
import { cn } from "@/lib/utils";

export function Popover({
  ...props
}: React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Root>) {
  return <PopoverPrimitive.Root {...props} />;
}

export function PopoverTrigger({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Trigger>) {
  return (
    <PopoverPrimitive.Trigger
      className="[&_svg:not([class*='size-'])]:size-4"
      {...props}
    />
  );
}

export function PopoverContent({
  className,
  sideOffset = 8,
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Content>) {
  return (
    <PopoverPrimitive.Content
      sideOffset={sideOffset}
      className={cn(
        "static z-50 w-[calc(100vw_-_2rem)] max-w-sm origin-bottom rounded-xl bg-popup p-6 text-popup-foreground shadow-md shadow-popup outline-hidden",
        "data-[state=closed]:animate-popup-out data-[state=open]:animate-popup-in",
        className,
      )}
      {...props}
    />
  );
}

export function PopoverAnchor({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Anchor>) {
  return <PopoverPrimitive.Anchor {...props} />;
}
