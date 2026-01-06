import { useEffect } from "react";

export function useOutsideClick(
  elementRef: React.RefObject<HTMLElement | null>,
  handler: () => void,
) {
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (
        elementRef?.current &&
        !elementRef.current.contains(event.target as Node)
      ) {
        handler();
      }
    }

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [elementRef, handler]);
}
