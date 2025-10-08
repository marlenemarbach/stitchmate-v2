"use client";

import { createContext } from "react";

export type ReminderType = "Increase" | "Decrease" | "ShortRows";

export type Reminder = {
  type: ReminderType;
  steps: number;
  startRow: number;
};

export type CountDirection = "up" | "down";

export type CounterState = {
  count: number;
  reminder: Reminder | null;
  direction: CountDirection;
};

const CounterContext = createContext<CounterState | null>(null);

export default CounterContext;
