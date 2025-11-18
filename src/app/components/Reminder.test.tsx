/// <reference lib="dom" />
import { Reminder } from "@/stores/counter-store";
import { expect, test } from "bun:test";

import { getActiveReminder, getReminderCount } from "./Reminder";

const reminderThreeSteps: Reminder = {
  type: "Increase",
  steps: 3,
  startRow: 1,
};

const reminderTwoSteps: Reminder = {
  type: "Increase",
  steps: 2,
  startRow: 3,
};
test.each([
  { a: reminderThreeSteps, b: 1, expected: true },
  { a: reminderThreeSteps, b: 2, expected: false },
  { a: reminderThreeSteps, b: 3, expected: false },
  { a: reminderThreeSteps, b: 4, expected: true },
])("getActiveReminder($a, $b) = $expected", (data) => {
  expect(getActiveReminder(data.a, data.b)).toBe(data.expected);
});

test.each([
  { a: reminderTwoSteps, b: 3, expected: 1 },
  { a: reminderTwoSteps, b: 4, expected: 1 },
  { a: reminderTwoSteps, b: 5, expected: 2 },
  { a: reminderTwoSteps, b: 6, expected: 2 },
  { a: reminderTwoSteps, b: 7, expected: 3 },
])("getReminderCount($a, $b) = $expected", (data) => {
  expect(getReminderCount(data.a, data.b)).toBe(data.expected);
});
