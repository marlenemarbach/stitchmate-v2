import { type VariantProps, cva } from "class-variance-authority";

import { cn } from "../lib/utils";

export const buttonVariants = cva(
  "flex items-center justify-center gap-1 w-full px-2 py-1 rounded-md text-sm hover:bg-accent focus-visible:focus cursor-pointer transition-color ease-in duration-200",
  {
    variants: {
      variant: {
        primary: "bg-primary",
        secondary: "bg-card border border-border",
        ghost: "p-0 justify-left",
      },
      size: {
        default: "h-9",
        small: "h-8 text-xs",
        xs: "h-6 px-1",
      },
    },
    defaultVariants: { variant: "primary", size: "default" },
  },
);

export type ButtonProps = React.ComponentPropsWithoutRef<"button"> &
  VariantProps<typeof buttonVariants>;

export function Button({
  variant,
  size,
  children,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </button>
  );
}
