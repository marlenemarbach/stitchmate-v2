import { createStore } from "zustand/vanilla";

export type ReminderType = "Increase" | "Decrease" | "Short Row";

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

export type CreateReminderAction = (
  newReminder: Omit<Reminder, "startRow">,
) => void;

export type UpdateDirectionAction = (newDirection: CountDirection) => void;

export type CounterActions = {
  updateCount: () => void;
  updateDirection: UpdateDirectionAction;
  createReminder: CreateReminderAction;
  deleteReminder: () => void;
};

export type CounterStore = CounterState & CounterActions;

export const initialState: CounterState = {
  count: 1,
  reminder: null,
  direction: "up",
};

export const createCounterStore = (initState: CounterState = initialState) => {
  return createStore<CounterStore>()((set) => ({
    ...initState,
    updateCount: () =>
      set((state) => ({
        count:
          state.direction === "up"
            ? Math.min(state.count + 1, 99)
            : Math.max(state.count - 1, 1),
      })),
    updateDirection: (newDirection) => set(() => ({ direction: newDirection })),
    createReminder: (newReminder) =>
      set((state) => ({
        reminder: { ...newReminder, startRow: state.count },
      })),
    deleteReminder: () => set(() => ({ reminder: null })),
  }));
};
