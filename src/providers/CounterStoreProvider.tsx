"use client";

import { createContext, useContext, useRef } from "react";
import { useStore } from "zustand";
import { ProjectWithSubCounter } from "@/lib/types";
import { type CounterStore, createCounterStore } from "@/stores/counter-store";

export type CounterStoreApi = ReturnType<typeof createCounterStore>;

export const CounterStoreContext = createContext<CounterStoreApi | undefined>(
  undefined,
);

export const CounterStoreProvider = ({ children }: React.PropsWithChildren) => {
  const storeRef = useRef<CounterStoreApi | null>(null);
  if (storeRef.current === null) {
    storeRef.current = createCounterStore();
  }

  return (
    <CounterStoreContext value={storeRef.current}>
      {children}
    </CounterStoreContext>
  );
};

export const useCounterStore = <T,>(
  selector: (store: CounterStore) => T,
): T => {
  const counterStoreContext = useContext(CounterStoreContext);

  if (!counterStoreContext) {
    throw new Error(`useCounterStore must be used within CounterStoreProvider`);
  }

  return useStore(counterStoreContext, selector);
};
