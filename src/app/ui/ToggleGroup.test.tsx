/// <reference lib="dom" />
import "@testing-library/jest-dom";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, test } from "bun:test";
import { ToggleGroup, ToggleGroupItem } from "./ToggleGroup";

afterEach(() => {
  cleanup();
});

describe("RadioGroup", () => {
  test("renders RadioGroup and RadioGroupButtons", () => {
    render(<ToggleGroup></ToggleGroup>);
    expect(screen.getByRole("group")).toBeInTheDocument();
  });
});

describe("RadioGroupButton", () => {
  test("should apply data-state='on'", () => {
    render(<ToggleGroupItem isActive={true}></ToggleGroupItem>);
    expect(screen.getByRole("button")).toHaveAttribute("data-state", "on");
  });

  test("should apply data-state='off'", () => {
    render(<ToggleGroupItem isActive={false}></ToggleGroupItem>);
    expect(screen.getByRole("button")).toHaveAttribute("data-state", "off");
  });
});

describe("RadioGroupItem", () => {
  test("applies correct aria attributes", () => {
    render(<ToggleGroupItem isActive={false}></ToggleGroupItem>);
    expect(screen.getByRole("button")).toHaveAttribute("aria-pressed", "false");
  });
});
