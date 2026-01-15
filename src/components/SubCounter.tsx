"use client";

import { AnimatePresence, motion } from "motion/react";
import { useSubCounter } from "@/contexts/SubCounterContext";
import { type SubCounter } from "@/lib/types";
import { cn } from "@/lib/utils";

export function SubCounter({
  subCounter,
  className,
}: {
  subCounter: SubCounter;
  className?: string;
}) {
  const { state, count } = useSubCounter();

  // TODO: show subcounter with 0 value, when count is smaller than start Row

  const mockSubCounter = {
    active: true,
    createdAt: "2026-01-02 14:27:11",
    id: 3,
    interval: 5,
    projectId: 38,
    startRow: 20,
    updatedAt: "2026-01-14 18:59:37",
  };

  const progress = calculateProgress(
    count,
    mockSubCounter.startRow,
    mockSubCounter.interval,
  );
  // const isNotification = step === 0;

  return (
    <AnimatePresence>
      {state === "on" && (
        <motion.div
          data-state={state}
          key="reminder"
          className={cn("flex w-fit items-center gap-2", className)}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
        >
          <SubCounterCircle
            progress={progress}
            interval={mockSubCounter.interval}
          />
          {/* {isNotification && ( */}
          {/*   <svg className="absolute bottom-0 left-1/2 size-2 -translate-1/2 fill-counter-foreground drop-shadow-lg drop-shadow-counter-foreground"> */}
          {/*     <circle cx="4" cy="4" r="4" /> */}
          {/*   </svg> */}
          {/* )} */}
          {/* <p className="absolute top-1/2 left-1/2 -translate-1/2 text-base"> */}
          {/*   {getSubCounterCount( */}
          {/*     count, */}
          {/*     mockSubCounter.startRow, */}
          {/*     mockSubCounter.interval, */}
          {/*   )} */}
          {/* </p> */}

          <p className="">
            {getSubCounterCount(
              count,
              mockSubCounter.startRow,
              mockSubCounter.interval,
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
      className="mt-5"
      width="48"
      height="48"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16 8C20.4183 8 24 11.5817 24 16C24 20.4183 20.4183 24 16 24C11.5817 24 8 20.4183 8 16C8 11.5817 11.5817 8 16 8Z"
        className="stroke-ultramarine-500/30"
        strokeWidth="3"
      />
      <motion.path
        className="stroke-ultramarine-500"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: pathLength }}
        d="M16 8C20.4183 8 24 11.5817 24 16C24 20.4183 20.4183 24 16 24C11.5817 24 8 20.4183 8 16C8 11.5817 11.5817 8 16 8Z"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </motion.svg>
  );
}

// export function SubCounterCircle({
//   progress,
//   interval,
// }: {
//   progress: number;
//   interval: number;
// }) {
//   const pathLength = 1 * (progress / interval);
//
//   return (
//     <motion.svg
//       width="32"
//       height="32"
//       viewBox="0 0 64 64"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       <path
//         className="stroke-primary"
//         d="M32 4C47.464 4 60 16.536 60 32C60 47.464 47.464 60 32 60C16.536 60 4 47.464 4 32C4 16.536 16.536 4 32 4Z"
//         strokeWidth="12"
//       />
//       <motion.path
//         className="stroke-counter-foreground"
//         initial={{ pathLength: 0 }}
//         animate={{ pathLength: pathLength }}
//         d="M32 4C47.464 4 60 16.536 60 32C60 47.464 47.464 60 32 60C16.536 60 4 47.464 4 32C4 16.536 16.536 4 32 4Z"
//         strokeWidth="12"
//       />
//     </motion.svg>
//   );
// }

/* ---------------------------------------------------------------------------- */

function calculateProgress(count: number, start: number, interval: number) {
  const progress = (count - start) % interval;
  if (progress === 0) return interval;
  return progress;
}

function getSubCounterCount(
  currentCount: number,
  start: number,
  interval: number,
) {
  console.log("currentCount", currentCount, currentCount - start, "distance");
  return Math.floor((currentCount - start) / interval + 1);
}
