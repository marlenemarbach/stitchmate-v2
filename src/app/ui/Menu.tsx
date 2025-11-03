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
import { ChevronDown } from "./Icons";

/* -------------------------------------------------------------------------------------------------
 * Menu Root Element
 * -----------------------------------------------------------------------------------------------*/

const MenuContext = createContext<{
  isOpen: boolean;
  openMenu: () => void;
  closeMenu: () => void;
  timeoutRef: React.RefObject<NodeJS.Timeout | null>;
  position: MenuPosition;
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
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  function openMenu() {
    setIsOpen(true);
  }

  function closeMenu() {
    const closeMenuTimeout = setTimeout(() => setIsOpen(false), delay);
    timeoutRef.current = closeMenuTimeout;
  }

  return (
    <div className={cn("relative", className)} {...props}>
      <MenuContext
        value={{ isOpen, openMenu, closeMenu, timeoutRef, position }}
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
  const { isOpen, openMenu, closeMenu } = ctx;

  const triggerProps = {
    onMouseEnter: () => openMenu(),
    onMouseLeave: () => closeMenu(),
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
      <ChevronDown className="size-3" strokeWidth={2} />
    </Button>
  );
}

/* -------------------------------------------------------------------------------------------------
 * Menu Content Popover
 * -----------------------------------------------------------------------------------------------*/

const GAP = "0.75rem";

export const menuContentVariants = cva(
  "absolute w-fit bg-midnight-800 elevation-level-2 rounded px-3 pt-2 pb-4",
  {
    variants: {
      position: {
        bottomLeft: `left-0 bottom-0 translate-y-[calc(100%_+_${GAP})]`,
        bottomRight: `right-0 bottom-0  translate-y-[calc(100%_+_${GAP})]`,
        topLeft: `left-0 top-0 -translate-y-[calc(100%_+_${GAP})]`,
        topRight: `right-0 top-0 -translate-y-[calc(100%_+_${GAP})]`,
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

  const { isOpen, closeMenu, timeoutRef, position } = ctx;
  function handleHoverStart() {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={cn(menuContentVariants({ position }), className)}
            onMouseEnter={() => handleHoverStart()}
            // onMouseLeave={() => closeMenu()}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { ease: "easeIn" } }}
            transition={{
              duration: 0.25,
              ease: "easeOut",
            }}
            key="menu"
            {...props}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
