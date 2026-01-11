"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion } from "motion/react";

type NumberCarouselProps = {
  min: number;
  max: number;
  name?: string;
};

export function NumberCarousel({ min = 1, max = 99 }: NumberCarouselProps) {
  const [direction, setDirection] = useState<1 | -1>(1);
  const [numbers, setNumbers] = useState<(number | "")[]>(["", min, min + 1]);

  function increment() {
    if (numbers[1] === max) return;
    setNumbers((prev) => createNumbers(prev, min, max, 1));
    setDirection(1);
  }

  function decrement() {
    if (numbers[1] === min) return;
    setNumbers((prev) => createNumbers(prev, min, max, -1));
    setDirection(-1);
  }

  function handleWheel(e: React.WheelEvent) {
    if (e.deltaY > 0) increment();
    else if (e.deltaY < 0) decrement();
  }

  return (
    <div className="flex items-center" tabIndex={0}>
      <div
        className="flex h-26 flex-col items-center justify-center gap-2 overflow-hidden mask-y-from-70% mask-y-to-90% text-foreground"
        tabIndex={0}
        onWheel={(e) => handleWheel(e)}
      >
        {numbers.map((number) => {
          return (
            <NumberCarouselItem
              key={number}
              number={number}
              direction={direction}
            >
              {number ? number : ""}
            </NumberCarouselItem>
          );
        })}
      </div>
      <div className="grid">
        <button onClick={() => decrement()}>
          <ChevronUp className="size-3" strokeWidth={3} />
        </button>
        <button onClick={() => increment()}>
          <ChevronDown className="size-3" strokeWidth={3} />
        </button>
      </div>
    </div>
  );
}

function NumberCarouselItem({
  number,
  direction,
  children,
}: {
  number: number | "";
  direction: 1 | -1;
  children: React.ReactNode;
}) {
  return (
    <motion.span
      className="flex h-9 min-w-8 items-center justify-center first:text-muted-foreground last:text-muted-foreground"
      layout
      key={number}
      initial={{ y: direction * 100 }}
      animate={{ y: 0 }}
      exit={{ y: direction * 100 }}
      transition={{
        type: "spring",
        stiffness: 280,
        damping: 18,
        mass: 0.3,
      }}
    >
      {children}
    </motion.span>
  );
}

export function createNumbers(
  numbers: (number | "")[],
  min: number,
  max: number,
  direction: -1 | 1,
) {
  return numbers.map((number) => {
    if (number === "") {
      if (direction === 1) return min;
      else return max;
    }
    if (number + direction > max || number + direction < min) return "";
    return number + direction;
  });
}
