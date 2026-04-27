"use client";

import { createContext, useContext } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cva } from "class-variance-authority";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const DialogContext = createContext(false);

export function Dialog({
  open,
  children,
  isDrawer = false,
  ...props
}: React.ComponentPropsWithoutRef<typeof DialogPrimitive.Root> & {
  isDrawer?: boolean;
}) {
  return (
    <DialogPrimitive.Root open={open} {...props}>
      <DialogContext value={isDrawer}>{children}</DialogContext>
    </DialogPrimitive.Root>
  );
}

export function DialogOverlay({
  ...props
}: React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      className="fixed inset-0 isolate z-50 bg-background data-[state=closed]:animate-overlay-out data-[state=open]:animate-overlay-in sm:bg-black/30 sm:dark:bg-black/50"
      {...props}
    />
  );
}

const dialogContentVariants = cva(
  "fixed z-50 grid gap-3 bg-popup px-6 pt-6 w-full border border-border",
  {
    variants: {
      variant: {
        dialog:
          "top-1/2 bottom-auto left-1/2 w-lg max-w-[calc(100vw-2rem)] -translate-1/2 animate-dialog-in rounded-xl data-[state=closed]:animate-dialog-out",
        drawer:
          "bottom-0 rounded-t-xl left-0 animate-drawer-in data-[state=closed]:animate-drawer-out sm:top-1/2 sm:bottom-auto sm:left-1/2 sm:w-lg sm:max-w-[calc(100vw-2rem)] sm:-translate-1/2 sm:animate-dialog-in sm:rounded-xl sm:data-[state=closed]:animate-dialog-out",
      },
    },
    defaultVariants: { variant: "dialog" },
  },
);

export function DialogContent({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>) {
  const isDrawer = useContext(DialogContext);

  if (isDrawer === undefined)
    throw new Error("<DialogContent> is used outside of <Dialog>.");

  return (
    <DialogPrimitive.Portal>
      <DialogOverlay />
      <DialogPrimitive.Content
        className={cn(
          dialogContentVariants({ variant: isDrawer ? "drawer" : "dialog" }),
          className,
        )}
        {...props}
      >
        {children}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}

export function DialogTrigger({
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof DialogPrimitive.Trigger>) {
  return (
    <DialogPrimitive.Trigger {...props}>{children}</DialogPrimitive.Trigger>
  );
}

export function DialogTitle({
  children,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      className={cn("font-medium sm:text-sm", className)}
      {...props}
    >
      {children}
    </DialogPrimitive.Title>
  );
}

export function DialogHeader({
  className,
  children,
}: React.PropsWithChildren & { className?: string }) {
  return (
    <div className={cn("flex items-center justify-between", className)}>
      {children}
    </div>
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
        "-mx-6 mt-4 flex items-center justify-end gap-5 rounded-b-xl border-t border-border p-6 py-4 inset-shadow-[0_2px_4px_-2px_rgba(0,0,0,0.05)] dark:border-neutral-700/50",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

const dialogCloseVariants = cva(
  "flex items-center justify-center rounded-full transition-colors ease-[ease] focus-visible:text-foreground focus-visible:outline-none",
  {
    variants: {
      variant: {
        dialog:
          "order-last size-5 bg-transparent text-muted-foreground hover:text-foreground",
        drawer:
          "size-9 border border-border bg-foreground/5 hover:bg-foreground/8 sm:order-last sm:size-5 sm:border-none sm:bg-transparent sm:text-muted-foreground sm:hover:bg-transparent sm:hover:text-foreground",
      },
    },
    defaultVariants: { variant: "dialog" },
  },
);

export function DialogClose({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof DialogPrimitive.Close>) {
  const isDrawer = useContext(DialogContext);

  if (isDrawer === undefined)
    throw new Error("<DialogClose> is used outside of <Dialog>.");

  return (
    <DialogPrimitive.Close
      className={cn(
        dialogCloseVariants({ variant: isDrawer ? "drawer" : "dialog" }),
        className,
      )}
      {...props}
    >
      <X className="size-5 sm:size-4" />
    </DialogPrimitive.Close>
  );
}

export function DialogDescription({
  children,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description className={className} {...props}>
      {children}
    </DialogPrimitive.Description>
  );
}
