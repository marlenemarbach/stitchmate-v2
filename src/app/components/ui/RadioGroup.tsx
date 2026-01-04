import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

export function RadioGroup({
  children,
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      role="radiogroup"
      className={cn("flex items-center justify-center", className)}
      {...props}
    >
      {children}
    </div>
  );
}

const radioButtonVariants = cva(
  "flex h-9 cursor-pointer items-center justify-center gap-1 rounded-full text-sm text-foreground transition-[color,border] duration-200 ease-out   has-[:disabled]:opacity-50 focus-visible:ring-[1.5px] focus-visible:ring-ring [&_svg:not([class*='size-'])]:size-4 px-2 hover:border-foreground/80",
  {
    variants: {
      variant: {
        default:
          "has-[:checked]:border-accent-foreground has-[:checked]:text-accent-foreground border border-border",
        ghost: "",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export function RadioButton({
  children,
  className,
  variant,
  ...props
}: React.ComponentPropsWithoutRef<"input"> &
  VariantProps<typeof radioButtonVariants>) {
  return (
    <label
      tabIndex={1}
      className={cn(radioButtonVariants({ variant }), className)}
    >
      <input className="peer hidden appearance-none" type="radio" {...props} />
      {children}
    </label>
  );
}

export function SubCounterRadioButton({
  children,
  className,
  ...props
}: React.ComponentPropsWithoutRef<"input"> &
  VariantProps<typeof radioButtonVariants>) {
  return (
    <>
      <input className="peer hidden appearance-none" type="radio" {...props} />
      <button type="button" role="radio" className={cn(className)} tabIndex={1}>
        {children}
      </button>
    </>
  );
}
