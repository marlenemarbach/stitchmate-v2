"use client";

import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { cn } from "@/lib/utils";

export function RadioGroup({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>) {
  return (
    <RadioGroupPrimitive.Root
      className={cn("grid gap-3", className)}
      {...props}
    />
  );
}

export function RadioItem({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      className={cn(
        "flex h-8 items-center gap-2 rounded-full p-2 px-3 text-sm opacity-70 transition-all duration-250 ease-out outline-none hover:bg-foreground/10 hover:opacity-100 focus-visible:ring-[1.5px] focus-visible:ring-ring disabled:opacity-50 data-[state=checked]:bg-foreground/10 data-[state=checked]:opacity-100 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      {children}
    </RadioGroupPrimitive.Item>
  );
}
