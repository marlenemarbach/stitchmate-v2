import { cn } from "../lib/utils";
import { cva, VariantProps } from "class-variance-authority";

const inputVariants = cva(
  "[&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [appearance:textfield]focus-visible:focus rounded-sm text-sm placeholder:text-foreground-muted",
  {
    variants: {
      variant: {
        ghost: "bg-transparent",
        default: "bg-midnight-700 px-3",
      },
      size: {
        default: "h-9",
        small: "h-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export function Input({
  className,
  size,
  ...props
}: Omit<React.ComponentPropsWithoutRef<"input">, "size"> &
  VariantProps<typeof inputVariants>) {
  return (
    <input className={cn(inputVariants({ size }), className)} {...props} />
  );
}
