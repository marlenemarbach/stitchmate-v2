import { useState } from "react";
import { motion } from "motion/react";
import { cn } from "../../lib/utils";

export function Switch({
  defaultActive = false,
  onSwitchChange,
  className,
  ...props
}: React.ComponentPropsWithoutRef<"button"> & {
  defaultActive?: boolean;
  onSwitchChange?: (active: boolean) => void;
}) {
  const [active, setActive] = useState(defaultActive);

  return (
    <button
      role="switch"
      className={cn(
        "flex items-center gap-2 rounded-full p-2 hover:bg-foreground/5 focus-visible:bg-foreground/5 focus-visible:outline-none",
        className,
      )}
      onClick={() => {
        const nextActive = !active;
        setActive(nextActive);
        onSwitchChange?.(nextActive);
      }}
      aria-checked={active ? "true" : "false"}
      data-state={active ? "on" : "off"}
      {...props}
    >
      <span
        aria-hidden
        className="text-sm tracking-wide text-foreground/80 uppercase"
      >
        {active ? "on" : "off"}
      </span>
      <span
        className={cn(
          "flex aspect-5/3 h-6 items-center justify-start rounded-full bg-foreground/15 py-0.5 pr-0.5 inset-shadow-sm transition-colors duration-200 ease-initial data-[state=on]:justify-end data-[state=on]:bg-green-400",
          className,
        )}
        data-state={active ? "on" : "off"}
      >
        <motion.span
          layout
          className="aspect-square h-full rounded-full bg-neutral-100 drop-shadow-sm"
          transition={{
            type: "spring",
            visualDuration: 0.1,
            bounce: 0.2,
          }}
        />
      </span>
    </button>
  );
}
