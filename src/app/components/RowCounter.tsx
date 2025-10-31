"use client";
import { useCounterStore } from "@/providers/CounterStoreProvider";
import { Button } from "../ui/Button";

export function RowCounter() {
  const count = useCounterStore((state) => state.count);
  const updateCount = useCounterStore((state) => state.updateCount);

  return (
    <>
      <h1 className="text-center">{count}</h1>
      <Button className="m-auto" onClick={() => updateCount()}>
        count
      </Button>
    </>
  );
}
