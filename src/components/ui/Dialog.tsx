"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export function Dialog({
  open,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof DialogPrimitive.Root>) {
  return (
    <DialogPrimitive.Root open={open} {...props}>
      {children}
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

export function DialogContent({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>) {
  return (
    <DialogPrimitive.Portal>
      <DialogOverlay />
      <DialogPrimitive.Content
        className={cn(
          "fixed bottom-0 left-0 z-50 grid w-full animate-drawer-in gap-3 rounded-t-xl border border-border bg-popup px-6 pt-6 data-[state=closed]:animate-drawer-out data-[state=open]:opacity-100",
          "sm:top-1/2 sm:bottom-auto sm:left-1/2 sm:w-lg sm:max-w-[calc(100vw-2rem)] sm:-translate-1/2 sm:animate-dialog-in sm:rounded-xl sm:data-[state=closed]:animate-dialog-out",
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
export function DialogClose({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof DialogPrimitive.Close>) {
  return (
    <DialogPrimitive.Close
      className={cn(
        "flex size-9 items-center justify-center rounded-full border border-border bg-foreground/5 transition-colors ease-[ease] hover:bg-foreground/8 focus-visible:text-foreground focus-visible:outline-none",
        "sm:order-last sm:size-5 sm:border-none sm:bg-transparent sm:text-muted-foreground sm:hover:bg-transparent sm:hover:text-foreground",
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
