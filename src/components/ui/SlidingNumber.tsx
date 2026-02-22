import { motion } from "motion/react";
import { cn } from "../../lib/utils";

type NumberCarouselProps = {
  value: number;
  direction?: 1 | -1;
};

export function SlidingNumber({
  value = 1,
  direction = 1,
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div"> & NumberCarouselProps) {
  const numbers = [value - 1, value, value + 1];

  return (
    <div
      className={cn(
        "pointer-events-none relative inset-0 overflow-hidden bg-inherit mask-y-from-80% mask-y-to-100%",
        className,
      )}
      {...props}
    >
      {numbers.map((number, i) => {
        return (
          <SlidingNumberItem key={number} direction={direction} index={i}>
            {number}
          </SlidingNumberItem>
        );
      })}
    </div>
  );
}

function SlidingNumberItem({
  className,
  direction,
  children,
  index,
}: {
  className?: string;
  direction: 1 | -1;
  children: React.ReactNode;
  index: number;
}) {
  const previousIndex = index + direction;
  const previousPosition = previousIndex * 42 - 42;
  const currentPosition = index * 42 - 42;

  return (
    <motion.span
      className={cn(
        "absolute inset-0 flex items-center justify-center text-lg",
        className,
      )}
      initial={{ y: previousPosition }}
      animate={{ y: currentPosition }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 20,
        mass: 0.4,
      }}
    >
      {children}
    </motion.span>
  );
}
