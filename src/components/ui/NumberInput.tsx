import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "./Input";

// needs refactor use hidden input instead?
export function NumberInput({
  defaultValue,
  min = 1,
  max = 99,
  className,
  ...props
}: React.ComponentPropsWithoutRef<"input">) {
  const [value, setValue] = useState<string | number | readonly string[]>(
    defaultValue ?? 1,
  );

  function handleValueChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.currentTarget.value === "") {
      setValue(event.currentTarget.value);
    } else setValue(event.currentTarget.valueAsNumber);
  }

  return (
    <div className="relative">
      <Input
        min={min}
        name="step"
        type="number"
        className={cn("flex items-center", className)}
        value={value}
        onChange={(e) => handleValueChange(e)}
        data-steps={value}
        {...props}
      />
      <span
        className="absolute top-0 right-0 flex translate-y-1/4 flex-col pr-2"
        aria-hidden="true"
      >
        <button
          type="button"
          aria-label="increase by one"
          onClick={() => setValue((prev) => Number(prev) + 1)}
        >
          <ChevronUp className="size-3" strokeWidth={2} />
        </button>
        <button
          type="button"
          aria-label="increase by one"
          onClick={() =>
            setValue((prev) => Math.max(Number(prev) - 1, Number(min)))
          }
        >
          <ChevronDown className="size-3" strokeWidth={2} />
        </button>
      </span>
    </div>
  );
}
