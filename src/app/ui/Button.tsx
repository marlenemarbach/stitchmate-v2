import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";

export const buttonVariants = cva(
  "flex justify-center items-center gap-1 w-full px-3 py-1 rounded-sm text-sm focus-visible:focus cursor-pointer",
  {
    variants: {
      variant: {
        primary:
          " bg-midnight-500  elevation-level-1  hover:translate-y-[0.05rem] hover:bg-midnight-400 hover:scale-[99.5%] transition-color transition-translate transition-scale ease-in duration-200",
        secondary:
          "bg-midnight-800 !text-foreground elevation-level-1 hover:scale-99 transition-scale ease-in duration-200",
        ghost: "p-0",
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

type ButtonProps = React.ComponentPropsWithoutRef<"button"> &
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
