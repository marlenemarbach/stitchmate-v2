import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";

export function Toolbar({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      role="toolbar"
      className={cn(
        "relative flex w-fit items-center gap-2 rounded-full border border-border bg-card text-card-foreground",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

type ToolbarMenuProps = {
  children: React.ReactNode;
  open: boolean;
  boundingHeight: number;
};
// Todo: add default height prop
export function ToolbarMenu({
  children,
  open,
  boundingHeight,
}: ToolbarMenuProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="absolute -top-4 left-1/2 z-100 w-[calc(100vw_-_2rem)] max-w-sm origin-bottom -translate-full -translate-x-1/2 overflow-hidden rounded-lg bg-popup p-6 shadow-popup will-change-transform"
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: 1,
            height: boundingHeight,
            transition: {
              type: "spring",
              bounce: 0,
              visualDuration: 0.3,
            },
          }}
          exit={{
            height: 0,
            opacity: 0,
            transition: {
              duration: 0.25,
              ease: "easeIn",
            },
          }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function ToolbarMenuContent({
  children,
}: React.ComponentPropsWithRef<"div">) {
  return (
    <motion.div
    // initial={{ x: -20, opacity: 0 }}
    // animate={{ x: 0, opacity: 1 }}
    // exit={{ x: -20, opacity: 0, origin: "left" }}
    >
      {children}
    </motion.div>
  );
}
