import { useState } from "react";
import { cn } from "@/lib/utils";

export type SwitchProps = {
  defaultChecked: boolean;
  onCheckedChange?: (checked: boolean) => void;
  name?: string;
};

export function Switch({
  name,
  defaultChecked = false,
  onCheckedChange,
  className,
  ...props
}: React.ComponentPropsWithoutRef<"button"> & SwitchProps) {
  const [enabled, setEnabled] = useState(defaultChecked);

  return (
    <>
      <input
        type="hidden"
        name={name}
        value={enabled ? "on" : "off"}
        defaultChecked={defaultChecked}
      />
      <button
        tabIndex={0}
        type="button"
        role="switch"
        aria-checked={enabled}
        data-state={enabled ? "on" : "off"}
        className={cn(
          "group relative flex h-[1rem] w-[1.875rem] items-center justify-start rounded-full bg-primary/20 p-1 transition-[color,border,box-shadow] duration-200 ease-out focus-visible:ring-[1.5px] focus-visible:ring-ring focus-visible:outline-none data-[state=on]:bg-green-500",
          className,
        )}
        onClick={() => {
          setEnabled((prev) => !prev);
          onCheckedChange?.(!enabled);
        }}
        {...props}
      >
        <svg className="absolute left-[1px] size-[0.875rem] transform-[colors,translate] text-foreground duration-200 ease-in group-data-[state=on]:translate-x-[100%]">
          <circle cx="7" cy="7" r="7" fill="currentColor" />
        </svg>
      </button>
    </>
  );
}
