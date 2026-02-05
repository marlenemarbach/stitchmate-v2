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
        "relative flex w-fit items-center gap-2 rounded-full border border-border bg-popup p-1 drop-shadow-xs dark:border-border",
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
        "flex items-center gap-1 rounded-full border border-border bg-popup p-1 drop-shadow-xs",
        "has-[:focus-visible]:bg-foreground/5 has-[:focus-visible]:outline-none",
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
        "flex size-8 items-center justify-center rounded-full text-muted-foreground transition-colors duration-150 ease-in-out hover:bg-foreground/5 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
        "focus-visible:outline-none data-[state=active]:bg-ultramarine-800/80 data-[state=active]:text-neutral-50 dark:data-[state=active]:bg-neutral-100 dark:data-[state=active]:text-neutral-900",
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
        "mr-1 flex size-10 items-center justify-center rounded-full border border-border bg-popup text-muted-foreground drop-shadow-xs transition-colors duration-150 ease-out hover:bg-foreground/5 hover:text-foreground [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-5",
        "focus-visible:bg-foreground/5 focus-visible:outline-none",
        className,
      )}
      {...props}
    >
      {children}
    </ToolbarPrimitive.ToolbarButton>
  );
}
