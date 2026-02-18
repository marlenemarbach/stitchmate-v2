import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { cn } from "../../lib/utils";

export function RadioSwitch({
  children,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>) {
  return (
    <RadioGroupPrimitive.Root
      className={cn(
        "flex items-center gap-2 rounded-full bg-foreground/5 p-2 has-hover:bg-foreground/5",
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
        "flex aspect-square h-full items-center justify-center rounded-full transition-colors duration-250 ease-[ease] hover:bg-foreground/7 data-[state=checked]:bg-neutral-100 data-[state=checked]:text-neutral-800 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:stroke-3 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      {children}
    </RadioGroupPrimitive.Item>
  );
}
