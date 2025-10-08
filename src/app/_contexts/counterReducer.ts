import {
  type CountDirection,
  type CounterState,
  type Reminder,
} from "./CounterContext";

export type CounterAction =
  | { type: "createReminder"; payload: Omit<Reminder, "startRow"> }
  | { type: "updateReminderCount" }
  | { type: "deleteReminder" }
  | { type: "directionUp" }
  | { type: "directionDown" }
  | { type: "updateCount" };

export function counterReducer(
  counterState: CounterState,
  counterAction: CounterAction,
) {
  switch (counterAction.type) {
    case "createReminder": {
      const newState = {
        ...counterState,
        reminder: { ...counterAction.payload, startRow: counterState.count },
      };
      console.log("newState", newState);
      return newState;
    }
    case "deleteReminder": {
      if (!counterState.reminder) return counterState;
      return {
        ...counterState,
        reminder: null,
      };
    }
    case "directionUp": {
      if (counterState.direction === "up") return counterState;
      return { ...counterState, direction: "up" as CountDirection };
    }
    case "directionDown": {
      if (counterState.direction === "down") return counterState;
      return { ...counterState, direction: "down" as CountDirection };
    }
    case "updateCount": {
      if (counterState.direction === "up")
        return {
          ...counterState,
          count: Math.min(counterState.count + 1, 99),
        };
      else
        return {
          ...counterState,
          count: Math.max(counterState.count - 1, 1),
        };
    }
    default:
      return counterState;
  }
}
