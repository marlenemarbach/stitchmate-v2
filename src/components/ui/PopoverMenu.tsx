import { createContext, use } from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "../../lib/utils";

const PopoverMenuContext = createContext<boolean | null>(null);

export function PopoverMenu({
  open,
  children,
  ...props
}: Omit<
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Root>,
  "open"
> & { open: boolean }) {
  return (
    <DropdownMenuPrimitive.Root open={open} {...props}>
      <PopoverMenuContext value={open}>{children}</PopoverMenuContext>
    </DropdownMenuPrimitive.Root>
  );
}

export function PopoverMenuTrigger({
  children,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Trigger>) {
  const open = use(PopoverMenuContext);
  if (open === null) throw new Error("Must be used within PopoverMenu");

  return (
    <DropdownMenuPrimitive.Trigger
      className={cn(
        "z-10 -translate-x-1/2 rounded-full opacity-100 transition-opacity duration-150 ease-[ease] data-[state=open]:opacity-0",
        className,
      )}
      {...props}
      disabled={open}
    >
      {children}
    </DropdownMenuPrimitive.Trigger>
  );
}

export function PopoverMenuContent({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>) {
  const open = use(PopoverMenuContext);

  const closedBorder =
    "inset(calc(100% - 2.75rem) calc(50% - 1.375rem) 0 calc(50% - 1.375rem) round 1.5rem)";
  const openBorder = "inset(0 round 1.5rem)";

  const closedContent =
    "inset(calc(100% - 2.75rem) calc(50% - 1.375rem) 0 calc(50% - 1.375rem) round calc(1.5rem - 1px))";
  const openContent = "inset(1px round calc(1.5rem - 1px))";

  return (
    <AnimatePresence>
      {open && (
        <DropdownMenuPrimitive.Portal forceMount>
          <DropdownMenuPrimitive.Content
            {...props}
            asChild
            loop
            key="menuContentWrapper"
          >
            <motion.div
              initial={{
                clipPath: closedBorder,
              }}
              animate={{
                clipPath: openBorder,
              }}
              exit={{
                clipPath: closedBorder,
              }}
              transition={{
                type: "spring",
                damping: 54,
                stiffness: 1000,
                mass: 1.3,
              }}
              className={cn(
                "h-full w-full bg-[linear-gradient(...)]",
                className,
              )}
            >
              <motion.div
                initial={{
                  clipPath: closedContent,
                }}
                animate={{ clipPath: openContent }}
                exit={{
                  clipPath: closedContent,
                }}
                transition={{
                  type: "spring",
                  damping: 54,
                  stiffness: 1000,
                  mass: 1.3,
                }}
                className="grid h-full w-full gap-2 bg-popup px-2 py-3"
              >
                {children}
              </motion.div>
            </motion.div>
          </DropdownMenuPrimitive.Content>
        </DropdownMenuPrimitive.Portal>
      )}
    </AnimatePresence>
  );
}

export function PopoverMenuItem({
  children,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item>) {
  return (
    <DropdownMenuPrimitive.Item
      className={cn(
        "flex h-10 items-center justify-between rounded-3xl px-3 focus-within:bg-foreground/5 hover:bg-foreground/5 hover:outline-none focus-visible:bg-foreground/5 focus-visible:outline-none",
        className,
      )}
      {...props}
      asChild
    >
      <motion.div
        initial={{ filter: "blur(3px)" }}
        animate={{
          filter: "blur(0)",
        }}
        exit={{ filter: "blur(3px)" }}
      >
        {children}
      </motion.div>
    </DropdownMenuPrimitive.Item>
  );
}
