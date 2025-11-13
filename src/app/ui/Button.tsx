import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";

export const buttonVariants = cva(
  "flex items-center gap-1 w-full px-3 py-1 rounded-sm text-sm focus-visible:focus cursor-pointer",
  {
    variants: {
      variant: {
        primary:
          "justify-center bg-midnight-500  elevation-level-1 data-[state-active=true]:translate-y-[0.05rem] data-[state-active=true]:bg-midnight-400 hover:translate-y-[0.05rem] hover:bg-midnight-400 transition-color transition-translate ease-in duration-200 w-fit",
        secondary:
          "bg-midnight-800 !text-foreground elevation-level-1 hover:scale-99 transition-scale ease-in duration-200",
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
