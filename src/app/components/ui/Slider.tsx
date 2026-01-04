"use client";

import { useState } from "react";
import { AnimatePresence, motion, usePresenceData, wrap } from "motion/react";
import { cn } from "@/lib/utils";

export type SlideDirection = 1 | -1;

export type SliderProps = {
  children: React.ReactNode;
  direction: SlideDirection;
};

export function Slider({ children, direction }: SliderProps) {
  return (
    <AnimatePresence mode="popLayout" initial={false} custom={direction}>
      {children}
    </AnimatePresence>
  );
}

export type SlideProps = {
  children: React.ReactNode;
  className?: string;
  ref?: React.Ref<HTMLDivElement>;
};

export function Slide({ children, className, ref }: SlideProps) {
  const direction = usePresenceData();
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: direction * 50 }}
      animate={{
        opacity: 1,
        x: 0,
        transition: {
          delay: 0.2,
          type: "tween",
          ease: "easeOut",
          duration: 0.3,
        },
      }}
      exit={{ opacity: 0, x: direction * -50 }}
      className={cn("", className)}
    >
      {children}
    </motion.div>
  );
}

export function useSlider(
  initialSlide: number,
  length: number,
  slideDirection?: SlideDirection,
) {
  const [activeSlide, setActiveSlide] = useState(initialSlide);
  const [direction, setDirection] = useState(slideDirection ?? 1);

  function setSlide(newDirection: SlideDirection) {
    const nextSlide = wrap(0, length, activeSlide + newDirection);
    setActiveSlide(nextSlide);
    setDirection(newDirection);
  }

  return [activeSlide, direction, setSlide] as const;
}
