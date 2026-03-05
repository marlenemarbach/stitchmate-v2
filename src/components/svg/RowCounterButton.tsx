import { MotionProps, motion } from "motion/react";
import { cn } from "@/lib/utils";

export function RowCounterButton({
  className,
  ...props
}: MotionProps & {
  className?: string;
}) {
  return (
    <motion.div
      className={cn("relative h-[100px] w-[104px]", className)}
      {...props}
    >
      <div
        className="absolute inset-0 button-reflection"
        style={{
          clipPath: `path("M104 8.04469C104 3.60173 100.384 0 95.9223 0C95.9223 0 69.2251 3.02235 52 3.02235C34.7749 3.02235 8.07767 0 8.07767 0C3.6165 0 0 3.60173 0 8.04469V88.9386C0 95.0475 4.87773 99.9998 10.8948 100H93.1052C99.1223 99.9998 104 95.0475 104 88.9386V8.04469Z")`,
        }}
      />
      <div
        className="absolute inset-[1px] bg-counter-button"
        style={{
          clipPath: `path("M104 8.04469C104 3.60173 100.384 0 95.9223 0C95.9223 0 69.2251 3.02235 52 3.02235C34.7749 3.02235 8.07767 0 8.07767 0C3.6165 0 0 3.60173 0 8.04469V88.9386C0 95.0475 4.87773 99.9998 10.8948 100H93.1052C99.1223 99.9998 104 95.0475 104 88.9386V8.04469Z")`,
        }}
      />
    </motion.div>
  );
}
