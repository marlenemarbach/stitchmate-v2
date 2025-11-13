import { cva, VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";

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
        default: "size-9",
        small: "size-7",
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
