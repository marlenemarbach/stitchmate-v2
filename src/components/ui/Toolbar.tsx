"use client";
import * as ToolbarPrimitive from "@radix-ui/react-toolbar";
import { cn } from "@/lib/utils";

export function Toolbar({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof ToolbarPrimitive.Root>) {
  return (
    <ToolbarPrimitive.Root
      className={cn(
        "tems-center relative flex w-fit gap-2 rounded-full border border-border bg-popup p-1 text-popup-foreground",
        className,
      )}
      {...props}
    >
      {children}
    </ToolbarPrimitive.Root>
  );
}

export function ToolbarToogleGroup({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof ToolbarPrimitive.ToolbarToggleGroup>) {
  return (
    <ToolbarPrimitive.ToolbarToggleGroup className={cn(className)} {...props}>
      {children}
    </ToolbarPrimitive.ToolbarToggleGroup>
  );
}

export function ToolbarToogleItem({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof ToolbarPrimitive.ToolbarToggleItem>) {
  return (
    <ToolbarPrimitive.ToolbarToggleItem className={cn(className)} {...props}>
      {children}
    </ToolbarPrimitive.ToolbarToggleItem>
  );
}

export function ToolbarButton({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof ToolbarPrimitive.ToolbarButton>) {
  return (
    <ToolbarPrimitive.ToolbarButton className={cn(className)} {...props}>
      {children}
    </ToolbarPrimitive.ToolbarButton>
  );
}
