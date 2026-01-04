import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export function NumberInput({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"input">) {
  const [value, setValue] = useState(1);

  function increment() {
    setValue((prev) => prev + 1);
  }

  function decrement() {
    setValue((prev) => prev - 1);
  }

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <UpdateNumberButton onClick={() => increment()} disabled={value === 99}>
        <Plus className="size-3" />
      </UpdateNumberButton>
      <NumberField value={value} />
      <UpdateNumberButton onClick={() => decrement()} disabled={value === 0}>
        <Minus />
      </UpdateNumberButton>
      <input
        className="hidden appearance-none"
        type="number"
        value={value}
        onChange={() => undefined}
        {...props}
      ></input>
    </div>
  );
}

type FieldProps = {
  value: number;
};

function NumberField({ value }: React.PropsWithChildren & FieldProps) {
  return (
    <div className="flex w-8 flex-col items-center bg-slate-950 [mask-image:linear-gradient(to_bottom,transparent_10%,black,transparent_90%)] [clip-path:inset(10px_0)]">
      <span>{value - 1}</span>
      <span>{value}</span>
      <span>{value + 1}</span>
    </div>
  );
}

function UpdateNumberButton({
  children,
  ...props
}: React.ComponentPropsWithoutRef<"button">) {
  return (
    <button
      className="flex size-4 items-center justify-center rounded-full bg-slate-950"
      type="button"
      {...props}
    >
      {children}
    </button>
  );
}
