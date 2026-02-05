import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function DropdownMenu({
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Root>) {
  return (
    <DropdownMenuPrimitive.Root {...props}>
      {children}
    </DropdownMenuPrimitive.Root>
  );
}

export function DropdownMenuTrigger({ children }: React.PropsWithChildren) {
  return (
    <DropdownMenuPrimitive.Trigger asChild>
      {children}
    </DropdownMenuPrimitive.Trigger>
  );
}

function DropdownMenuPortal({
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Portal>) {
  return (
    <DropdownMenuPrimitive.Portal {...props}>
      {children}
    </DropdownMenuPrimitive.Portal>
  );
}

export function DropdownMenuContent({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>) {
  return (
    <DropdownMenuPortal>
      <DropdownMenuPrimitive.Content
        className={cn(
          "grid min-w-40 rounded-lg bg-neutral-50 p-1 text-sm text-neutral-600 drop-shadow-sm dark:border dark:border-neutral-700/80 dark:bg-neutral-800 dark:text-foreground dark:drop-shadow-background",
          className,
        )}
        {...props}
      >
        {children}
      </DropdownMenuPrimitive.Content>
    </DropdownMenuPortal>
  );
}

export function DropdownMenuItem({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item>) {
  return (
    <DropdownMenuPrimitive.Item
      className={cn(
        "grid h-8 cursor-default grid-cols-[1rem_1fr] items-center gap-2 rounded-lg px-2 text-sm hover:bg-foreground/5 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      {children}
    </DropdownMenuPrimitive.Item>
  );
}

export function DropdownMenuSeparator({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>) {
  return (
    <DropdownMenuPrimitive.Separator
      className={cn(
        "-mx-1 my-1 h-[1px] bg-border dark:bg-neutral-700/80",
        className,
      )}
      {...props}
    />
  );
}

export function DropdownMenuGroup({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Group>) {
  return (
    <DropdownMenuPrimitive.Group className={className} {...props}>
      {children}
    </DropdownMenuPrimitive.Group>
  );
}

export function DropdownMenuLabel({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label>) {
  return (
    <DropdownMenuPrimitive.Label
      className={cn(
        "my-1 ml-2 text-xs font-medium text-muted-foreground",
        className,
      )}
      {...props}
    >
      {children}
    </DropdownMenuPrimitive.Label>
  );
}

export function DropdownMenuRadioGroup({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioGroup>) {
  return (
    <DropdownMenuPrimitive.RadioGroup className={className} {...props}>
      {children}
    </DropdownMenuPrimitive.RadioGroup>
  );
}

export function DropdownMenuRadioItem({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>) {
  return (
    <DropdownMenuPrimitive.RadioItem
      className={cn(
        "grid h-8 cursor-default grid-cols-[1rem_1fr_1fr] items-center gap-2 rounded-lg px-2 text-sm hover:bg-foreground/5 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      {children}
      <DropdownMenuRadioIndicator forceMount />
    </DropdownMenuPrimitive.RadioItem>
  );
}

export function DropdownMenuRadioIndicator({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.ItemIndicator>) {
  return (
    <DropdownMenuPrimitive.ItemIndicator
      className={cn(
        "pointer-events-none justify-self-end text-transparent data-[state=checked]:text-muted-foreground",
        className,
      )}
      {...props}
    >
      <Check className="size-5" />
    </DropdownMenuPrimitive.ItemIndicator>
  );
}
