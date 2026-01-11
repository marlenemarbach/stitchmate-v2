/// <reference lib="dom" />
import { describe, expect, test } from "bun:test";
import { createNumbers } from "./NumberCarousel";

// import { render, screen } from "@testing-library/react";
// import "@testing-library/jest-dom";

describe("NumberCarousel", () => {
  describe("createNumbers", () => {
    test("creates ascending numbers", () => {
      const numbers = createNumbers([1, 2, 3], 1, 100, 1);
      expect(numbers).toStrictEqual([2, 3, 4]);
    });

    test("creates descending numbers", () => {
      const numbers = createNumbers([2, 3, 4], 1, 100, -1);
      expect(numbers).toStrictEqual([1, 2, 3]);
    });

    test("creates ascending numbers starting at ''", () => {
      const numbers = createNumbers(["", 1, 2], 1, 100, 1);
      expect(numbers).toStrictEqual([1, 2, 3]);
    });

    test("creates ascending numbers starting at ''", () => {
      const numbers = createNumbers([99, 100, ""], 1, 100, -1);
      expect(numbers).toStrictEqual([98, 99, 100]);
    });

    test("uses '' for numbers bigger than max", () => {
      const numbers = createNumbers([98, 99, 100], 1, 100, 1);
      expect(numbers).toStrictEqual([99, 100, ""]);
    });

    test("uses '' for numbers smaller than min", () => {
      const numbers = createNumbers([1, 2, 3], 1, 100, -1);
      expect(numbers).toStrictEqual(["", 1, 2]);
    });
  });
});

// test("renders tigger button", () => {
//   render(<Button>Click me</Button>);
//   expect(screen.getByRole("button")).toHaveTextContent("Click me");
// });
//
