"use client";

import { createContext, startTransition, use, useMemo, useState } from "react";
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
  const [currentCount, setCurrentCount] = useState(count);

  const contextValue = useMemo(() => {
    function updateCount(direction: 1 | -1, projectId: number) {
      setCurrentCount((prev) => prev + direction);
      startTransition(async () => {
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
      count: currentCount,
      updateCount,
    };
  }, [currentCount, count]);

  return <CountContext value={contextValue}>{children}</CountContext>;
}

export function useCount() {
  const ctx = use(CountContext);
  if (!ctx) throw new Error("Must be used within SubCounterProvider");

  return ctx;
}
