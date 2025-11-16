/// <reference lib="dom" />

import { test, expect, describe, afterEach } from "bun:test";
import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";

import { ToggleGroup, ToggleGroupButton, ToggleGroupItem } from "./ToggleGroup";

afterEach(() => {
  cleanup();
});

describe("ToggleGroup", () => {
  test("renders ToggleGroup and ToggleGroupButtons", () => {
    render(<ToggleGroup></ToggleGroup>);
    expect(screen.getByRole("group")).toBeInTheDocument();
  });
});

describe("ToggleGroupButton", () => {
  test("should apply data-state='on'", () => {
    render(<ToggleGroupButton isActive={true}></ToggleGroupButton>);
    expect(screen.getByRole("button")).toHaveAttribute("data-state", "on");
  });

  test("should apply data-state='off'", () => {
    render(<ToggleGroupButton isActive={false}></ToggleGroupButton>);
    expect(screen.getByRole("button")).toHaveAttribute("data-state", "off");
  });
});

describe("ToggleGroupItem", () => {
  test("applies correct aria roles when mode is undefined", () => {
    render(<ToggleGroupItem isActive={false}></ToggleGroupItem>);
    expect(screen.getByRole("button")).toHaveAttribute("aria-pressed", "false");
  });

  test("applies correct aria roles when mode = 'radio'", () => {
    render(<ToggleGroupItem mode="radio" isActive={true}></ToggleGroupItem>);
    expect(screen.getByRole("radio")).toBeInTheDocument();
    expect(screen.getByRole("radio")).toHaveAttribute("aria-checked", "true");
  });
});
