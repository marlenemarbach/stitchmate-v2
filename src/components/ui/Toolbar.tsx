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

export function ToolbarToggleGroup({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof ToolbarPrimitive.ToolbarToggleGroup>) {
  return (
    <ToolbarPrimitive.ToolbarToggleGroup
      className={cn("flex items-center", className)}
      {...props}
    >
      {children}
    </ToolbarPrimitive.ToolbarToggleGroup>
  );
}

export function ToolbarToggleItem({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof ToolbarPrimitive.ToolbarToggleItem>) {
  return (
    <ToolbarPrimitive.ToolbarToggleItem
      className={cn(
        "flex items-center justify-center focus-visible:ring-[1.5px] focus-visible:ring-ring focus-visible:outline-none",
        className,
      )}
      {...props}
    >
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
    <ToolbarPrimitive.ToolbarButton
      className={cn(
        "duration-default flex hover-btn-default items-center justify-center rounded-full transition-[background,transform] ease-out hover:transition-none active:scale-97 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-5",
        className,
      )}
      {...props}
    >
      {children}
    </ToolbarPrimitive.ToolbarButton>
  );
}
