import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
// import { motion } from "motion/react";
import { cn } from "../../lib/utils";

export function RadioSwitch({
  children,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>) {
  return (
    <RadioGroupPrimitive.Root
      className={cn(
        "flex items-center rounded-full p-2 has-hover:bg-foreground/5",
        className,
      )}
      {...props}
    >
      {children}
    </RadioGroupPrimitive.Root>
  );
}

export function RadioSwitchItem({
  children,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      className={cn(
        "flex h-6 w-8 items-center justify-center bg-foreground/15 transition-colors duration-250 ease-[ease] first:rounded-l-full last:rounded-r-full data-[state=checked]:bg-neutral-100 data-[state=checked]:text-neutral-800 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:stroke-3 [&_svg:not([class*='size-'])]:size-3",
        className,
      )}
      {...props}
    >
      {children}
    </RadioGroupPrimitive.Item>
  );
}
