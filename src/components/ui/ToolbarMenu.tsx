import * as DialogPrimitive from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "motion/react";
import useMeasure from "react-use-measure";
import { cn } from "@/lib/utils";

type ToolbarMenuProps = {
  children: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  className?: string;
};

export function ToolbarMenu({
  className,
  open,
  onOpenChange,
  children,
  ...props
}: ToolbarMenuProps &
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>) {
  const [ref, bounds] = useMeasure({ offsetSize: true });

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className={cn(
            "absolute bottom-14 left-1/2 z-100 w-[calc(100vw_-_2rem)] max-w-[22rem] origin-bottom -translate-x-1/2 overflow-hidden rounded-xl bg-popup shadow-popup will-change-transform",
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
          <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
            <DialogPrimitive.Content
              forceMount
              ref={ref}
              className="px-6 pt-6 pb-5"
              {...props}
            >
              {children}
            </DialogPrimitive.Content>
          </DialogPrimitive.Root>
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
