import Link from "next/link";
import { type VariantProps, cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "flex focus-visible:ring-[1.5px] focus-visible:ring-ring items-center disabled:opacity-50 justify-center gap-2 whitespace-nowrap rounded-full transition-[color,background-color] disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none  ease-[ease] duration-150 ",
  {
    variants: {
      variant: {
        primary:
          "font-medium  bg-teal-400/65 hover:bg-teal-400/80 text-neutral-100 shadow-xs",
        secondary:
          "font-medium border border-border bg-foreground/10 hover:bg-foreground/13 shadow-xs",
        ghost: "hover:bg-foreground/5 rounded-full",
        destructive:
          "text-red-400 font-medium border border-border bg-foreground/10 hover:bg-foreground/13 shadow-xs",
      },
      size: {
        default: "h-9 px-4 py-2 text-sm",
        small: "h-8 py-1 px-3 gap-1 sm:text-sm",
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
