import { cloneElement, isValidElement } from "react";

type SlotProps = React.HTMLAttributes<HTMLElement> & {
  children?: React.ReactNode;
};

export function createSlot(element: React.ReactNode, props: SlotProps) {
  if (isValidElement(element)) {
    return cloneElement(element, {
      ...props,
    });
  }
}
