import { VariantProps, cva } from "class-variance-authority";

import { cn } from "../lib/utils";
import { ChevronDown, ChevronUp } from "./Icons";

const inputVariants = cva(
  "bg-input dark:border border-border [&::-webkit-inner-spin-button]:-webkit-appearance-none [&::-webkit-outer-spin-button]:-webkit-appearance-none [-moz-appearance:textfield] focus-visible:outline-none rounded-sm text-sm placeholder:text-foreground-mute",
  {
    variants: {
      size: {
        default: "h-9",
        small: "h-7 px-2",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

export function Input({
  className,
  size,
  ...props
}: Omit<React.ComponentPropsWithRef<"input">, "size"> &
  VariantProps<typeof inputVariants>) {
  return (
    <>
      <input className={cn(inputVariants({ size }), className)} {...props} />
    </>
  );
}
