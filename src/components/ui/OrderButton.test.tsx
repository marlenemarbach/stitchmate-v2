/// <reference lib="dom" />
import "@testing-library/jest-dom";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, mock, test } from "bun:test";
import { OrderButton } from "./OrderButton";

describe("OrderButton", () => {
  afterEach(cleanup);

  test("renders text content correctly", () => {
    render(<OrderButton>Title</OrderButton>);
    expect(screen.getByRole("button")).toHaveTextContent("Title");
  });

  describe("renders visible up and down arrows", () => {
    test("renders up arrow", () => {
      render(<OrderButton order="desc">Title</OrderButton>);
      expect(screen.queryByTestId("arrow-up")).toBeInTheDocument();
      expect(screen.queryByTestId("default-down")).not.toBeInTheDocument();
    });

    test("renders down arrow", () => {
      render(<OrderButton order="asc">Title</OrderButton>);
      expect(screen.queryByTestId("arrow-down")).toBeInTheDocument();
      expect(screen.queryByTestId("default-up")).not.toBeInTheDocument();
    });

    test("renders no arrow", () => {
      render(<OrderButton>Title</OrderButton>);
      expect(screen.queryByTestId("arrow-down")).not.toBeInTheDocument();
      expect(screen.queryByTestId("arrow-up")).not.toBeInTheDocument();
    });
  });

  describe("renders correct toggle indicator", () => {
    test("falls back to default-down", () => {
      render(<OrderButton>Title</OrderButton>);
      expect(screen.queryByTestId("default-down")).toBeInTheDocument();
      expect(screen.queryByTestId("arrow-up")).not.toBeInTheDocument();
    });

    test("renders default-down", () => {
      render(<OrderButton defaultOrder="desc">Title</OrderButton>);
      expect(screen.queryByTestId("default-down")).toBeInTheDocument();
      expect(screen.queryByTestId("arrow-up")).not.toBeInTheDocument();
    });

    test("renders default-up", () => {
      render(<OrderButton defaultOrder="asc">Title</OrderButton>);
      expect(screen.queryByTestId("default-up")).toBeInTheDocument();
      expect(screen.queryByTestId("arrow-down")).not.toBeInTheDocument();
    });
  });

  describe("toggles order correctly", () => {
    test("toggles from default to desc order", () => {
      const onOrderChange = mock();

      render(<OrderButton onOrderChange={onOrderChange}>Title</OrderButton>);
      fireEvent.click(screen.getByRole("button"));
      expect(onOrderChange).toHaveBeenCalledWith("desc");
    });

    test("toggles from asc to desc order", () => {
      const onOrderChange = mock();

      render(
        <OrderButton order="asc" onOrderChange={onOrderChange}>
          Title
        </OrderButton>,
      );
      fireEvent.click(screen.getByRole("button"));
      expect(onOrderChange).toHaveBeenCalledWith("desc");
    });

    test("toggles from desc to asc order", () => {
      const onOrderChange = mock();

      render(
        <OrderButton order="desc" onOrderChange={onOrderChange}>
          Title
        </OrderButton>,
      );
      fireEvent.click(screen.getByRole("button"));
      expect(onOrderChange).toHaveBeenCalledWith("asc");
    });
  });

  describe("supports native button props", () => {
    test("calls onClick", () => {
      const onClick = mock();
      const onOrderChange = mock();

      render(
        <OrderButton onClick={onClick} onOrderChange={onOrderChange}>
          Title
        </OrderButton>,
      );
      fireEvent.click(screen.getByRole("button"));
      expect(onClick).toHaveBeenCalledTimes(1);
      expect(onOrderChange).toHaveBeenCalledTimes(1);
    });

    test("applies disabled prop", () => {
      render(<OrderButton disabled>Title</OrderButton>);
      expect(screen.getByRole("button")).toBeDisabled();
    });

    test("applies aria-label", () => {
      render(<OrderButton aria-label="Sort">Title</OrderButton>);
      expect(screen.getByRole("button")).toHaveAttribute("aria-label", "Sort");
    });
  });
});
