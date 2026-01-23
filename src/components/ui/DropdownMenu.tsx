import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
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
          "grid min-w-40 gap-1 rounded-xl bg-zinc-800 p-2 text-sm drop-shadow drop-shadow-background",
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
        "grid grid-cols-[1rem_1fr] items-center gap-1 rounded-lg px-2 py-1 text-sm hover:bg-foreground/10 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-3",
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
      className={cn("-mx-2 h-[1px] bg-border", className)}
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
    <DropdownMenuPrimitive.Group className={cn("", className)} {...props}>
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
      className={cn("text-xs text-muted-foreground", className)}
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
    <DropdownMenuPrimitive.RadioGroup className={cn("", className)} {...props}>
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
        "grid grid-cols-[1rem_1fr] items-center gap-1 rounded-lg px-2 py-1 text-sm hover:bg-foreground/10",
        className,
      )}
      {...props}
    >
      <DropdownMenuRadioIndicator forceMount />
      {children}
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
        "pointer-events-none text-transparent data-[state=checked]:text-muted-foreground",
        className,
      )}
      {...props}
    >
      <svg height="6" width="6" xmlns="http://www.w3.org/2000/svg">
        <circle r="3" cx="3" cy="3" fill="currentColor" />
      </svg>
    </DropdownMenuPrimitive.ItemIndicator>
  );
}
