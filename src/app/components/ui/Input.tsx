import { useState } from "react";
import { VariantProps, cva } from "class-variance-authority";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "../../../lib/utils";

const inputVariants = cva(
  "[&::-webkit-inner-spin-button]:-webkit-appearance-none text-base [&::-webkit-outer-spin-button]:-webkit-appearance-none [-moz-appearance:textfield] placeholder:text-foreground-muted  border-border w-full  rounded-lg border px-3 transition-[color,box-shadow] outline-none  disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 focus-visible:ring-ring focus-visible:ring-[1.5px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      size: {
        default: "h-9",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

type InputProps = Omit<React.ComponentPropsWithRef<"input">, "size"> &
  VariantProps<typeof inputVariants> & { initialValue?: number };

export function Input({ className, size, initialValue, ...props }: InputProps) {
  if (props.type === "number") {
    return (
      <NumberInput
        className={className}
        size={size}
        initialValue={initialValue ?? 1}
        {...props}
      />
    );
  }
  return (
    <>
      <input className={cn(inputVariants({ size }), className)} {...props} />
    </>
  );
}

export function NumberInput({
  initialValue,
  size,
  className,
  min = 0,
  ...props
}: InputProps) {
  const [value, setValue] = useState<number | "">(initialValue ?? 1);

  const minValue = typeof min === "string" ? parseInt(min) : min;

  function handleValueChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.currentTarget.value === "") {
      setValue(event.currentTarget.value);
    } else setValue(event.currentTarget.valueAsNumber);
  }

  return (
    <div className="relative">
      <input
        min={min}
        name="step"
        type="number"
        className={cn(inputVariants({ size }), "flex items-center", className)}
        value={value}
        onChange={(e) => handleValueChange(e)}
        data-steps={value}
        {...props}
      />
      <span
        className="absolute top-0 right-0 flex translate-y-1/4 flex-col pr-1"
        aria-hidden="true"
      >
        <button
          type="button"
          aria-label="increase value"
          onClick={() => setValue((prev) => Number(prev) + 1)}
        >
          <ChevronUp className="size-3" strokeWidth={2} />
        </button>
        <button
          type="button"
          aria-label="increase value"
          onClick={() =>
            setValue((prev) => Math.max(Number(prev) - 1, minValue))
          }
        >
          <ChevronDown className="size-3" strokeWidth={2} />
        </button>
      </span>
    </div>
  );
}
