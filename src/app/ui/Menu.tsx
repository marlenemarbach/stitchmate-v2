"use client";

import {
  cloneElement,
  isValidElement,
  createContext,
  useContext,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion, type MotionProps } from "motion/react";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";
import { Button, ButtonProps } from "./Button";
import { useOutsideClick } from "../hooks/useOutsideClick";

/* -------------------------------------------------------------------------------------------------
 * Menu Root Element
 * -----------------------------------------------------------------------------------------------*/

const MenuContext = createContext<{
  isOpen: boolean;
  toggleMenu: () => void;
  position: MenuPosition;
  delay: number;
} | null>(null);

type MenuPosition = VariantProps<typeof menuContentVariants>["position"];

type MenuProps = {
  delay?: number;
  position?: MenuPosition;
};

export function Menu({
  delay = 300,
  position = "bottomLeft",
  children,
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div"> & MenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useOutsideClick(menuRef, () => setIsOpen(false));

  function toggleMenu() {
    setIsOpen((prev) => !prev);
  }

  return (
    <div className={cn("relative", className)} ref={menuRef} {...props}>
      <MenuContext
        value={{
          isOpen,
          toggleMenu,
          position,
          delay,
        }}
      >
        {children}
      </MenuContext>
    </div>
  );
}

/* -------------------------------------------------------------------------------------------------
 * Menu Trigger
 * -----------------------------------------------------------------------------------------------*/

type TriggerSlotProps = React.HTMLAttributes<HTMLElement> & {
  children?: React.ReactNode;
};

export function MenuTrigger({
  variant,
  size,
  children,
  className,
  asChild,
  ...props
}: ButtonProps & { asChild?: boolean }) {
  const ctx = useContext(MenuContext);

  if (!ctx) throw new Error("<MenuTrigger> must be used within <Menu>");
  const { isOpen, toggleMenu } = ctx;

  const triggerProps = {
    onClick: () => toggleMenu(),
    "data-state-active": isOpen,
    ...props,
  };

  if (asChild && isValidElement(children)) {
    return cloneElement(children, {
      ...triggerProps,
    } as TriggerSlotProps);
  }

  return (
    <Button
      className={cn("w-fit", className)}
      variant={variant}
      size={size}
      {...triggerProps}
    >
      {children}
    </Button>
  );
}

/* -------------------------------------------------------------------------------------------------
 * Menu Content Popover
 * -----------------------------------------------------------------------------------------------*/

export const menuContentVariants = cva(
  "absolute z-10 w-fit bg-midnight-800 elevation-level-2 rounded p-2",
  {
    variants: {
      position: {
        bottomLeft: `left-0 bottom-0 translate-y-[calc(100%_+_0.75rem)]`,
        bottomRight: `right-0 bottom-0  translate-y-[calc(100%_+_0.75rem)]`,
        topLeft: `left-0 top-0 -translate-y-[calc(100%_+_0.75rem)]`,
        topRight: `right-0 top-0 -translate-y-[calc(100%_+_0.75rem)]`,
      },
    },
  },
);

type MenuContentProps = React.ComponentPropsWithoutRef<"div"> &
  VariantProps<typeof menuContentVariants> &
  MotionProps;

export function MenuContent({
  className,
  children,
  ...props
}: MenuContentProps) {
  const ctx = useContext(MenuContext);

  if (!ctx) throw new Error("<MenuContent> must be used within <Menu>");

  const { isOpen, position, delay } = ctx;

  // calculate s from ms
  const duration = delay / 1000;

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{
              opacity: 0,
              transition: { ease: "easeIn", duration },
            }}
            transition={{
              duration,
              ease: "easeOut",
            }}
            key="menu"
            className={cn(menuContentVariants({ position }), className)}
            {...props}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
