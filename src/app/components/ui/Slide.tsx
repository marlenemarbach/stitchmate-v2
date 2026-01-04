"use client";
import { AnimatePresence, motion, usePresenceData } from "motion/react";
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
  // order: number;
  ref?: React.Ref<HTMLDivElement>;
  // isActive: boolean;
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
          type: "spring",
          visualDuration: 0.3,
          bounce: 0.4,
        },
      }}
      exit={{ opacity: 0, x: direction * -50 }}
      className={cn("", className)}
    >
      {children}
    </motion.div>
  );
}

// export function Slide({ children, className, order, ref }: SlideProps) {
//   <motion.div
//     ref={ref}
//     key={order}
//     layout
//     variants={variants}
//     initial="hidden"
//     animate="visible"
//     exit="exit"
//     transition={{
//       default: {
//         type: "spring",
//         duration: 0.3,
//       },
//       opacity: { ease: "easeInOut", duration: 0.3 },
//     }}
//     className={cn("", className)}
//   >
//     {children}
//   </motion.div>;
// }
