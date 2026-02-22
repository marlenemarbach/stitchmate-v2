import { useCallback, useState } from "react";

export function useControllableState<T>(
  controlledState: T | undefined,
  onChangeControlled: ((value: T) => void) | undefined,
  defaultValue: T,
): [T, (value: T) => void] {
  const [internalState, setInternalState] = useState<T>(defaultValue);
  const isControlled = controlledState !== undefined;

  const controllableState = isControlled ? controlledState : internalState;
  const setControllableState = useCallback(
    (nextValue: T) => {
      if (!isControlled) {
        setInternalState(nextValue);
      }
      onChangeControlled?.(nextValue);
    },
    [isControlled, onChangeControlled],
  );

  return [controllableState, setControllableState];
}
