import {
  createContext,
  use,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { SlidingNumber } from "./SlidingNumber";

type NumberSpinnerProps = {
  min: number;
  max: number;
  defaultValue: number;
  accessibleName: string;
};

export function NumberSpinner({
  className,
  min,
  max,
  defaultValue,
  accessibleName,
  ...props
}: Omit<
  React.ComponentPropsWithoutRef<"input">,
  "min" | "max" | "defaultValue"
> &
  NumberSpinnerProps) {
  return (
    <NumberSpinnerRoot min={min} max={max} defaultValue={defaultValue}>
      <NumberSpinnerContainer className={className}>
        <NumberSpinnerButton
          direction={-1}
          title={`Decrement ${accessibleName}`}
        >
          <Minus strokeWidth={3} />
        </NumberSpinnerButton>

        <NumberSpinnerInput {...props} />
        <NumberSpinnerButton
          direction={1}
          title={`Increment ${accessibleName}`}
        >
          <Plus strokeWidth={3} />
        </NumberSpinnerButton>
      </NumberSpinnerContainer>
    </NumberSpinnerRoot>
  );
}

type NumberSpinnerMode = "spinner" | "input";

const NumberSpinnerContext = createContext<{
  increment: () => void;
  decrement: () => void;
  min: number;
  max: number;
  value: number;
  setValue: (value: number) => void;
  direction: 1 | -1;
  mode: NumberSpinnerMode;
  setMode: (mode: NumberSpinnerMode) => void;
} | null>(null);

function useNumberSpinner() {
  const ctx = use(NumberSpinnerContext);

  if (!ctx) throw new Error("Must be used within NumberSpinner");
  return ctx;
}

type NumberSpinnerRootProps = {
  min?: number;
  max?: number;
  defaultValue?: number;
  children: React.ReactNode;
};

function NumberSpinnerRoot({
  min = 1,
  max = 99,
  defaultValue,
  children,
}: NumberSpinnerRootProps) {
  const [direction, setDirection] = useState<1 | -1>(1);
  const [value, setValue] = useState(defaultValue ?? min ?? 0);
  const [mode, setMode] = useState<"spinner" | "input">("input");

  const contextValue = useMemo(() => {
    function increment() {
      if (value === max) return;
      if (direction === -1) setDirection(1);
      setValue((prev) => prev + 1);
    }

    function decrement() {
      if (value === min) return;
      if (direction === 1) setDirection(-1);
      setValue((prev) => prev - 1);
    }

    return {
      increment,
      decrement,
      min,
      max,
      value,
      setValue,
      direction,
      mode,
      setMode,
    };
  }, [min, max, value, direction, mode]);

  return (
    <NumberSpinnerContext value={contextValue}>{children}</NumberSpinnerContext>
  );
}

function NumberSpinnerContainer({
  className,
  children,
}: React.ComponentPropsWithoutRef<"div">) {
  const { mode } = useNumberSpinner();
  return (
    <div
      className={cn(
        "group flex items-center rounded-lg border border-border bg-neutral-50 drop-shadow-xs dark:bg-popup",
        className,
      )}
      data-mode={mode}
    >
      {children}
    </div>
  );
}

function NumberSpinnerInput({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"input">) {
  const { min, max, value, direction, setValue, mode, setMode } =
    useNumberSpinner();

  const inputRef = useRef<HTMLInputElement>(null);

  const [inputValue, setInputValue] = useState<string>(value.toString());

  useEffect(() => {
    setInputValue(value.toString());
  }, [value]);

  function validateInputValue() {
    const parsedValue = parseInt(inputValue);
    if (isNaN(parsedValue)) return;

    setValue(parsedValue);
  }

  return (
    <div
      className={cn(
        "relative ml-1 h-10 min-w-10 flex-1 focus-visible:outline-none",
        className,
      )}
      tabIndex={0}
      onFocus={(e) => {
        if (e.target === e.currentTarget) {
          setMode("input");
          inputRef?.current?.focus();
        }
      }}
    >
      <input
        className="[&::-webkit-outer-spin-button]:appearance-none] [&::-webkit-inner-spin-button]:appearance-none] absolute top-1/2 left-1/2 h-4 h-full w-[80%] -translate-1/2 text-center text-lg text-foreground opacity-100 [-moz-appearance:textfield] focus-visible:outline-none data-[state=hidden]:opacity-0"
        data-state={mode === "input" ? "visible" : "hidden"}
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.currentTarget.value);
        }}
        onClick={() => setMode("input")}
        onBlur={() => {
          validateInputValue();
        }}
        type="number"
        autoComplete="off"
        role="spinbutton"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        ref={inputRef}
        tabIndex={-1}
        {...props}
      />
      <SlidingNumber
        className="hidden data-[state=visible]:flex"
        value={value}
        direction={direction}
        data-state={mode === "spinner" ? "visible" : "hidden"}
        aria-hidden
      />
    </div>
  );
}

function NumberSpinnerButton({
  className,
  title,
  direction,
  children,
}: React.ComponentPropsWithoutRef<"button"> & { direction: 1 | -1 }) {
  const { increment, decrement, setMode } = useNumberSpinner();

  function handleSpin() {
    setMode("spinner");
    if (direction === -1) decrement();
    else increment();
  }

  return (
    <button
      className={cn(
        "h-full rounded px-4 text-muted-foreground transition-[color,transform] duration-150 ease-out hover:text-foreground active:scale-98 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      tabIndex={-1}
      role="button"
      title={title}
      type="button"
      onClick={() => handleSpin()}
    >
      {children}
    </button>
  );
}
