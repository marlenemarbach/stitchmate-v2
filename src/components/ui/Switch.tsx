import { useState } from "react";
import { cn } from "@/lib/utils";

export type SwitchProps = {
  defaultChecked: boolean;
  onCheckedChange?: (checked: boolean) => void;
  name?: string;
  textLabel?: boolean;
};

export function Switch({
  className,
  name,
  defaultChecked = false,
  onCheckedChange,
  textLabel = true,
  ...props
}: React.ComponentPropsWithoutRef<"div"> & SwitchProps) {
  const [enabled, setEnabled] = useState(defaultChecked);

  return (
    <div className="flex items-center gap-2">
      <input
        type="hidden"
        name={name}
        value={enabled ? "on" : "off"}
        defaultChecked={defaultChecked}
      />
      {textLabel && <SwitchTextLabel enabled={enabled} />}
      <div
        tabIndex={0}
        role="switch"
        aria-checked={enabled}
        data-state={enabled ? "on" : "off"}
        className={cn(
          "group relative grid aspect-44/24 h-5 grid-cols-2 items-center justify-start rounded-full bg-primary/20 p-1 inset-shadow-xs inset-shadow-background/20 transition-[color,box-shadow] duration-150 ease-out focus-visible:ring-[1.5px] focus-visible:ring-ring focus-visible:outline-none data-[state=on]:bg-green-500",
          className,
        )}
        onClick={() => {
          setEnabled((prev) => !prev);
          onCheckedChange?.(!enabled);
        }}
        {...props}
      >
        <span className="absolute left-[2px] z-10 aspect-square h-[calc(100%-4px)] rounded-full bg-zinc-100 drop-shadow-sm drop-shadow-background/20 transition-transform duration-200 ease-[cubic-bezier(.05,1.03,.82,.99)] group-data-[state=on]:translate-x-[100%]"></span>
      </div>
    </div>
  );
}

function SwitchTextLabel({ enabled }: { enabled: boolean }) {
  if (enabled) {
    return (
      <span className="text-xs font-medium tracking-wider uppercase">On</span>
    );
  }
  return (
    <span className="text-xs font-medium tracking-wider uppercase">Off</span>
  );
}
