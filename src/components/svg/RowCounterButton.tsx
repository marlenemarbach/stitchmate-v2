import { MotionProps, motion } from "motion/react";

export function RowCounterButton({
  className,
  ...props
}: MotionProps & {
  className?: string;
}) {
  return (
    <motion.svg
      className={className}
      width="104"
      height="180"
      viewBox="0 0 104 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M95.9223 0C100.384 8.74605e-07 104 3.60173 104 8.04469V23.3917C103.97 23.3979 103.94 23.4032 103.91 23.4093C103.967 23.6417 104 23.884 104 24.1341V168.939C104 175.047 99.1223 180 93.1052 180H10.8948C4.87773 180 0 175.047 0 168.939V24.1341C0 23.9083 0.0256779 23.6887 0.0719812 23.4771C0.0480516 23.4722 0.0239167 23.4683 0 23.4634V8.04469C0 3.60173 3.6165 4.0491e-08 8.07767 0C8.07767 0 34.7749 4.02235 52 4.02235C69.2251 4.02235 95.9223 0 95.9223 0ZM98.0571 24.5338C84.2087 26.9897 68.4907 28.3793 51.8284 28.3793C35.3038 28.3793 19.7077 27.0127 5.94289 24.5946V168.939C5.94289 171.715 8.15988 173.966 10.8948 173.966H93.1052C95.8401 173.966 98.0571 171.715 98.0571 168.939V24.5338Z"
        className="fill-ultramarine-800 opacity-80"
      />
      <path
        d="M90.8544 4C94.8008 4 98 7.17285 98 11.0868V24.6062C84.5344 27.3933 68.7397 29 51.8482 29C35.0836 29 19.3992 27.4178 6 24.6694V11.0868C6 7.17285 9.19921 4 13.1456 4C13.1456 4 36.7624 7.54338 52 7.54338C67.2376 7.54338 90.8544 4 90.8544 4Z"
        className="fill-ultramarine-200 opacity-10"
      />
      <circle
        cx="19"
        cy="16"
        r="5"
        opacity={0.1}
        stroke="white"
        strokeWidth="1"
      />
      <circle
        cx="86"
        cy="16"
        r="5"
        opacity={0.1}
        stroke="white"
        strokeWidth="1"
      />
    </motion.svg>
  );
}
