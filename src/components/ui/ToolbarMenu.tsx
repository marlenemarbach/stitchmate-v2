"use client";

import { AnimatePresence, motion } from "motion/react";
import useMeasure from "react-use-measure";
import { cn } from "@/lib/utils";

type ToolbarMenuProps = {
  children: React.ReactNode;
  open: boolean;
  className?: string;
};

export function ToolbarMenu({ children, open, className }: ToolbarMenuProps) {
  const [ref, bounds] = useMeasure({ offsetSize: true });

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className={cn(
            "absolute bottom-12 left-1/2 z-100 w-[calc(100vw_-_2rem)] max-w-sm origin-bottom -translate-x-1/2 overflow-hidden rounded-lg bg-popup shadow-popup will-change-transform",
            className,
          )}
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: 1,
            height: bounds.height,
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
          <div ref={ref} className="p-6">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
