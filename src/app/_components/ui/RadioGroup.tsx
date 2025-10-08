import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/_lib/utils";

export function RadioGroup({
  children,
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      role="radiogroup"
      className={cn(
        "flex justify-center items-center gap-1 rounded-sm",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

const radioButtonVariants = cva(
  "flex items-center justify-center rounded-sm hover:bg-white/10 focus-visible:focus",
  {
    variants: {
      variant: {
        default:
          "data-[active=true]:bg-midnight-500 data-[active=true]:elevation-level-1",
        primary:
          " data-[active=true]:bg-midnight-900 data-[active=true]:elevation-level-2 ",
      },
      size: {
        default: "size-10",
        small: "size-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

type RadioButtonProps = {
  isActive: boolean;
};

export function RadioButton({
  children,
  isActive,
  variant,
  size,
  className,
  ...props
}: React.ComponentPropsWithoutRef<"button"> &
  RadioButtonProps &
  VariantProps<typeof radioButtonVariants>) {
  return (
    <button
      aria-checked={isActive}
      role="radio"
      data-active={isActive}
      className={cn(radioButtonVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </button>
  );
}
