"use client";

import { createContext, useContext, useState } from "react";
import { cn } from "../lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { createPortal } from "react-dom";
import { Button, ButtonProps } from "./Button";
import { createSlot } from "../lib/slot";

/* ---------------------------------------------------------------------------
 *  Modal Root Element
 * -----------------------------------------------------------------------------------------------*/

export type ModalProps = {
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

const ModalContext = createContext<Required<ModalProps> | null>(null);

export function Modal({
  children,
  open,
  setOpen,
}: React.PropsWithChildren & ModalProps) {
  const [internalOpen, setInternalOpen] = useState(false);

  const isControlled = setOpen !== undefined && open !== undefined;

  const contextValue = {
    open: isControlled ? (open ?? false) : internalOpen,
    setOpen: isControlled ? setOpen : setInternalOpen,
  };

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
    </ModalContext.Provider>
  );
}

/* -------------------------------------------------------------------------------------------------
 * Modal Content Container
 * -----------------------------------------------------------------------------------------------*/

export function ModalContainer({
  children,
  className,
}: React.PropsWithChildren & { className?: string }) {
  const ctx = useContext(ModalContext);

  if (!ctx) throw new Error("<ModalContainer> must be used within <Modal>");
  const { open } = ctx;

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          <ModalOverlay />
          <motion.div
            className={cn(
              "absolute top-1/2 left-1/2 -translate-1/2 rounded bg-midnight-700 p-2 elevation-level-1",
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
 * Modal Overlay
 * * -----------------------------------------------------------------------------------------------*/

function ModalOverlay({
  children,
  className,
}: React.PropsWithChildren & { className?: string }) {
  const ctx = useContext(ModalContext);

  if (!ctx) throw new Error("<ModalOverlay> must be used within <Modal>");
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
 * Modal Trigger
 * -----------------------------------------------------------------------------------------------*/

export function ModalTrigger({
  variant,
  size,
  asChild,
  children,
  className,
  ...props
}: ButtonProps & { asChild?: boolean }) {
  const ctx = useContext(ModalContext);

  if (!ctx) throw new Error("<ModalTrigger> must be used within <Modal>");
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
