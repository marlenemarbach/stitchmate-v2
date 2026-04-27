import * as ContextMenuPrimitive from "@radix-ui/react-context-menu";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function ContextMenu({
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Root>) {
  return (
    <ContextMenuPrimitive.Root {...props}>{children}</ContextMenuPrimitive.Root>
  );
}

export function ContextMenuContent({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Content>) {
  return (
    <ContextMenuPrimitive.Content
      className={cn("rounded-xl border border-border bg-popup p-1", className)}
      {...props}
    >
      {children}
    </ContextMenuPrimitive.Content>
  );
}

export function ContextMenuTrigger({
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Trigger>) {
  return (
    <ContextMenuPrimitive.Trigger {...props}>
      {children}
    </ContextMenuPrimitive.Trigger>
  );
}

export function ContextMenuItem({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Item>) {
  return (
    <ContextMenuPrimitive.Item
      className={cn(
        "grid h-9 cursor-default grid-cols-[1rem_1fr] items-center gap-2 rounded-full px-3 text-sm hover:bg-foreground/5 focus-visible:bg-foreground/5 focus-visible:outline-none [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      {children}
    </ContextMenuPrimitive.Item>
  );
}

export function ContextMenuSeparator({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Separator>) {
  return (
    <ContextMenuPrimitive.Separator
      className={cn(
        "-mx-1 my-1 h-[1px] bg-border dark:bg-neutral-700/80",
        className,
      )}
      {...props}
    />
  );
}

export function ContextMenuGroup({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Group>) {
  return (
    <ContextMenuPrimitive.Group className={className} {...props}>
      {children}
    </ContextMenuPrimitive.Group>
  );
}

export function ContextMenuLabel({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Label>) {
  return (
    <ContextMenuPrimitive.Label
      className={cn("my-1 ml-2 text-xs text-muted-foreground", className)}
      {...props}
    >
      {children}
    </ContextMenuPrimitive.Label>
  );
}

export function ContextMenuRadioGroup({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.RadioGroup>) {
  return (
    <ContextMenuPrimitive.RadioGroup className={className} {...props}>
      {children}
    </ContextMenuPrimitive.RadioGroup>
  );
}

export function ContextMenuRadioIndicator({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.ItemIndicator>) {
  return (
    <ContextMenuPrimitive.ItemIndicator
      className={cn(
        "pointer-events-none justify-self-end text-transparent data-[state=checked]:text-muted-foreground",
        className,
      )}
      {...props}
    >
      <Check className="size-5" />
    </ContextMenuPrimitive.ItemIndicator>
  );
}

export function ContextMenuRadioItem({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.RadioItem>) {
  return (
    <ContextMenuPrimitive.RadioItem
      className={cn(
        "grid h-8 cursor-default grid-cols-[1rem_1fr_1fr] items-center gap-2 rounded-lg px-2 text-sm hover:bg-foreground/5 focus-visible:bg-foreground/5 focus-visible:outline-none [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      {children}
      <ContextMenuRadioIndicator forceMount />
    </ContextMenuPrimitive.RadioItem>
  );
}
