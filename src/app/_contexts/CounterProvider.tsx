"use client";

import { useContext, useReducer } from "react";
import CounterContext, { type CounterState } from "./CounterContext";
import { counterReducer } from "./counterReducer";
import CounterActionContext from "./CounterActionContext";

const initialState: CounterState = {
  count: 1,
  reminder: null,
  direction: "up",
};

export function CounterProvider({ children }: React.PropsWithChildren) {
  const [state, dispatch] = useReducer(counterReducer, initialState);

  return (
    <CounterActionContext value={dispatch}>
      <CounterContext value={state}>{children}</CounterContext>
    </CounterActionContext>
  );
}

export function useCounterState() {
  const ctx = useContext(CounterContext);

  if (!ctx)
    throw new Error("useCounterState must be used within CounterProvider");

  return ctx;
}

export function useCounterAction() {
  const ctx = useContext(CounterActionContext);

  if (!ctx)
    throw new Error("useCounterAction must be used within CounterProvider");

  return ctx;
}
