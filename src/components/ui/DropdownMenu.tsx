import { createContext, use } from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { Check } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";

const MenuContext = createContext<boolean | null | undefined>(null);

function useMenu() {
  const ctx = use(MenuContext);
  // if (!ctx) throw new Error(" Must be a child of DropdownMenu");

  return ctx;
}

export function DropdownMenu({
  children,
  open,
  ...props
}: React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Root>) {
  return (
    <DropdownMenuPrimitive.Root open={open} {...props}>
      <MenuContext value={open}>{children}</MenuContext>
    </DropdownMenuPrimitive.Root>
  );
}

export function DropdownMenuTrigger({
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Trigger>) {
  return (
    <DropdownMenuPrimitive.Trigger {...props}>
      {children}
    </DropdownMenuPrimitive.Trigger>
  );
}

export function DropdownMenuContent({
  className,
  children,
  side = "left",
  ...props
}: Omit<
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>,
  "side" | "sideOffset" | "align"
> & { side?: "left" | "right" }) {
  const open = use(MenuContext);

  return (
    <AnimatePresence>
      {open && (
        <DropdownMenuPrimitive.Portal forceMount>
          <DropdownMenuPrimitive.Content
            side={side}
            align="start"
            sideOffset={4}
            {...props}
            asChild
          >
            <motion.div
              style={{
                transformOrigin: `top ${side === "left" ? "right" : "left"}`,
              }}
              className={cn("rounded-3xl border-popup p-1", className)}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{
                type: "spring",
                duration: 0.25,
                bounce: 0.3,
              }}
            >
              {children}
            </motion.div>
          </DropdownMenuPrimitive.Content>
        </DropdownMenuPrimitive.Portal>
      )}
    </AnimatePresence>
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
        "grid h-9 cursor-default grid-cols-[1rem_1fr] items-center gap-2 rounded-full px-3 text-sm hover:bg-foreground/5 focus-visible:bg-foreground/5 focus-visible:outline-none [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
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
      className={cn("my-1 ml-2 text-xs text-muted-foreground", className)}
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
        "grid h-8 cursor-default grid-cols-[1rem_1fr_1fr] items-center gap-2 rounded-lg px-2 text-sm hover:bg-foreground/5 focus-visible:bg-foreground/5 focus-visible:outline-none [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
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
