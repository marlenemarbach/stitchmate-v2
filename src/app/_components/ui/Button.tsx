import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../_lib/utils";

const buttonVariants = cva(
  "flex justify-center items-center gap-1 rounded-sm focus-visible:focus cursor-pointer",
  {
    variants: {
      variant: {
        primary: "px-2 py-1 bg-midnight-500 hover:bg-midnight-400",
        ghost: "",
      },
      size: {
        default: "h-10",
        small: "h-8",
        xs: "h-6 px-1",
      },
    },
    defaultVariants: { variant: "primary" },
  },
);

export function Button({
  variant,
  size,
  children,
  className,
  ...props
}: React.ComponentPropsWithoutRef<"button"> &
  VariantProps<typeof buttonVariants>) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </button>
  );
}
