"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";

function DialogRoot({
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root {...props}>{children}</DialogPrimitive.Root>;
}

export function Dialog({
  className,
  open,
  onOpenChange,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  // Only render portal on client-side to avoid SSR errors
  // if (typeof document === "undefined") {
  //   return null;
  // }

  return (
    <DialogRoot open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open && (
          <DialogPrimitive.Portal forceMount>
            <DialogPrimitive.Overlay key={"dialogOverlay"} asChild>
              <motion.div
                className="fixed inset-0 isolate z-50 bg-black/10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
            </DialogPrimitive.Overlay>
            <DialogPrimitive.Content {...props} asChild>
              <motion.div
                className={cn(
                  "fixed top-1/2 left-1/2 z-50 grid w-[calc(100vw_-_2rem)] -translate-1/2 gap-6 rounded-xl bg-background p-6 shadow-popup sm:w-sm",
                  className,
                )}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  transition: { ease: "easeOut", duration: 0.3 },
                }}
                exit={{
                  opacity: 0,
                  scale: 0.9,
                  transition: { ease: "easeIn", duration: 0.2 },
                }}
                key="dialogContent"
              >
                {children}
              </motion.div>
            </DialogPrimitive.Content>
          </DialogPrimitive.Portal>
        )}
      </AnimatePresence>
    </DialogRoot>
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
    <DialogPrimitive.Title className={cn("text-lg", className)} {...props}>
      {children}
    </DialogPrimitive.Title>
  );
}

export function DialogClose({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof DialogPrimitive.Close>) {
  return (
    <DialogPrimitive.Close
      className="150ms absolute top-4 right-4 h-6 w-6 cursor-pointer p-0 text-muted-foreground transition-colors ease-out"
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
