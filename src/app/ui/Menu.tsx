import { createContext, useContext, useRef, useState } from "react";
import { AnimatePresence, motion, type MotionProps } from "motion/react";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";
import { Button, ButtonProps } from "./Button";
import { ChevronDown } from "./Icons";

const MenuContext = createContext<{
  isOpen: boolean;
  openMenu: () => void;
  closeMenu: () => void;
  timeoutRef: React.RefObject<NodeJS.Timeout | null>;
} | null>(null);

type MenuProps = {
  delay?: number;
};

export function Menu({
  delay = 300,
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
      <MenuContext value={{ isOpen, openMenu, closeMenu, timeoutRef }}>
        {children}
      </MenuContext>
    </div>
  );
}

export function MenuTrigger({
  children,
  className,
  variant,
  size,
  ...props
}: ButtonProps) {
  const ctx = useContext(MenuContext);

  if (!ctx) throw new Error("<MenuTrigger> must be used within <Menu>");
  const { isOpen, openMenu, closeMenu } = ctx;

  return (
    <Button
      className={cn("w-fit", className)}
      data-state-active={isOpen}
      variant={variant}
      size={size}
      onMouseEnter={() => openMenu()}
      onMouseLeave={() => closeMenu()}
      {...props}
    >
      {children}
      <ChevronDown className="size-3" strokeWidth={2} />
    </Button>
  );
}

export const MenuContentVariants = cva(
  " absolute  left-0 w-fit ng-midnight-800 elevation-level-2 rounded",
  {
    variants: {
      position: {
        bottom: "bottom-0 translate-y-[calc(100%_+_0.75rem)]",
        top: "top-0",
      },
    },
    defaultVariants: { position: "bottom" },
  },
);

type MenuContentProps = React.ComponentPropsWithoutRef<"div"> &
  VariantProps<typeof MenuContentVariants> &
  MotionProps;

export function MenuContent({
  className,
  position,
  children,
  ...props
}: MenuContentProps) {
  const ctx = useContext(MenuContext);

  if (!ctx) throw new Error("<MenuContent> must be used within <Menu>");

  const { isOpen, closeMenu, timeoutRef } = ctx;

  function handleHoverStart() {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={cn(MenuContentVariants({ position }), className)}
            onMouseEnter={() => handleHoverStart()}
            onMouseLeave={() => closeMenu()}
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
