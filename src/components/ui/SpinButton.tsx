import { createContext, use, useEffect, useRef, useState } from "react";
import { Minus, Plus } from "lucide-react";
import { useControllableState } from "../../hooks/useControllableState";
import { cn } from "../../lib/utils";
import { SlidingNumber } from "./SlidingNumber";

type SpinButtonMode = "spinner" | "input";

type SpinButtonContextValue = {
  min?: number;
  max?: number;
  value: string;
  setValue: (value: string) => void;
  updateValueByX: (x: number) => void;
  direction: 1 | -1;
  mode: SpinButtonMode;
  setMode: (mode: SpinButtonMode) => void;
  isValid?: boolean;
  id: string;
};

const SpinButtonContext = createContext<SpinButtonContextValue | null>(null);

function useSpinButton() {
  const ctx = use(SpinButtonContext);

  if (!ctx)
    throw new Error(
      "Spinbutton: A child component is used outside of SpinButtonContext. Component must be placed inside NumberSpinner",
    );
  return ctx;
}

type SpinButtonProps = {
  id: string;
  className?: string;
  min?: number;
  max?: number;
  defaultValue?: number;
  value?: string;
  onValueChange?: (value: string) => void;
};

export function SpinButton({
  id,
  min,
  max,
  defaultValue,
  value,
  onValueChange,
  children,
}: React.PropsWithChildren & SpinButtonProps) {
  const [direction, setDirection] = useState<1 | -1>(1);
  const [mode, setMode] = useState<SpinButtonMode>("input");

  const [currentValue, setCurrentValue] = useControllableState(
    value,
    onValueChange,
    String(defaultValue ?? min ?? 0),
  );

  const isValid = isValueInBounds(currentValue, min, max);

  function toggleDirection(newDirection: 1 | -1) {
    if (direction === newDirection) return;
    setDirection(newDirection);
  }

  function updateValueByX(x: number) {
    setMode("spinner");

    const numValue = Number(currentValue);
    const newValue = numValue + x;

    if (min !== undefined && newValue < numValue && newValue < min) return;
    if (max !== undefined && newValue > numValue && newValue > max) return;

    if (newValue < numValue) {
      toggleDirection(-1);
    } else {
      toggleDirection(1);
    }

    setCurrentValue(String(newValue));
  }

  const contextValue: SpinButtonContextValue = {
    min,
    max,
    value: currentValue,
    setValue: setCurrentValue,
    direction,
    mode,
    setMode,
    updateValueByX,
    id,
    isValid,
  };

  return (
    <>
      <SpinButtonContext value={contextValue}>
        {children}
        <SpinButtonLiveRegion />
      </SpinButtonContext>
    </>
  );
}

export function SpinButtonLiveRegion() {
  const { value, id, mode } = useSpinButton();
  const outputRef = useRef<HTMLOutputElement>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (outputRef.current) outputRef.current.textContent = "";
    }, 3000);
    return () => clearTimeout(timeout);
  }, [mode, value]);

  return (
    <output ref={outputRef} className="sr-only" htmlFor={id}>
      {mode === "spinner" ? value : ""}
    </output>
  );
}

export function SpinButtonGroup({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const { mode, isValid } = useSpinButton();

  return (
    <div
      className={cn(
        "group flex h-11 w-32 items-center justify-between rounded-full border border-border bg-neutral-50 px-2 dark:bg-popup",
        "focus-within:ring focus-within:ring-ring has-focus-visible:ring has-focus-visible:ring-ring",
        "data-[invalid=true]:ring data-[invalid=true]:ring-destructive",
        className,
      )}
      data-mode={mode}
      data-invalid={!isValid}
      {...props}
    >
      {children}
    </div>
  );
}

export function SpinButtonLabel({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<"label">) {
  const { id } = useSpinButton();

  return (
    <label className={cn("sr-only", className)} htmlFor={id} {...props}>
      {children}
    </label>
  );
}

export function SpinButtonError({
  children,
  className,
  ...props
}: React.ComponentPropsWithoutRef<"p">) {
  const { id, isValid, min, max } = useSpinButton();

  if (!isValid) {
    return (
      <p
        id={`error-${id}`}
        className={cn("my-2 text-sm text-destructive", className)}
        {...props}
      >
        {children ?? `Must be between ${min} and ${max}`}
      </p>
    );
  }
}

export function SpinButtonField({
  ...props
}: React.ComponentPropsWithoutRef<"input">) {
  const {
    min,
    max,
    value,
    direction,
    setValue,
    mode,
    setMode,
    id,
    isValid,
    updateValueByX,
  } = useSpinButton();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value;

    const filtered = raw.replace(/[^\d-]/g, "");
    setValue(filtered);
  }

  function handleArrowKeys(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowUp") {
      updateValueByX(1);
    } else if (e.key === "ArrowDown") {
      updateValueByX(-1);
    }
  }

  return (
    <div className="relative h-full w-[50%] min-w-12">
      <SlidingNumber
        className="absolute inset-0 hidden cursor-text data-[state=visible]:flex"
        value={parseInt(parseNonNumeric(value, min ?? 0))}
        direction={direction}
        data-state={mode === "spinner" ? "visible" : "hidden"}
        aria-hidden
      />
      <input
        className="[&::-webkit-outer-spin-button]:appearance-none] [&::-webkit-inner-spin-button]:appearance-none] h-full w-full -translate-y-px bg-transparent text-center text-lg text-foreground opacity-100 [-moz-appearance:textfield] focus-visible:outline-none data-[state=hidden]:opacity-0"
        data-state={mode === "input" ? "visible" : "hidden"}
        value={value}
        onClick={() => {
          setMode("input");
        }}
        onChange={handleChange}
        onBlur={() => setValue(parseNonNumeric(value, min ?? 0))}
        onKeyDown={handleArrowKeys}
        id={id}
        type="text"
        inputMode="numeric"
        autoComplete="off"
        role="spinbutton"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={parseInt(value) ?? ""}
        aria-invalid={!isValid}
        aria-errormessage={`error-${id}`}
        {...props}
      />
    </div>
  );
}

function Button({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<"button">) {
  return (
    <button
      className={cn(
        "flex size-7 items-center justify-center rounded-full text-foreground/80 transition-[color,transform] duration-150 ease-out hover:text-foreground active:scale-98 [&_svg:not([class*='size-'])]:size-4",
        "bg-neutral-700 drop-shadow-sm",
        "aria-disabled:opacity-50 aria-disabled:hover:text-muted-foreground aria-disabled:active:scale-none",
        className,
      )}
      tabIndex={-1}
      type="button"
      {...props}
    >
      {children}
    </button>
  );
}

export function SpinButtonDecrement({
  ...props
}: React.ComponentPropsWithoutRef<"button">) {
  const { updateValueByX, value, min } = useSpinButton();

  return (
    <Button
      aria-disabled={!!(min && Number(value) <= min)}
      onClick={() => updateValueByX(-1)}
      {...props}
    >
      <Minus strokeWidth={3} />
    </Button>
  );
}

export function SpinButtonIncrement({
  ...props
}: React.ComponentPropsWithoutRef<"button">) {
  const { updateValueByX, value, max } = useSpinButton();

  return (
    <Button
      aria-disabled={!!(max && Number(value) >= max)}
      onClick={() => updateValueByX(1)}
      {...props}
    >
      <Plus strokeWidth={3} />
    </Button>
  );
}

function isValueInBounds(value: string, min?: number, max?: number) {
  if (value === "") return true;

  const numValue = parseInt(value);

  if (max !== undefined && numValue > max) return false;
  if (min !== undefined && numValue < min) return false;
  return true;
}

function parseNonNumeric(value: string, min: number) {
  if (isNaN(parseInt(value))) {
    return min.toString();
  }
  return value;
}
