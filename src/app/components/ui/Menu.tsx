"use client";

import {
  cloneElement,
  createContext,
  isValidElement,
  useContext,
  useRef,
  useState,
} from "react";
import { VariantProps, cva } from "class-variance-authority";
import { AnimatePresence, type MotionProps, motion } from "motion/react";
import { cn } from "../../../lib/utils";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { Button, ButtonProps } from "./Button";

/* ---------------------------------------------------------------------------
 * Menu Root Element
 * ------------------------------------------------------------------------*/

const MenuContext = createContext<{
  isOpen: boolean;
  toggleMenu: () => void;
  closeMenu: () => void;
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

  function closeMenu() {
    setIsOpen(false);
  }

  return (
    <div className={cn("relative", className)} ref={menuRef} {...props}>
      <MenuContext
        value={{
          isOpen,
          toggleMenu,
          position,
          delay,
          closeMenu,
        }}
      >
        {children}
      </MenuContext>
    </div>
  );
}

/* ---------------------------------------------------------------------------
 * Menu Trigger
 * ---------------------------------------------------------------------------*/

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
    "data-state": isOpen ? "open" : "closed",
    ...props,
  };

  if (asChild && isValidElement(children)) {
    return cloneElement(children, {
      ...triggerProps,
    } as TriggerSlotProps);
  }

  return (
    <Button
      className={cn("data-[state=open]:bg-foreground/10", className)}
      variant={variant}
      size={size}
      {...triggerProps}
    >
      {children}
    </Button>
  );
}

/* -----------------------------------------------------------------------------
 * Menu Content Popover
 * ----------------------------------------------------------------------------*/

export const menuContentVariants = cva(
  "absolute w-fit z-10 bg-card dark:border border-border rounded-lg p-1 whitespace-nowrap text-sm flex flex-col",
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

/* -----------------------------------------------------------------------------
 * Menu Item
 * ----------------------------------------------------------------------------*/

export function MenuItem({
  children,
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cn(
        "flex h-9 w-full items-center rounded-lg px-2 hover:bg-foreground/10",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
