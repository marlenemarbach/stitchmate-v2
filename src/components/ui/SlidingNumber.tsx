"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

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
        "pointer-events-none relative h-9 overflow-hidden bg-black/10 mask-y-from-80% mask-y-to-100%",
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
  const previousPosition = previousIndex * 36 - 36;
  const currentPosition = index * 36 - 36;

  return (
    <motion.span
      className={cn(
        "absolute flex h-9 w-full items-center justify-center",
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
