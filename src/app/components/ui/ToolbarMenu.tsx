"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import useMeasure from "react-use-measure";
import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "./Button";

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

//tdb create more reusable composition
export function ToolbarMenuTrigger({ children, ...props }: ButtonProps) {
  return <Button {...props}>{children}</Button>;
}

export function useToolbarMenu() {
  const [open, setOpen] = useState(false);
}

//
// const [showMenu, setShowMenu] = useState(false);
//   const [menuContent, setMenuContent] = useState<MenuContent>("subcounter");
//
//   function handleMenu(content: MenuContent) {
//     if (showMenu && content === menuContent) setShowMenu(false);
//     if (!showMenu) setShowMenu(true);
//     if (menuContent !== content) setMenuContent(content);
//   }
