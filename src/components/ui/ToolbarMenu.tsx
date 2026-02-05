import { createContext, use } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "motion/react";
import useMeasure from "react-use-measure";
import { cn } from "@/lib/utils";

const ToolbarMenuContext = createContext<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
} | null>(null);

function useToolbarMenu() {
  const ctx = use(ToolbarMenuContext);
  if (!ctx) throw new Error("Must be used withing ToolbarMenuContext");
  return ctx;
}

type ToolbarMenuProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function ToolbarMenu({
  open,
  onOpenChange,
  children,
  ...props
}: Omit<
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Root>,
  "open" | "onOpenChange"
> &
  ToolbarMenuProps) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange} {...props}>
      <ToolbarMenuContext value={{ open, onOpenChange }}>
        {children}
      </ToolbarMenuContext>
    </DialogPrimitive.Root>
  );
}

export function ToolbarMenuContent({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>) {
  const { open } = useToolbarMenu();
  const [ref, bounds] = useMeasure({ offsetSize: true });

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className={cn(
            "absolute bottom-14 left-1/2 z-100 w-[calc(100vw_-_2rem)] max-w-[22rem] origin-bottom -translate-x-1/2 overflow-hidden rounded-xl border border-border/50 bg-neutral-50 inset-shadow-xs inset-shadow-border/50 will-change-transform dark:bg-popup",
            className,
          )}
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: 1,
            height: bounds.height,
            transition: {
              type: "spring",
              stiffness: 2000,
              damping: 160,
              mass: 2,
            },
          }}
          exit={{
            opacity: 0,
            scaleY: 0.97,
            transition: { ease: "easeOut", duration: 0.15 },
          }}
        >
          <DialogPrimitive.Content
            forceMount
            ref={ref}
            className="px-6 pt-5 pb-4"
            {...props}
          >
            {children}
          </DialogPrimitive.Content>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function ToolbarMenuTitle({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      className={cn("text-large font-medium", className)}
      {...props}
    >
      {children}
    </DialogPrimitive.Title>
  );
}

export function ToolbarMenuDescription({
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description className={"sr-only"} {...props}>
      {children}
    </DialogPrimitive.Description>
  );
}
