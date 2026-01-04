import { type VariantProps, cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "flex items-center disabled:opacity-50 justify-center gap-2 whitespace-nowrap rounded-full text-sm transition-[color, background-color] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-ring focus-visible:ring-[1.5px] cursor-pointer ease-out duration-150 aria-pressed:disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-primary/80 text-primary-foreground hover:bg-primary/90",
        secondary: "border border-foreground/50 text-foreground hover:bg-muted",
        ghost: "hover:bg-foreground/10 p-0 rounded-full",
        destructive:
          "bg-destructive/60 border border-destructive hover:bg-destructive/70",
      },
      size: {
        default: "h-9 px-4 py-2",
        small: "h-7 p-1 text-xs",
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
      {...props}
    >
      {children}
    </button>
  );
}
