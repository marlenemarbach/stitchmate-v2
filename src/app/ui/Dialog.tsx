"use client";

import { AnimatePresence, motion } from "motion/react";
import { createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";

import { createSlot } from "../lib/slot";
import { cn } from "../lib/utils";
import { Button, ButtonProps } from "./Button";

/* ---------------------------------------------------------------------------
 *  Dialog Root Element
 * -----------------------------------------------------------------------------------------------*/

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

/* -------------------------------------------------------------------------------------------------
 * Dialog Content Container
 * -----------------------------------------------------------------------------------------------*/

export function DialogContainer({
  children,
  className,
}: React.PropsWithChildren & { className?: string }) {
  const ctx = useContext(DialogContext);

  if (!ctx) throw new Error("<DialogContainer> must be used within <Modal>");
  const { open } = ctx;

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          <DialogOverlay />
          <motion.div
            className={cn(
              "bg-midnight-700 elevation-level-1 absolute top-1/2 left-1/2 -translate-1/2 rounded p-2",
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
            key="modalContent"
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body,
  );
}

/* -------------------------------------------------------------------------------------------------
 * Dialog Overlay
 * * -----------------------------------------------------------------------------------------------*/

function DialogOverlay({
  children,
  className,
}: React.PropsWithChildren & { className?: string }) {
  const ctx = useContext(DialogContext);

  if (!ctx) throw new Error("<DialogOverlay> must be used within <Modal>");
  const { setOpen } = ctx;

  return (
    <motion.div
      className={cn(
        "absolute h-screen w-full bg-black/40 backdrop-blur-xs",
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

/* -------------------------------------------------------------------------------------------------
 * Dialog Trigger
 * -----------------------------------------------------------------------------------------------*/

export function DialogTrigger({
  variant,
  size,
  asChild,
  children,
  className,
  ...props
}: ButtonProps & { asChild?: boolean }) {
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
