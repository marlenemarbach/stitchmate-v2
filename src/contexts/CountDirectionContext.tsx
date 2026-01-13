"use client";

import { createContext, use, useMemo, useState } from "react";
import { type CountDirection } from "@/lib/types";

export const CountDirectionContext = createContext<{
  direction: CountDirection;
  toggleDirection: () => void;
} | null>(null);

export function CountDirectionProvider({
  children,
  initialDirection,
}: React.PropsWithChildren & { initialDirection: CountDirection }) {
  const [direction, setDirection] = useState(initialDirection);

  const contextValue = useMemo(() => {
    const toggleDirection = () => {
      setDirection((prev) => (prev * -1) as CountDirection);
    };
    return { direction, toggleDirection };
  }, [direction, setDirection]);

  return (
    <CountDirectionContext value={contextValue}>
      {children}
    </CountDirectionContext>
  );
}

export function useCountDirection(): [CountDirection, () => void] {
  const ctx = use(CountDirectionContext);
  if (!ctx) throw new Error("Must be used within DirectionProvider");

  const { direction, toggleDirection } = ctx;

  return [direction, toggleDirection];
}
