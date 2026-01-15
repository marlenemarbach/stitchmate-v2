"use client";

import { createContext, use, useMemo, useState } from "react";

export type SubCounterState = "on" | "off" | "pending";

type InitialState = {
  count: number;
  state: SubCounterState;
};

type SubCounterContext = {
  state: SubCounterState;
  setState: (state: SubCounterState) => void;
  count: number;
  setCount: (count: number) => void;
};

export const SubCounterContext = createContext<SubCounterContext | null>(null);

export function SubCounterProvider({
  initialState,
  children,
}: React.PropsWithChildren & {
  initialState: InitialState;
}) {
  const [count, setCount] = useState(initialState.count);
  const [state, setState] = useState<SubCounterState>(initialState.state);

  const contextValue = useMemo(() => {
    return { count, setCount, state, setState };
  }, [count, setCount, state, setState]);

  return <SubCounterContext value={contextValue}>{children}</SubCounterContext>;
}

export function useSubCounter(): SubCounterContext {
  const ctx = use(SubCounterContext);
  if (!ctx) throw new Error("Must be used within SubCounterProvider");

  return ctx;
}
