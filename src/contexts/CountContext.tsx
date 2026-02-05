"use client";

import {
  createContext,
  startTransition,
  use,
  useMemo,
  useOptimistic,
} from "react";
import { toast } from "sonner";
import { updateProject } from "@/actions/projects";

export const CountContext = createContext<{
  count: number;
  updateCount: (direction: 1 | -1, projectId: number) => void;
} | null>(null);

export function CountProvider({
  count,
  children,
}: React.PropsWithChildren & {
  count: number;
}) {
  const [optimisticCount, setOptimisticCount] = useOptimistic(
    count,
    (current, direction: number) => current + direction,
  );

  const contextValue = useMemo(() => {
    function updateCount(direction: 1 | -1, projectId: number) {
      startTransition(async () => {
        setOptimisticCount(direction);
        try {
          await updateProject({ count: count + direction }, projectId);
        } catch (e) {
          console.error("Update project error:", e);
          toast.error(
            `Something went wrong saving your count. It has been reset from ${count + direction} to ${count}.`,
          );
        }
      });
    }

    return {
      count: optimisticCount,
      updateCount,
    };
  }, [optimisticCount, setOptimisticCount, count]);

  return <CountContext value={contextValue}>{children}</CountContext>;
}

export function useCount() {
  const ctx = use(CountContext);
  if (!ctx) throw new Error("Must be used within SubCounterProvider");

  return ctx;
}
