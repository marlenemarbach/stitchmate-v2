"use client";

import { AnimatePresence, motion } from "motion/react";
import { useCount } from "@/contexts/CountContext";
import { type SubCounter } from "@/lib/types";
import { cn } from "@/lib/utils";

export function SubCounter({
  subCounter,
  className,
}: {
  subCounter: SubCounter;
  className?: string;
}) {
  const { count } = useCount();

  const progress = calculateProgress(
    count,
    subCounter.startRow,
    subCounter.interval,
  );

  console.log("progress", progress);

  return (
    <AnimatePresence>
      {subCounter.active && (
        <motion.div
          key="subcounter"
          className={cn("flex w-fit items-center gap-2", className)}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
        >
          <SubCounterCircle
            progress={progress}
            interval={subCounter.interval}
          />
          <p className="absolute top-1/2 left-1/2 -translate-1/2 text-lg font-medium">
            {getSubCounterCount(
              count,
              subCounter.startRow,
              subCounter.interval,
            )}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function SubCounterCircle({
  progress,
  interval,
}: {
  progress: number;
  interval: number;
}) {
  const pathLength = 1 * (progress / interval);

  return (
    <motion.svg
      data-state={progress === interval ? "active" : "inactive"}
      className="relative h-[4.5rem] w-[4.5rem]"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16 8C20.4183 8 24 11.5817 24 16C24 20.4183 20.4183 24 16 24C11.5817 24 8 20.4183 8 16C8 11.5817 11.5817 8 16 8Z"
        className="stroke-ultramarine-200/60 dark:stroke-ultramarine-200/40"
        strokeWidth="2"
      />
      {pathLength > 0 && (
        <motion.path
          className="stroke-ultramarine-300 drop-shadow-xs"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: pathLength }}
          d="M16 8C20.4183 8 24 11.5817 24 16C24 20.4183 20.4183 24 16 24C11.5817 24 8 20.4183 8 16C8 11.5817 11.5817 8 16 8Z"
          strokeWidth="2"
          strokeLinecap="round"
        />
      )}
    </motion.svg>
  );
}

/* ---------------------------------------------------------------------------- */

function calculateProgress(count: number, start: number, interval: number) {
  if (count <= start) return 0;

  const progress = (count - start) % interval;
  if (progress === 0) return interval;
  return progress;
}

function getSubCounterCount(
  currentCount: number,
  start: number,
  interval: number,
) {
  return Math.max(Math.floor((currentCount - start) / interval + 1), 0);
}
