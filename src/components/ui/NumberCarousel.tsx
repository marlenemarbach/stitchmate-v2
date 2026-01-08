"use client";

import { useRef, useState } from "react";
import { motion } from "motion/react";

export function NumberCarousel() {
  const [direction, setDirection] = useState<1 | -1>(1);
  const [numbers, setNumbers] = useState([1, 2, 3, 4, 5]);

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => {
          setNumbers((prev) => getNextNumbers(prev));
          setDirection(1);
        }}
      >
        +
      </button>
      <div className="flex h-26 flex-col items-center justify-center gap-2 overflow-hidden mask-y-from-70% mask-y-to-90%">
        {numbers.map((number) => (
          <motion.span
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
            {number}
          </motion.span>
        ))}
      </div>
      <button
        onClick={() => {
          setNumbers((prev) => getPreviousNumbers(prev));
          setDirection(-1);
        }}
      >
        -
      </button>
    </div>
  );
}

function getNextNumbers(numbers: number[]) {
  return numbers.map((number) => number + 1);
}

function getPreviousNumbers(numbers: number[]) {
  return numbers.map((number) => number - 1);
}
