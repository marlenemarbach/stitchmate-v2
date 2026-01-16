import Link from "next/link";
import { type VariantProps, cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "flex items-center disabled:opacity-50 justify-center gap-2 whitespace-nowrap rounded-full text-sm transition-[color,background-color,transform,box-shadow] disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-ring focus-visible:ring-[1.5px] ease-out duration-250 active:scale-99",
  {
    variants: {
      variant: {
        primary:
          "bg-primary/80 text-primary-foreground font-semibold hover:bg-primary/90",
        secondary: "text-foreground/90 bg-secondary/60 hover:bg-secondary/40",
        ghost: "hover:bg-foreground/10 p-0 rounded-full",
        destructive:
          "bg-destructive/60 border border-destructive hover:bg-destructive/70",
      },
      size: {
        default: "h-9 px-4 py-2",
        small: "h-7 py-1 px-3 gap-1",
        large: "h-11 text-base",
        icon: "w-8 h-8 p-2",
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
      type="button"
      {...props}
    >
      {children}
    </button>
  );
}

export function LinkButton({
  variant,
  size,
  children,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof Link> &
  VariantProps<typeof buttonVariants>) {
  return (
    <Link
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </Link>
  );
}
