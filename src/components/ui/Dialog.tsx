"use client";

import { createContext, use } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";

const DialogContext = createContext<boolean | null | undefined>(null);

export function Dialog({
  children,
  open,
  ...props
}: React.ComponentPropsWithoutRef<typeof DialogPrimitive.Root>) {
  return (
    <DialogPrimitive.Root {...props}>
      <DialogContext value={open}>{children}</DialogContext>
    </DialogPrimitive.Root>
  );
}

export function DialogContent({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {}) {
  const open = use(DialogContext);

  return (
    <AnimatePresence>
      {open && (
        <DialogPrimitive.Portal forceMount>
          <DialogPrimitive.Overlay key={"dialogOverlay"} asChild>
            <motion.div
              className="fixed inset-0 isolate z-50 bg-black/30 dark:bg-black/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
          </DialogPrimitive.Overlay>
          <DialogPrimitive.Content forceMount {...props} asChild>
            <motion.div
              className={cn(
                "fixed top-1/2 left-1/2 z-50 grid w-[calc(100vw_-_2rem)] -translate-1/2 gap-3 rounded-xl bg-popup px-6 pt-6 sm:w-lg dark:border dark:border-neutral-700/50",
                className,
              )}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              exit={{
                opacity: 0,
              }}
              transition={{ ease: "easeOut", duration: 0.2 }}
              key="dialogContent"
            >
              {children}
            </motion.div>
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      )}
    </AnimatePresence>
  );
}

export function DialogTrigger({
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof DialogPrimitive.Trigger>) {
  return (
    <DialogPrimitive.Trigger {...props} asChild>
      {children}
    </DialogPrimitive.Trigger>
  );
}

export function DialogTitle({
  children,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title className={cn("font-medium", className)} {...props}>
      {children}
    </DialogPrimitive.Title>
  );
}

export function DialogFooter({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cn(
        "-mx-6 mt-4 flex items-center justify-end gap-4 rounded-b-xl border-t border-border p-6 py-4 inset-shadow-[0_2px_4px_-2px_rgba(0,0,0,0.05)] dark:border-neutral-700/50",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function DialogClose({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof DialogPrimitive.Close>) {
  return (
    <DialogPrimitive.Close
      className="150ms absolute top-6 right-6 flex h-5 w-5 cursor-pointer items-center justify-center rounded-full p-0 text-muted-foreground transition-colors ease-out hover:text-foreground focus-visible:text-foreground focus-visible:ring-[1.5px] focus-visible:ring-ring focus-visible:outline-none"
      {...props}
    >
      <X className="size-4" />
    </DialogPrimitive.Close>
  );
}

export function DialogDescription({
  children,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      className={cn("sr-only", className)}
      {...props}
    >
      {children}
    </DialogPrimitive.Description>
  );
}
