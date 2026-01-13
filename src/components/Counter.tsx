"use client";

import { startTransition, useOptimistic } from "react";
import { toast } from "sonner";
import { updateProject } from "@/actions/projects";
import { useCountDirection } from "@/contexts/CountDirectionContext";
import { useSubCounter } from "@/contexts/SubCounterContext";
import { type CountDirection, type Project } from "@/lib/types";
import { RowCounterButton } from "./svg/RowCounterButton";
import { RowCounterInner } from "./svg/RowCounterInner";
import { RowCounterLeftGear } from "./svg/RowCounterLeftGear";
import { RowCounterRightGear } from "./svg/RowCounterRightGear";
import { RowCounterShell } from "./svg/RowCounterShell";
import { RowCounterSpring } from "./svg/RowCounterSpring";

export function Counter({ project }: { project: Project }) {
  const [direction] = useCountDirection();
  const { count, setCount } = useSubCounter();

  const [optimisticCount, countOptimistic] = useOptimistic<
    number,
    CountDirection
  >(count, (current, optimisticValue) => current + optimisticValue);

  function handleCount() {
    if (count + direction > 99 || count + direction < 1) return;

    startTransition(async () => {
      countOptimistic(direction);
      try {
        await updateProject({ count: count + direction }, project.id);
        setCount(count + direction);
      } catch (e) {
        console.error("Update project error:", e);
        toast.error(
          `An error ocurred. Your row count has been reset from ${count + direction} to ${count}.`,
        );
      }
    });
  }

  return (
    <button
      onClick={() => handleCount()}
      className="relative mt-10 h-fit w-fit cursor-pointer flex-col items-center justify-center"
    >
      <RowCounterInner className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 fill-white opacity-20" />
      <RowCounterSpring
        data-spring
        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[6px] fill-zinc-600"
      />
      <RowCounterButton className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[70%] opacity-70" />
      <RowCounterLeftGear
        style={{
          transform: `rotate(${Math.floor(optimisticCount / 10) * 36}deg)`,
        }}
        className="absolute top-1/2 left-0 -translate-x-[16%] -translate-y-1/2 rotate-36 fill-zinc-200 drop-shadow-lg"
      />
      <RowCounterRightGear
        className="absolute top-1/2 right-0 translate-x-[16%] -translate-y-1/2 -rotate-36 drop-shadow-lg"
        style={{ transform: `rotate(-${optimisticCount * 36}deg)` }}
      />
      <RowCounterShell className="fill-counter opacity-90 drop-shadow-md drop-shadow-zinc-900" />
    </button>
  );
}
