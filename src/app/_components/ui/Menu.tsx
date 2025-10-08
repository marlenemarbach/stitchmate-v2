import { cn } from "../../_lib/utils";
import { createContext, useContext, useRef, useState } from "react";
import { AnimatePresence, motion, type MotionProps } from "motion/react";
import { Button } from "./Button";

const MenuContext = createContext<{
  isOpen: boolean;
  openMenu: () => void;
  closeMenu: () => void;
  timeoutRef: React.RefObject<NodeJS.Timeout | null>;
} | null>(null);

type CommandMenuProps = {
  delay?: number;
};
export function Menu({
  delay = 300,
  children,
}: React.PropsWithChildren & CommandMenuProps) {
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
    <MenuContext value={{ isOpen, openMenu, closeMenu, timeoutRef }}>
      <div className="relative">{children}</div>
    </MenuContext>
  );
}

export function MenuTrigger({
  children,
  className,
  ...props
}: React.ComponentPropsWithoutRef<"button">) {
  const ctx = useContext(MenuContext);

  if (!ctx)
    throw new Error("<CommandMenuTrigger> must be used within <CommandMenu>");
  const { openMenu, closeMenu } = ctx;

  return (
    <Button
      className={cn(
        "flex items-center justify-items-center h-10 rounded-sm px-1",
        className,
      )}
      onMouseEnter={() => openMenu()}
      {...props}
    >
      {children}
    </Button>
  );
}

export function MenuContent({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<"div"> & MotionProps) {
  const ctx = useContext(MenuContext);

  if (!ctx)
    throw new Error("<CommandMenuContent> must be used within <CommandMenu>");

  const { isOpen, closeMenu, timeoutRef } = ctx;

  function handleHoverStart() {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }

  return (
    <>
      {isOpen && (
        <AnimatePresence>
          <motion.div
            className={cn(
              "absolute right-0 top-12 bg-midnight-800 elevation-level-2 rounded-lg",
              className,
            )}
            key="menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onMouseLeave={() => closeMenu()}
            onMouseEnter={() => handleHoverStart()}
            exit={{ opacity: 0 }}
            {...props}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      )}
    </>
  );
}
