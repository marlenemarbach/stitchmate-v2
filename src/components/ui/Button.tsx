import Link from "next/link";
import { type VariantProps, cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "flex items-center disabled:opacity-50 justify-center gap-2 whitespace-nowrap rounded-full transition-[color,background-color,transform] disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none  ease-[ease] duration-150 active:scale-[0.997]",
  {
    variants: {
      variant: {
        primary:
          "dark:bg-ultramarine-300/90 font-medium dark:hover:bg-ultramarine-300 dark:focus-visible:bg-ultramarine-300 bg-ultramarine-300 hover:bg-ultramarine-300/90 focus-visible:bg-ultramarine-300/90 text-neutral-100 shadow-xs",
        secondary:
          "font-medium border border-border hover:bg-neutral-200 dark:bg-zinc-800/50 dark:hover:bg-zinc-800 shadow-xs focus-visible:bg-neutral-200",
        ghost: "hover:bg-foreground/5 rounded-full",
        destructive:
          "dark:bg-destructive/30 dark:border dark:border-destructive dark:hover:bg-destructive/70 bg-destructive/80 text-white hover:bg-destructive font-medium",
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
