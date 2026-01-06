"use client";

import { createContext, useState } from "react";
import { CountDirection, ProjectWithSubCounter } from "@/lib/types";

export const CountDirectionContext = createContext<{
  direction: CountDirection;
  updateDirection: (direction: CountDirection) => void;
} | null>(null);

export function CountDirectionContextProvider({
  countDirection,
  children,
}: React.PropsWithChildren & { countDirection: CountDirection }) {
  const [direction, setDirection] = useState(countDirection);

  return (
    <CountDirectionContext value={{ direction, updateDirection: setDirection }}>
      {children}
    </CountDirectionContext>
  );
}
