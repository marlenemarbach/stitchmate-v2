/// <reference lib="dom" />

import { test, expect, describe, afterEach } from "bun:test";
import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";

import { ToggleGroup, ToggleGroupButton } from "./ToggleGroup";

afterEach(() => {
  cleanup();
});

describe("ToggleGroup", () => {
  test("renders ToggleGroup and ToggleGroupButtons", () => {
    render(
      <ToggleGroup>
        <ToggleGroupButton isActive={false}>button</ToggleGroupButton>
      </ToggleGroup>,
    );
    expect(screen.getByRole("group")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});

describe("ToggleGroupButton", () => {
  test("should apply data-state='on'", () => {
    render(
      <ToggleGroup>
        <ToggleGroupButton isActive={true}>button</ToggleGroupButton>
      </ToggleGroup>,
    );
    expect(screen.getByRole("button")).toHaveAttribute("data-active", "true");
  });

  test("should apply data-state='off'", () => {
    render(
      <ToggleGroup>
        <ToggleGroupButton isActive={true}>button</ToggleGroupButton>
      </ToggleGroup>,
    );
    expect(screen.getByRole("button")).toHaveAttribute("data-active", "true");
  });
});
