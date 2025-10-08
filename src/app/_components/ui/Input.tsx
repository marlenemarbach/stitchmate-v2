import { cn } from "@/_lib/utils";
import { cva, VariantProps } from "class-variance-authority";

const inputVariants = cva("focus-visible:focus", {
  variants: {
    variant: {
      button:
        "rounded-sm [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [appearance:textfield]",
    },
    size: {
      default: "",
      small: "h-6",
    },
  },
  defaultVariants: {
    variant: "button",
  },
});

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
