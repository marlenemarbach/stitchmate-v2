import { useCallback, useEffect, useRef } from "react";
import throttle from "lodash-es/throttle";

export function useThrottle<T extends (...args: Parameters<T>) => void>(
  callback: T,
  delay: number,
): T {
  const callbackRef = useRef(callback);
  useEffect(() => {
    callbackRef.current = callback;
  });

  const throttledRef = useRef<T>(undefined as unknown as T);
  useEffect(() => {
    throttledRef.current = throttle(
      (...args: Parameters<T>) => {
        callbackRef.current(...args);
      },
      delay,
      { leading: true, trailing: false },
    ) as unknown as T;
  }, [delay]);

  const throttled = useCallback((...args: Parameters<T>) => {
    throttledRef.current?.(...args);
  }, []);

  return throttled as T;
}
