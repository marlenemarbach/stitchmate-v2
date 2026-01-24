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
        "relative flex w-fit items-center gap-1 rounded-full border border-border bg-popup p-1 text-popup-foreground",
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
      className={cn(
        "flex items-center gap-1 rounded-full bg-zinc-800 p-1 has-[:focus-visible]:ring-[1.5px] has-[:focus-visible]:ring-ring has-[:focus-visible]:outline-none",
        className,
      )}
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
        "flex size-7 items-center justify-center rounded-full border-none transition-colors duration-150 ease-out hover:bg-primary/5 focus-visible:outline-none data-[state=active]:bg-primary data-[state=active]:text-primary-foreground [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
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
        "flex size-9 items-center justify-center rounded-full transition-colors duration-150 ease-out hover:bg-foreground/10 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-5",
        className,
      )}
      {...props}
    >
      {children}
    </ToolbarPrimitive.ToolbarButton>
  );
}
