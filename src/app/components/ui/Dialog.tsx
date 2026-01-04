"use client";

import { createContext, useContext, useState } from "react";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "./Button";
import { createSlot } from "./slot/slot";

/* ---------------------------------------------------------------------------
 *  Dialog Root Element
 * -------------------------------------------------------------------------*/

export type DialogProps = {
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

const DialogContext = createContext<Required<DialogProps> | null>(null);

export function Dialog({
  children,
  open,
  setOpen,
}: React.PropsWithChildren & DialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);

  const isControlled = setOpen !== undefined && open !== undefined;

  const contextValue = {
    open: isControlled ? (open ?? false) : internalOpen,
    setOpen: isControlled ? setOpen : setInternalOpen,
  };

  return (
    <DialogContext.Provider value={contextValue}>
      {children}
    </DialogContext.Provider>
  );
}

/* -----------------------------------------------------------------------
 * Dialog Content Container
 * ---------------------------------------------------------------------*/

export type DialogContentProps = React.PropsWithChildren & {
  className?: string;
};

export function DialogContent({
  children,
  className,
}: React.PropsWithChildren & { className?: string }) {
  const ctx = useContext(DialogContext);

  if (!ctx) throw new Error("<DialogContainer> must be used within <Dialog>");
  const { open } = ctx;

  // Only render portal on client-side to avoid SSR errors
  if (typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          <DialogOverlay />
          <motion.div
            className={cn(
              "bg-popup text-popup-foreground fixed top-1/2 left-1/2 z-50 flex w-[calc(100vw_-_2rem)] -translate-1/2 flex-col gap-6 rounded-xl p-6 shadow-popup sm:w-sm",
              className,
            )}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{
              opacity: 1,
              scale: 1,
              transition: { ease: "easeOut", duration: 0.25 },
            }}
            exit={{
              opacity: 0,
              scale: 0.9,
              transition: { ease: "easeIn", duration: 0.25 },
            }}
            key="dialogContent"
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body,
  );
}

/* --------------------------------------------------------------------------
 * Dialog Overlay
 * * ----------------------------------------------------------------------*/

function DialogOverlay({
  children,
  className,
}: React.PropsWithChildren & { className?: string }) {
  const ctx = useContext(DialogContext);

  if (!ctx) throw new Error("<DialogOverlay> must be used within <Dialog>");
  const { setOpen } = ctx;

  return (
    <motion.div
      className={cn(
        "fixed inset-0 z-50 h-screen w-screen bg-black/40 backdrop-blur-xs",
        className,
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      key="modalOverlay"
      onClick={() => setOpen(false)}
    >
      {children}
    </motion.div>
  );
}

/* ---------------------------------------------------------------------------
 * Dialog Trigger
 * -------------------------------------------------------------------------*/

export type DialogTriggerProps = ButtonProps & { asChild?: boolean };

export function DialogTrigger({
  variant,
  size,
  asChild,
  children,
  className,
  ...props
}: DialogTriggerProps) {
  const ctx = useContext(DialogContext);

  if (!ctx) throw new Error("<DialogTrigger> must be used within <Dialog>");
  const { setOpen } = ctx;

  const triggerProps = {
    onClick: () => setOpen(true),
    ...props,
  };

  if (asChild) {
    return createSlot(children, triggerProps);
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

/* ---------------------------------------------------------------------------
 *  Dialog Title
 * -------------------------------------------------------------------------*/

export function DialogTitle({
  children,
  className,
  ...props
}: React.ComponentPropsWithoutRef<"h2">) {
  return (
    <h2 className={cn("text-lg", className)} {...props}>
      {children}
    </h2>
  );
}

/* ---------------------------------------------------------------------------
 *  Dialog Close
 * -------------------------------------------------------------------------*/

export function DialogClose() {
  const ctx = useContext(DialogContext);

  if (!ctx) throw new Error("<DialogClose> must be used within <Dialog>");
  const { setOpen } = ctx;

  return (
    <Button
      variant="ghost"
      className="150ms absolute top-4 right-4 h-6 w-6 cursor-pointer p-0 text-muted-foreground transition-colors ease-out"
      onClick={() => setOpen(false)}
    >
      <X className="size-4" />
    </Button>
  );
}
