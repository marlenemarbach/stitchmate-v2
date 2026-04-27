"use client";

// import { startTransition } from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { cn } from "@/lib/utils";

export function RadioGroup({
  className,
  onValueChange,
  ...props
}: React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>) {
  return (
    <RadioGroupPrimitive.Root
      className={cn("grid gap-3", className)}
      onValueChange={onValueChange}
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
        "flex h-8 items-center gap-2 rounded-full p-2 px-3 text-sm opacity-70 shadow-xs transition-all duration-150 ease-out outline-none focus-visible:ring-[1.5px] focus-visible:ring-ring disabled:opacity-50 data-[state=checked]:bg-foreground/5 data-[state=checked]:opacity-100 sm:hover:bg-foreground/5 sm:hover:opacity-100 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      {children}
    </RadioGroupPrimitive.Item>
  );
}
